import React, { useState } from "react";
import { Link } from "react-router-dom";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import customData from "../data/custom.json";
import Row from "../components/Row";

function Tool() {
  const characteristics = charData;
  const locations = locData;
  const customInputs = customData;
  const [hidden, setHidden] = useState(false);
  
  // SINGLE SOURCE OF TRUTH: Track all checked items at the parent level
  const [checkedItems, setCheckedItems] = useState({});

  const initialCount = Object.values(locations).flatMap(arr => arr).map(() => 0);
  const [counts, setCounts] = useState({
    Yellow: initialCount, Green: initialCount, Red: initialCount, Total: initialCount,
  });

  const handleToggle = (charName, isNowChecked, cellValues) => {
    // Update check status
    setCheckedItems(prev => ({ ...prev, [charName]: isNowChecked }));

    // Update diagnostic counts
    const multiplier = isNowChecked ? 1 : -1;
    setCounts(prevCounts => {
      const updated = {
        Red: [...prevCounts.Red],
        Yellow: [...prevCounts.Yellow],
        Green: [...prevCounts.Green],
        Total: [...prevCounts.Total]
      };

      cellValues.forEach((item, i) => {
        const type = item[0];
        if (type === -1) { updated.Red[i] += multiplier; updated.Total[i] -= multiplier; }
        else if (type === 1) { updated.Yellow[i] += multiplier; updated.Total[i] += multiplier; }
        else if (type === 2) { updated.Green[i] += multiplier; updated.Total[i] += multiplier; }
      });
      return updated;
    });
  };

  const charRows = Object.keys(characteristics).flatMap((groupName) => {
    const groupItems = Object.entries(characteristics[groupName]);
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);

    if (visibleItems.length === 0) return [];

    const hasFitiRow = groupName === "Articulation";
    const totalSpan = visibleItems.length + (hasFitiRow ? 1 : 0);

    const rows = visibleItems.map(([charName, data], vIndex) => (
      <Row
        key={charName} // Unique key ensures proper re-rendering
        rowData={[charName, data]}
        group={groupName}
        isChecked={!!checkedItems[charName]}
        isFirstInVisibleGroup={vIndex === 0} 
        visibleGroupSpan={totalSpan}
        onToggle={(val) => handleToggle(charName, val, data)}
        hidden={hidden}
      />
    ));

    if (hasFitiRow) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50/50 print:hidden">
          <td colSpan={2} className="p-2 border border-slate-700 text-center">
            <Link to="/fiti" className="text-[10px] font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment
            </Link>
          </td>
          {initialCount.map((_, i) => <td key={i} className="border border-slate-700 bg-slate-50/30"></td>)}
        </tr>
      );
    }
    return rows;
  });

  // Reusable header columns
  const firstRow = Object.keys(locations).map(item => (
    <th colSpan={locations[item].length} key={item} className="p-2 border border-slate-700 bg-slate-50 text-[10px] uppercase">{item}</th>
  ));
  const secondRow = Object.values(locations).flatMap(arr => arr).map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-50 text-[10px] min-w-[3.5rem]">{val}</th>
  ));

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-white">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 65%; } .no-print { display: none !important; } }` }} />

      <div className="overflow-x-auto mb-10">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="border border-slate-700 w-28 text-[10px] font-black uppercase">Groups</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-72 text-[10px] font-black uppercase">Characteristics</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-12 text-[10px] font-black uppercase">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mb-12 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-6 py-2 bg-sky-500 text-white text-xs font-black uppercase rounded-full shadow-lg">
          {hidden ? "Show All Rows" : "Hide Unchecked"}
        </button>
        <button onClick={() => window.print()} className="px-6 py-2 bg-slate-800 text-white text-xs font-black uppercase rounded-full shadow-lg">Print PDF</button>
      </div>
      
      {/* (Summary tables and Footer omitted for brevity, but keep them in your file) */}
    </div>
  );
}

export default Tool;
