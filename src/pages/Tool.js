import React, { useState } from "react";
import { Link } from "react-router-dom";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import taskData from "../data/tasks.json";
import customData from "../data/custom.json";
import defData from "../data/char-tasks.json"; // UPDATE 1: Import definitions
import Row from "../components/Row";

function Tool() {
  const [hidden, setHidden] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false); 
  const [checkedItems, setCheckedItems] = useState({});
  
  const [customValues, setCustomValues] = useState({
    "Self-Rating": "",
    "Intelligibility": "",
    "Naturalness": "50",
    "Efficiency": "50"
  });

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
    rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td colSpan={headerKeys.length + 2} className="p-2 pl-6 bg-slate-100/50 text-left">
          <div className="flex items-center gap-3">
            <span className="text-[18px] font-black capitalize tracking-normal text-slate-500">
              {groupName.toLowerCase()}
            </span>
            <div className="has-tooltip relative flex items-center">
              <span className="tooltip absolute left-full top-0 ml-6 leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[300px] md:w-[600px] border border-slate-300 z-50 text-left whitespace-normal ring-1 ring-slate-200">
                <p className="mb-2 text-[10px] font-black uppercase text-sky-700 tracking-widest">Recommended Tasks:</p>
                {taskData[groupName].split("\n").map((item, key) => (<p className="my-2 first:mt-0 font-medium" key={key}>{item}</p>))}
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
          definition={defData[charName]} // UPDATE 2: Pass definition to Row
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
              className={isSlider ? "w-32 md:w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "border p-2 rounded w-20 text-center font-bold text-slate-900"} 
              value={customValues[title] || ""}
              onChange={(e) => setCustomValues(prev => ({ ...prev, [title]: e.target.value }))}
            />
            {isSlider && <span className="font-mono text-sm w-8 font-bold text-slate-600">{customValues[title]}</span>}
          </div>
        </td>
      </tr>
    );
  });

  // UPDATE 3: Polished Clinical Smart Phrase logic
  const generateSmartPhrase = () => {
    const checked = Object.keys(checkedItems).filter(k => checkedItems[k]);
    let text = `Evaluation: Colorado Motor Speech Framework (CMSF)\n`;
    text += `Hilger, A., Cloud, L., & Dunne-Platero, C. (2024). Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. https://cmsf.info\n\n`;
    
    text += `Clinical Ratings:\n`;
    text += `- Self-Rating: ${customValues["Self-Rating"] || "N/A"}/10\n`;
    text += `- Intelligibility Estimate: ${customValues["Intelligibility"] || "N/A"}%\n`;
    text += `- Naturalness Rating (VAS): ${customValues["Naturalness"]}/100\n`;
    text += `- Efficiency Rating (VAS): ${customValues["Efficiency"]}/100\n\n`;

    text += `Observations:\n` + (checked.length > 0 ? checked.map(c => `- ${c}`).join('\n') : "No deviant features noted.");
    text += `\n\nDifferential Summary:\n` + headerKeys.map((k, i) => `${k}: Net ${counts.Total[i]}`).join('\n');
    
    text += `\n\nOverall Impressions:\n`;
    text += `Speech features observed during this evaluation suggest possible involvement of [Neural Area].\n`;
    text += `Primary motor speech disorder classification: [MSD Type].\n`;
    text += `Perceptual severity: [No Impairment/ Mild / Moderate / Severe/ Profound].`;
    
    return text;
  };

  const RevealToggle = () => (
    <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
      <span className={`text-[10px] font-black uppercase tracking-widest ${!showHighlights ? 'text-slate-900' : 'text-slate-300'}`}>Blind Mode</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={showHighlights} onChange={() => setShowHighlights(!showHighlights)} />
        <div className="w-12 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
      </label>
      <span className={`text-[10px] font-black uppercase tracking-widest ${showHighlights ? 'text-amber-600' : 'text-slate-300'}`}>Reveal Results</span>
    </div>
  );

  const firstRow = Object.keys(locData).map(item => (<th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black">{item}</th>));
  const secondRow = headerKeys.map(val => (<th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] uppercase font-bold text-slate-700">{val}</th>));

  return (
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      <style dangerouslySetInnerHTML={{ __html: `@media print { .no-print { display: none !important; } }` }} />
      
      {/* BRANDING */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 no-print border-b-2 border-slate-100 pb-8 gap-6">
        <div className="w-full md:w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-left md:text-right">
          <p className="text-lg md:text-xl leading-none tracking-tight mb-2 font-bold text-slate-900">Colorado <span className="font-normal text-slate-400">Motor Speech Framework</span></p>
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Diagnostic Assessment Tool</p>
        </div>
      </div>

      {/* TOP TOGGLE */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10 no-print">
        <div className="flex-grow p-6 bg-sky-50 rounded-3xl border border-sky-100 flex items-center gap-4">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-sky-100 text-sky-700 font-bold text-[12px] border border-sky-200">i</div>
          <p className="text-xs font-bold text-sky-800 leading-relaxed uppercase tracking-wide">
            Toggle to hide or reveal the highlighted results during administration of the tasks.
          </p>
        </div>
        <RevealToggle />
      </div>

      {/* MAIN TABLE */}
      <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-x-auto">
        <table className="table-fixed text-center border-collapse w-full min-w-[1000px]">
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="sticky left-0 z-20 p-3 border border-slate-700 bg-slate-100 w-64 md:w-80 text-xs font-black uppercase text-left pl-6">Characteristics</th>
              <th rowSpan={2} className="p-3 border border-slate-700 w-16 text-xs font-black uppercase">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 no-print">
        <button onClick={() => setHidden(!hidden)} className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all">
          {hidden ? "Show All Rows" : "Hide Unchecked Rows"}
        </button>
        <RevealToggle />
        <button onClick={() => window.print()} className="px-10 py-4 bg-slate-800 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-slate-900 transition-all">Generate PDF Report</button>
      </div>

      {/* RATINGS & OBSERVATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
        <div className="lg:col-span-1">
          <table className="table-fixed border border-slate-700 w-full rounded-xl overflow-hidden">
            <tbody>{customRows}</tbody>
          </table>
        </div>
        <div className="lg:col-span-2">
          <textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 text-base outline-none min-h-[220px]" placeholder="Clinical Observations..."></textarea>
        </div>
      </div>

      {/* SCORECARD */}
      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
        <table className="table-fixed text-center border-collapse w-full min-w-[1000px]">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={2} className="p-4 text-left pl-8 border border-slate-700 uppercase">Diagnostic Summary Scorecard</th>
              {secondRow}
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Common Feature Total</td>{counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}</tr>
            <tr><td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Highly Distinguishing Total</td>{counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}</tr>
            <tr><td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">Unexpected Feature Total</td>{counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}</tr>
            <tr className="bg-slate-100 font-black"><td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase">Differential score</td>{counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50">{item}</td>)}</tr>
          </tbody>
        </table>
      </div>

      {/* EPIC SMART PHRASE */}
      <div className="mt-20 p-8 bg-slate-50 rounded-3xl border-2 border-slate-200 no-print">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-left"><h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">EPIC Clinical Summary</h2></div>
          <button 
            onClick={() => { navigator.clipboard.writeText(generateSmartPhrase()); alert("Summary Copied!"); }} 
            className="px-8 py-4 bg-sky-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg hover:bg-sky-700 active:scale-95 transition-all"
          >
            Copy Smart Phrase
          </button>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-inner max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700">{generateSmartPhrase()}</pre>
        </div>
      </div>
    </div>
  );
}

export default Tool;
