import { SPANISH_ENABLED } from "../config/features";
import React from "react";
import { useLocation } from "react-router-dom";

// Attribution for the Chilean adaptation team.
//
// PLACEHOLDER — pending confirmation from the group on how they want to be
// credited. Once the full collaborator list is confirmed, replace the single
// entry in `team` below and delete the `pending` line.
function SpanishCredit() {
  const location = useLocation();
  if (!SPANISH_ENABLED) return null;
  const isES =
    location.pathname === "/es" || location.pathname.startsWith("/es/");
  if (!isES) return null;

  return (
    <div className="bg-slate-50 border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
          <p className="text-xs font-semibold text-slate-600 shrink-0">
            Adaptación al español de Chile:
          </p>
          <p className="text-xs text-slate-600">
            <span className="font-semibold text-slate-800">
              Sebastián Contreras Cubillos
            </span>
            , Fonoaudiólogo, Magíster en Gerontología Clínica — Profesor
            Asistente, Universidad Santo Tomás, Talca, y equipo.
          </p>
        </div>
        <p className="mt-1 text-xs italic text-slate-600">
          Listado completo de colaboradores pendiente de confirmación.
        </p>
      </div>
    </div>
  );
}

export default SpanishCredit;
