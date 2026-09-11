# Desde el chat no se puede recompilar el CSS: sólo se pueden usar clases que ya estén en dist/styles.css
<!-- backbone:type:constraint -->
Source: observed

El proyecto **no tiene `node_modules`** en la copia de la plataforma, así que `npm run css:build`
—y con él `npm run build` completo— **no corre**: el Tailwind CLI no está instalado y, como pasa con
`cwebp` y con `safe.directory`, el contenedor del agente es efímero. Lo único que corre desde el
chat es `node build.js`, que compone las páginas pero **no toca `dist/styles.css`**.

La consecuencia es fácil de pasar por alto y silenciosa: si al escribir una página nueva se usa una
utilidad de Tailwind que no está compilada todavía, o se inventa una clase `lc-*` que no existe en
`src/input.css`, **el markup sale sin estilo y no hay ningún error** — se ve igual que la trampa del
content-type. Pasó el 2026-09-11 escribiendo la ficha de *Punto de cruce*: se usaron `lc-list` y
`lc-list__title`, que no existen; el listado de obras habría salido como una lista pelada.

El chequeo que lo evita, barato y fiable, es comparar contra lo ya construido en vez de contra el
CSS (que tiene las clases escapadas y es incómodo de grepear): extraer todas las clases de la
página nueva y de todas las páginas viejas más los dos partials, y listar las que aparecen sólo en
la nueva. Si la lista sale vacía, el CSS ya las cubre. Si sale algo, o se cambia por una clase
existente o hay que pedirle al usuario que corra `npm run build` en su clon.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
