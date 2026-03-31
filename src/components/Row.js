import React from "react";

function Row({ rowData, isChecked, onToggle, showHighlights, definition }) {
  const [charName, cellData] = rowData;

  const cells = cellData.map((val, i) => {
    // val[0] is the type (-1, 1, 2)
    // val[1] is the symbol or text string ("X", "XX", "(uncommon)", etc.)
    
    // 1. SYMBOL LOGIC: Always visible if the Master Toggle is ON
    const displaySymbol = showHighlights ? val[1] : "";

    // 2. COLOR LOGIC: Only visible if Toggle is ON AND the checkbox is checked
    const shouldShowColor = showHighlights && isChecked;

    const bgColor = !shouldShowColor 
      ? "bg-white" 
      : val[0] === -1 ? "bg-red-300" : 
        val[0] === 1 ? "bg-yellow-200" : 
        val[0] === 2 ? "bg-green-300" : "bg-white";

    return (
      <td 
        key={i} 
        className={`p-2 border border-slate-300 ${bgColor} font-bold text-[10px] leading-tight text-slate-900 transition-all duration-300 min-h-[40px]`}
      >
        {displaySymbol}
      </td>
    );
  });

  return (
    <tr className={`${isChecked ? "bg-sky-50/50" : "bg-white"} hover:bg-slate-50 transition-colors group`}>
      {/* FEATURE NAME & TOOLTIP */}
      <td className="sticky left-0 z-10 p-3 pl-6 border border-slate-300 bg-inherit text-left shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] md:text-sm font-semibold text-slate-700">{charName}</span>
          
          <div className="has-tooltip relative flex items-center no-print">
            <span className="tooltip absolute left-full top-0 ml-4 leading-relaxed rounded-2xl shadow-2xl p-6 bg-slate-900 text-white text-xs font-medium w-[250px] md:w-[350px] z-50 border border-slate-700">
              <p className="text-[10px] font-black uppercase text-sky-400 mb-2 tracking-widest">Definition:</p>
              {definition || "Definition currently unavailable."}
            </span>
            <button className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-400 font-bold border border-slate-200 hover:bg-sky-100 hover:text-sky-600 hover:border-sky-200 transition-colors">
              i
            </button>
          </div>
        </div>
      </td>

      {/* CHECKBOX */}
      <td className="p-2 border border-slate-300 bg-inherit text-center">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5 accent-sky-600 rounded cursor-pointer transition-transform group-hover:scale-110"
        />
      </td>

      {/* DIAGNOSTIC CELLS */}
      {cells}
    </tr>
  );
}

export default Row;
