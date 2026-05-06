"use client";

import { useState } from "react";
import AdminEventModal from "./AdminEventModal";

export default function AdminCalendarSlot({
  evento,
  dia,
  slot,
  horario,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-gray-800 p-2 border border-gray-700 cursor-pointer hover:bg-gray-700"
      >
        <div className="text-xs font-semibold">
          {slot} | {horario}
        </div>

        {evento ? (
          <div className="text-xs mt-1">
            {evento.tipo}
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            vacío
          </div>
        )}
      </div>

      {open && (
        <AdminEventModal
          evento={evento}
          dia={dia}
          slot={slot}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}