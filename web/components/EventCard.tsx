"use client";

import ReserveButton from "./ReserveButton";

export default function EventCard({ evento }: any) {
  const ocupados = evento.reservas?.[0]?.count || 0;
  const total = evento.cupo_total;

  let estado = "Disponible";
  let color = "text-green-400";

  if (ocupados >= total) {
    estado = "Lleno";
    color = "text-red-400";
  } else if (ocupados >= total * 0.7) {
    estado = "Pocos lugares";
    color = "text-yellow-400";
  }

  return (
    <div className="border border-gray-700 rounded p-4 bg-gray-800 flex flex-col gap-2">
      <div className="font-semibold">
        {evento.slot} - {evento.cancha}
      </div>

      <div className="text-sm">{evento.fecha}</div>

      <div className="text-sm">
        {ocupados} / {total}
      </div>

      <div className={`text-xs ${color}`}>{estado}</div>

      <ReserveButton evento={evento} />
    </div>
  );
}