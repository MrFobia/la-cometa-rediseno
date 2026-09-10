# El CSS va incrustado porque la plataforma lo sirve como text/plain con nosniff
<!-- backbone:type:constraint -->
Source: user-stated

`/projects/re-diseno-la-cometa/assets/styles.css` responde `200` pero con
`content-type: text/plain` y `x-content-type-options: nosniff`, así que el navegador **descarta la
hoja** y la página sale sin estilos aunque la URL resuelva — fue lo que dejó al preview 1089 sin
diseño incluso con la base de assets ya corregida. Por eso `toBlade()` en `build.js` reemplaza el
`<link rel="stylesheet">` por `@verbatim<style>…</style>@endverbatim` con el contenido de
`dist/styles.css`; el `@verbatim` es obligatorio porque si no Blade interpreta el `@layer` y las
`@media` del CSS como directivas. El JS (`text/javascript`) y las imágenes (`image/webp`) sí salen
con su content-type correcto y quedan **enlazados** — no incrustar esos. Cada vista pesa 52–80 KB.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
