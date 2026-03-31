import React from "react";

function Row({ rowData, isChecked, onToggle, showHighlights }) {
  const [charName, cellData] = rowData;

  const cells = cellData.map((val, i) => {
    // Only reveal results if BOTH master toggle is on and row is checked
    const shouldReveal = showHighlights && isChecked;

    const bgColor = !shouldReveal 
      ? "bg-white" 
      : val[0] === -1 ? "bg-red-300" : 
        val[0] === 1 ? "bg-yellow-200" : 
        val[0] === 2 ? "bg-green-300" : "bg-white";

    const symbol = !shouldReveal ? "" : val[1];

    return (
      <td key={i} className={`p-2 border border-slate-300 ${bgColor} font-bold text-xs transition-all duration-300`}>
        {symbol}
      </td>
    );
  });

  return (
    <tr className={`${isChecked ? "bg-sky-50/50" : "bg-white"} hover:bg-slate-50 transition-colors`}>
      <td className="sticky left-0 z-10 p-3 pl-6 border border-slate-300 bg-inherit text-left text-[11px] md:text-sm font-semibold text-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        {charName}
      </td>
      <td className="p-2 border border-slate-300 bg-inherit text-center">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5 accent-sky-600 rounded cursor-pointer"
        />
      </td>
      {cells}
    </tr>
  );
}

export default Row;
