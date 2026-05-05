import { supabase } from "@/lib/supabase";
import EventForm from "@/components/EventForm";
import ReserveButton from "@/components/ReserveButton";

export const dynamic = "force-dynamic";

export default async function EventosPage() {
  const { data, error } = await supabase
    .from("eventos")
    .select("*, reservas(count)")
    .order("fecha", { ascending: true });

  if (error) {
    return <div>Error cargando eventos: {error.message}</div>;
  }

  // Agrupar por fecha
  const eventosPorFecha: Record<string, any[]> = {};
  data?.forEach((evento) => {
    if (!eventosPorFecha[evento.fecha]) {
      eventosPorFecha[evento.fecha] = [];
    }
    eventosPorFecha[evento.fecha].push(evento);
  });

  const fechas = Object.keys(eventosPorFecha);

  return (
    <main className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Eventos</h1>

      <EventForm />

      <div className="space-y-6 mt-6">
        {fechas.map((fecha) => (
          <div key={fecha} className="border border-gray-700 rounded p-4">
            <h2 className="text-lg font-semibold mb-3">{fecha}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {eventosPorFecha[fecha].map((evento) => {
                
                const ocupados = evento.reservas?.[0]?.count || 0;
                const total = evento.cupo_total;

                let estado = "disponible";
                let color = "bg-gray-800";

                if (ocupados >= total) {
                  estado = "lleno";
                  color = "bg-red-900";
                } else if (ocupados >= total * 0.7) {
                  estado = "casi lleno";
                  color = "bg-yellow-800";
                }

                return (
                  <div
                    key={evento.id}
                    className={`border border-gray-700 rounded p-3 text-white ${color}`}
                  >
                    <div className="font-semibold">
                      {evento.slot} - {evento.cancha}
                    </div>

                    <div className="text-sm">
                      {ocupados} / {total}
                    </div>

                    <div className="text-sm">
                      ${evento.precio}
                    </div>

                    <div className="text-xs mt-1 uppercase">
                      {estado}
                    </div>

                    {evento.tipo === "privado" && (
                      <div className="text-xs text-purple-400 mt-1">
                        Privado
                      </div>
                    )}

                    {evento.tipo === "privado" && (
                      <div className="text-xs text-purple-600">
                        Código: {evento.codigo_privado}
                      </div>
                    )}

                    {evento.tipo === "publico" && ocupados < total && (
                      <ReserveButton evento={evento} />
                    )}

                    {ocupados >= total && (
                      <div className="text-xs text-red-400 mt-2">
                        Cupo lleno
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}