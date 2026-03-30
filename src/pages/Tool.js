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
  
  // Track which rows are checked to handle rowSpan logic when hidden
  const [checkedItems, setCheckedItems] = useState({});

  const initialCount = Object.values(locations)
    .flatMap((arr) => arr)
    .map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

  const handleCheckChange = (name, isChecked) => {
    setCheckedItems(prev => ({ ...prev, [name]: isChecked }));
  };

  const firstRow = Object.keys(locations).map((item) => (
    <th colSpan={locations[item].length} key={item} className="p-4 border border-slate-700 bg-slate-50">
      {item}
    </th>
  ));

  const secondRow = Object.values(locations)
    .flatMap((arr) => arr)
    .map((value) => (
      <th key={value} className="p-4 border border-slate-700 bg-slate-50 min-w-[4rem]">
        {value}
      </th>
    ));

  // --- MAPPING LOGIC WITH CORRECT ROWSPAN ---
  const charRows = Object.keys(characteristics).flatMap((groupName) => {
    const groupItems = Object.entries(characteristics[groupName]);
    
    // 1. Identify which items in this group are actually visible
    const visibleItems = groupItems.filter(([charName]) => {
      if (!hidden) return true;
      return checkedItems[charName];
    });

    if (visibleItems.length === 0) return [];

    // 2. Determine if we need to add the FITI row for Articulation
    const hasFitiRow = groupName === "Articulation";
    const totalVisibleRowsInGroup = visibleItems.length + (hasFitiRow ? 1 : 0);

    // 3. Map to Row components
    const rows = visibleItems.map(([charName, charTip], vIndex) => (
      <Row
        key={charName}
        rowData={[charName, charTip]}
        group={groupName}
        // These new props tell the Row component how to handle the first cell
        isFirstInVisibleGroup={vIndex === 0} 
        visibleGroupSpan={totalVisibleRowsInGroup}
        onCheck={(isChecked) => handleCheckChange(charName, isChecked)}
        setCounts={setCounts}
        hidden={hidden}
        form="main"
      />
    ));

    // 4. Append FITI Link Row if in Articulation group
    if (hasFitiRow) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50/50 print:hidden">
          <td colSpan={2} className="p-3 border border-slate-700 text-center">
            <Link to="/fiti" className="text-[10px] font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-tight">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment
            </Link>
          </td>
          {initialCount.map((_, i) => (
            <td key={i} className="border border-slate-700 bg-slate-50/30"></td>
          ))}
        </tr>
      );
    }

    return rows;
  });

  // (Helper cells for footer remain the same)
  const yellowCells = counts["Yellow"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>);
  const greenCells = counts["Green"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>);
  const redCells = counts["Red"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>);
  const totalCells = counts["Total"].map((item, index) => <td key={index} className="p-2 border border-slate-700 font-bold">{item}</td>);

  return (
    <div className="p-4">
      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: portrait; margin: 0.5cm; }
          body { zoom: 58%; -webkit-print-color-adjust: exact; }
          .overflow-x-auto { overflow: visible !important; }
          table { table-layout: fixed !important; width: 100% !important; font-size: 14px; border-collapse: collapse; }
          tr { page-break-inside: avoid; }
        }
      `}} />

      {/* Privacy Note */}
      <div className="max-w-4xl mx-auto mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center gap-3 print:hidden">
        <p className="text-sm font-medium text-blue-800 italic">No input data are saved to protect patient privacy.</p>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="border border-slate-700 w-32 min-w-[7rem]">Groups</th>
              <th rowSpan={2} className="p-4 border border-slate-700 w-80 min-w-[18rem]">Characteristics</th>
              <th rowSpan={2} className="p-4 border border-slate-700 w-16 min-w-[4rem]">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center mt-8 mb-8 print:hidden">
        <button onClick={() => setHidden(!hidden)} className="rounded-lg px-6 py-3 bg-sky-500 text-white font-bold shadow-md">
          {hidden ? "Show All Rows" : "Hide Unchecked Rows"}
        </button>
        <button onClick={() => window.print()} className="rounded-lg px-6 py-3 bg-slate-700 text-white font-bold shadow-md">Print PDF</button>
      </div>

      {/* Summary Table */}
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mb-16">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 border border-slate-700 w-48 text-left pl-4">Metric</th>
            {secondRow}
          </tr>
          <tr><td className="bg-yellow-200 p-2 border border-slate-700 font-semibold text-left pl-4">Total Yellow Count</td>{yellowCells}</tr>
          <tr><td className="bg-green-300 p-2 border border-slate-700 font-semibold text-left pl-4">Total Green Count</td>{greenCells}</tr>
          <tr><td className="bg-red-300 p-2 border border-slate-700 font-semibold text-left pl-4">Total Red Count</td>{redCells}</tr>
          <tr className="bg-slate-100 font-bold"><td className="p-2 border border-slate-700 text-left pl-4">Net Diagnostic Score</td>{totalCells}</tr>
        </thead>
      </table>

      {/* Footer */}
      <footer className="bg-slate-50 p-10 mt-16 border-t border-slate-200 no-print text-center">
         <p className="text-slate-600 text-sm italic mb-4">
           Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024). Colorado Motor Speech Framework.
         </p>
         <p className="text-slate-400 text-xs uppercase tracking-widest">© 2026 Regents of the University of Colorado</p>
      </footer>
    </div>
  );
}

export default Tool;
