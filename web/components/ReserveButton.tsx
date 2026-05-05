"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReserveButton({ evento }: any) {
  const router = useRouter();
  const [modoAlquiler, setModoAlquiler] = useState(false);
  const [kit, setKit] = useState<"basico" | "avanzado" | null>(null);

  const handleReserve = async (
    tipo: "BYOP" | "ALQUILER",
    kit?: string,
    precioFinal?: number
  ) => {
    const user_id = crypto.randomUUID();

    // 🔒 CONTROL CUPO EVENTO
    const { data: reservas } = await supabase
      .from("reservas")
      .select("*")
      .eq("evento_id", evento.id);

    if ((reservas?.length || 0) >= evento.cupo_total) {
      alert("Cupo lleno");
      return;
    }

   // 🔒 CONTROL INVENTARIO (DEBUG HARDCORE)
if (tipo === "ALQUILER") {
  if (!kit) {
    alert("Seleccioná un kit");
    return;
  }

  const normalizedKit = kit.toLowerCase().trim();

  const { data: inventario, error: invError } = await supabase
    .from("inventario")
    .select("*")
    .eq("tipo", normalizedKit);

  const { data: reservasKit, error: resError } = await supabase
    .from("reservas")
    .select("*")
    .eq("evento_id", evento.id);

  const reservasFiltradas = reservasKit?.filter(
    (r) => r.kit === normalizedKit
  ) || [];

  console.log("KIT:", normalizedKit);
  console.log("INVENTARIO RAW:", inventario);
  console.log("RESERVAS RAW:", reservasKit);
  console.log("RESERVAS FILTRADAS:", reservasFiltradas);

  const stock = inventario?.[0]?.cantidad_total || 0;
  const ocupadosKit = reservasFiltradas.length;

  console.log("STOCK:", stock);
  console.log("OCUPADOS:", ocupadosKit);

  if (ocupadosKit >= stock) {
    alert("No hay más kits disponibles");
    return;
  }
}

    // 📝 INSERT
   const { error } = await supabase.rpc("reservar_con_control", {
        p_evento_id: evento.id,
        p_user_id: user_id,
        p_tipo: tipo,
        p_kit: kit || null,
        p_precio: precioFinal || evento.precio,
      });

    if (error) {
      alert(error.message);
    } else {
      alert("Reserva confirmada");
      setModoAlquiler(false);
      setKit(null);
      router.refresh();
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-2">
      {/* BYOP */}
      <button
        onClick={() => handleReserve("BYOP")}
        className="bg-green-600 px-2 py-1 rounded text-sm"
      >
        BYOP
      </button>

      {/* ALQUILER */}
      <button
        onClick={() => setModoAlquiler(true)}
        className="bg-blue-600 px-2 py-1 rounded text-sm"
      >
        Alquiler
      </button>

      {/* SELECCIÓN DE KIT */}
      {modoAlquiler && (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setKit("basico")}
            className="bg-gray-700 p-1 text-sm"
          >
            Kit básico (+5000)
          </button>

          <button
            onClick={() => setKit("avanzado")}
            className="bg-gray-700 p-1 text-sm"
          >
            Kit avanzado (+8000)
          </button>
        </div>
      )}

      {/* PRECIO + CONFIRMAR */}
      {kit && (
        <>
          <div className="text-sm">
            Total: $
            {evento.precio + (kit === "basico" ? 5000 : 8000)}
          </div>

          <button
            onClick={() =>
              handleReserve(
                "ALQUILER",
                kit,
                evento.precio + (kit === "basico" ? 5000 : 8000)
              )
            }
            className="bg-blue-500 p-1 text-sm"
          >
            Confirmar alquiler
          </button>
        </>
      )}
    </div>
  );
}

