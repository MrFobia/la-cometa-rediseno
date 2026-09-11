# Rediseño La Cometa

Rediseño estructural y visual de [galerialacometa.com](https://galerialacometa.com/):
home + páginas internas. Stack deliberadamente plano (HTML + Tailwind v4 + JS vanilla)
para portarlo después a Backbone IA / Expressia.

## Correr el proyecto

```bash
npm install
npm run dev      # compone páginas + compila CSS en watch + sirve en http://localhost:4321
```

Comandos sueltos:

```bash
npm run pages        # compone src/pages → HTML en las rutas finales
npm run css:build    # compila y minifica dist/styles.css
npm run build        # ambas cosas
```

## Estructura

```
tokens.css          Fuente única de color, tipografía, ritmo y movimiento (portable)
src/input.css       Tailwind v4 + capas @layer base/components/utilities
src/partials/       Masthead + menú y footer + diálogo de consulta, compartidos
src/pages/          Una página por archivo, con su bloque <!--meta--> (título, OG, JSON-LD)
build.js            Compositor sin dependencias: partials + página → HTML final
js/data.js          Índice del buscador global (datos reales del sitio actual)
js/main.js          Menú, buscador, tabs, filtro alfabético, formularios, revelados
js/components.js    Componentes de las internas (ver abajo)
assets/img/         Fotografía real del sitio, recomprimida a WebP
```

> Todo el CSS propio vive dentro de un `@layer`. En Tailwind v4, CSS fuera de una capa
> anula las utilidades y rompe márgenes sin avisar.

`build.js` escribe en la **misma estructura de URLs que tendrá producción**
(`/artistas/damaxo-henao-es/`, `/exhibiciones/bogota/…`), así que los enlaces del
prototipo son los definitivos. Los HTML generados están en `.gitignore`: la fuente
es `src/pages`.

## Páginas

**28 vistas** compuestas por `build.js` desde `src/pages/`.

| URL | Qué es |
|---|---|
| `/` | Home |
| `/artistas/` | Listado en panal (13 artistas), filtro alfabético, vista panal/lista |
| `/artistas/<slug>-es/` | **13 fichas de artista** con nav contextual — ver detalle abajo |
| `/exhibiciones/` | En sala + programa y archivo por año |
| `/exhibiciones/bogota/el-volumen-…/` | Ficha de exposición con recorrido de sala |
| `/obras/` | Catálogo con filtros cruzados y muro a escala |
| `/obras/<slug>/` | **5 fichas de obra** con lupa y escala humana — sólo Dámaxo Henao |
| `/ferias/` | Próxima participación + historial por año |
| `/noticias/` | Listado por categoría |
| `/noticias/mexico-ahora-mas-cerca/` | Artículo con schema `Article` y bloque citable |
| `/la-galeria/` | Las cinco sedes, con hora local |
| `/contacto/` | Formulario + relojes de sede |

**Las 13 fichas de artista** (`Person` + `ProfilePage`): Adam Goldstein, Adrián Gaitán,
Alejandro Ospina, Alejandro Sánchez, Ana González, Camilo Restrepo, Carlos Castro, Dámaxo
Henao, Daniel Nyström, Fernando Pinto, Miguel Ángel Rojas, Verónica Lehner y Zhivago Duncan.

**Las 5 fichas de obra** (`VisualArtwork` + `Offer`), todas de Dámaxo Henao: *Transeúnte*,
*El centinela diurno*, *La torre del ermitaño*, *Mejores amigos* y *Los tiempos de la ilusión
del hogar*. Enlazadas en las dos direcciones desde el catálogo, desde la ficha del artista y
desde la exposición.

## Componentes de las internas

Todos degradan a contenido legible si el JS no corre, y respetan `prefers-reduced-motion`.

**Escala humana** (`/obras/transeunte/`). Una fotografía no dice si una obra cabe en un
pasillo. El componente dibuja la pieza y una silueta de 1,70 m con la misma escala, tomando
los centímetros de la ficha técnica, y cuelga la obra a altura de museo: centro a 150 cm
del piso. La línea inferior es el suelo.

**Muro a escala** (`/obras/`). El catálogo alterna entre retícula y un montaje de salón
donde cada pieza ocupa su tamaño real sobre un muro imaginario de 9 m (4,20 m en móvil).
Ahí se ve de golpe que «Mejores amigos» mide 20 cm y «Aparición» mide 2,55 m. Las cartelas
aparecen al pasar el cursor: un texto fijo bajo una obra de 20 cm se parte en sílabas.

**Lupa** (`/obras/transeunte/`). Amplía la pincelada siguiendo el cursor, con botón de
acercar para táctil y teclado.

**Recorrido de sala** (ficha de exposición). Siete vistas en el orden en que se camina la
exposición, en un riel que se arrastra, y visor a pantalla completa con flechas y Escape.

**Filmstrip** (ficha de artista y de exposición). Riel horizontal con arrastre de ratón,
scroll táctil, flechas de teclado, barra de avance y contador. Un arrastre largo no dispara
el enlace de la tarjeta.

**Nav contextual con scroll-spy** (fichas). Biografía · Obras · Exposiciones · CV ·
Consultar, pegado bajo el masthead, marcando la sección visible.

**Panal de artistas** (`/artistas/`). Al pasar el cursor sobre un nombre aparece una obra,
no un retrato: se reconoce al artista por lo que hace.

**Relojes de sede** (`/la-galeria/`, `/contacto/`). Hora local de cada ciudad y si está
abierta ahora mismo, calculado en el navegador contra el horario publicado. Donde no hay
horario cargado dice «Horario por confirmar», nunca «Cerrado».

**Filtros cruzados** (`/obras/`). Artista × técnica × década × disponibilidad, combinables,
con conteo en vivo y botón de limpiar.

**Línea de tiempo por año** (`/exhibiciones/`, `/ferias/`, `/noticias/` por categoría).

## Insumos que definen este diseño

- **Benchmark**: `Propuesta_ La Cometa_2025.pdf` — White Cube, MoMA, Victoria Miro,
  Pace Gallery, Thaddeus Ropac, David Zwirner.
- **Auditoría**: `La_Cometa_Brief_Auditoria_Rediseno.docx` (Backbone LATAM, sep. 2026).
- **Contenido**: extraído en vivo de galerialacometa.com el 10 de septiembre de 2026.

## Decisiones de diseño

**Dirección: sala blanca, la obra manda.** Papel casi blanco, tinta `#020203` tomada
del logo oficial, cero color de marca inventado. El único cromático es el anillo de foco
(azul, para contraste ≥3:1) y el punto verde de «en sala». El color lo pone la obra.

**Tipografía.** Archivo para display (ya está en el sitio actual) + Hanken Grotesk para
texto corrido, como sustituto libre de Quasimoda, la fuente de marca. Todos los títulos
en redonda: nada de itálicas de encabezado.

**Macroestructura: catálogo.** El sitio es un índice navegable, no un carrusel de bloques.

**Obra sin recortar.** Las fichas de obra usan `object-fit: contain` sobre fondo de cal.
Recortar una pintura para que calce en una tarjeta es el error que una galería no comete.

## Hallazgos de la auditoría resueltos

| Hallazgo | Severidad | Cómo se resuelve |
|---|---|---|
| Metadatos clonados en todo el sitio | Crítica | `title`, `description`, canonical, `hreflang`, OG y JSON-LD propios **por página** |
| Tres correos de contacto distintos | Crítica | `info@galerialacometa.com` como único correo general; los de sede quedan por sede |
| Sin H1 semántico (los títulos eran H3) | Alta | Un solo `<h1>` por página, verificado en las 12; H2/H3 en orden, landmarks y *skip link* |
| Roster de artistas no indexable (scroll infinito) | Alta | Panal con filtro alfabético, vista lista y paginación real (`/artistas/?page=2`) |
| Alt text = nombre de archivo | Alta | Alt descriptivo por imagen; las decorativas con `alt=""` (0 imágenes sin `alt`) |
| Imágenes sin optimizar | Alta | Todo a WebP, ancho máximo 1800 px, `loading="lazy"` salvo el hero de cada página |
| Sin buscador general | Alta | Buscador global dentro del menú, en todas las páginas (ref. Victoria Miro) |
| Sin filtros en Obras | Alta | Filtros cruzados combinables + dos vistas del catálogo |
| Ficha de artista sin navegación interna | Alta | Nav contextual sticky con scroll-spy (ref. Pace Gallery) |
| Baja citabilidad / sin datos estructurados | Alta | `Organization`, `ArtGallery` ×5, `ExhibitionEvent`, `Person`, `VisualArtwork`, `Article`, `SearchAction` |
| Footer congelado en «2024» | Media | Año calculado en JS |
| Sedes inconsistentes | Media | Una sola lista de cinco sedes con dirección, horario y correo reales |
| Sin CTA de consulta por obra | Media | «Consultar por esta obra» en cada pieza y en cada listado (ref. David Zwirner) |
| Exposiciones sin distinción temporal | Media | En sala / programa / archivo, con línea de tiempo por año |
| Noticias sin categorías | Media | Categoría y fecha por nota, más un bloque citable y FAQ en el artículo |

## Pendientes conocidos

Los datos que el sitio actual no tiene cargados aparecen como `—` o con el sello
«Dato pendiente». No se completaron con supuestos.

- **Fechas de la programación 2026** fuera de las cuatro exposiciones de Bogotá.
- **Año de nacimiento de Dámaxo Henao**: el sitio publica 1955 en la ficha de artista y
  1995 en el texto curatorial. **Se usa 1995** por decisión del 2026-09-11, pero la
  contradicción sigue **sin confirmar por la galería** y no se da por cerrada: es la
  fuente contradiciéndose a sí misma, no un dato que falte.
- **El sitio real no publica fichas de obra.** Comprobado de dos formas independientes:
  `https://galerialacometa.com/obras/<slug>/` devuelve **404**, y en la ficha de cada
  artista los títulos de obra **no son enlaces**. Su catálogo son galerías paginadas
  (116 páginas) con título, artista, técnica, medidas y año, y nada más. Por eso **las
  únicas cinco fichas de obra construidas son las de Dámaxo Henao** —*Transeúnte*,
  *El centinela diurno*, *La torre del ermitaño*, *Mejores amigos* y *Los tiempos de la
  ilusión del hogar*—, las únicas piezas con texto curatorial publicado. El resto del
  catálogo queda sin ficha propia **hasta que la galería entregue textos**; no se
  escriben acá. *Puerta* tampoco tiene ficha: aparece en la exposición y en la ficha del
  artista, pero no en el catálogo.
- **Medellín** tiene exposiciones publicadas en 2026 pero no tiene página de sede ni
  dirección: aparece listada con los datos marcados como pendientes.
- **«Elliptic Spsce II»**: errata del sitio original. Aquí se escribe «Elliptic Space II»
  y la corrección se mantiene deliberadamente — la errata del origen no se arrastra.
- **Disciplina de Verónica Lehner**: no publicada, se muestra como pendiente. Su origen sí
  está publicado (Cali, Colombia, 1980) y ya figura.
- **Zhivago Duncan**: el sitio sólo publica lugar y año de nacimiento (Terre Haute,
  Indiana, USA, 1980). Su ficha es mayormente «Dato pendiente», a propósito. **No se le
  asigna nacionalidad**: haber nacido en Estados Unidos no lo vuelve un artista
  estadounidense, y eso lo define la galería.
- **El roster publicado no coincide con el del prototipo.** `/artistas/` publica **16
  artistas** en dos páginas —Gabriela Pinilla, Glenda León, Johan Samboni, Juan Cárdenas,
  Juan Jaramillo, Justyna Kisielewicz, Liliana García y Luisa Pastor, entre otros— y
  **ninguno** está en nuestro panal; a la inversa, cuatro de los nuestros (Dámaxo Henao,
  Miguel Ángel Rojas, Verónica Lehner y Zhivago Duncan) **no aparecen** en esas dos
  páginas aunque tienen ficha propia. Nuestro panal son los **12 originales + Ana
  González**, única alta aprobada y sólo porque ya tenía obra en el catálogo sin ficha a
  la que enlazar. **A quién representa la galería lo decide la galería**: el hallazgo
  queda documentado y sin tocar. Detalle en `production/artistas-y-obras.md`.

- **La mayoría de las obras no tiene ficha técnica publicada.** De Alejandro Sánchez y de
  Fernando Pinto hay **una sola pieza** con técnica, medidas y año, y viene del catálogo,
  no de su página de artista. De Verónica Lehner y de Zhivago Duncan **no hay ninguna**:
  el sitio publica el título y la imagen, nada más. Esas tarjetas van con «Ficha técnica:
  pendiente» en vez de completarse. Criterio aplicado: varios nombres de archivo del CMS
  traen la ficha técnica escrita adentro
  (`Fernando Pinto_ONDA_Piedra Sibaté_15 x 25 x 7 cm_2021.jpg`), pero **un nombre de
  archivo no es un dato publicado** —y además traen erratas («dolas», «inkyet»,
  «solubres»)—, así que no se usaron como fuente.

- **El buscador global cae en 404 dentro del preview.** Las URLs del índice viven como
  strings `u: "/artistas/…"` en `js/data.js`, que se incrusta en `@verbatim<script>`, así
  que la reescritura a `/preview/{id}` de `toBlade()` —que sólo toca `href` y `action`—
  no las alcanza. Sólo afecta al preview de la plataforma, no a producción. El arreglo es
  una reescritura extra en `toBlade()` sobre `u: "/…"`.
- **Precios y CV en PDF**: no publicados.
- **Formularios**: validan y muestran estados de carga, error y éxito, pero el envío está
  simulado. Falta el endpoint.
- **Archivo de exposiciones 2024–2025**: existe en el sitio actual sin fichas normalizadas.

## Siguientes pasos sugeridos

1. Fichas de exposición y las de obra que falten, generadas desde Expressia con esta misma
   plantilla. Las 13 de artista y las 5 de obra ya construidas sirven de patrón.
2. Versión EN con patrón de URL unificado `/en/…` (hoy conviven `/en/` y `/the-galery/`).
3. Listados con paginación server-side y filtros en la URL (`/obras/?artista=…`).
4. Conectar formularios y newsletter a un endpoint real.
