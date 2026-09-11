# Los links internos sólo navegan en el preview si preview-ids.json tiene los ids de las vistas
<!-- backbone:type:quirk -->
Source: observed

El markup enlaza las URLs reales del sitio (`/obras/`, `/exhibiciones/`, `/artistas/`…) porque
son las que irán a producción, pero en el preview de la plataforma esas rutas no existen y todo
link queda muerto. `toBlade()` en `build.js` las reescribe a `/preview/{id}` leyendo
`preview-ids.json` (mapa `URL del sitio → id de GeneratedView`), que hay que completar a mano
leyendo los ids en Generated Views después de correr "Scan for new files".
_(updated 2026-09-10: el mapa ya está completo con los 12 ids reales — `/` 1089, `/artistas/` 1095,
`/artistas/damaxo-henao-es/` 1092, `/exhibiciones/` 1088, la ficha de El volumen 1085, `/obras/`
1090, `/obras/transeunte/` 1093, `/ferias/` 1086, `/noticias/` 1087, la nota de México 1084,
`/la-galeria/` 1091, `/contacto/` 1094 — y los links navegan.)_
**Ojo con el fallback**: cuando una URL no está en el mapa, `toBlade()` sube por la ruta y enlaza
el ancestro más cercano, así que las cinco sedes `/la-galeria/<ciudad>` caen todas en la página
La galería y las fichas de exposiciones y noticias no construidas caen en su índice — no se ven
rotas, te llevan a otro lado. Siguen sin resolver `/en/`, `/utilidades/terminos-y-condiciones/` y
los cinco links con query string (`/obras/?artista=…`, `?page=2`), que el regex excluye.
**Y el buscador global tampoco**: las URLs viven como strings `u: "/artistas/…"` dentro de
`js/data.js`, que hoy se incrusta en `@verbatim<script>`, así que la reescritura de `href`/`action`
no las alcanza y todo resultado de búsqueda cae en 404 dentro del preview. Arreglarlo es una
reescritura extra en `toBlade()` sobre `u: "/…"`, no un cambio en `data.js`.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
