# Ningún dato sobre una obra o un artista se completa por inferencia: o está publicado, o va con .lc-pending
<!-- backbone:type:constraint -->
Source: user-stated

El usuario la llamó **"la regla más importante de este proyecto"** el 2026-09-10: "es una galería,
un dato inventado sobre una obra o sobre un artista es un problema real". La fuente obligatoria es
lo que publique galerialacometa.com. Si un dato no está publicado, va con la clase `.lc-pending`
(definida en `src/input.css`) o con un guion — nunca se rellena con conocimiento general del
modelo, ni con lo que "suele ser" cierto de un artista, ni deduciéndolo de otra página. Esto vale
también para el alt de las imágenes, que debe ser descriptivo y real, nunca el nombre del archivo.
Cuando la fuente se contradice consigo misma, tampoco se elige: se marca como pendiente.

## References

<!-- backbone:memory-references -->
- [El año de nacimiento de Dámaxo Henao está en conflicto](./damaxo-ano-en-conflicto.md)
- [El sitio real no tiene fichas de obra](./sitio-real-sin-fichas-de-obra.md)
<!-- backbone:memory-references -->
