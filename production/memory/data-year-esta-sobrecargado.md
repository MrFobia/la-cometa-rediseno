# El atributo `data-year` es de los botones de filtro; el sello del pie usa `data-year-stamp`
<!-- backbone:type:naming -->
Source: user-stated

`main.js` ponía el año actual con `$$("[data-year]")` para sellar el copyright del pie, pero ese es
**el mismo atributo que usan los botones del filtro** que lee `components.js`: les reescribía el
`textContent` a todos y el historial de `/ferias/` mostraba «2026 2026 2026 2026», con el botón
«Todas» diciendo 2026 mientras la leyenda decía «Mostrando 2024». Arreglado el 2026-09-11 en el
commit `29dbc4c` separando los roles — el sello pasó a `[data-year-stamp]` en `js/main.js` y en
`src/partials/footer.html`, y `data-year` quedó sólo para los botones.

Ojo con una trampa extra al verificarlo: **en `/noticias/` `data-year` no guarda años sino
categorías** (`todos`, `galeria`, `exposiciones`, `artistas`, `prensa`), así que buscar
`data-year="[0-9]+"` da cero ahí y parece que la página no tiene filtros. Antes de agregar un
selector global sobre un `data-*`, conviene grepear quién más lo usa: en este repo hay un solo
atributo compartido por dos componentes y ya costó un bug en tres páginas.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
