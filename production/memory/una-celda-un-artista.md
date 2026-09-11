# En el panal, un `<li>` es un artista y lleva un solo `<a>`: nunca se agrega un enlace dentro de una celda existente
<!-- backbone:type:constraint -->
Source: user-stated

Al sumar a Ana González como artista 13 quedó como un **segundo `<a>` dentro del `<li>` de Alejandro
Sánchez**: el panal tenía 12 celdas para 13 artistas y en pantalla su nombre flotaba en mitad de la
celda del vecino, sin filete propio y sin poder recibir el hover. El usuario lo arregló el
2026-09-11 en el commit `2e00a9a` y dejó la regla estructural: **en `.lc-hive`, un `<li>` = un
artista = un `<a>`**. Para agregar a alguien se agrega el `<li>` completo, nunca un `<a>` dentro de
uno que ya existe. Lo mismo vale para el listado de `/exhibiciones/`: **una exposición, una fila**.

El chequeo que corta el bug de raíz, y que hay que correr **después de cada tanda** que toque
`src/pages/artistas.html` o el listado de exposiciones: que el número de `<li data-letter=` sea
igual al número de `lc-hive__name`, y que ningún `<li>` tenga más de un `<a>`. Son tres segundos y
el bug es invisible en el conteo de nombres —los 13 aparecen— pero rompe la retícula. Importa
especialmente al sumar los 10 artistas de la colectiva *Apocalypse now* (Paso 4) y las 3
exposiciones de Medellín que faltan (Paso 5), que son altas en bloque sobre listas ya construidas.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
