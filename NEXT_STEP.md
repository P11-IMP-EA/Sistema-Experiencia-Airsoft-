# NEXT STEP

## Estado

- Repo clonado localmente.
- Supabase configurado en `.env.local`.
- SQL base versionado en `sql/schema.sql`.
- Seed inicial en `sql/seed.sql`.

## Proximo paso exacto

Crear frontend Next.js y construir el modulo Eventos.

Primer alcance:

1. Listar eventos desde Supabase.
2. Crear evento desde formulario.
3. Editar evento.
4. Cancelar evento cambiando `estado` a `cancelado`.

## Nota tecnica

Usar como URL de Supabase:

`https://hncaeadsccxafvghqhtj.supabase.co`

No usar `/rest/v1/` para inicializar el cliente JS de Supabase.
