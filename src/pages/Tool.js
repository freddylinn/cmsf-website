import React, { useState } from "react";
import { Link } from "react-router-dom";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import customData from "../data/custom.json";
import Row from "../components/Row";

function Tool() {
  const [hidden, setHidden] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const headerKeys = Object.values(locData).flatMap(arr => arr);
  const initialCount = headerKeys.map(() => 0);
  
  const [counts, setCounts] = useState({
    Yellow: initialCount, Green: initialCount, Red: initialCount, Total: initialCount,
  });

  const handleToggle = (charName, isNowChecked, cellValues) => {
    setCheckedItems(prev => ({ ...prev, [charName]: isNowChecked }));
    const multiplier = isNowChecked ? 1 : -1;
    setCounts(prevCounts => {
      const updated = {
        Red: [...prevCounts.Red], Yellow: [...prevCounts.Yellow],
        Green: [...prevCounts.Green], Total: [...prevCounts.Total]
      };
      headerKeys.forEach((_, i) => {
        const type = cellValues[i]?.[0];
        if (type === -1) { updated.Red[i] += multiplier; updated.Total[i] -= multiplier; }
        else if (type === 1) { updated.Yellow[i] += multiplier; updated.Total[i] += multiplier; }
        else if (type === 2) { updated.Green[i] += multiplier; updated.Total[i] += multiplier; }
      });
      return updated;
    });
  };

  const charRows = Object.keys(charData).flatMap((groupName) => {
    const groupItems = Object.entries(charData[groupName]);
    
    // CRITICAL: Filter here so unchecked rows never even get to the Row component
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);
    
    if (visibleItems.length === 0) return [];

    const hasFitiRow = groupName === "Articulation";
    const totalSpan = visibleItems.length + (hasFitiRow ? 1 : 0);

    const rows = visibleItems.map(([charName, data], vIndex) => (
      <Row
        key={`${groupName}-${charName}`} // Combined key for better stability
        rowData={[charName, data]}
        group={groupName}
        isChecked={!!checkedItems[charName]} 
        isFirstInVisibleGroup={vIndex === 0} 
        visibleGroupSpan={totalSpan}
        onToggle={(val) => handleToggle(charName, val, data)}
        headerLength={headerKeys.length}
      />
    ));

    if (hasFitiRow) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50 print:hidden">
          <td colSpan={2} className="p-4 border border-slate-700 text-center align-middle bg-white">
            <Link to="/fiti" className="text-xs font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-wide">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment
            </Link>
          </td>
          {headerKeys.map((_, i) => <td key={i} className="border border-slate-700 bg-sky-50/20"></td>)}
        </tr>
      );
    }
    return rows;
  });

  const firstRow = Object.keys(locData).map(item => (
    <th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black tracking-tight">{item}</th>
  ));
  const secondRow = headerKeys.map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-xs min-w-[4.5rem] uppercase font-bold text-slate-700">{val}</th>
  ));

  const yellowCells = counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-yellow-200">{item}</td>);
  const greenCells = counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-green-300">{item}</td>);
  const redCells = counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-red-300">{item}</td>);
  const totalCells = counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-black bg-slate-50">{item}</td>);

  return (
    <div className="p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 60%; } .no-print { display: none !important; } table { table-layout: fixed !important; width: 100% !important; border-collapse: collapse; } }` }} />

      <div className="flex justify-between items-end mb-8 no-print border-b-2 border-slate-100 pb-8">
        <div className="w-80 text-left">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-500 uppercase mt-2 font-bold tracking-tighter">Diagnostic Assessment Tool</p>
        </div>
      </div>

      <div className="mb-10 shadow-lg rounded-xl border border-slate-300">
        <table className="table-fixed text-center border-collapse w-full">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="border border-slate-700 w-32 text-xs font-black uppercase text-slate-900">Groups</th>
              <th rowSpan={2} className="p-3 border border-slate-700 w-80 text-xs font-black uppercase text-slate-900">Characteristics</th>
              <th rowSpan={2} className="p-3 border border-slate-700 w-16 text-xs font-black uppercase text-slate-900">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      <div className="flex justify-center gap-6 mb-16 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all">
          {hidden ? "Show All Rows" : "Hide Unchecked Rows"}
        </button>
        <button onClick={() => window.print()} className="px-10 py-4 bg-slate-800 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">
          Generate PDF Report
        </button>
      </div>

      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="table-fixed text-center border-collapse w-full">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={3} className="p-4 text-left pl-8 tracking-widest border border-slate-700">Differential Diagnostic Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={3} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Common Feature Count</td>{yellowCells}</tr>
            <tr><td colSpan={3} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Highly Distinguishing Total</td>{greenCells}</tr>
            <tr><td colSpan={3} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Unexpected Feature Total</td>{redCells}</tr>
            <tr className="bg-slate-100 font-black"><td colSpan={3} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase tracking-widest">Net Differential score</td>{totalCells}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tool;
