// Comprueba un juego sin gastar modelo.
//
//   node herramientas/comprobar.mjs juegos/<tema>/index.html
//
// 1. Que el <script> del juego no tenga errores de sintaxis.
// 2. Que cada pantalla del menú abra sin errores en la consola, a 390 px (móvil) y
//    a 1024 px (tableta), y que ninguna desborde a lo ancho.
// 3. En las pantallas con modo «Jugar», que se pueda entrar en él.
//
// Usa el Playwright instalado de forma global (en la nube ya está). Sale con código 1 si
// algo falla, y escribe una línea por fallo.

import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const ruta = process.argv[2];
if (!ruta) { console.error('Uso: node herramientas/comprobar.mjs juegos/<tema>/index.html'); process.exit(2); }
const fichero = resolve(ruta);
const fallos = [];

// 1 · Sintaxis
const html = readFileSync(fichero, 'utf8');
const trozo = html.match(/<script>([\s\S]*?)<\/script>/);
if (!trozo) { console.error('No encuentro el <script> del juego.'); process.exit(1); }
const tmp = mkdtempSync(join(tmpdir(), 'jcd-'));
writeFileSync(join(tmp, 'juego.js'), trozo[1]);
try { execSync(`node --check ${join(tmp, 'juego.js')}`, { stdio: 'pipe' }); }
catch (e) { fallos.push('sintaxis: ' + e.stderr.toString().split('\n').slice(0, 5).join(' ')); }

// 2 y 3 · Las pantallas en un navegador de verdad
let chromium;
try {
  const raiz = execSync('npm root -g').toString().trim();
  ({ chromium } = createRequire(join(raiz, 'playwright', 'package.json'))('playwright'));
} catch (e) {
  console.error('No encuentro Playwright. En la nube viene instalado; en el Mac: npm i -g playwright');
  process.exit(1);
}

const url = 'file://' + fichero;
const navegador = await chromium.launch();
let pantallas = 0;
for (const [nombre, viewport] of [['móvil', { width: 390, height: 844 }], ['tableta', { width: 1024, height: 768 }]]) {
  const p = await navegador.newPage({ viewport });
  p.on('pageerror', e => fallos.push(`${nombre}: error: ${e.message}`));
  p.on('console', m => { if (m.type() === 'error') fallos.push(`${nombre}: consola: ${m.text()}`); });
  const desborda = async donde => {
    const ancho = await p.evaluate(() => document.documentElement.scrollWidth);
    if (ancho > viewport.width) fallos.push(`${nombre}: ${donde} desborda (${ancho} px)`);
  };

  await p.goto(url);
  await p.waitForTimeout(250);
  await desborda('menú');
  const cartas = await p.$$eval('.carta', cs => cs.map(c => c.dataset.a));
  if (!cartas.length) fallos.push(`${nombre}: el menú no tiene ninguna .carta`);

  for (const id of cartas) {
    // Cambiar solo el # no recarga la página: se pasa antes por about:blank.
    await p.goto('about:blank');
    await p.goto(url);
    await p.click(`.carta[data-a="${id}"]`);
    await p.waitForTimeout(250);
    await desborda(id);
    const jugar = await p.$('.modo[data-modo="jugar"]');
    if (jugar) { await jugar.click(); await p.waitForTimeout(250); await desborda(id + ' (jugar)'); }
    pantallas++;
  }
  await p.close();
}
await navegador.close();

if (fallos.length) {
  console.log(`✗ ${fallos.length} fallo(s):`);
  fallos.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
console.log(`✓ Sin fallos: sintaxis correcta y ${pantallas} pantallas abiertas en móvil y tableta.`);
