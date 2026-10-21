import { SPANISH_ENABLED } from "../config/features";
import React from "react";
import { useLocation } from "react-router-dom";

// Attribution for the Chilean adaptation team.
//
// Names and credentials as supplied by the group in their October 2026 review
// document. Keep them exactly as written — the abbreviations (Flgo./Flga.,
// Mg., Dra.) are their own.
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
              Sebastián Contreras Cubillos, Flgo. Mg.
            </span>
            {", "}
            <span className="font-semibold text-slate-800">
              Andrea Salazar Aguayo, Flga. Mg.
            </span>
            {", "}
            <span className="font-semibold text-slate-800">
              Patricia Oyarzún Díaz, Flga. Dra.
            </span>
            {" — Universidad Santo Tomás, Chile."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SpanishCredit;
