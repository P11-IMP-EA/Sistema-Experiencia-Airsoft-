# Arquitectura

## Backend

Supabase funciona como backend inicial:

- PostgreSQL para datos operativos.
- Supabase Auth para usuarios.
- RLS pendiente para permisos.

## Frontend

Next.js es la opcion recomendada para el frontend porque permite construir rapido y mantener camino de producto profesional.

## Inventario

El inventario debe manejar unidades fisicas individuales, no solo stock agregado.

Ejemplos:

- `320001`: Marcadora M4 unidad 001.
- `410001`: Gafas unidad 001.
- `510001`: Bateria unidad 001.
- `610001`: Cargador unidad 001.

Esto permite disponibilidad futura, asignacion por evento, check-in, check-out y reparaciones.
