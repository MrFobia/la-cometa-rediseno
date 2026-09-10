# El rediseño tiene dos capas: la fuente editable en src/ y las vistas generadas en production/views/
<!-- backbone:type:fact -->
Source: observed

`src/pages/*.html` (12 páginas) más `src/partials/header.html` y `footer.html` son **la fuente de
verdad editable**; `production/views/*.blade.php` son salida compuesta por `build.js`. Editar una
vista `.blade.php` a mano se pierde en la próxima corrida del build: el cambio va en `src/`. Los
assets viven en `assets/` en la raíz y se espejan a `production/views/assets/` (44 imágenes `.webp`,
`LC-Logo.svg`, `assets/js/{main,components,data}.js`, `assets/styles.css`).

## References

<!-- backbone:memory-references -->
- [Las 12 vistas de producción](./vistas-de-produccion.md)
- [El build y los tokens](./build-y-tokens.md)
- [Las vistas NO usan el CDN de Tailwind](./tailwind-compilado-no-cdn.md)
- [Los assets en el preview](./assets-en-el-preview.md)
- [Los links internos y preview-ids.json](./links-preview-ids.md)
<!-- backbone:memory-references -->
