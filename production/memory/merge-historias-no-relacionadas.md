# El scaffold de la plataforma y el repo de GitHub eran historias git no relacionadas
<!-- backbone:type:quirk -->
Source: observed

El commit inicial del scaffold de Backbone AI (`540c169 Initial commit`) y el historial de
GitHub (`02d3bcd`) no compartían ancestro, por eso el botón **Pull** de la pestaña Versions
fallaba con "You have divergent branches". Se resolvió el 2026-09-10 desde terminal con
`git merge --allow-unrelated-histories -X ours origin/main`, que produjo el commit de merge
`25cb647`. El único archivo presente en ambos lados era `.gitignore`, así que `-X ours` no
descartó nada más. **El historial ya quedó unificado: a partir de ahora los pull son normales
y NO hace falta volver a usar `--allow-unrelated-histories`.**

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
