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
            <span className="text-[12px] font-black capitalize tracking-normal text-slate-500">
              {groupName.toLowerCase()}
            </span>
            <div className="has-tooltip relative flex items-center">
              <span className="tooltip absolute left-full top-0 ml-6 leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[300px] md:w-[600px] border border-slate-300 z-50 text-left whitespace-normal ring-1 ring-slate-200">
                <p className="mb-2 text-[10px] font-black uppercase text-sky-700 tracking-widest">Recommended Tasks:</p>
                {(taskData[groupName] || "").split("\n").map((item, key) => (<p className="my-2 first:mt-0 font-medium" key={key}>{item}</p>))}
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

  const customRows = Object.entries(customData).map(([title]) => {
    const isSlider = title === "Naturalness" || title === "Efficiency";
    return (
      <tr key={title}>
        <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-xs uppercase font-black text-slate-900 tracking-wider">{title}</th>
        <td className="p-3 border border-slate-700 text-center">
          <div className="flex items-center justify-center gap-4">
            <input 
              type={isSlider ? "range" : "text"} 
              className="border p-2 rounded w-full font-bold text-slate-900 print:border-none" 
              value={customValues[title] || ""}
              onChange={(e) => setCustomValues(prev => ({ ...prev, [title]: e.target.value }))}
            />
            {isSlider && <span className="font-mono text-sm w-8 font-bold text-slate-600 print:ml-2">{customValues[title]}</span>}
          </div>
        </td>
      </tr>
    );
  });

  const generateSmartPhrase = () => {
    const checked = Object.keys(checkedItems).filter(k => checkedItems[k]);
    let text = `Evaluation: Colorado Motor Speech Framework (CMSF)\n`;
    text += `Hilger, A., Cloud, C., & Dunne-Platero, K. (2023). Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. https://cmsf.info\n\n`;
    text += `Clinical Ratings:\n- Self-Rating: ${customValues["Self-Rating"] || "N/A"}/10\n- Intelligibility Estimate: ${customValues["Intelligibility"] || "N/A"}%\n- Naturalness: ${customValues["Naturalness"]}/100\n- Efficiency: ${customValues["Efficiency"]}/100\n\n`;
    text += `Observations:\n` + (checked.length > 0 ? checked.map(c => `- ${c}`).join('\n') : "No deviant features noted.");
    text += `\n\nDifferential Summary:\n` + headerKeys.map((k, i) => `${k}: Net ${counts.Total[i]} (C:${counts.Yellow[i]} D:${counts.Green[i]} U:${counts.Red[i]})`).join('\n');
    text += `\n\nOverall Impressions:\nSpeech features observed during this evaluation suggest possible involvement of [Neural Area].\nPrimary motor speech disorder classification: [MSD Type].\nPerceptual severity: [No Impairment/ Mild / Moderate / Severe/ Profound].`;
    return text;
  };

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

  const firstRow = Object.keys(locData).map(item => (<th colSpan={locData[item].length} key={item} className="p-3 border border-slate-700 bg-slate-100 text-sm uppercase font-black tracking-tight">{item}</th>));
  const secondRow = headerKeys.map(val => (<th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] uppercase font-bold text-slate-700">{val}</th>));

  return (
    <div className="p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print { 
          .no-print { display: none !important; } 
          .overflow-x-auto { overflow: visible !important; width: 100% !important; }
          .sticky { position: static !important; }
          table { table-layout: auto !important; width: 100% !important; font-size: 9px !important; }
          th, td { padding: 4px !important; border: 1px solid #333 !important; }
          .print-scale { zoom: 0.75; }
          textarea { border: 1px solid #333 !important; }
        }
      ` }} />
      
      {/* BRANDING */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-slate-100 pb-8 gap-6">
        <div className="w-full md:w-80">
          <label className="block text-xs font-black uppercase text-slate-400 mb-1 tracking-widest">Patient Name</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900 print:border-none" type="text" placeholder="Enter name..." />
        </div>
        <div className="text-left md:text-right">
          <p className="text-lg md:text-xl font-bold text-slate-900 leading-none mb-1 uppercase tracking-tight">Colorado <span className="font-normal text-slate-400">Motor Speech Framework</span></p>
        </div>
      </div>

      <div className="print-scale">
        {/* INSTRUCTION BOX */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10 no-print">
          <div className="flex-grow p-6 bg-sky-50 rounded-3xl border border-sky-100 flex items-center gap-4">
            <p className="text-xs font-bold text-sky-800 uppercase tracking-wide">Hover over blue "i's" for tasks. Reveal results when finished.</p>
          </div>
          <RevealToggle />
        </div>

        {/* DIAGNOSTIC KEY (Visible at top) */}
        {showHighlights && (
          <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm print:border-slate-400">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Diagnostic Indicator Key</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-yellow-200 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">x</div><span className="text-xs font-bold text-slate-700 uppercase">Common</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-green-300 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">xx</div><span className="text-xs font-bold text-slate-700 uppercase">Highly Distinguishing</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-red-300 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">—</div><span className="text-xs font-bold text-slate-700 uppercase">Unexpected</span></div>
            </div>
          </div>
        )}

        {/* MAIN DATA TABLE */}
        <div className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-x-auto print:border-slate-800">
          <table className="table-fixed text-center border-collapse w-full min-w-[1000px] print:min-w-0">
            <thead>
              <tr className="bg-slate-100">
                <th rowSpan={2} className="sticky left-0 z-20 p-3 border border-slate-700 bg-slate-100 w-64 md:w-80 text-xs font-black uppercase text-left pl-6 print:static">Characteristics</th>
                <th rowSpan={2} className="p-3 border border-slate-700 w-16 text-xs font-black uppercase">Y/N</th>
                {firstRow}
              </tr>
              <tr>{secondRow}</tr>
            </thead>
            <tbody>{charRows}</tbody>
          </table>
        </div>

        {/* UI BUTTONS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 no-print">
          <button onClick={() => setHidden(!hidden)} className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase rounded-2xl shadow-xl transition-all hover:bg-sky-600">{hidden ? "Show All Rows" : "Hide Unchecked Rows"}</button>
          <button onClick={() => window.print()} className="px-10 py-4 bg-slate-800 text-white text-sm font-black uppercase rounded-2xl shadow-xl transition-all hover:bg-slate-900">Generate PDF Report</button>
        </div>

        {/* RATINGS & OBSERVATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="lg:col-span-1"><table className="border border-slate-700 w-full rounded-xl overflow-hidden print:border-slate-800"><tbody>{customRows}</tbody></table></div>
          <div className="lg:col-span-2"><textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 min-h-[220px] outline-none print:border-slate-800" placeholder="Clinical Observations..."></textarea></div>
        </div>

        {/* SCORECARD */}
        <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto print:shadow-none print:border-slate-800">
          <table className="table-fixed text-center border-collapse w-full min-w-[1000px] print:min-w-0">
            <thead><tr className="bg-slate-800 text-white text-xs font-black uppercase"><th colSpan={2} className="p-4 text-left pl-8 border border-slate-700 uppercase font-black">Diagnostic Summary Scorecard</th>{secondRow}</tr></thead>
            <tbody>
              <tr><td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">Common</td>{counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}</tr>
              <tr><td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">Highly Distinguishing</td>{counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}</tr>
              <tr><td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">Unexpected</td>{counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}</tr>
              <tr className="bg-slate-100 font-black"><td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase font-black">Differential score</td>{counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50">{item}</td>)}</tr>
            </tbody>
          </table>
        </div>

        {/* EPIC SMART PHRASE */}
        <div className="mt-20 p-8 bg-slate-50 rounded-3xl border-2 border-slate-200 print:bg-white print:border-slate-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <h2 className="text-lg font-black text-slate-900 uppercase">EPIC Clinical Summary</h2>
            <button onClick={() => { navigator.clipboard.writeText(generateSmartPhrase()); alert("Summary Copied!"); }} className="px-8 py-4 bg-sky-600 text-white font-black uppercase rounded-2xl shadow-lg no-print">Copy Smart Phrase</button>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-inner max-h-96 overflow-y-auto print:max-h-none print:border-none print:shadow-none">
            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700">{generateSmartPhrase()}</pre>
          </div>
        </div>

        {/* COPYRIGHT FOOTER */}
        <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 px-4">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose text-center">
            Hilger, A., Cloud, C., & Dunne-Platero, K. (2023). <br />
            Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. <br />
            https://cmsf.info
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto my-4 no-print"></div>
          <p className="text-[11px] text-slate-400 max-w-3xl mx-auto italic font-bold">
            © 2023-2026, Regents of the University of Colorado. All rights reserved. <br />
            Website by Frederick Linn (Frederick.Linn@colorado.edu).
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Tool;
