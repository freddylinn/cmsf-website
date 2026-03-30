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
  
  // Single Source of Truth for all checkboxes
  const [checkedItems, setCheckedItems] = useState({});

  const headerKeys = Object.values(locations).flatMap(arr => arr);
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

      initialCount.forEach((_, i) => {
        const type = cellValues[i]?.[0];
        if (type === -1) { updated.Red[i] += multiplier; updated.Total[i] -= multiplier; }
        else if (type === 1) { updated.Yellow[i] += multiplier; updated.Total[i] += multiplier; }
        else if (type === 2) { updated.Green[i] += multiplier; updated.Total[i] += multiplier; }
      });
      return updated;
    });
  };

  const charRows = Object.keys(characteristics).flatMap((groupName) => {
    const groupItems = Object.entries(characteristics[groupName]);
    
    // Logic: Filter items here so Row.js doesn't have to guess
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);
    
    if (visibleItems.length === 0) return [];

    const hasFitiRow = groupName === "Articulation";
    const totalSpan = visibleItems.length + (hasFitiRow ? 1 : 0);

    const rows = visibleItems.map(([charName, data], vIndex) => (
      <Row
        key={charName} // Unique key prevents row shifting
        rowData={[charName, data]}
        group={groupName}
        isChecked={!!checkedItems[charName]} 
        isFirstInVisibleGroup={vIndex === 0} 
        visibleGroupSpan={totalSpan}
        onToggle={(val) => handleToggle(charName, val, data)}
        headerLength={initialCount.length}
      />
    ));

    if (hasFitiRow) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50 print:hidden">
          <td className="border border-slate-700 bg-slate-50"></td>
          <td colSpan={2} className="p-3 border border-slate-700 text-center">
            <Link to="/fiti" className="text-xs font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-wide">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment for detailed phonetic coverage
            </Link>
          </td>
          {initialCount.map((_, i) => <td key={i} className="border border-slate-700 bg-sky-50/20"></td>)}
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
            className={isSlider ? "w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "rounded w-16 border p-1 text-sm"}
            onChange={(e) => { if (isSlider) e.target.nextSibling.innerText = e.target.value; }}
          />
          {isSlider && <span className="font-mono text-sm w-8 text-slate-600">50</span>}
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
        <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-xs uppercase font-black text-slate-700 tracking-wider">{title}</th>
        <td className="p-3 border border-slate-700 text-center">
          <div className="flex justify-center items-center gap-2">{inputVal} <span className="text-xs text-slate-400 font-bold">{outOf}</span></div>
        </td>
      </tr>
    );
  });

  const firstRow = Object.keys(locations).map(item => (
    <th colSpan={locations[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black tracking-tight">{item}</th>
  ));
  const secondRow = headerKeys.map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-xs min-w-[3.5rem] uppercase font-bold text-slate-600">{val}</th>
  ));

  const yellowCells = counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-yellow-200">{item}</td>);
  const greenCells = counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-green-300">{item}</td>);
  const redCells = counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-bold bg-red-300">{item}</td>);
  const totalCells = counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 text-sm font-black bg-slate-50">{item}</td>);

  return (
    <div className="p-10 max-w-[1500px] mx-auto min-h-screen bg-white font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 60%; } .no-print { display: none !important; } table { table-layout: fixed !important; width: 100% !important; border-collapse: collapse; } }` }} />

      <div className="flex justify-between items-end mb-8 no-print border-b-2 border-slate-100 pb-8">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-500 uppercase mt-2 font-bold tracking-tighter">Diagnostic Assessment Tool</p>
        </div>
      </div>

      {/* VIVID KEY */}
      <div className="flex flex-wrap gap-8 justify-start mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 no-print shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-yellow-200"></div>
          <span className="text-xs font-black uppercase text-slate-800 tracking-tight">Common feature</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-green-300"></div>
          <span className="text-xs font-black uppercase text-slate-800 tracking-tight">Highly distinguishing feature</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-red-300"></div>
          <span className="text-xs font-black uppercase text-slate-800 tracking-tight">Unexpected feature</span>
        </div>
      </div>

      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-hidden">
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1">
          <table className="table-fixed border border-slate-700 w-full border-collapse rounded-xl overflow-hidden shadow-sm">
            <tbody>{customRows}</tbody>
          </table>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-slate-50 p-1 rounded-2xl border border-slate-200 shadow-sm h-full">
            <textarea className="w-full h-full bg-white border-none rounded-xl p-6 text-base outline-none focus:ring-2 focus:ring-sky-100 min-h-[220px]" placeholder="Clinical Observations & Differential Diagnosis Notes..."></textarea>
          </div>
        </div>
      </div>

      {/* SUMMARY SCORECARD */}
      <div className="mt-16 border border-slate-400 rounded-2xl overflow-hidden shadow-lg">
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={3} className="p-4 text-left pl-8 tracking-widest border border-slate-700">Diagnostic Summary Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={3} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Common Feature Count</td>{yellowCells}</tr>
            <tr><td colSpan={3} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Highly Distinguishing Total</td>{greenCells}</tr>
            <tr><td colSpan={3} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase text-slate-800">Unexpected Feature Total</td>{redCells}</tr>
            <tr className="bg-slate-100 font-black"><td colSpan={3} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase tracking-widest">Net Differential Score</td>{totalCells}</tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 no-print">
        <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em] mb-4">Colorado Motor Speech Framework</p>
        <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed italic font-bold">
          Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024). Colorado Motor Speech Framework. © 2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default Tool;
