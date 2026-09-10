# En el preview los assets se sirven desde /projects/re-diseno-la-cometa/assets/, nunca desde /assets/
<!-- backbone:type:constraint -->
Source: observed

`/assets/…` es la raíz pública de **Backbone AI**, no la del proyecto: una vista que pida
`/assets/styles.css` o `/assets/img/x.webp` sale sin CSS y con las imágenes rotas, que es
exactamente cómo se vieron las 12 páginas al abrirlas por primera vez el 2026-09-10.
**Verificado por HTTP desde afuera**: `https://ai-bbltm.backbone.digital/projects/re-diseno-la-cometa/assets/styles.css`
responde `200 text/css`, y la misma hoja en la raíz `/assets/styles.css` responde `404`. La
constante `ASSET_BASE` de `build.js` vale `/projects/re-diseno-la-cometa` y `toBlade()` le pega
`/assets/…` en cada reescritura. El sitio estático de la raíz del repo sigue usando `/assets/` —
la reescritura pasa sólo al emitir el `.blade.php`.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
