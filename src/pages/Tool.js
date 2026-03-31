import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import taskData from "../data/tasks.json";
import customData from "../data/custom.json";
import charTasksData from "../data/char-tasks.json"; 
import Row from "../components/Row";

function Tool() {
  const [hidden, setHidden] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false); 
  const [checkedItems, setCheckedItems] = useState({});
  const [customValues, setCustomValues] = useState({
    "Self-Rating": "", "Intelligibility": "", "Naturalness": "50", "Efficiency": "50"
  });

  const headerKeys = Object.values(locData).flatMap(arr => arr);
  const initialCount = headerKeys.map(() => 0);
  const [counts, setCounts] = useState({ Yellow: initialCount, Green: initialCount, Red: initialCount, Total: initialCount });

  const handleToggle = (charName, isNowChecked, cellValues) => {
    setCheckedItems(prev => ({ ...prev, [charName]: isNowChecked }));
    const multiplier = isNowChecked ? 1 : -1;
    setCounts(prevCounts => {
      const updated = { Red: [...prevCounts.Red], Yellow: [...prevCounts.Yellow], Green: [...prevCounts.Green], Total: [...prevCounts.Total] };
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
    rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td colSpan={headerKeys.length + 2} className="p-2 pl-6 bg-slate-100/50 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-black capitalize tracking-normal text-slate-500">{groupName.toLowerCase()}</span>
            <div className="has-tooltip relative flex items-center">
              <span className="tooltip absolute left-full top-0 ml-6 leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[300px] md:w-[600px] border border-slate-300 z-50 text-left whitespace-normal ring-1 ring-slate-200">
                <p className="mb-2 text-[10px] font-black uppercase text-sky-700 tracking-widest">Recommended Tasks:</p>
                {/* SAFETY NET: Added (taskData[groupName] || "") to prevent the 'split' crash */}
                {(taskData[groupName] || "No tasks found for this section.").split("\n").map((item, key) => (<p className="my-2 first:mt-0 font-medium" key={key}>{item}</p>))}
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
          showHighlights={showHighlights}
          definition={charTasksData[charName]}
        />
      );
    });
    return rows;
  });

  const customRows = Object.entries(customData).map(([title]) => (
    <tr key={title}>
      <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-xs uppercase font-black text-slate-900 tracking-wider">{title}</th>
      <td className="p-3 border border-slate-700 text-center">
        <input 
          type={title === "Naturalness" || title === "Efficiency" ? "range" : "text"} 
          className="border p-2 rounded w-full font-bold text-slate-900" 
          value={customValues[title] || ""}
          onChange={(e) => setCustomValues(prev => ({ ...prev, [title]: e.target.value }))}
        />
      </td>
    </tr>
  ));

  const generateSmartPhrase = () => {
    const checked = Object.keys(checkedItems).filter(k => checkedItems[k]);
    return `Evaluation: CMSF\nObservations:\n` + (checked.length > 0 ? checked.join('\n') : "None.");
  };

  const firstRow = Object.keys(locData).map(item => (<th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black">{item}</th>));
  const secondRow = headerKeys.map(val => (<th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] uppercase font-bold text-slate-700">{val}</th>));

  return (
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-slate-100 pb-8 gap-6">
        <div className="text-left md:text-right"><p className="text-lg md:text-xl font-bold">Colorado <span className="font-normal text-slate-400">Motor Speech Framework</span></p></div>
      </div>
      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-x-auto">
        <table className="table-fixed text-center border-collapse w-full min-w-[1000px]">
          <thead><tr className="bg-slate-100"><th rowSpan={2} className="sticky left-0 z-20 p-3 border border-slate-700 bg-slate-100 w-64 md:w-80 text-xs font-black uppercase text-left pl-6">Characteristics</th><th rowSpan={2} className="p-3 border border-slate-700 w-16 text-xs font-black uppercase">Y/N</th>{firstRow}</tr><tr>{secondRow}</tr></thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1"><table className="border border-slate-700 w-full rounded-xl overflow-hidden"><tbody>{customRows}</tbody></table></div>
        <div className="lg:col-span-2"><textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 min-h-[220px]" placeholder="Observations..."></textarea></div>
      </div>
    </div>
  );
}

export default Tool;
