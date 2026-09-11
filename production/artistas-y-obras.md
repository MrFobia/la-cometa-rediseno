# Inventario de artistas y obras — Paso 1

_Levantado el 2026-09-10 contra galerialacometa.com y contra el prototipo local._
_Regla de trabajo: sólo entra lo que el sitio publica. Lo que no está publicado va con
`.lc-pending` o guion. Ningún dato se completa por inferencia._

Fuentes consultadas: `/artistas/`, `/artistas/?page=2`, las fichas individuales de los 12
artistas del panal, `/obras/` y la exposición `el-volumen-que-toco-la-luz-damaxo-henao-es`.
Alcance: los 12 artistas del panal local y las 13 obras del catálogo local.

---

## 1. El conflicto de Dámaxo Henao: 1955 vs 1995 — SIGUE ABIERTO

El sitio publica **los dos años, en dos lugares distintos**, y se contradicen:

| Dónde | Qué dice textualmente |
|---|---|
| Ficha del artista, encabezado | `Dámaxo Henao (Medellín, Colombia, 1955)` |
| Texto curatorial de la exposición | `Dámaxo Henao (Medellín, Colombia, 1995)` |

El prototipo hoy usa **1995**. No hay forma de resolverlo con lo publicado: no es que un dato
falte, es que la fuente se contradice consigo misma. **No se elige uno.** Hasta que la galería
confirme, el año va con `.lc-pending`. Una diferencia de 40 años cambia por completo la lectura
de la obra (artista consagrado vs. artista joven), así que no es un detalle cosmético.

## 2. Artistas — los 12 del panal

Ordenados por cuánto falta. «Panal» = lo que hoy afirma la tarjeta local; «Publicado» = lo que
trae la ficha real.

| Artista | Panal dice | Publicado en el sitio | Falta |
|---|---|---|---|
| Carlos Castro | Colombia (sin disciplina) | **Bogotá, Colombia, 1976.** Tapiz bordado, ensamblaje, escultura en bronce, fotografía, instalación. Bio: «explorador e intérprete del anacronismo», apropiación de imágenes históricas y recontextualización de objetos encontrados. ~13 obras con técnica/medidas/año | Exposiciones |
| Daniel Nyström | Suecia (sin disciplina) | **Külgav, Suecia, 1969.** Entre arte contemporáneo, diseño, arquitectura y textil; lana virgen con técnicas colombianas. ~22 obras, varias con medidas/año. Exposiciones: *Borderline* (Bogotá, 2019), *Signos e Hilvanes* (Madrid, 2021) | Verificar la grafía de «Külgav» |
| Miguel Ángel Rojas | Colombia (sin disciplina) | **Bogotá, Colombia, 1946.** Artes plásticas; secreciones corporales, hoja de coca, billetes de dólar. Bio larga. Exposiciones: Biennale di Venezia 2024, Americas Society 2023, MAMU, MFA Houston, Fondation Beyeler, Quai Branly. Premios 1981 y 1992 | Técnica/medidas/año de casi todas sus obras |
| Verónica Lehner | — (nada) | **Cali, Colombia, 1980.** 16 obras por título (series *Interferencia*, *Interferencias*, *Desdoblados*, *Intersecciones*) | **Disciplina, biografía, exposiciones, y técnica/medidas/año de TODAS las obras** |
| Zhivago Duncan | — (nada) | **Terre Haute, Indiana, USA, 1980.** 12 obras por título (*Delectable Garden*, *Eden 2*, *Pineal Jungle*…) | **Nacionalidad, disciplina, biografía, exposiciones, y técnica/medidas/año de TODAS las obras** |
| Dámaxo Henao | Medellín, Colombia · Pintura | Medellín, Colombia, **año en conflicto**. Óleo sobre lienzo. 6 obras: *Los tiempos…*, *Mejores amigos*, *Transeúnte*, *El centinela diurno*, *Puerta*, *La torre del ermitaño* | Biografía, exposiciones y el año de nacimiento |
| Adam Goldstein | Colombia · Pintura | ficha real pendiente de leer en detalle | — |
| Adrián Gaitán | Colombia · Ensamblaje | ídem | — |
| Alejandro Ospina | Colombia · Pintura | ídem | — |
| Alejandro Sánchez | Colombia · Escultura | ídem | — |
| Camilo Restrepo | Colombia · Dibujo | ídem | — |
| Fernando Pinto | Colombia · Escultura | ídem | — |

