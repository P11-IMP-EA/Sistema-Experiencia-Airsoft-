"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EventForm() {
  const [tipo, setTipo] = useState("publico");
  const [titulo, setTitulo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const [cupo, setCupo] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [cancha, setCancha] = useState("A");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data: conflictos, error: errorConflictos } = await supabase
      .from("eventos")
      .select("*")
      .eq("cancha", cancha)
      .lt("inicio", fin)
      .gt("fin", inicio);

      if (errorConflictos) {
  alert("Error validando conflictos: " + errorConflictos.message);
  return;
}

    if (conflictos && conflictos.length > 0) {
        alert("Ya existe un evento en esa cancha en ese horario");
      return;
    }

    if (!inicio || !fin) {
      alert("Inicio y fin son obligatorios");
      return;
    }

    if (new Date(fin) <= new Date(inicio)) {
      alert("El fin debe ser posterior al inicio");
      return;
    }


    const { error } = await supabase.from("eventos").insert([
      {
        tipo,
        titulo,
        inicio,
        fin,
        cupo_total: cupo,
        precio,
        cancha,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Evento creado");
      window.location.reload(); // simple por ahora
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}
        className="border p-2 w-full"
        >
      <option value="publico">Público</option>
      <option value="privado">Privado</option>
      </select>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="datetime-local"
        value={inicio}
        onChange={(e) => setInicio(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="datetime-local"
        value={fin}
        onChange={(e) => setFin(e.target.value)}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Cupo"
        value={cupo}
        onChange={(e) => setCupo(Number(e.target.value))}
        className="border p-2 w-full"
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(Number(e.target.value))}
        className="border p-2 w-full"
      />

      <select value={cancha} onChange={(e) => setCancha(e.target.value)}>
      <option value="A">Cancha A</option>
      <option value="B">Cancha B</option>
      </select>

      <button type="submit" className="bg-black text-white px-4 py-2">
        Crear evento
      </button>
    </form>
  );
}