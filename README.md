# Sistema Experiencia Airsoft

Plataforma operativa para campos de airsoft, empezando por Experiencia Airsoft en Argentina.

El objetivo es construir un producto vendible que ordene eventos, reservas, inventario, staff y gestion gerencial.

## Stack base

- Frontend recomendado: Next.js
- Backend: Supabase
- Base de datos: PostgreSQL

## Prioridad actual

Modulo Eventos:

- Crear evento
- Listar eventos
- Editar evento
- Cancelar evento

## Modulos futuros

- Reservas
- Inventario inteligente por assets individuales
- Dashboard gerencial
- Staff
- CRM y marketing

## Supabase

El frontend debe usar:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Las claves reales van en `.env.local`, que no se versiona.
