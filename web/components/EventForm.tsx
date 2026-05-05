"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SLOTS } from "@/lib/slots";

export default function EventForm() {
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [slot, setSlot] = useState("TM");
  const [cancha, setCancha] = useState("A");
  const [tipo, setTipo] = useState("publico");
  const [cupo, setCupo] = useState(10);
  const [precio, setPrecio] = useState(0);

  const generarCodigo = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!fecha) {
      alert("Seleccioná una fecha");
      return;
    }

    const slotData = SLOTS[slot];

    const inicio = `${fecha}T${slotData.inicio}`;
    const fin = `${fecha}T${slotData.fin}`;

    // 🔴 Buscar eventos en mismo día + slot
    const { data: conflictos, error: errorConflictos } = await supabase
      .from("eventos")
      .select("*")
      .eq("fecha", fecha)
      .eq("slot", slot);

    if (errorConflictos) {
      alert(errorConflictos.message);
      return;
    }

    // 🔴 Validación de cancha (incluye AyB)
    const hayConflicto = conflictos?.some((ev: any) => {
      if (cancha === "AyB") return true;
      if (ev.cancha === "AyB") return true;
      return ev.cancha === cancha;
    });

    if (hayConflicto) {
      alert("Conflicto de cancha en ese slot");
      return;
    }

    const codigo_privado =
      tipo === "privado" ? generarCodigo() : null;

    // 🔴 Insert
    const { error } = await supabase.from("eventos").insert([
      {
        titulo,
        fecha,
        slot,
        inicio,
        fin,
        cancha,
        tipo,
        codigo_privado,
        cupo_total: cupo,
        precio,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    if (tipo === "privado") {
      alert("Evento creado. Código: " + codigo_privado);
    } else {
      alert("Evento creado");
    }

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-3">

      <input
        className="border p-2 w-full"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={slot}
        onChange={(e) => setSlot(e.target.value)}
      >
        <option value="TM">TM</option>
        <option value="T1">T1</option>
        <option value="T2">T2</option>
        <option value="TN">TN</option>
      </select>

      <select
        className="border p-2 w-full"
        value={cancha}
        onChange={(e) => setCancha(e.target.value)}
      >
        <option value="A">Cancha A</option>
        <option value="B">Cancha B</option>
        <option value="AyB">Cancha A + B</option>
      </select>

      <select
        className="border p-2 w-full"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="publico">Público</option>
        <option value="privado">Privado</option>
      </select>

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Cupo total"
        value={cupo}
        onChange={(e) => setCupo(Number(e.target.value))}
      />

      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Crear evento
      </button>
    </form>
  );
}