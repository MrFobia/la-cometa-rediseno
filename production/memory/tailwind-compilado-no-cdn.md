# Las vistas usan un Tailwind compilado en /assets/styles.css, NO el CDN que pide el CLAUDE.md
<!-- backbone:type:correction -->
Source: observed

El `CLAUDE.md` del proyecto indica cargar `https://cdn.tailwindcss.com` en cada vista, pero el CDN
**no serviría**: el diseño vive en `src/input.css` (1028 líneas) más `tokens.css`, con clases
propias (`lc-navlink`, `lc-megalink`, `lc-skip`…) que sólo existen en el build del Tailwind CLI.
Al tocar cualquier vista hay que seguir el patrón real del repo, no el del CLAUDE.md: el CSS va
**incrustado** en un `@verbatim<style>` y el JS **enlazado** bajo `/projects/re-diseno-la-cometa/assets/js/`.
_(updated 2026-09-10: se probaron las tres variantes en un mismo día — enlazado (falla: la
plataforma manda `text/plain` + `nosniff`), todo incrustado (funciona pero infla las vistas a
~90 KB) y la mezcla actual, que es la correcta. El detalle del content-type está en su propia
neurona.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
