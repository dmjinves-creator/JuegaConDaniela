# Juega con Daniela · notas para Claude

Juegos educativos en HTML para Daniela, nacida en 2019 (1º-2º de Primaria). Cada juego
repasa un tema de clase y su contenido sale de las fotos del cuaderno que manda su familia.
La idea a medio plazo es abrirlo a más niños y quizá monetizarlo; hoy es para ella.

## Cómo está hecho

- **Un juego = una carpeta en `juegos/<tema>/` con un `index.html` autocontenido**: el CSS,
  el JS y los dibujos (SVG hechos a mano en el propio JS) van dentro. Sin build, sin
  dependencias, sin servidor. Lo único de fuera son las fuentes de Google (Andika para
  leer, Baloo 2 para títulos), con fuentes de reserva.
- `index.html` en la raíz es la portada: una tarjeta por tema. Al añadir un juego, se añade
  su tarjeta ahí y su fila en la tabla del README.
- El contenido de cada tema está en arrays al principio del script (`HUESOS`, `MUSCULOS`,
  `VIAJE`, `VF`…). Corregir un texto es tocar solo ahí.

## Reglas que no se rompen

- **El contenido es el del cuaderno**, con las mismas palabras que usa su profesora. Lo que
  se añade para explicar (para qué sirve cada hueso) tiene que ser correcto y del nivel.
- **Nada sale del aparato**: ni analítica, ni anuncios, ni peticiones a otros servidores.
  Las estrellas van en `localStorage` (clave `jcd:<tema>:v1`), siempre dentro de try/catch.
  La voz es la del propio navegador (`speechSynthesis`), y los sonidos, Web Audio.
- **Para un niño de 7 años**: letra de 18 px o más, botones de 46 px o más, todo se puede
  oír, y equivocarse dice qué ha tocado y anima a seguir. Nunca castiga ni quita estrellas.
- **Dibujos propios.** Las láminas del libro de texto tienen derechos; no se copian.
- Español en el código, los comentarios y los commits.

## Comprobar un juego

Hay Playwright en la máquina de la nube (Chromium en `/opt/pw-browsers`). Lo mínimo antes de
subir: que el script pase `node --check`, que ninguna pantalla desborde a 390 px de ancho y que
una partida entera llegue a la pantalla de estrellas sin errores de consola.

Ojo al probar: navegar solo cambiando el `#` no recarga la página, así que hay que pasar
antes por `about:blank`. Y pulsar el centro de una pieza del dibujo puede caer sobre otra que
la tapa (el centro de las costillas es la columna): para una partida automática, disparar el
clic sobre el elemento.
