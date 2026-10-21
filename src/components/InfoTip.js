import React, { useState, useRef, useEffect } from "react";

// A small "i" button that reveals a note, used for the clinical-rating rows
// (self-rating, intelligibility, naturalness, efficiency).
//
// It mirrors the feature-definition popover in Row.js: hover on pointer
// devices, tap on touch devices, and dismissal by tapping elsewhere or
// pressing Escape — touch has no "move the pointer away" gesture, so an open
// popover needs an explicit way out. It lives in its own component because
// the rows that use it are produced by a .map, which cannot hold hook state.
function InfoTip({ text, label = "Definition:", missing = "", align = "left" }) {
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
    <span
      ref={ref}
      className={`${open ? "" : "has-tooltip"} relative inline-flex items-center no-print`}
    >
      <span
        className={`${open ? "" : "tooltip"} absolute ${
          align === "right" ? "right-0" : "left-0"
        } top-full mt-2 leading-relaxed rounded-2xl shadow-2xl p-6 bg-slate-900 text-white text-xs font-medium w-[250px] md:w-[350px] z-50 border border-slate-700 text-left normal-case tracking-normal break-words`}
      >
        <span className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[10px] font-black uppercase text-sky-400 tracking-widest">
            {label}
          </span>
          {open && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-lg bg-white/10 text-white text-base leading-none font-bold"
            >
              ×
            </button>
          )}
        </span>
        {text || missing}
      </span>
      <button
        type="button"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        className="px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-700 font-bold border border-slate-500 min-w-[28px] min-h-[28px]"
      >
        i
      </button>
    </span>
  );
}

export default InfoTip;
