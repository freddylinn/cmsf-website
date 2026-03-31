import React, { useState } from "react";
import { Link } from "react-router-dom";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import taskData from "../data/tasks.json"; // Restored for subsystem tooltips
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

    const rows = [];

    // LEFT-ALIGNED HORIZONTAL HEADER WITH TASK TOOLTIP
    rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td colSpan={headerKeys.length + 2} className="p-2 pl-6 bg-slate-100/50 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              {groupName}
            </span>
            {/* Subsystem Task Information Pop-up */}
            <div className="has-tooltip relative flex items-center">
              <span className="tooltip absolute left-full top-0 ml-6 leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[600px] border border-slate-300 z-50 text-left whitespace-normal ring-1 ring-slate-200">
                <p className="mb-2 text-[10px] font-black uppercase text-sky-700 tracking-widest">Recommended Tasks:</p>
                {taskData[groupName].split("\n").map((item, key) => (
                  <p className="my-2 first:mt-0 font-medium" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-2 py-0.5 rounded bg-sky-100 text-[10px] text-sky-700 font-bold border border-sky-200">i</button>
            </div>
          </div>
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

    if (groupName === "Articulation") {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50 print:hidden">
          <td colSpan={headerKeys.length + 2} className="p-4 border border-slate-700 text-center align-middle bg-white">
            <Link to="/fiti" className="text-xs font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-wide">
              Perform Modular FITI Assessment
            </Link>
          </td>
        </tr>
      );
    }
    return rows;
  });

  const customRows = Object.entries(customData).map(([title, values]) => {
    const isSlider = title === "Naturalness" || title === "Efficiency";
    return (
      <tr key={title}>
        <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-xs uppercase font-black text-slate-900 tracking-wider">{title}</th>
        <td className="p-3 border border-slate-700 text-center">
          <div className="flex items-center justify-center gap-4">
            <input 
              type={isSlider ? "range" : (values.type === "number" ? "number" : "text")} 
              className={isSlider ? "w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "border p-2 rounded w-20 text-center font-bold text-slate-900"} 
              defaultValue={isSlider ? 50 : ""}
              onChange={(e) => { if (isSlider) e.target.nextSibling.innerText = e.target.value; }}
            />
            {isSlider && <span className="font-mono text-sm w-8 font-bold text-slate-600">50</span>}
            <span className="text-xs font-bold text-slate-400">{values.value === "percentage" ? "%" : (title === "Self-Rating" ? "/ 10" : "")}</span>
          </div>
        </td>
      </tr>
    );
  });

  const firstRow = Object.keys(locData).map(item => (
    <th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black tracking-tight">{item}</th>
  ));
  const secondRow = headerKeys.map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] min-w-[4.5rem] uppercase font-bold text-slate-700">{val}</th>
  ));

  return (
    <div className="p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `@media print { @page { size: portrait; margin: 0.5cm; } body { zoom: 60%; } .no-print { display: none !important; } table { table-layout: fixed !important; width: 100% !important; border-collapse: collapse; } }` }} />

      <div className="flex justify-between items-end mb-8 no-print border-b-2 border-slate-100 pb-8 text-left">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right"><p className="text-sm font-black text-slate-900 uppercase tracking-widest leading-none">Colorado Motor Speech Framework</p></div>
      </div>

      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-hidden">
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
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

      <div className="flex justify-center gap-6 mb-16 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all">{hidden ? "Show All Rows" : "Hide Unchecked Rows"}</button>
        <button onClick={() => window.print()} className="px-10 py-4 bg-slate-800 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">Generate PDF Report</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1"><table className="table-fixed border border-slate-700 w-full border-collapse rounded-xl overflow-hidden shadow-sm"><tbody>{customRows}</tbody></table></div>
        <div className="lg:col-span-2"><textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 text-base outline-none min-h-[220px]" placeholder="Clinical Observations..."></textarea></div>
      </div>

      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <table className="table-fixed text-center border-collapse w-full min-w-[1200px]">
          <thead><tr className="bg-slate-800 text-white text-xs font-black uppercase"><th colSpan={2} className="p-4 text-left pl-8 border border-slate-700 uppercase">Diagnostic Summary Scorecard</th>{secondRow}</tr></thead>
          <tbody>
            <tr><td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Common Feature Total</td>{counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}</tr>
            <tr><td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Highly Distinguishing Total</td>{counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}</tr>
            <tr><td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Unexpected Feature Total</td>{counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}</tr>
            <tr className="bg-slate-100 font-black"><td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase">Calculated Differential score</td>{counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50 text-sm">{item}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tool;
