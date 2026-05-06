"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminEventModal({
  evento,
  dia,
  slot,
  onClose,
}: any) {
  const router = useRouter();

  const [tipo, setTipo] = useState(evento?.tipo || "publico");
  const [cupo, setCupo] = useState(evento?.cupo_total || 50);
  const [cancha, setCancha] = useState(evento?.cancha || "A");

  const handleSave = async () => {
    if (evento) {
      // UPDATE
      await supabase
        .from("eventos")
        .update({
          tipo,
          cupo_total: cupo,
          cancha,
        })
        .eq("id", evento.id);
    } else {
      // CREATE
      await supabase.from("eventos").insert([
        {
          fecha: dia,
          slot,
          tipo,
          cupo_total: cupo,
          cancha,
        },
      ]);
    }

    router.refresh();
    onClose();
  };

  const handleDelete = async () => {
    if (!evento) return;

    await supabase
      .from("eventos")
      .delete()
      .eq("id", evento.id);

    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded w-80 flex flex-col gap-3">
        <h2 className="font-bold">
          {evento ? "Editar evento" : "Crear evento"}
        </h2>

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="bg-gray-800 p-2"
        >
          <option value="publico">Público</option>
          <option value="privado">Privado</option>
        </select>

        <input
          type="number"
          value={cupo}
          onChange={(e) => setCupo(Number(e.target.value))}
          className="bg-gray-800 p-2"
        />

        <select
          value={cancha}
          onChange={(e) => setCancha(e.target.value)}
          className="bg-gray-800 p-2"
        >
          <option value="A">Cancha A</option>
          <option value="B">Cancha B</option>
          <option value="AyB">AyB</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-green-600 p-2"
        >
          Guardar
        </button>

        {evento && (
          <button
            onClick={handleDelete}
            className="bg-red-600 p-2"
          >
            Eliminar
          </button>
        )}

        <button
          onClick={onClose}
          className="bg-gray-700 p-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}