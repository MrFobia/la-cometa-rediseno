# `npm run build` compone las páginas con build.js y tokens.css es la fuente de verdad del diseño
<!-- backbone:type:fact -->
Source: observed

`build.js` es un compositor Node sin dependencias: lee el bloque `<!--meta {...} meta-->` de cada
`src/pages/*.html`, resuelve `{{> header }}` / `{{> footer }}` y emite dos salidas — el sitio
estático en la raíz del repo y las `.blade.php` en `production/views/`. `npm run build` encadena
`css:build` (Tailwind CLI → `dist/styles.css`), `assets:sync` (copia a `assets/` y espeja
`production/views/assets/`) y `pages`. `tokens.css` es el sistema de diseño portable — paleta en
`oklch`, tema "Sala blanca", display **Archivo** y cuerpo **Hanken Grotesk**; cualquier cambio de
color o tipografía se hace ahí, no suelto en las vistas — y desde el 2026-09-10 `src/input.css`
termina con los `@layer` de la capa de movimiento.
_(updated 2026-09-10: decía que `preview-ids.json` "todavía no existe" — falso desde entonces,
está completo con los 12 ids y los enlaces se reescriben a `/preview/{id}`; ver su neurona.)_

## References

<!-- backbone:memory-references -->
- [La regla de la obra necesita doble clase](./regla-obra-object-fit.md)
<!-- backbone:memory-references -->
