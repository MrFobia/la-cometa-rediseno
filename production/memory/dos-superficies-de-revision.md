# El preview de la plataforma lee el directorio del agente; localhost:4321 lee el clon del usuario
<!-- backbone:type:quirk -->
Source: observed

Son dos superficies distintas y se desincronizan sin avisar. `/preview/{id}` sirve
`production/views/` **del working directory del agente**, así que muestra todo lo que el agente
acaba de compilar aunque no esté pusheado. `localhost:4321` es `npm run serve`
(`python3 -m http.server`) sobre el **clon propio del usuario**, y ahí sólo existe lo que
`build.js` generó a partir de los `src/pages/*.html` **que ese clon tiene**. El 2026-09-11 eso
produjo un falso bug: el panal de `/artistas/` cargaba pero cada nombre daba **404** en
localhost, simplemente porque las 16 páginas nuevas seguían sin pushear y el clon tenía 12 de 28
fuentes. Antes de diagnosticar un 404 en localhost, comparar
`ls src/pages` contra `git ls-tree --name-only origin/main src/pages/`.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
