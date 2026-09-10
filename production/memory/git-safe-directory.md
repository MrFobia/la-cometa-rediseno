# Git exige un safe.directory global antes de operar sobre este repo desde una sesión de agente
<!-- backbone:type:quirk -->
Source: observed

Cualquier comando git lanzado desde un chat de la plataforma aborta con
`fatal: detected dubious ownership in repository at '/var/www/html/storage/app/projects/re-diseno-la-cometa'`,
porque el árbol pertenece a `www-data` y la CLI corre como `root`. No es un repo corrupto ni un
problema de permisos de escritura. El arreglo es
`git config --global --add safe.directory /var/www/html/storage/app/projects/re-diseno-la-cometa`,
pero **hay que repetirlo en cada sesión**: el entorno del agente es efímero y `/root/.gitconfig`
no sobrevive entre turnos, así que el mismo error reaparece a mitad de un chat.
_(updated 2026-09-10: antes decía que bastaba aplicarlo una sola vez por máquina — falso,
se verificó que el archivo desaparece.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
