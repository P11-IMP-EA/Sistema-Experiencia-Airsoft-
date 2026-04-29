
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  email text unique,
  tel text,
  rol text not null default 'jugador',
  created_at timestamptz default now()
);

create table eventos (
  id bigint generated always as identity primary key,
  titulo text,
  inicio timestamptz not null,
  fin timestamptz,
  cupo_total int not null,
  cupo_alquiler int default 0,
  precio numeric(10,2) not null,
  estado text default 'activo',
  created_at timestamptz default now()
);

create table reservas (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id) on delete cascade,
  evento_id bigint references eventos(id) on delete cascade,
  pago numeric(10,2) default 0,
  asistencia boolean default false,
  requiere_kit boolean default false,
  estado text default 'pendiente',
  created_at timestamptz default now(),
  unique(user_id, evento_id)
);

create table asset_types (
  id bigint generated always as identity primary key,
  codigo_tipo text unique not null,
  nombre text not null,
  categoria text
);

create table assets (
  id bigint generated always as identity primary key,
  asset_type_id bigint references asset_types(id),
  codigo_activo text unique not null,
  estado text default 'disponible',
  barcode text unique,
  observaciones text
);

create table asset_asignaciones (
  id bigint generated always as identity primary key,
  reserva_id bigint references reservas(id) on delete cascade,
  asset_id bigint references assets(id),
  estado text default 'reservado',
  created_at timestamptz default now()
);

create table asset_movimientos (
  id bigint generated always as identity primary key,
  asset_id bigint references assets(id),
  user_id uuid references profiles(id),
  evento_id bigint references eventos(id),
  accion text not null,
  fecha timestamptz default now()
);
