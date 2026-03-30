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
    Yellow: initialCount, 
    Green: initialCount, 
    Red: initialCount, 
    Total: initialCount,
  });

  const handleToggle = (charName, isNowChecked, cellValues) => {
    setCheckedItems(prev => ({ ...prev, [charName]: isNowChecked }));

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
        key={charName}
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
            className={isSlider ? "w-40 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "rounded w-14 border p-1 text-sm"}
            onChange={(e) => { if (isSlider) e.target.nextSibling.innerText = e.target.value; }}
          />
          {isSlider && <span className="font-mono text-xs w-6">50</span>}
        </div>
      );
      outOf = values["value"] === "percentage" ? "%" : (title === "Self-Rating" ? "/ 10" : "");
    } else if (values["type"] === "select") {
      inputVal = (
        <select className="rounded border p-1 text-sm" defaultValue="default">
          <option value="default" disabled>--Select--</option>
          {values["options"].map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return (
      <tr key={title}>
        <th className="px-4 py-2 border border-slate-700 w-40 bg-slate-50 text-center text-[10px] uppercase font-bold">{title}</th>
        <td className="p-2 border border-slate-700 text-center">
          <div className="flex justify-center items-center gap-2">{inputVal} <span className="text-[10px] text-slate-400 font-bold">{outOf}</span></div>
        </td>
      </tr>
    );
  });

  // Reusable header columns
  const firstRow = Object.keys(locations).map(item => (
    <th colSpan={locations[item].length} key={item} className="p-2 border border-slate-700 bg-slate-100 text-[10px] uppercase">{item}</th>
  ));
  const secondRow = Object.values(locations).flatMap(arr => arr).map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[9px] min-w-[3rem] uppercase">{val}</th>
  ));

  // Results cells
  const yellowCells = counts.Yellow.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px]">{item}</td>);
  const greenCells = counts.Green.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px]">{item}</td>);
  const redCells = counts.Red.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px]">{item}</td>);
  const totalCells = counts.Total.map((item, i) => <td key={i} className="p-1 border border-slate-700 text-[10px] font-black bg-slate-50">{item}</td>);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-white font-sans">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 62%; } .no-print { display: none !important; } }` }} />

      <div className="flex justify-between items-end mb-8 no-print border-b border-slate-100 pb-6">
        <div className="w-64">
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-sm font-bold" type="text" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-400 italic">Diagnostic Assessment Tool</p>
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="border border-slate-700 w-28 text-[10px] font-black uppercase tracking-tight">Groups</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-72 text-[10px] font-black uppercase tracking-tight">Characteristics</th>
              <th rowSpan={2} className="p-2 border border-slate-700 w-12 text-[10px] font-black uppercase">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4 mb-12 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-6 py-2 bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
          {hidden ? "Show All Rows" : "Hide Unchecked"}
        </button>
        <button onClick={() => window.print()} className="px-6 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Print PDF</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-1">
          <table className="table-fixed border border-slate-700 w-full border-collapse">
            <tbody>{customRows}</tbody>
          </table>
          <div className="mt-4 flex flex-wrap gap-2 no-print">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-200 border border-slate-400"></div><span className="text-[9px] font-bold text-slate-400">Common</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-300 border border-slate-400"></div><span className="text-[9px] font-bold text-slate-400">Distinguishing</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-300 border border-slate-400"></div><span className="text-[9px] font-bold text-slate-400">Unexpected</span></div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <textarea className="w-full border border-slate-200 rounded-xl p-4 text-sm min-h-[160px] outline-none focus:ring-2 focus:ring-sky-100" placeholder="Clinical Observations..."></textarea>
        </div>
      </div>

      <div className="mt-12 overflow-x-auto">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto mb-20">
          <thead>
            <tr className="bg-slate-50 text-[9px] font-black uppercase">
              <th className="p-2 border border-slate-700 w-40 text-left pl-4">Diagnostic Score</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td className="bg-yellow-50 p-1 border border-slate-700 text-[9px] font-bold text-left pl-4 italic">Common Feature Total</td>{yellowCells}</tr>
            <tr><td className="bg-green-50 p-1 border border-slate-700 text-[9px] font-bold text-left pl-4 italic">Highly Distinguishing Total</td>{greenCells}</tr>
            <tr><td className="bg-red-50 p-1 border border-slate-700 text-[9px] font-bold text-left pl-4 italic">Unexpected Feature Total</td>{redCells}</tr>
            <tr className="bg-slate-100 font-black"><td className="p-2 border border-slate-700 text-xs text-left pl-4 uppercase">Calculated Differential Score</td>{totalCells}</tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-20 pt-10 border-t border-slate-100 text-center pb-10">
        <p className="text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed uppercase font-bold tracking-widest">
          Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024). Colorado Motor Speech Framework. © 2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default Tool;
