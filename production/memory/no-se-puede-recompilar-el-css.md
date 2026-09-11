# El marcado se escribe con utilidades de Tailwind: no se escribe CSS propio ni se inventan clases `.lc-*`
<!-- backbone:type:constraint -->
Source: user-stated

**La regla vigente, desde el 2026-09-11 (commits `be11c17` y `60ecdc5`):** las utilidades de
Tailwind **se pueden usar libremente**. El marcado se compone con ellas, **no con CSS propio ni con
clases `.lc-*` inventadas**. Si hace falta una utilidad rara que no esté emitida, **se le pide al
usuario** y la agrega al safelist en un minuto. Pedir es la vía legítima; inventar una clase, no.

## Por qué hizo falta un safelist

Desde el chat **no se puede recompilar el CSS**: el proyecto no tiene `node_modules` en la copia de
la plataforma, así que `npm run css:build` —y con él `npm run build` completo— no corre. Lo único
que corre acá es `node build.js`, que compone las páginas pero **no toca `dist/styles.css`**.

El diagnóstico que se hizo primero era correcto pero **incompleto**: se creía que el problema eran
sólo las clases `.lc-*` inexistentes. En realidad **una utilidad de Tailwind nueva falla igual**,
porque Tailwind emite únicamente lo que ve en el código fuente al compilar, y acá no hay con qué
volver a compilar. En los dos casos el síntoma es el mismo y es silencioso: el markup sale sin
estilo, sin ningún error — igual que la trampa del content-type.

El usuario lo resolvió con **`@source inline` en `src/input.css`** (líneas 13–32): quedan emitidas
de antemano las utilidades de composición —`grid`, `flex`, `gap`, paddings, márgenes, anchos,
bordes, `aspect`, `object`, `order`, `space`— **con sus variantes `sm:` / `md:` / `lg:`**. La hoja
pasó de 35 KB a **87 KB** y está compilada y pusheada. Por eso la restricción anterior ya no aplica.

## Lo que sigue valiendo

El chequeo barato por si algo queda fuera del safelist: extraer las clases de la página nueva y
restarle las de todas las páginas viejas más los dos partials. Si sale algo, o está cubierto por el
safelist o hay que pedirlo. Y el antecedente que originó todo esto: el 2026-09-11, escribiendo la
ficha de *Punto de cruce*, se usaron `lc-list` y `lc-list__title` —que no existen— y el listado de
obras habría salido como una lista pelada.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
