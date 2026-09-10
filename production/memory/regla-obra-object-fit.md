# La regla de la obra necesita doble clase: `.lc-figure.lc-figure--obra img`, no `.lc-figure--obra img`
<!-- backbone:type:quirk -->
Source: user-stated

La variante `.lc-figure--obra img` empataba en especificidad con `.lc-figure img` (0,2,1 las dos)
y perdía por orden en la hoja, así que las obras se servían con el `object-fit: cover` genérico y
salían **recortadas**. Corregido el 2026-09-10 en `6d8ed8f` subiendo la especificidad a
`.lc-figure.lc-figure--obra img`, que hoy resuelve a `object-fit:contain;padding:var(--space-md)`.
No volver a escribirla con una sola clase, y tenerlo presente para cualquier otro modificador
`--x` que tenga que ganarle a la regla base: en este CSS el orden no alcanza.

## References

<!-- backbone:memory-references -->
_None yet — connect this neuron to others on the memory map._
<!-- backbone:memory-references -->
