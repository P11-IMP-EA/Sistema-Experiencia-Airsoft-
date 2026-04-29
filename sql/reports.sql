-- Eventos con cantidad de reservas y cupos restantes.
select
  e.id,
  e.titulo,
  e.inicio,
  e.cupo_total,
  count(r.id) as reservas,
  e.cupo_total - count(r.id) as cupos_restantes
from eventos e
left join reservas r on r.evento_id = e.id and r.estado <> 'cancelada'
group by e.id
order by e.inicio asc;

-- Ingresos por evento.
select
  e.id,
  e.titulo,
  coalesce(sum(r.pago), 0) as ingresos_confirmados
from eventos e
left join reservas r on r.evento_id = e.id
group by e.id
order by e.inicio asc;
