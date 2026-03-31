import React from "react";

function Row({ rowData, isChecked, onToggle, headerLength, showHighlights }) {
  const [charName, cellData] = rowData;

  const cells = cellData.map((val, i) => {
    // val[0] is the indicator type: -1 (Unexpected), 1 (Common), 2 (Highly Distinguishing)
    // val[1] is the text symbol: "-", "X", "XX"
    
    const bgColor = !showHighlights 
      ? "bg-white" 
      : val[0] === -1 
        ? "bg-red-300"   
        : val[0] === 1 
          ? "bg-yellow-200" 
          : val[0] === 2 
            ? "bg-green-300"  
            : "bg-white";

    const displaySymbol = !showHighlights ? "" : val[1];

    return (
      <td 
        key={i} 
        className={`p-2 border border-slate-300 ${bgColor} font-bold text-xs text-slate-900 transition-colors duration-300`}
      >
        {displaySymbol}
      </td>
    );
  });

  return (
    <tr className={`${isChecked ? "bg-sky-50/40" : "bg-white"} transition-colors hover:bg-slate-50 group`}>
      <td className="sticky left-0 z-10 p-3 pl-6 border border-slate-300 bg-inherit text-left text-[11px] md:text-sm font-semibold text-slate-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
        {charName}
      </td>
      <td className="p-2 border border-slate-300 bg-inherit">
        <div className="flex items-center justify-center">
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={(e) => onToggle(e.target.checked)}
            className="w-5 h-5 accent-sky-600 rounded border-slate-300 cursor-pointer transition-transform group-hover:scale-110"
          />
        </div>
      </td>
      {cells}
    </tr>
  );
}

export default Row;
