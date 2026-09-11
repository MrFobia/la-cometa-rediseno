# El CSS va incrustado porque la plataforma lo sirve como text/plain con nosniff
<!-- backbone:type:constraint -->
Source: user-stated

`/projects/re-diseno-la-cometa/assets/styles.css` responde `200` pero con
`content-type: text/plain` y `x-content-type-options: nosniff`, así que el navegador **descarta la
hoja** y la página sale sin estilos aunque la URL resuelva — fue lo que dejó al preview 1089 sin
diseño incluso con la base de assets ya corregida. Por eso `toBlade()` en `build.js` reemplaza el
`<link rel="stylesheet">` por `@verbatim<style>…</style>@endverbatim` con el contenido de
`dist/styles.css`; el `@verbatim` es obligatorio porque si no Blade interpreta el `@layer` y las
`@media` del CSS como directivas. Las imágenes (`image/webp`) sí salen con su content-type
correcto y quedan **enlazadas**.
_(updated 2026-09-11: el JS **también va incrustado** desde el commit `8003f9b`. El mismo endpoint
devuelve `text/javascript` para `main.js` y `motion.js` pero `text/plain` para `components.js` y
`data.js`, medido en la misma tanda de peticiones — es **inconsistente por archivo**, no por tipo.
Con `nosniff`, el script descartado no deja error de consola: el síntoma fue que `motion.js` no
corría y los elementos con revelado quedaban en opacidad 0 esperando un observer que nunca se
instalaba. Hoy `toBlade()` incrusta los cuatro scripts en `@verbatim<script>` y las vistas pesan
112–128 KB.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
