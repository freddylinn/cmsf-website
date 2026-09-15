import React, { useState, useRef, useEffect } from "react";

function Row({ rowData, isChecked, onToggle, showHighlights, definition, definitionLabel = "Definition:", definitionMissing = "Definition currently unavailable.", hoveredCol = null, onHoverCol = () => {}, lateralityOptions = null, lateralityValue = null, onLaterality = () => {}, sideLabel = "Side:", sectionLabel = null, sectionAccent = null, sectionCount = 0, sectionInfo = null }) {
  const [charName, cellData] = rowData;
  // Touch devices have no hover, so the definition must also open on tap.
  const [defOpen, setDefOpen] = useState(false);
  const defRef = useRef(null);

  // On touch there is no "move the pointer away" gesture, so an open popover
  // has to be dismissable by tapping anywhere else or pressing Escape.
  useEffect(() => {
    if (!defOpen) return;
    const onDown = (e) => {
      if (defRef.current && !defRef.current.contains(e.target)) setDefOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setDefOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [defOpen]);

  const cells = cellData.map((val, i) => {
    // val[0] is the Type (-1, 1, 2)
    // val[1] is the Note String (e.g., "(uncommon)")
    
    const type = val[0];
    const note = val[1];

    // 1. DETERMINE THE MARKER (X, XX, or —)
    let marker = "";
    if (type === 1) marker = "x";
    if (type === 2) marker = "xx";
    if (type === -1) marker = "—";

    // 2. COLOR LOGIC
    const shouldShowColor = showHighlights && isChecked;
    const bgColor = !shouldShowColor 
      ? "bg-white" 
      : type === -1 ? "bg-red-300" : 
        type === 1 ? "bg-yellow-200" : 
        type === 2 ? "bg-green-300" : "bg-white";

    // A faint inset wash tints the column without hiding the diagnostic colour
    // underneath, so a hovered column reads as a continuous vertical band.
    const colWash = hoveredCol === i
      ? "shadow-[inset_0_0_0_9999px_rgba(14,165,233,0.10)]"
      : "";

    return (
      <td
        key={i}
        onMouseEnter={() => onHoverCol(i)}
        className={`p-1 border border-slate-300 ${bgColor} ${colWash} transition-all duration-300 min-h-[50px] align-middle`}
      >
        {showHighlights && (
          <div className="flex flex-col items-center justify-center leading-tight">
            {/* The primary indicator (X or XX) */}
            <span className="font-black text-[12px] text-slate-900 uppercase">
              {marker}
            </span>
            
            {/* The specific note (if it exists in your JSON) */}
            {note && (
              <span className="text-[9px] font-bold text-slate-700 mt-0.5 px-1 italic">
                {note}
              </span>
            )}
          </div>
        )}
      </td>
    );
  });

  return (
    <tr className={`${isChecked ? "bg-sky-50/50" : "bg-white"} hover:bg-slate-50 transition-colors group`}>
      {/* FEATURE NAME CELL */}
      <td
        className="sticky left-0 z-10 hover:z-50 p-3 pl-6 border border-slate-300 bg-inherit text-left shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"
        style={sectionAccent ? { borderLeft: `5px solid ${sectionAccent}` } : undefined}
      >
        {/* With unchecked rows hidden, the subsystem label moves into this cell
            rather than occupying a full-width row, so the vertical run of
            diagnostic markers to the right is never interrupted. */}
        {sectionLabel && (
          <div className="flex items-center gap-2 mb-1.5 -ml-1">
            <span
              className="text-[10px] font-black uppercase tracking-[0.15em]"
              style={{ color: sectionAccent || undefined }}
            >
              {sectionLabel}
            </span>
            {sectionCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[9px] font-black">
                {sectionCount}
              </span>
            )}
            {sectionInfo}
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] md:text-sm font-semibold text-slate-700">{charName}</span>
          <div ref={defRef} className={`${defOpen ? "" : "has-tooltip"} relative flex items-center no-print`}>
            <span className={`${defOpen ? "" : "tooltip"} absolute left-0 top-full mt-2 md:left-full md:top-0 md:ml-4 md:mt-0 leading-relaxed rounded-2xl shadow-2xl p-6 bg-slate-900 text-white text-xs font-medium w-[250px] md:w-[350px] z-50 border border-slate-700`}>
              <span className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-black uppercase text-sky-400 tracking-widest">{definitionLabel}</span>
                {defOpen && (
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setDefOpen(false)}
                    className="shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-lg bg-white/10 text-white text-base leading-none font-bold"
                  >×</button>
                )}
              </span>
              {definition || definitionMissing}
            </span>
            <button
              type="button"
              aria-expanded={defOpen}
              aria-label={definitionLabel}
              onClick={() => setDefOpen(o => !o)}
              className="px-2 py-1 rounded-md bg-slate-100 text-[11px] text-slate-700 font-bold border border-slate-500 min-w-[28px] min-h-[28px]">i</button>
          </div>
        </div>

        {lateralityOptions && isChecked && (
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
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
                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold border transition-colors ${
                    active
                      ? "bg-sky-600 text-white border-sky-600"
                      : "bg-white text-slate-600 border-slate-300 hover:border-sky-400 hover:text-sky-700"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </td>

      {/* CHECKBOX CELL */}
      <td className="p-2 border border-slate-300 bg-inherit text-center">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5 accent-sky-600 rounded cursor-pointer transition-transform group-hover:scale-110"
        />
      </td>

      {/* DIAGNOSTIC INDICATOR CELLS */}
      {cells}
    </tr>
  );
}

export default Row;
