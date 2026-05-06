import { supabase } from "@/lib/supabase";
import AdminCalendarSlot from "@/components/AdminCalendarSlot";

export const dynamic = "force-dynamic";

const SLOTS = ["TM", "T1", "T2", "TN"];

const SLOT_HORARIOS: Record<string, string> = {
  TM: "09:00 - 12:00",
  T1: "12:00 - 15:00",
  T2: "15:00 - 18:00",
  TN: "18:00 - 21:00",
};

function generarDias(cantidad = 14) {
  const dias = [];

  for (let i = 0; i < cantidad; i++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + i);
    dias.push(fecha.toISOString().split("T")[0]);
  }

  return dias;
}

export default async function AdminEventosPage() {
  const hoy = new Date().toISOString().split("T")[0];

  const { data: eventos } = await supabase
    .from("eventos")
    .select("*, reservas(count)")
    .gte("fecha", hoy);

  const dias = generarDias(14);

  return (
    <main className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        Admin de Eventos
      </h1>

      <div className="space-y-4">
        {dias.map((dia) => (
          <div key={dia} className="border border-gray-700 p-4">
            <div className="mb-2 font-semibold">{dia}</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {SLOTS.map((slot) => {
                const evento = eventos?.find(
                  (e) => e.fecha === dia && e.slot === slot
                );

                return (
                  <AdminCalendarSlot
                    key={slot}
                    evento={evento}
                    dia={dia}
                    slot={slot}
                    horario={SLOT_HORARIOS[slot]}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}