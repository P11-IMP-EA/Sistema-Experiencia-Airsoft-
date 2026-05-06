"use client";

import { useRouter } from "next/navigation";

export default function CalendarSlot({
  evento,
  dia,
  slot,
  horario,
  diff,
}: any) {
  const router = useRouter();

  // 🔹 SI HAY EVENTO
  if (evento) {
    const ocupados = evento.reservas?.[0]?.count || 0;
    const total = evento.cupo_total;

    const lleno = ocupados >= total;

    return (
      <div className="bg-gray-800 p-2 border border-gray-700 flex flex-col gap-1">
        <div className="text-sm font-semibold">
          {slot} | {horario}
        </div>

        <div className="text-xs">
          {ocupados} / {total}
        </div>

        {evento.tipo === "publico" && !lleno && (
          <button
            onClick={() => router.push(`/eventos/${evento.id}`)}
            className="bg-green-600 text-xs p-1"
          >
            Reservar
          </button>
        )}

        {evento.tipo === "publico" && lleno && (
          <div className="text-red-400 text-xs">
            Lleno
          </div>
        )}

        {evento.tipo === "privado" && (
          <div className="text-purple-400 text-xs">
            Privado
          </div>
        )}
      </div>
    );
  }

  // 🔹 DISPONIBLE PRIVADA (>7 días)
  if (diff > 7) {
    return (
      <div className="bg-green-900 p-2 flex flex-col gap-1">
        <div className="text-xs font-semibold">
          {slot} | {horario}
        </div>

        <div className="text-xs">
          Disponible privada
        </div>

        <button
          onClick={() =>
            window.open(
              `https://wa.me/5491138689783?text=Quiero reservar ${dia} ${slot}`,
              "_blank"
            )
          }
          className="bg-green-600 text-xs p-1"
        >
          Solicitar
        </button>
      </div>
    );
  }

       // 🔹 VACÍO (<7 días)
      return (
        <div className="bg-gray-700 p-2 flex flex-col gap-1">
          <div className="text-xs font-semibold">
            {slot} | {horario}
          </div>

          <div className="text-xs text-gray-300">
            Sin evento programado
          </div>

          <div className="text-xs text-yellow-400">
            (Puede abrirse privada)
          </div>
        </div>
      );
}