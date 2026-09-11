# GitHub es la única fuente de verdad: pull antes de cada tanda y push después de cada commit
<!-- backbone:type:constraint -->
Source: user-stated

Acordado el 2026-09-11 después de que las dos copias divergieran feo: el agente había acumulado
**37 commits sin pushear** (16 páginas fuente, 101 imágenes, 28 vistas) mientras el usuario seguía
pusheando arreglos a GitHub desde su clon. La regla que lo corta: **`origin/main` es la fuente de
verdad y la plataforma es sólo una copia de trabajo, nunca un repositorio paralelo.** En concreto:
`git pull` antes de empezar cualquier tanda, y `git push` después de **cada** paso que se
commitee — no al final, no acumulando. Si el push falla por autenticación hay que **decirlo en el
mismo mensaje y frenar**, en vez de seguir sumando commits locales. Nunca dos ramas avanzando en
paralelo.

## References

<!-- backbone:memory-references -->
- [El PAT de la plataforma no autentica contra GitHub](./push-a-github-no-autentica.md)
<!-- backbone:memory-references -->
