# Las imágenes del sitio se bajan de /media/, y las rutas con tildes exigen normalización NFD
<!-- backbone:type:quirk -->
Source: observed

Todas las imágenes de galerialacometa.com cuelgan de `/media/<archivo>`, con nombres que suelen
codificar la ficha técnica (`Carlos-Castro_El-sueño-del-libertador_Bronce-y-piedra_40x30x15cm_2022.jpg`).
Hay que percent-encodear la ruta, y además **el servidor sólo responde si el nombre va en Unicode
NFD**: `.../El-sueño-...` en NFC devuelve 404 y el mismo nombre en NFD devuelve 200. Segundo
detalle: el CMS publica dos calidades muy distintas — los `.jpg` son originales grandes (dan
1800 px tras `cwebp -q 78 -resize 1800 0`), mientras que muchos `.webp` son miniaturas de
**383 px** y **no existe versión mayor** (las variantes `.jpg`/`.png` de esas mismas rutas dan
404). Los WebP por debajo de 1800 px se copian sin recomprimir, para no perder calidad al reencodar.
_(updated 2026-09-11: **`cwebp` no viene instalado y no sobrevive entre turnos** — el contenedor
del agente es efímero, igual que pasa con `safe.directory`. Hay que correr
`apt-get install -y --no-install-recommends webp` al principio de cada tanda de descargas, o el
script muere con `FileNotFoundError: 'cwebp'` a mitad de camino. Trae también `dwebp` y `webpinfo`.)_

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
