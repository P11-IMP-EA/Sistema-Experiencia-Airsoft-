"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function PrivateAccess() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const handleAccess = async () => {
    setError("");

    const { data } = await supabase
      .from("eventos")
      .select("*")
      .eq("codigo_privado", codigo)
      .single();

    if (!data) {
      setError("Código inválido");
      return;
    }

    window.location.href = `/eventos/${data.id}`;
  };

  return (
    <div className="border border-purple-500 p-4 rounded bg-gray-900 flex flex-col gap-2">
      <div className="font-semibold text-purple-400">
        Ingresar a partida privada
      </div>

      <input
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Código"
        className="p-2 bg-gray-800 border border-gray-700"
      />

      <button
        onClick={handleAccess}
        className="bg-purple-600 p-2"
      >
        Ingresar
      </button>

      {error && <div className="text-red-400 text-sm">{error}</div>}
    </div>
  );
}