Los seis últimos ya tienen país y disciplina coherentes en el panal y su ficha real existe; se
leen en detalle al construir cada ficha (Paso 3), no hacía falta para dimensionar el trabajo.

## 3. Obras — las 13 del catálogo

Sólo *Transeúnte* tiene ficha (`/obras/transeunte/`). Las otras 12 enlazan a `/obras/`.
Todas tienen título, artista, técnica, medidas y año publicados en el catálogo, salvo:

- **Drawing #1** (Camilo Restrepo): **sin año**, tanto acá como en el sitio real.
- **Elliptic Space II** (Adam Goldstein): el sitio real lo escribe **«Elliptic Spsce II»**, con
  errata. Nuestro catálogo ya lo corrige. Decidir si se respeta la fuente o la corrección.
- **Serranías del Dios de la Noche II** (Ana González): el sitio lo escribe «Serranias», sin tilde.

Obras del catálogo por artista: Miguel Ángel Rojas 2 · Dámaxo Henao 5 · Adrián Gaitán, Camilo
Restrepo, Adam Goldstein, Fernando Pinto, Alejandro Sánchez, Ana González 1 cada uno.

## 4. Tres hallazgos que afectan el alcance

**a) El sitio real NO tiene fichas de obra.** Verificado de dos maneras: `/obras/transeunte/`
devuelve **404**, y en la ficha de cada artista los títulos de obra **no son enlaces**. El
catálogo real son galerías paginadas (116 páginas) donde cada pieza muestra sólo título, artista,
técnica, medidas y año. Es decir: para el Paso 4 no hay fuente que transcribir más allá de lo que
el catálogo local ya tiene. La única excepción es el grupo de Dámaxo, que sí tiene texto
curatorial propio en la página de la exposición.

**b) Ana González tiene obra en el catálogo pero no está entre los 12 del panal.** Su pieza
*Serranías del Dios de la Noche II* no puede enlazar a una ficha de artista que no existe en el
alcance. En el sitio real tiene dos obras publicadas (*Serranías…* y *Bromelia*, mixta sobre
lienzo, 60 × 50 cm, 2024).

**c) El panal local no coincide con el índice real.** `/artistas/` publica 8 artistas en su
primera página y otros 8 en la segunda (Gabriela Pinilla, Glenda León, Johan Samboni, Juan
Cárdenas, Juan Jaramillo, Justyna Kisielewicz, Liliana García, Luisa Pastor), ninguno de los
cuales está en el panal. Cuatro de los nuestros —Dámaxo Henao, Miguel Ángel Rojas, Verónica
Lehner y Zhivago Duncan— no aparecen en esas dos primeras páginas aunque sí tienen ficha propia.
El alcance definido es el panal local; queda anotado que no es el roster completo de la galería.

## 5. Datos nuevos aprovechables

Del catálogo real salieron dos obras de artistas nuestros que el catálogo local no tiene, útiles
para la sección «obras» de sus fichas:

- Carlos Castro — *20 Centavos*, maíz sobre madera, 122 × 122 × 5 cm, 2024.
- Daniel Nyström — *The Capacity To Comprehend Infinity*, hierro, lana, hormigón, MDF y tinta,
  200 × 200 × 4 cm, 2023.

## 6. Decisiones tomadas (2026-09-11, consultadas con Nicolas)

1. **Año de Dámaxo**: se usa **1995**, como hasta ahora. **El conflicto NO se cierra**: queda
   anotado en el README y en la memoria como dato sin confirmar por la galería. No sacarlo de la
   lista de pendientes.
