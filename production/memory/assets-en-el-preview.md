# En el preview los assets se sirven desde /projects/re-diseno-la-cometa/assets/, nunca desde /assets/
<!-- backbone:type:constraint -->
Source: observed

`/assets/…` es la raíz pública de **Backbone AI**, no la del proyecto: una vista que pida
`/assets/styles.css` o `/assets/img/x.webp` sale sin CSS y con las imágenes rotas, que es
exactamente cómo se vieron las 12 páginas al abrirlas por primera vez el 2026-09-10.
**Verificado por HTTP desde afuera**: bajo esa base el JS responde `200 text/javascript` y las
imágenes `200 image/webp`, mientras que en la raíz `/assets/…` todo da `404`. La constante
`ASSET_BASE` de `build.js` vale `/projects/re-diseno-la-cometa` (override: `LC_ASSET_BASE`) y
`toBlade()` le pega `/assets/…` en cada reescritura. El sitio estático de la raíz del repo sigue
usando `/assets/` — la reescritura pasa sólo al emitir el `.blade.php`.
**El CSS es la excepción y va incrustado** — ver la neurona del content-type.

## References

<!-- backbone:memory-references -->
- [El CSS va incrustado por el content-type](./css-incrustado-por-content-type.md)
<!-- backbone:memory-references -->
