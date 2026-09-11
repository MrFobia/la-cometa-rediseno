# El endpoint /projects/{slug}/assets/ alterna content-type para el mismo archivo y, con nosniff, el navegador descarta el recurso en silencio
<!-- backbone:type:constraint -->
Source: user-stated

Medido dos veces sobre `https://ai-bbltm.backbone.digital/projects/re-diseno-la-cometa/assets/`: la
hoja `styles.css` responde `200` pero con `content-type: text/plain`, y en una misma tanda de
peticiones `main.js` y `motion.js` salieron como `text/javascript` mientras `components.js` y
`data.js` salieron como `text/plain`. O sea que **es inconsistente por archivo, no por extensión ni
por tipo**. Como el endpoint manda `x-content-type-options: nosniff`, el navegador descarta el
recurso **sin error de consola**: el síntoma no es un 404 sino una página sin estilos, o un script
que nunca corre — acá `motion.js` no se instalaba y los elementos con revelado quedaban en opacidad
0, dejando medio metro de blanco y el retrato invisible en la ficha de Carlos Castro.

Por eso `toBlade()` incrusta **el CSS y los cuatro JS** en bloques `@verbatim<style>` /
`@verbatim<script>`; el `@verbatim` es obligatorio o Blade interpreta el `@layer` y las `@media` del
CSS como directivas. Las imágenes (`image/webp`) sí salen bien y quedan enlazadas. Cada vista pesa
112–128 KB. **Es la trampa más cara de este proyecto y hay que darla por sentada en el próximo**:
ante una vista sin estilos o sin JS en un preview, mirar el `content-type` antes que cualquier otra
cosa. _(updated 2026-09-11: antes esta neurona decía que el JS salía siempre con su content-type
correcto y podía ir enlazado — falso.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
