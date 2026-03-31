import React from "react";

function Row({ rowData, isChecked, onToggle, showHighlights, definition }) {
  const [charName, cellData] = rowData;

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

    return (
      <td 
        key={i} 
        className={`p-1 border border-slate-300 ${bgColor} transition-all duration-300 min-h-[50px] align-middle`}
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
      <td className="sticky left-0 z-10 p-3 pl-6 border border-slate-300 bg-inherit text-left shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] md:text-sm font-semibold text-slate-700">{charName}</span>
          <div className="has-tooltip relative flex items-center no-print">
            <span className="tooltip absolute left-full top-0 ml-4 leading-relaxed rounded-2xl shadow-2xl p-6 bg-slate-900 text-white text-xs font-medium w-[250px] md:w-[350px] z-50 border border-slate-700">
              <p className="text-[10px] font-black uppercase text-sky-400 mb-2 tracking-widest">Definition:</p>
              {definition || "Definition currently unavailable."}
            </span>
            <button className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-400 font-bold border border-slate-200">i</button>
          </div>
        </div>
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
