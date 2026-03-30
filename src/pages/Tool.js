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
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[name]);
    
    if (visibleItems.length === 0) return [];

    const hasFitiRow = groupName === "Articulation";
    const totalSpan = visibleItems.length + (hasFitiRow ? 1 : 0);

    const rows = visibleItems.map(([charName, data], vIndex) => (
      <Row
        key={`${groupName}-${charName}`}
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
              Perform Modular FITI Assessment
            </Link>
          </td>
          {headerKeys.map((_, i) => <td key={i} className="border border-slate-700 bg-sky-50/20"></td>)}
        </tr>
      );
    }
    return rows;
  });

  // USE CUSTOMDATA: Fixes ESLint 'unused-vars' error
  const customRows = Object.entries(customData).map(([title, values]) => (
    <tr key={title}>
      <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-xs uppercase font-black text-slate-800 tracking-wider">{title}</th>
      <td className="p-3 border border-slate-700 text-center">
        <input type={values.type === "number" ? "number" : "text"} className="border p-1 rounded w-20 text-center" />
      </td>
    </tr>
  ));

  const firstRow = Object.keys(locData).map(item => (
    <th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black tracking-tight">{item}</th>
  ));
  const secondRow = headerKeys.map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] min-w-[4.5rem] uppercase font-bold text-slate-700">{val}</th>
  ));

  return (
    <div className="p-10 max-w-[1600px] mx-auto min-h-screen bg-white text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 60%; } .no-print { display: none !important; } table { table-layout: fixed !important; width: 100% !important; border-collapse: collapse; } }` }} />

      <div className="flex justify-between items-end mb-8 no-print border-b-2 border-slate-100 pb-8">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest text-left">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900 text-left" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 justify-start mb-6 p-5 bg-slate-50 rounded-2xl border border-slate-200 no-print shadow-sm">
        <div className="flex items-center gap-3"><div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-yellow-200"></div><span className="text-xs font-black uppercase text-slate-800">Common feature</span></div>
        <div className="flex items-center gap-3"><div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-green-300"></div><span className="text-xs font-black uppercase text-slate-800">Highly distinguishing feature</span></div>
        <div className="flex items-center gap-3"><div className="w-5 h-5 rounded shadow-sm border border-slate-600 bg-red-300"></div><span className="text-xs font-black uppercase text-slate-800">Unexpected feature</span></div>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1">
          <table className="table-fixed border border-slate-700 w-full border-collapse rounded-xl overflow-hidden shadow-sm">
            <tbody>{customRows}</tbody>
          </table>
        </div>
        <div className="lg:col-span-2">
           <textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 text-base outline-none min-h-[220px]" placeholder="Clinical Observations..."></textarea>
        </div>
      </div>

      {/* USE COUNTS: Fixes ESLint 'unused-vars' error */}
      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="table-fixed text-center border-collapse w-full">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={3} className="p-4 text-left pl-8 border border-slate-700">Diagnostic Summary Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={3} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Common Feature Count</td>{counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}</tr>
            <tr><td colSpan={3} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Highly Distinguishing Total</td>{counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}</tr>
            <tr><td colSpan={3} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Unexpected Feature Total</td>{counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tool;
