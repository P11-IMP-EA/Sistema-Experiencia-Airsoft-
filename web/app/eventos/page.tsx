import { supabase } from "@/lib/supabase";
import EventCard from "@/components/EventCard";
import PrivateAccess from "@/components/PrivateAccess";
import CalendarSlot from "@/components/CalendarSlot";

export const dynamic = "force-dynamic";

function generarDias(cantidad = 14) {
  const dias = [];

  for (let i = 0; i < cantidad; i++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i);

    dias.push(fecha.toISOString().split("T")[0]);
  }

  return dias;
}

const SLOTS = ["TM", "T1", "T2", "TN"];
const SLOT_HORARIOS: Record<string, string> = {
  TM: "09:00 - 12:00",
  T1: "12:00 - 15:00",
  T2: "15:00 - 18:00",
  TN: "18:00 - 21:00",
};

export default async function EventosPage() {
  const hoy = new Date().toISOString().split("T")[0];

  // 🔹 Próximos 6 públicos
  const { data: eventosPublicos } = await supabase
    .from("eventos")
    .select("*, reservas(count)")
    .eq("tipo", "publico")
    .gte("fecha", hoy)
    .order("fecha", { ascending: true })
    .limit(6);

  // 🔹 Todos los eventos (para calendario)
  const { data: eventos } = await supabase
    .from("eventos")
    .select("*, reservas (count)")
    .gte("fecha", hoy);

  const dias = generarDias(14);

  return (
    <main className="p-6 bg-black min-h-screen text-white space-y-10">
      
      {/* 🔹 BLOQUE 1 */}
      <div>
        <h1 className="text-xl font-bold mb-4">
          Próximas partidas
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {eventosPublicos?.map((evento) => (
            <EventCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>

      {/* 🔹 BLOQUE 2 */}
      <PrivateAccess />

      {/* 🔹 BLOQUE 3 */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Calendario
        </h2>

        <div className="space-y-4">
  {dias.map((dia) => {
    const fechaObj = new Date(dia);
    const hoyObj = new Date();

    const diff =
      (fechaObj.getTime() - hoyObj.getTime()) /
      (1000 * 60 * 60 * 24);

    return (
      <div key={dia} className="border border-gray-700 p-4">
        <div className="mb-2 font-semibold">{dia}</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SLOTS.map((slot) => {
            const evento = eventos?.find(
              (e) => e.fecha === dia && e.slot === slot
            );

            return (
              <CalendarSlot
                key={slot}
                evento={evento}
                dia={dia}
                slot={slot}
                horario={SLOT_HORARIOS[slot]}
                diff={diff}
              />
            );
          })}
        </div>
      </div>
    );
  })}
    </div>
  </div>
    </main>
  );
}