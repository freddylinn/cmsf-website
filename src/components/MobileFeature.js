import React, { useState, useRef, useEffect } from "react";

// A single feature as a full-width card, used below the `lg` breakpoint where
// the nine-column matrix cannot fit. Ticking, the definition, and the side
// picker all live here; the diagnostic pattern is shown separately by
// PatternGrid so that Step 1 stays free of cues.
function MobileFeature({
  charName,
  isChecked,
  onToggle,
  definition,
  definitionLabel,
  definitionMissing,
  lateralityOptions = null,
  lateralityValue = null,
  onLaterality = () => {},
  sideLabel = "Side:",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={`border-b border-slate-200 last:border-b-0 transition-colors ${
        isChecked ? "bg-sky-50" : "bg-white"
      }`}
    >
      {/* The whole row is the tap target for ticking; 56px clears the
          recommended minimum for touch. */}
      <div className="flex items-stretch">
        <label className="flex items-center gap-3 flex-1 min-h-[56px] px-4 py-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
            className="w-6 h-6 rounded-md border-2 border-slate-500 text-sky-600 shrink-0"
          />
          <span
            className={`text-sm leading-snug ${
              isChecked ? "font-bold text-slate-900" : "font-medium text-slate-700"
            }`}
          >
            {charName}
          </span>
        </label>

        <button
          type="button"
          aria-expanded={open}
          aria-label={definitionLabel}
          onClick={() => setOpen((o) => !o)}
          className="w-14 shrink-0 border-l border-slate-200 text-slate-700 font-bold text-sm"
        >
          i
        </button>
      </div>

      {open && (
        <div className="mx-4 mb-3 rounded-xl bg-slate-900 text-white p-4">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <span className="text-[10px] font-black uppercase text-sky-300 tracking-widest">
              {definitionLabel}
            </span>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-lg bg-white/10 text-white text-base leading-none font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-xs leading-relaxed">
            {definition || definitionMissing}
          </p>
        </div>
      )}

      {lateralityOptions && isChecked && (
        <div className="px-4 pb-3 -mt-1 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-600">
            {sideLabel}
          </span>
          {lateralityOptions.map((opt) => {
            const active = lateralityValue === opt;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={active}
                onClick={() => onLaterality(active ? null : opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-colors ${
                  active
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-white text-slate-600 border-slate-400"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MobileFeature;
