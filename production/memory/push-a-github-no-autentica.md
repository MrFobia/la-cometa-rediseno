# Desde la plataforma no se puede pushear a github.com: hay que pasar el trabajo por un git bundle
<!-- backbone:type:quirk -->
Source: observed

El `origin` es `https://github.com/MrFobia/la-cometa-rediseno.git` **sin credencial embebida y sin
`credential.helper`**, así que `git push` muere con `fatal: could not read Username for
'https://github.com'`. El PAT del Profile de la plataforma tampoco sirve: por la UI devuelve
`remote: Invalid username or token. Password authentication is not supported for Git operations`
—es una credencial de GitLab, que es el remoto por defecto de Backbone AI, no de GitHub—. **No hay
que insistir ni inventar credenciales.** La vía que sí funciona es un bundle publicado por HTTP:

    git bundle create assets/transfer.bundle --all && chmod 644 assets/transfer.bundle

`assets/` se sirve en `/projects/re-diseno-la-cometa/assets/`, así que el usuario lo baja con
`curl -o` y hace `git fetch` desde el archivo. Dos cuidados: **regenerar el bundle después del
último commit** (si no, queda viejo) y **no commitearlo** — son ~11 MB que no deben entrar en la
historia.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