2. **Fichas de obra**: **sólo las 5 de Dámaxo**, únicas con texto curatorial real. El resto del
   catálogo se queda sin ficha hasta que la galería entregue textos.
3. **Ana González**: **entra al panal como artista 13**, con ficha propia y sus dos obras
   publicadas. Hay que sumarla también a `js/data.js` para que aparezca en el buscador global.
4. **«Elliptic Space II»**: se mantiene **la corrección**. La errata del origen no se arrastra y
   queda anotada en el README.
5. **Verónica Lehner**: se publica lo que sí está (Cali, Colombia, 1980); la **disciplina se
   muestra como pendiente**.
6. **Zhivago Duncan**: se publica **Terre Haute, Indiana, USA, 1980 y nada más**. No se le asigna
   nacionalidad — nacido en Estados Unidos no equivale a artista estadounidense.
7. **Roster real vs. panal**: no se agregan los 16 artistas del sitio. Es una decisión de la
   galería; queda documentado acá y en el README, sin tocar el panal.

## 6 bis. Resolución de las imágenes nuevas — limitación de la fuente

Las 19 imágenes descargadas el 2026-09-11 salieron en dos calidades muy distintas, y no por
elección nuestra:

| Origen | Qué llegó | Cuáles |
|---|---|---|
| JPG de tamaño completo | **1800 px** tras `cwebp -q 78 -resize 1800 0` | las 5 obras de Ana González de su ficha |
| WebP servido por el CMS | **383–389 px**, ya en WebP | las 6 de Verónica Lehner, las 6 de Zhivago Duncan y *Bromelia* |
| WebP de tamaño completo | 1455 px, copiado sin recomprimir | el retrato de Miguel Ángel Rojas |

El resto del proyecto usa **1800 px**, así que esas 13 imágenes chicas van a verse más blandas si
se las usa en grande. **No hay versión mayor publicada**: se probaron las variantes `.jpg` y `.png`
de esas mismas rutas y todas devuelven 404; el `.webp` de 383 px es el original que entrega el
sitio. Los archivos pesan 100–185 KB pese a medir 383 px, o sea que son recortes de buena calidad
pero de baja resolución.

Consecuencia de diseño: en las fichas de Lehner, Duncan y en *Bromelia* esas imágenes se usan a
tamaño de tarjeta y **no** como pieza a sangre completa. Si la galería quiere esas fichas en
grande, tiene que entregar los originales.

Criterio aplicado en la conversión: los WebP que ya venían por debajo de 1800 px se copiaron **sin
recomprimir** (reencodarlos sólo habría perdido calidad); los JPG y cualquier cosa por encima de
1800 px sí pasaron por `cwebp -q 78 -resize 1800 0`.

## 7. Ana González — datos para su ficha (artista 13)

Publicado en `/artistas/ana-gonzalez-es`: **Bogotá, Colombia, 1974**. Disciplina **no publicada**.
Biografía **no publicada**. Exposiciones publicadas: *Chinyia* (Madrid, 14 nov – 20 dic 2019),
*Chinyia* en la Embajada de Colombia en Madrid (7 – 21 jul 2020) y la colectiva *Opening galería
Madrid* (11 abr – 31 may 2019).

Ojo con una particularidad: **su ficha de artista y el catálogo publican obras distintas**. La
ficha lista *Cattleya I* (porcelana limoges, 25 × 25 cm, 2021), *Calima* (bronce, 8 × 19 × 9 cm,
2018), *Frailejón I*, *Colibrí I*, *Amazonas* (mixta sobre lienzo, 50 × 40 cm, 2021) y otras —
pero **no** incluye las dos que trae el catálogo, *Serranías del Dios de la Noche II* (textil,
22 × 96 cm, 2024) y *Bromelia* (mixta sobre lienzo, 60 × 50 cm, 2024). Las dos fuentes son del
mismo sitio, así que las obras del catálogo entran igual; simplemente no conviene tratar la ficha
de artista como la lista completa de su obra.
