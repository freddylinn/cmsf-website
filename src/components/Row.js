import React from "react";

function Row({ rowData, isChecked, onToggle, showHighlights }) {
  const [charName, cellData] = rowData;

  const cells = cellData.map((val, i) => {
    // 1. Symbol Logic: Visible if the master toggle is ON (regardless of checkbox)
    const displaySymbol = showHighlights ? val[1] : "";

    // 2. Color Logic: ONLY visible if master toggle is ON AND the checkbox is checked
    const shouldShowColor = showHighlights && isChecked;

    const bgColor = !shouldShowColor 
      ? "bg-white" 
      : val[0] === -1 ? "bg-red-300" : 
        val[0] === 1 ? "bg-yellow-200" : 
        val[0] === 2 ? "bg-green-300" : "bg-white";

    return (
      <td 
        key={i} 
        className={`p-2 border border-slate-300 ${bgColor} font-bold text-xs text-slate-900 transition-all duration-300`}
      >
        {displaySymbol}
      </td>
    );
  });

  return (
    <tr className={`${isChecked ? "bg-sky-50/50" : "bg-white"} hover:bg-slate-50 transition-colors group`}>
      <td className="sticky left-0 z-10 p-3 pl-6 border border-slate-300 bg-inherit text-left text-[11px] md:text-sm font-semibold text-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        {charName}
      </td>
      <td className="p-2 border border-slate-300 bg-inherit text-center">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5 accent-sky-600 rounded cursor-pointer transition-transform group-hover:scale-110"
        />
      </td>
      {cells}
    </tr>
  );
}

export default Row;
