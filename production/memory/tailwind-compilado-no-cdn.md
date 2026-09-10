# Las vistas usan un Tailwind compilado en /assets/styles.css, NO el CDN que pide el CLAUDE.md
<!-- backbone:type:correction -->
Source: observed

El `CLAUDE.md` del proyecto indica cargar `https://cdn.tailwindcss.com` en cada vista, pero el CDN
**no serviría**: el diseño vive en `src/input.css` (1028 líneas) más `tokens.css`, con clases
propias (`lc-navlink`, `lc-megalink`, `lc-skip`…) que sólo existen en el build del Tailwind CLI.
Al tocar cualquier vista hay que seguir el patrón real del repo, no el del CLAUDE.md: las vistas
**enlazan** `/projects/re-diseno-la-cometa/assets/styles.css` y los tres JS, y pesan 16–24 KB.
_(updated 2026-09-10: hubo un intento intermedio de INCRUSTAR el CSS y el JS en cada vista,
envueltos en `@verbatim`, como seguro ante una base de assets no verificada. Se descartó: una vez
confirmado por HTTP que la base resuelve, enlazar es correcto y incrustar cuadruplicaba el peso de
cada vista. Si algún día se vuelve a incrustar CSS, el `@verbatim` sí hace falta — Blade se come
el `@layer`/`@media`/`@supports` del CSS compilado.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
