import React, { useState } from "react";
import charData from "../data/movement-characteristics.json";
import locData from "../data/locations.json";
import Row from "../components/Row";

function BodyMovement() {
  const [hidden, setHidden] = useState(false);
  
  // SINGLE SOURCE OF TRUTH: Parent tracks all checked items
  const [checkedItems, setCheckedItems] = useState({});

  // Flatten locations to get the diagnostic column keys (Flaccid, Spastic, etc.)
  const headerKeys = Object.values(locData).flatMap((arr) => arr);
  const initialCount = headerKeys.map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

  // HANDLER: Updates both the visual check status and the math totals
  const handleToggle = (charName, isNowChecked, cellValues) => {
    setCheckedItems((prev) => ({ ...prev, [charName]: isNowChecked }));

    const multiplier = isNowChecked ? 1 : -1;
    setCounts((prevCounts) => {
      const updated = {
        Red: [...prevCounts.Red],
        Yellow: [...prevCounts.Yellow],
        Green: [...prevCounts.Green],
        Total: [...prevCounts.Total],
      };

      headerKeys.forEach((_, i) => {
        const type = cellValues[i]?.[0];
        if (type === -1) {
          updated.Red[i] += multiplier;
          updated.Total[i] -= multiplier;
        } else if (type === 1) {
          updated.Yellow[i] += multiplier;
          updated.Total[i] += multiplier;
        } else if (type === 2) {
          updated.Green[i] += multiplier;
          updated.Total[i] += multiplier;
        }
      });
      return updated;
    });
  };

  const charRows = Object.keys(charData).flatMap((groupName) => {
    const groupItems = Object.entries(charData[groupName]);
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);

    if (visibleItems.length === 0) return [];

    const rows = [];

    // Horizontal Section Header (Aesthetic choice to prevent "tall row" bug)
    rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td
          colSpan={headerKeys.length + 2}
          className="p-2 pl-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-slate-50/50 text-left"
        >
          {groupName}
        </td>
      </tr>
    );

    visibleItems.forEach(([charName, data]) => {
      rows.push(
        <Row
          key={`${groupName}-${charName}`}
          rowData={[charName, data]}
          isChecked={!!checkedItems[charName]}
          onToggle={(val) => handleToggle(charName, val, data)}
          headerLength={headerKeys.length}
        />
      );
    });

    return rows;
  });

  const firstRow = Object.keys(locData).map((item) => (
    <th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black">
      {item}
    </th>
  ));

  const secondRow = headerKeys.map((val) => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] min-w-[4.5rem] uppercase font-bold text-slate-700">
      {val}
    </th>
  ));

  return (
    <div className="p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-8 text-left">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name (optional)</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-500 uppercase mt-2 font-bold tracking-tighter">Body Movement Observations</p>
        </div>
      </div>

      <p className="max-w-3xl mx-auto p-6 mb-12 bg-slate-50 rounded-xl border border-slate-200 text-sm leading-relaxed text-slate-600 italic text-center">
        Note: Motor speech diagnosis should be made primarily based on speech and oral-motor findings. Body movement observations serve as confirmatory signs.
      </p>

      {/* Main Assessment Table */}
      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-hidden">
        <table className="table-fixed text-center border-collapse w-full">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="p-3 border border-slate-700 w-80 text-xs font-black uppercase text-slate-900 text-left pl-6">Characteristics</th>
              <th rowSpan={2} className="p-3 border border-slate-700 w-16 text-xs font-black uppercase text-slate-900">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mb-16 no-print">
        <button
          onClick={() => setHidden(!hidden)}
          className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all"
        >
          {hidden ? "Show All Rows" : "Hide Unchecked Rows"}
        </button>
      </div>

      {/* Clinical Notes */}
      <div className="flex w-full flex-col items-start mb-20">
        <h2 className="text-sm font-black uppercase text-slate-400 mb-4 tracking-widest">Additional patient observations</h2>
        <textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 text-base outline-none min-h-[150px] focus:ring-2 focus:ring-sky-100" placeholder="Enter notes..." />
      </div>

      {/* Scorecard Table */}
      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="table-fixed text-center border-collapse w-full">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={2} className="p-4 text-left pl-8 tracking-widest border border-slate-700">Diagnostic Summary Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-900">Common Feature Total</td>
              {counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-900">Highly Distinguishing Total</td>
              {counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-900">Unexpected Feature Total</td>
              {counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}
            </tr>
            <tr className="bg-slate-100 font-black">
              <td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase tracking-widest">Calculated Score</td>
              {counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50 text-sm">{item}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 no-print">
        <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em] mb-4">Colorado Motor Speech Framework</p>
        <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed italic uppercase font-bold text-center">
          Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024). © 2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default Movement;
