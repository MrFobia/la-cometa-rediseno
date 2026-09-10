# Los archivos que escribe el agente rompen el Pull de la UI hasta que se les da escritura de grupo
<!-- backbone:type:quirk -->
Source: observed

El chat corre como `root` y deja `production/views` en `drwxr-sr-x root:www-data` — el grupo tiene
`r-x` **sin w**. Como borrar o reemplazar un archivo exige permiso de escritura sobre el
**directorio** (no sobre el archivo), el botón Pull de la pestaña Versions falla con
`error: unable to unlink old 'production/views/artistas.blade.php': Permission denied` y
`Merge with strategy ort failed`. No es un problema de git ni del remoto. El arreglo, aplicado el
2026-09-10 sobre todo el árbol del proyecto y no sólo sobre las vistas —`build.js` y `src/` estaban
igual—, es: `chown -R www-data:www-data .`, `chmod -R g+w .`, `chmod g+s` en los directorios para
que hereden el grupo, `git config core.sharedRepository group`, y volver a cerrar `secrets/` a
`700`/`600`. Conviene repetirlo después de cualquier tanda de escrituras hechas desde el chat.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
