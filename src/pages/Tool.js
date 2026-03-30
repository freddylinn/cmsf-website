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
  
  // SINGLE SOURCE OF TRUTH: Parent tracks all checked items to prevent ghost rows
  const [checkedItems, setCheckedItems] = useState({});

  const initialCount = Object.values(locations).flatMap(arr => arr).map(() => 0);
  const [counts, setCounts] = useState({
    Yellow: initialCount, 
    Green: initialCount, 
    Red: initialCount, 
    Total: initialCount,
  });

  const handleToggle = (charName, isNowChecked, cellValues) => {
    // 1. Update the check status for filtering
    setCheckedItems(prev => ({ ...prev, [charName]: isNowChecked }));

    // 2. Update the diagnostic counts
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

  const charRows = Object.keys(characteristics).flatMap((groupName) => {
    const groupItems = Object.entries(characteristics[groupName]);
    
    // Filter rows based on "Hide Unchecked" toggle
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);
    if (visibleItems.length === 0) return [];

    const hasFitiRow = groupName === "Articulation";
    const totalSpan = visibleItems.length + (hasFitiRow ? 1 : 0);

    const rows = visibleItems.map(([charName, data], vIndex) => (
      <Row
        key={charName} // Unique key is critical for React list stability
        rowData={[charName, data]}
        group={groupName}
        isChecked={!!checkedItems[charName]} 
        isFirstInVisibleGroup={vIndex === 0} 
        visibleGroupSpan={totalSpan}
        onToggle={(val) => handleToggle(charName, val, data)}
      />
    ));

    if (hasFitiRow) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50 print:hidden">
          {/* Vertical alignment cell for the group column */}
          <td className="border border-slate-700 bg-slate-50"></td>
          <td colSpan={2} className="p-2 border border-slate-700 text-center">
            <Link to="/fiti" className="text-[10px] font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-tight">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment
            </Link>
          </td>
          {initialCount.map((_, i) => <td key={i} className="border border-slate-700 bg-sky-50/30"></td>)}
        </tr>
      );
    }
    return rows;
  });

  const customRows = Object.entries(customInputs).map(([title, values]) => {
    let inputVal = <></>;
    let outOf = "";
    if (values["type"] === "number") {
      const isSlider = title === "Naturalness" || title === "Efficiency";
      inputVal = (
        <div className="flex items-center gap-3">
          <input
            type={isSlider ? "range" : "number"}
            min={0} max={values["max"]} defaultValue={isSlider ? 50 : 0}
            className={isSlider ? "w-40 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "rounded w-16 border p-1 text-sm"}
            onChange={(e) => { if (isSlider) e.target.nextSibling.innerText = e.target.value; }}
          />
          {isSlider && <span className="font-mono text-xs w-6 text-slate-600">50</span>}
        </div>
      );
      outOf = values["value"] === "percentage" ? "%" : (title === "Self-Rating" ? "/ 10" : "");
    } else if (values["type"] === "select") {
      inputVal = (
        <select className="rounded border p-1 text-sm bg-white" defaultValue="default">
          <option value="default" disabled>--Select--</option>
          {values["options"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return (
      <tr key={title}>
        <th className="px-4 py-3 border border-slate-700 w-48 bg-slate-50 text-center text-[10px] uppercase font-black text-slate-600">{title}</th>
        <td className="p-2 border border-slate-700 text-center text-sm">
          <div className="flex justify-center items-center gap-2">{inputVal} <span className="text-[10px] text-slate-400 font-bold">{outOf}</span></div>
        </td>
      </tr>
    );
  });

  const firstRow = Object.keys(locations).map(item => (
    <th colSpan={locations[item].length} key={item} className="p-2 border border-slate-700 bg-slate-100 text-[10px] uppercase font-black">{item}</th>
  ));
  const secondRow = Object.values(locations).flatMap(arr => arr).map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[9px] min-w-[3.2rem] uppercase font-bold">{val}</th>
  ));

  const yellowCells = counts.Yellow.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px] font-bold">{item}</td>);
  const greenCells = counts.Green.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px] font-bold">{item}</td>);
  const redCells = counts.Red.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px] font-bold">{item}</td>);
  const totalCells = counts.Total.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px] font-black bg-white">{item}</td>);

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen bg-white font-sans text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 62%; } .no-print { display: none !important; } table { table-layout: fixed !important; width: 100% !important; border-collapse: collapse; } }` }} />

      <div className="flex justify-between items-end mb-6 no-print border-b-2 border-slate-100 pb-6">
        <div className="w-72">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-base font-bold transition-colors" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p>
          <p className="text-[10px] text-slate-400 uppercase mt-1 font-bold">Diagnostic Assessment Tool</p>
        </div>
      </div>

      {/* VIVID KEY POSITIONED OVER THE TABLE */}
      <div className="flex flex-wrap gap-6 justify-start mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200 no-print">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded shadow-sm border border-slate-600 bg-yellow-200"></div>
          <span className="text-[11px] font-black uppercase text-slate-600">Common feature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded shadow-sm border border-slate-600 bg-green-300"></div>
          <span className="text-[11px] font-black uppercase text-slate-600">Highly distinguishing feature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded shadow-sm border border-slate-600 bg-red-300"></div>
          <span className="text-[11px] font-black uppercase text-slate-600">Unexpected feature</span>
        </div>
      </div>

      <div className="mb-8 shadow-sm rounded-lg border border-slate-300 bg-white">
        {/* We use standard width here; horizontal scroll is handled by the page if needed */}
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="border border-slate-700 w-28 text-[11px] font-black uppercase text-slate-700">Groups</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-72 text-[11px] font-black uppercase text-slate-700">Characteristics</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-12 text-[11px] font-black uppercase text-slate-700">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mb-12 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-8 py-3 bg-sky-500 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-sky-600 active:scale-95 transition-all">
          {hidden ? "Show All Rows" : "Hide Unchecked"}
        </button>
        <button onClick={() => window.print()} className="px-8 py-3 bg-slate-800 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-slate-900 active:scale-95 transition-all">
          Print PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <table className="table-fixed border border-slate-700 w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <tbody>{customRows}</tbody>
          </table>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-slate-50 p-1 rounded-xl border border-slate-200 shadow-sm h-full">
            <textarea className="w-full h-full bg-white border-none rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-sky-100 min-h-[180px]" placeholder="Clinical Observations & Differential Diagnosis Notes..."></textarea>
          </div>
        </div>
      </div>

      {/* VIVID SUMMARY SCORECARD */}
      <div className="mt-12 overflow-x-auto border border-slate-300 rounded-xl overflow-hidden shadow-md">
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
          <thead>
            <tr className="bg-slate-800 text-white text-[10px] font-black uppercase">
              <th className="p-3 w-52 text-left pl-6 tracking-widest border border-slate-700">Diagnostic Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td className="bg-yellow-200 p-2 border border-slate-700 text-[10px] font-black text-left pl-6 uppercase text-slate-700">Common Feature Count</td>{yellowCells}</tr>
            <tr><td className="bg-green-300 p-2 border border-slate-700 text-[10px] font-black text-left pl-6 uppercase text-slate-700">Distinguishing Feature Count</td>{greenCells}</tr>
            <tr><td className="bg-red-300 p-2 border border-slate-700 text-[10px] font-black text-left pl-6 uppercase text-slate-700">Unexpected Feature Count</td>{redCells}</tr>
            <tr className="bg-slate-100 font-black"><td className="p-3 border border-slate-700 text-xs text-left pl-6 uppercase tracking-wider">Net Differential Diagnostic Score</td>{totalCells}</tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-20 pt-10 border-t border-slate-100 text-center pb-12 no-print">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">Colorado Motor Speech Framework</p>
        <p className="text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed italic">
          Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024). Colorado Motor Speech Framework. © 2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default Tool;
