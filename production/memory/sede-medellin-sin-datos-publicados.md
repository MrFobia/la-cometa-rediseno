# Medellín no tiene página de sede en el sitio de la galería: la dirección se resolvió afuera y el horario sigue sin aparecer
<!-- backbone:type:observed -->
Source: observed

Verificado el 2026-09-11 agotando la fuente obligatoria antes de salir a buscar. Las páginas de
sede del sitio real son sólo cuatro —`/la-galeria/{bogota,madrid,mexico,miami}`— y **Medellín no
tiene ninguna**, pese a tener cuatro exposiciones publicadas en el programa 2026. En `/contacto/` y
en `/la-galeria/` la galería publica tres direcciones (Bogotá, Miami, Madrid) y Medellín aparece
únicamente como opción del formulario de newsletter. Es la única sede sin `data-hours` en el
prototipo, y `components.js` ya resuelve bien ese caso: sin `data-hours` la insignia dice «Horario
por confirmar» en vez de afirmar si está abierta.

**La dirección sí se resolvió con fuentes externas**: Calle 10B # 37-29, El Poblado, en la planta
baja del Hotel Click Clack. Tres fuentes independientes dan el mismo número y una cuarta, de
febrero de 2026, confirma que la sede sigue en ese edificio — o sea que el dato no sólo coincide,
además está vigente. Ya figura en las fichas de Medellín y su trazabilidad está en
`production/fuentes-externas.md`.

**El horario no se resolvió y no hay que volver a intentarlo con las mismas fuentes.** No lo
publican ni AGAC, ni ARTEINFORMADO, ni El Colombiano (ni en 2019 ni en 2026), ni Vivir en El
Poblado, ni Medellín Cuenta; Artsy responde 403 y la nota de Revista Diners está caída. Los únicos
horarios que circulan vienen de agregadores que no se pudieron abrir y **se contradicen entre sí**
(L-V 11–19 / S 11–16 contra L-V 10–19 / S 11–17), y el primero trae un teléfono con indicativo de
Bogotá, señal de que mezcla sedes. Caso de manual de la regla 3 del protocolo: no se elige, va
pendiente.

Un detalle útil y que **no es fuente**: en la tercera vista de sala de *Punto de cruce* se lee,
espejado en el vidrio de la puerta, el aviso de horarios de la sede. No se publica —es texto
reflejado dentro de una foto a 1111 px— pero sirve para contrastar lo que aparezca afuera, y de
hecho sirvió: no coincide con el horario más difundido, que es parte de por qué el dato quedó
pendiente.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
