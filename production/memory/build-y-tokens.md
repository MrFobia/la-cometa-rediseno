# `npm run build` compone las páginas con build.js y tokens.css es la fuente de verdad del diseño
<!-- backbone:type:fact -->
Source: observed

`build.js` es un compositor Node sin dependencias: lee el bloque `<!--meta {...} meta-->` de cada
`src/pages/*.html`, resuelve `{{> header }}` / `{{> footer }}` y emite dos salidas — el sitio
estático en la raíz del repo y las `.blade.php` en `production/views/`. `npm run build` encadena
`css:build` (Tailwind CLI → `dist/styles.css`), `assets:sync` (copia a `assets/` y espeja
`production/views/assets/`) y `pages`. `tokens.css` es el sistema de diseño portable — paleta en
`oklch`, tema "Sala blanca", display **Archivo** y cuerpo **Hanken Grotesk**; cualquier cambio de
color o tipografía se hace ahí, no suelto en las vistas. `build.js` también reescribe los enlaces
internos a `/preview/{id}` si existe `preview-ids.json` en la raíz — ese archivo **todavía no
existe**, así que hoy emite las rutas normales.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
