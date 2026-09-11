# El filtro de /exhibiciones/ debe ser sede × año combinable, con `data-sede` y reusando `[data-filters]`
<!-- backbone:type:decision -->
Source: user-stated

Pedido el 2026-09-11 para el Paso 5: con 12 exposiciones en cuatro ciudades y varias abiertas a la
vez, filtrar sólo por año no alcanza —alguien en Madrid quiere ver Madrid, no scrollear el resto—.
Las condiciones, todas explícitas: los dos filtros **se combinan** (sede × año, ninguno reemplaza
al otro); se **reusa el componente `[data-filters]`** que ya resuelve conteo en vivo, botón de
limpiar y estado vacío en `/obras/`, en vez de escribir uno nuevo; mismo patrón visual que el
filtro de años (`.lc-alpha`, `aria-pressed`, `role="group"` con su `aria-label`); la sede sale de un
atributo **`data-sede` en cada fila**, nunca de leer el texto —y **nunca reusando `data-year`**, que
ya está sobrecargado y costó un bug en tres páginas—; el estado vacío es honesto y dice qué falta
(«No hay exposiciones de Madrid en 2024»); y una sede con cero resultados **se muestra
deshabilitada, no se esconde**, para que se vea que la galería tiene cinco sedes. La agrupación por
estado (en sala / programa / archivo) se mantiene: el filtro actúa dentro de esos grupos.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
