# Inventario de exposiciones — Paso 1

_Levantado el 2026-09-11 contra galerialacometa.com: el índice `/exhibiciones/` más las 12 fichas
individuales, una por una._
_Regla de trabajo: sólo entra lo que el sitio publica. Lo que falte va con `.lc-pending` y en
lenguaje de sala. Ningún dato se completa por inferencia._

---

## 1. Lo primero: las fechas SÍ están publicadas, en las 12

Dábamos por sabido que fuera de Bogotá la programación 2026 no tenía fechas. **Es falso.** Las
verifiqué una por una en la ficha individual de cada exposición, no sólo en el índice: las doce
tienen inicio y fin publicados. El hueco es del prototipo, no de la fuente.

Hoy nuestro archivo muestra **«Fechas —» en cinco filas** que sí tienen fecha en el sitio:

| Fila del prototipo | Dice hoy | Publicado en el sitio |
|---|---|---|
| Madrid · Parar el mundo | Fechas — | 09.05 — 05.07.2026 |
| Madrid · Pensamiento mágico · El año entrante | Fechas — | 09.05 — 05.07.2026 |
| Madrid · Arañas del paraíso | Fechas — | 05.03 — 25.04.2026 |
| Miami · Delectable Garden | Fechas — | 22.02 — 19.04.2026 |
| Medellín · Envoltorios | Fechas — | 14.05 — 05.07.2026 |

Consecuencia para el Paso 3: **las 12 fichas pueden llevar `ExhibitionEvent` con `startDate` y
`endDate` reales.** No hace falta omitir esas propiedades en ninguna.

## 2. Las 12 exposiciones publicadas

Todas son del programa **2026**. Sede, fechas, artista, si hay texto curatorial y cuántas vistas de
sala publica cada una.

### Bogotá — 4

| Exposición | Fechas | Artista | Curatorial | Vistas de sala |
|---|---|---|---|---|
| **El volumen que tocó la luz** | 05.08 — 12.09 | Dámaxo Henao | sí | 7 (ya descargadas) |
| **Apocalypse now o la fabricación del paraíso** | 05.08 — 12.09 | colectiva, 11 artistas | sí, extenso | 9 (`.jpg`) |
| **De ruidos, desbordes y otras fricciones** | 09.04 — 23.05 | Verónica Lehner | sí | 7 (`.webp`) |
| **El Mato** | 12.02 — 01.04 | Camilo Echeverri | sí | 6 (`.webp`) |

*El volumen* ya tiene su ficha construida: es la plantilla del Paso 3.

Los 11 artistas de **Apocalypse now**: Miguel Ángel Rojas, Clemencia Echeverri, Maria Fernanda
Cardoso, José Alejandro Restrepo, Juan Fernando Herrán, Liliana Angulo Cortés, Alberto Baraya,
Fernando Arias, Miler Lagos, Nicolás Consuegra y Julieth Morales. **Sólo Miguel Ángel Rojas está
en nuestro panal**, así que es el único de esa lista que puede enlazar a una ficha de artista.

### Medellín — 4

| Exposición | Fechas | Artista | Curatorial | Vistas de sala |
|---|---|---|---|---|
| **Envoltorios** | 14.05 — 05.07 | Asicaz Monzón | sí | 6 |
| **Nada Es Lo Que Parece, Al Parecer Desaparece II** | 14.05 — 05.07 | Luisa Aristizábal | sí | 4 |
| **Punto de cruce** | 12.02 — 01.04 | Ana Isabel Díez | sí | 3 |
| **Travesía por la zona tórrida** | 12.02 — 01.04 | Mónica Meira | sí | 4 |

### Madrid — 3

| Exposición | Fechas | Artista | Curatorial | Vistas de sala |
|---|---|---|---|---|
| **Pensamiento mágico / El año entrante** | 09.05 — 05.07 | Alejandro Ospina | sí, extenso | **ninguna publicada** |
| **Parar el Mundo** | 09.05 — 05.07 | Adam Goldstein | sí | 2 |
| **Arañas del Paraíso** | 05.03 — 25.04 | Maria Fernanda Cardoso | sí | **ninguna publicada** |

### Miami — 1

