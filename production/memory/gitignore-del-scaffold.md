# El .gitignore vigente es el del scaffold, no el de GitHub
<!-- backbone:type:decision -->
Source: user-stated

El merge del 2026-09-10 usó `-X ours` justamente para conservar el `.gitignore` del scaffold de
la plataforma, que es el que protege `secrets/`, `.env*`, `*.pem` y `*.key` — sin él se podrían
commitear credenciales. La contrapartida: el `.gitignore` de GitHub ignoraba las páginas que
`build.js` compone en la raíz del repo (`/index.html`, `/artistas/`, `/exhibiciones/`, `/obras/`,
`/ferias/`, `/noticias/`, `/la-galeria/`, `/contacto/`) y esas reglas se perdieron, así que la
primera corrida de `build.js` ensuciaba la pestaña Versions con 12 páginas sin trackear.
_(updated 2026-09-10: esos ocho patrones ya se volvieron a agregar al `.gitignore`, con un
comentario que explica de dónde vienen — no hace falta hacerlo de nuevo, pero tampoco borrarlos.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
