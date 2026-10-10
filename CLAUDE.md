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
- **Nada sale del aparato** salvo lo que la familia active en sus ajustes (la cuenta y la
  lectura de la letra por foto, abajo): ni analítica, ni anuncios, ni peticiones a otros
  servidores. Las estrellas van en `localStorage` (clave `jcd:<tema>:v1`), siempre dentro de
  try/catch.
  La voz es la del propio navegador (`speechSynthesis`), y los sonidos, Web Audio.
- **Para un niño de 7 años**: letra de 18 px o más, botones de 46 px o más, todo se puede
  oír, y equivocarse dice qué ha tocado y anima a seguir. Nunca castiga ni quita estrellas.
- **Dibujos propios.** Las láminas del libro de texto tienen derechos; no se copian.
- Español en el código, los comentarios y los commits.

## Hacia dónde va: la web por edades (decidido el 9-oct-2026)

La idea es abrirlo a más familias y monetizarlo. Todo juego nuevo se hace ya pensando en eso.

- **La portada se elige por edad** y por dentro va por curso, que es como va el temario:
  3-5 años (Infantil), 6-7 (1º-2º), 8-9 (3º-4º) y 10-12 (5º-6º). Cada juego dice su curso.
- **Un solo diseño para todos.** El diseño aprobado vive en `diseno/` y manda sobre cualquier
  juego. No se inventa un aspecto por juego: si algo no encaja, se cambia en el diseño común.
- **Cada juego acaba con un reto de escritura en papel.** Algo corto del propio tema
  («Escribe en tu cuaderno los tres huesos de la pierna»), con el modelo en pauta de dos rayas
  y letra ligada como la del colegio, un truco de caligrafía y ánimo. Los trucos los da
  **Punta**, el lápiz que acompaña en todos los juegos. Si la letra no se entiende, se anima a
  repetirlo despacio, nunca se riñe.
- **Quién revisa la letra lo decide cada familia en sus ajustes:**
  - **Un mayor** (gratis): una lista corta en pantalla. ¿Se lee? ¿Las letras se apoyan en la
    línea? ¿Hay espacio entre palabras? ¿Son del mismo tamaño?
  - **Foto automática** (de pago): el niño fotografía el papel y se lee la letra. Cada usuario
    gratis puede probarla **7 días**, y el **administrador puede regalar bonos** a quien
    quiera. La foto solo sale del aparato con este modo activado y con permiso de los padres,
    y se borra nada más leerla.
- **Puntos que enganchan sin agobiar:** +10 por acierto, +5 más por cada acierto seguido desde
  el tercero (la racha), y +5 en vez de +10 si se ha usado una pista. Los puntos nunca se
  restan. Hay pegatinas para coleccionar por tema y un reto del día. Sin cronómetros y sin
  compras dentro del juego: lo de pago lo gestionan los padres en sus ajustes.

## El diseño elegido (10-oct-2026)

Elegido sobre las maquetas de `diseno/maquetas.html`, con los códigos de esa página. Manda sobre
los juegos hechos antes, que se rehacen con él. Botones, colores, letra y Punta siguen siendo los
de `diseno/index.html`.

- **Realista sin dejar de ser para niños.** Formas de verdad, bien proporcionadas, con volumen y
  luz. Caras amables y colores limpios. Nada de muñecos de palitos ni de dibujos planos «de hace
  veinte años».
- **Esqueleto: rayos X (1C).** La geometría de «El Esqueleto Curioso»: mandíbula, esternón,
  clavículas, costillas curvas, rótula, manos y pies. Los huesos brillan en celeste dentro de la
  silueta de un niño, sobre fondo azul noche. Etiquetas oscuras con borde celeste y línea hasta el
  hueso. El hueso acertado se pone verde menta.
- **Músculos: todos dibujados (2A).** Niño de frente y de espaldas, con todos los músculos con su
  forma y sus fibras, en degradado rojo. Cara, pelo, manos y pies de niño. Solo se tocan los del
  cuaderno; los demás son decorado. El músculo tocado se pone amarillo.
- **Portada: el camino (3B).** Arriba, Punta, el saludo y los puntos; luego la edad y el curso.
  Cada tema es una banda de color con un camino de paradas redondas, una por juego: las hechas en
  verde con ✓, la siguiente en amarillo con ▶ y Punta al lado, y las que faltan en gris con una
  estrella. La última parada de cada camino es el reto de escribir.
- **El viaje de la comida: cuento en viñetas (4D).** La protagonista es una manzana con cara. Hay
  una viñeta de cómic por parada: borde de tinta grueso, número en un círculo amarillo y la frase
  del cuaderno abajo. El juego es ordenar las viñetas; después suena la canción y se escribe.

## Canciones y escritura

- **Mini canción** cuando el tema tenga una lista o un orden que aprender de memoria. Las frases
  del cuaderno van tal cual. La melodía es propia, hecha con Web Audio, nunca la de una canción con
  derechos, y la letra se ilumina mientras suena.
  La del viaje de la comida está en `diseno/maquetas.html` («La canción de la manzana»).
- **Siempre se intenta escribir.** Todo juego, y también la canción, acaban en el reto de escribir
  en el cuaderno: pauta de dos rayas, letra ligada y el truco de Punta.

## La web publicada

- Se publica con GitHub Pages desde la rama de trabajo: https://dmjinves-creator.github.io/JuegaConDaniela/
- Lleva un **candado sencillo**: cada página (la portada y cada juego) pide la contraseña de la
  familia una vez por aparato y la recuerda en `localStorage` (`jcd:llave:v1`). Solo se guarda su
  huella, nunca la contraseña. No es seguridad de verdad, porque el código es público, y desde el
  propio ordenador (`file://`) no se pide. Todo juego nuevo copia el bloque del candado del final
  de `index.html`.

## Comprobar un juego

Hay Playwright en la máquina de la nube (Chromium en `/opt/pw-browsers`). Lo mínimo antes de
subir: que el script pase `node --check`, que ninguna pantalla desborde a 390 px de ancho y que
una partida entera llegue a la pantalla de estrellas sin errores de consola.

Ojo al probar: navegar solo cambiando el `#` no recarga la página, así que hay que pasar
antes por `about:blank`. Y pulsar el centro de una pieza del dibujo puede caer sobre otra que
la tapa (el centro de las costillas es la columna): para una partida automática, disparar el
clic sobre el elemento.

## Cómo trabajamos (lo pidió la familia: no gastar de más)

Todo esto lo hace el comando **`/tema`** (`.claude/skills/tema/SKILL.md`): fotos del cuaderno →
plan → sí → juego. La redacción la hace el agente `redactor-tema` con Sonnet
(`.claude/agents/`), y las comprobaciones, `node herramientas/comprobar.mjs <juego>`.


1. **Primero un plan corto, sin código.** Con las fotos del cuaderno, contestar en pocas líneas:
   el contenido leído (para cazar errores de lectura de la letra a mano), los juegos que se
   proponen y qué se reutiliza. **No se escribe nada hasta que digan que sí.**
2. **Reutilizar antes que escribir.** Un tema nuevo copia el motor de `juegos/cuerpo-humano/`
   y cambia los datos y los dibujos. Cuando haya dos temas, sacar el motor común a un fichero.
3. **Comprobar lo justo**: `node --check` y una partida automática. Capturas solo si hay un
   dibujo nuevo, y una sola pasada.
4. **Un solo commit y un solo push al final**, y publicar la página una vez.
5. Trabajar en una sesión con **solo este repositorio** cargado.
