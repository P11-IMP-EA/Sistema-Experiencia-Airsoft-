insert into asset_types (codigo_tipo, nombre, categoria) values
  ('320', 'Marcadora M4', 'marcadora'),
  ('410', 'Gafas', 'proteccion'),
  ('510', 'Bateria', 'energia'),
  ('610', 'Cargador', 'consumible')
on conflict (codigo_tipo) do nothing;

insert into eventos (titulo, inicio, fin, cupo_total, cupo_alquiler, precio, estado) values
  ('Partida abierta - Experiencia Airsoft', now() + interval '7 days', now() + interval '7 days 4 hours', 60, 20, 15000, 'activo');