| Exposición | Fechas | Artista | Curatorial | Vistas de sala |
|---|---|---|---|---|
| **Delectable Garden** | 22.02 — 19.04 | Zhivago Duncan | **no publicado** | 5 |

## 3. Cuatro hallazgos que afectan el alcance

**a) Faltan tres exposiciones en el prototipo.** Las tres de Medellín que no son *Envoltorios* —
*Nada Es Lo Que Parece…* (Luisa Aristizábal), *Punto de cruce* (Ana Isabel Díez) y *Travesía por la
zona tórrida* (Mónica Meira)— están publicadas y no figuran ni en `/exhibiciones/` ni en
`js/data.js`. El programa real de Medellín es de cuatro muestras, no de una.

**b) Un enlace nuestro está roto.** `/exhibiciones/medellin/asicaz-monzon-envoltorios-es` devuelve
**404**: la URL real de *Envoltorios* termina en **`-en`**, no en `-es`. Es la única de las doce
que rompe el patrón.

**c) El archivo 2025 y 2024 está vacío.** Los botones de año existen en `/exhibiciones/` y no
tienen ninguna fila detrás: las 7 filas del archivo son todas de 2026. El sitio real tampoco
publica un archivo anterior — sólo el programa 2026. O se llena con lo que entregue la galería, o
los dos botones vacíos deberían salir.

**d) Tres exposiciones tienen un hueco real, y no se completa.** *Pensamiento mágico* y
*Arañas del Paraíso* **no publican ninguna vista de sala** —sólo texto y registro de obra—, y
*Delectable Garden* **no publica texto curatorial** —sólo imágenes—. Sus fichas van a quedar cojas
de un lado, con `.lc-pending` en lenguaje de sala.

**e) La ficha de *Envoltorios* sólo responde en inglés.** `/exhibiciones/medellin/asicaz-monzon-envoltorios-es`
da 404 y la que existe es `-en`, así que **su texto curatorial está publicado únicamente en
inglés**. Traducirlo sería producir texto que la galería no publicó: o se pide la versión en
español, o la ficha va sin texto curatorial y marcada en lenguaje de sala.

## 4. Imágenes: qué hay y qué falta

En `assets/img/` tenemos **una imagen representativa por exposición** (`exh-apocalypse`,
`exh-asicaz`, `exh-cardoso`, `exh-goldstein`, `exh-lehner`, `exh-ospina`, `exh-volumen`,
`exh-zhivago`) más las **7 vistas de sala** de *El volumen* (`sala-volumen-1..7`). Nada más.

_(actualizado 2026-09-11, Paso 2 hecho: **46 vistas de sala descargadas**, 0 fallidas.)_
9 de Apocalypse, 7 de Lehner, 6 de El Mato, 6 de Envoltorios, 5 de Duncan, 4 de Aristizábal,
4 de Meira, 3 de Díez y 2 de Goldstein. Ospina y Cardoso aportan **0**: no publican vistas de sala.

**Dos resoluciones distintas.** Las 9 de Apocalypse venían en `.jpg` y dan **1800 × 730** tras
`cwebp -q 78 -resize 1800 0`, igual que las 7 de *El volumen* que ya teníamos. Las otras 37 son
`.webp` del CMS y vienen a **1111 × 451**: se copiaron sin recomprimir y son perfectamente usables
a tamaño de tarjeta o de tira, pero no dan para una pieza a sangre completa.

Siguen faltando las dos imágenes representativas (`exh-*`) de las exposiciones nuevas de Medellín
que no tienen una.

## 5. Qué hay que decidir antes del Paso 2

1. **Las tres de Medellín que faltan**: ¿entran al prototipo —y entonces son 12 fichas— o quedan
   fuera como pasó con el roster de artistas? Mismo criterio: el alcance lo fija la galería.
2. **Los botones de archivo 2025 y 2024 vacíos**: ¿se quitan o se dejan esperando contenido?
3. **Alcance de fichas**: ¿las 12, o sólo las que tienen sala y texto completos? Recordar que
   *Pensamiento mágico* y *Delectable Garden* quedan cojas.
4. **El enlace roto de Envoltorios** se corrige a `-en` en cualquier caso.
