import { supabase } from "@/lib/supabase";

export default async function EventosPage() {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .order("inicio", { ascending: true });

  if (error) {
    return <div>Error cargando eventos: {error.message}</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Eventos</h1>

      <div className="space-y-3">
        {data?.map((evento) => (
          <div key={evento.id} className="border rounded p-4">
            <div className="font-semibold">{evento.titulo}</div>
            <div>Inicio: {evento.inicio}</div>
            <div>Cupo: {evento.cupo_total}</div>
            <div>Precio: ${evento.precio}</div>
            <div>Estado: {evento.estado}</div>
          </div>
        ))}
      </div>
    </main>
  );
}