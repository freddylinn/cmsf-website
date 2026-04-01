import React, { useState } from "react";
import charData from "../data/movement-characteristics.json";
import locData from "../data/locations.json";
import Row from "../components/Row";

function BodyMovement() {
  const [hidden, setHidden] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false); // New state for toggle
  const [checkedItems, setCheckedItems] = useState({});

  // Get diagnostic columns (Flaccid, Spastic, etc.)
  const headerKeys = Object.values(locData).flatMap((arr) => arr);
  const initialCount = headerKeys.map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

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
          showHighlights={showHighlights} // Passing toggle state to Row
        />
      );
    });

    return rows;
  });

  const RevealToggle = () => (
    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm no-print">
      <span className={`text-[10px] font-black uppercase tracking-widest ${!showHighlights ? 'text-slate-900' : 'text-slate-300'}`}>Blind Mode</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={showHighlights} onChange={() => setShowHighlights(!showHighlights)} />
        <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
      </label>
      <span className={`text-[10px] font-black uppercase tracking-widest ${showHighlights ? 'text-amber-600' : 'text-slate-300'}`}>Reveal Results</span>
    </div>
  );

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
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      {/* BRANDING */}
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-8">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-500 uppercase mt-2 font-bold tracking-widest">Body Movement Observations</p>
        </div>
      </div>

      {/* INSTRUCTION BOX & TOGGLE */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10 no-print">
        <div className="flex-grow p-6 bg-slate-50 rounded-3xl border border-slate-200 flex items-center gap-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wide leading-relaxed">
            Note: Body movement observations serve as confirmatory signs for a motor speech disorder. 
            Toggle Reveal Results to see diagnostic alignment.
          </p>
        </div>
        <RevealToggle />
      </div>

      {/* TABLE */}
      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-x-auto">
        <table className="table-fixed text-center border-collapse w-full min-w-[1000px]">
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

      {/* HIDE/SHOW BUTTON */}
      <div className="flex justify-center mb-16 no-print">
        <button
          onClick={() => setHidden(!hidden)}
          className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all"
        >
          {hidden ? "Show All Rows" : "Hide Unchecked Rows"}
        </button>
      </div>

      {/* SCORECARD */}
      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto no-print">
        <table className="table-fixed text-center border-collapse w-full min-w-[1000px]">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={2} className="p-4 text-left pl-8 tracking-widest border border-slate-700">Movement Summary Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Common Feature Total</td>
              {counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Highly Distinguishing Total</td>
              {counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Unexpected Feature Total</td>
              {counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}
            </tr>
            <tr className="bg-slate-100 font-black">
              <td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase tracking-widest">Movement Calculated Score</td>
              {counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50 text-sm">{item}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 no-print">
        <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed italic uppercase font-bold">
          © 2023-2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default BodyMovement;
