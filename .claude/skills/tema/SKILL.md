---
name: tema
description: Convierte las fotos del cuaderno de Daniela en un juego nuevo de Juega con Daniela. Primero un plan corto y espera el sí; después construye, dejando la redacción a un modelo más barato y las comprobaciones a un script.
---

# /tema · del cuaderno a un juego

Las fotos del cuaderno llegan con el mensaje. El trabajo va en dos fases y **la segunda no
empieza sin un sí**. Las reglas de contenido y de diseño están en `CLAUDE.md`.

## Fase 1 · Leer y proponer (sin tocar nada)

Lee las fotos y contesta **solo** con este plan, en 15 líneas como mucho:

- **Asignatura y tema**, como lo pone el cuaderno.
- **Lo que he leído**: los conceptos, con las palabras del cuaderno. Marca con (?) lo que
  no se lea bien en la letra a mano.
- **Juegos que propongo**, de 3 a 5, uno por línea, diciendo de qué tipo del motor sale cada
  uno: tocar en un dibujo, clasificar en cajas, ordenar pasos o verdadero o falso.
- **Dibujos nuevos** que hacen falta.
- **Carpeta**: `juegos/<nombre-corto>/`, en minúsculas y sin tildes.

Termina con «¿Lo hago así?» y **para**. En esta fase no se leen ficheros del repositorio, no
se lanzan agentes y no se escribe nada.

## Fase 2 · Construir (cuando diga que sí, con sus cambios)

1. **Copiar el motor**: `cp -r juegos/cuerpo-humano juegos/<carpeta>`, o el tema ya hecho
   que más se parezca.
2. **Redactar con el agente `redactor-tema`** (Sonnet, más barato). Pásale la ruta del
   `index.html` nuevo, el plan aprobado tal cual y lo leído del cuaderno. Él reescribe el
   contenido, los textos, las preguntas, la tarjeta de la portada y la fila del README. No toca
   dibujos ni lógica. Espera a que termine; no hagas su parte a la vez.
3. **Lo difícil, tú**: los dibujos SVG nuevos y adaptar las pantallas del motor que cambien
   (`ACTS`, `PANTALLAS`, los `CFG_*`). Atiende los `// PENDIENTE:` que deje el agente.
4. **Comprobar con el script**, sin gastar modelo:
   `node herramientas/comprobar.mjs juegos/<carpeta>/index.html`.
   Si falla, arregla y vuelve a pasarlo. Una captura solo si hay un dibujo nuevo, y una sola
   pasada.
5. **Cerrar una vez**: un commit, un push a `main` y publicar la página como artefacto. Antes
   de publicar, quita del fichero las líneas de `<!doctype>`, `<html>`, `<head>`, las dos
   `<meta>` del principio, `</head>`, `<body>`, `</body>` y `</html>`, porque el artefacto
   pone las suyas.

La respuesta final es corta: el enlace para jugar, qué juegos trae y si algo quedó pendiente.
