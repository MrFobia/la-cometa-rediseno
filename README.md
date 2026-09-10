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

| URL | Qué es |
|---|---|
| `/` | Home |
| `/artistas/` | Listado en panal, filtro alfabético, vista panal/lista |
| `/artistas/damaxo-henao-es/` | Ficha de artista con nav contextual |
| `/exhibiciones/` | En sala + programa y archivo por año |
| `/exhibiciones/bogota/el-volumen-…/` | Ficha de exposición con recorrido de sala |
| `/obras/` | Catálogo con filtros cruzados y muro a escala |
| `/obras/transeunte/` | Ficha de obra con lupa y escala humana |
| `/ferias/` | Próxima participación + historial por año |
| `/noticias/` | Listado por categoría |
| `/noticias/mexico-ahora-mas-cerca/` | Artículo con schema `Article` y bloque citable |
| `/la-galeria/` | Las cinco sedes, con hora local |
| `/contacto/` | Formulario + relojes de sede |

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
  1995 en el texto curatorial. Se usa 1995; falta confirmarlo.
- **Medellín** tiene exposiciones publicadas en 2026 pero no tiene página de sede ni
  dirección: aparece listada con los datos marcados como pendientes.
- **«Elliptic Spsce II»**: typo del sitio original. Aquí se escribe «Elliptic Space II».
- **Disciplina y país** de varios artistas (Carlos Castro, Daniel Nyström, Verónica Lehner,
  Zhivago Duncan).
- **Precios y CV en PDF**: no publicados.
- **Formularios**: validan y muestran estados de carga, error y éxito, pero el envío está
  simulado. Falta el endpoint.
- **Archivo de exposiciones 2024–2025**: existe en el sitio actual sin fichas normalizadas.

## Siguientes pasos sugeridos

1. Fichas restantes de artista, obra y exposición generadas desde Expressia con esta misma
   plantilla (las tres internas construidas sirven de patrón).
2. Versión EN con patrón de URL unificado `/en/…` (hoy conviven `/en/` y `/the-galery/`).
3. Listados con paginación server-side y filtros en la URL (`/obras/?artista=…`).
4. Conectar formularios y newsletter a un endpoint real.
