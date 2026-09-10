# La animación vive en js/motion.js, que instrumenta el DOM ya construido sin tocar el markup
<!-- backbone:type:fact -->
Source: user-stated

Llegó el 2026-09-10 en el commit `6d8ed8f`. `motion.js` se carga **último**, después de
`data.js`, `main.js` y `components.js`, y engancha sus efectos sobre el DOM que esos ya
construyeron — por eso ninguna de las 12 vistas se editó a mano para animarlas. Cubre: telón de
entrada una vez por sesión, barra de avance de lectura, masthead que se retira al bajar, títulos
que suben por línea, revelado escalonado, obra que se descubre de abajo hacia arriba, paralaje
corto **sólo en figuras grandes y nunca sobre obra**, subrayados que se dibujan, punto de sala en
el cursor y transición entre páginas. Sus estilos son un bloque `@layer components` / `@layer
utilities` al final de `src/input.css` (clases `lc-curtain`, `lc-lines`…), y todo queda apagado
bajo `prefers-reduced-motion`. Al tocar el markup, no renombrar las clases de las que se cuelga.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
