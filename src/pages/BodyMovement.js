import React, { useState, useRef } from "react";
import Row from "../components/Row";
import { getLang, rowKey } from "../i18n";

function BodyMovement({ lang = "en" }) {
  const L = getLang(lang);
  const t = L.ui;
  const charData = L.data.movement;
  const locData = L.data.locations;

  const [hidden, setHidden] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(null);
  const tableScrollRef = useRef(null);

  const toggleHidden = () => {
    setHidden(prev => !prev);
    if (tableScrollRef.current) {
      const top = tableScrollRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
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

  const handleToggle = (key, isNowChecked, cellValues) => {
    setCheckedItems((prev) => ({ ...prev, [key]: isNowChecked }));

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
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[rowKey(groupName, name)]);

    if (visibleItems.length === 0) return [];

    const rows = [];
    rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td
          colSpan={2}
          className="p-2 pl-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 bg-slate-100 text-left border-x border-slate-300"
        >
          {groupName}
        </td>
        {headerKeys.map((_, i) => (
          <td
            key={i}
            onMouseEnter={() => setHoveredCol(i)}
            className={`h-6 border-x border-slate-300 bg-white ${
              hoveredCol === i ? "shadow-[inset_0_0_0_9999px_rgba(14,165,233,0.10)]" : ""
            }`}
          />
        ))}
      </tr>
    );

    visibleItems.forEach(([charName, data]) => {
      const key = rowKey(groupName, charName);
      rows.push(
        <Row
          key={key}
          rowData={[charName, data]}
          isChecked={!!checkedItems[key]}
          onToggle={(val) => handleToggle(key, val, data)}
          headerLength={headerKeys.length}
          showHighlights={showHighlights}
          definitionLabel={t.definition}
          definitionMissing={t.definitionMissing}
          hoveredCol={hoveredCol}
          onHoverCol={setHoveredCol}
        />
      );
    });

    return rows;
  });

  const ModeCard = () => {
    const revealed = showHighlights;
    return (
      <div className={`no-print flex flex-col justify-between gap-4 px-6 py-5 rounded-2xl border-2 shadow-sm transition-colors lg:w-[380px] shrink-0 ${
        revealed ? "bg-amber-50 border-amber-500" : "bg-white border-slate-400"
      }`}>
        <div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${revealed ? "text-amber-800" : "text-slate-700"}`}>
            {revealed ? t.revealStep : t.blindStep}
          </span>
          <p className="text-sm font-bold text-slate-900 leading-snug mt-1">
            {revealed ? t.revealTitle : t.blindTitle}
          </p>
          <p className="text-xs text-slate-700 leading-relaxed mt-1">
            {revealed ? t.revealBody : t.blindBody}
          </p>
        </div>
        <button
          type="button"
          aria-pressed={revealed}
          onClick={() => setShowHighlights(!showHighlights)}
          className={`w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
            revealed
              ? "bg-white text-amber-900 border-2 border-amber-600 hover:bg-amber-100"
              : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          {revealed ? t.revealAction : t.blindAction}
        </button>
      </div>
    );
  };

  const firstRow = Object.keys(locData).map((item) => (
    <th colSpan={locData[item].length} key={item} className="cmsf-th lg:sticky lg:top-16 z-30 h-[52px] px-2 bg-slate-100 text-[11px] leading-tight uppercase font-black print:static">
      {item}
    </th>
  ));

  const secondRow = headerKeys.map((val, i) => (
    <th
      key={val}
      onMouseEnter={() => setHoveredCol(i)}
      className={`cmsf-th lg:sticky lg:top-[116px] z-30 p-2 h-9 text-[11px] min-w-[4.5rem] uppercase font-bold transition-colors print:static ${
        hoveredCol === i ? "text-sky-800 bg-sky-100" : "text-slate-700 bg-slate-100"
      }`}
    >
      {val}
    </th>
  ));

  const scorecardHeader = headerKeys.map((val) => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] min-w-[4.5rem] uppercase font-bold text-slate-700">
      {val}
    </th>
  ));

  return (
    <div className="p-2 sm:p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      {/* BRANDING */}
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-8">
        <div className="w-80">
          <label className="block text-xs font-black uppercase text-slate-600 mb-1 tracking-widest">{t.patientName}</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900" type="text" placeholder={t.patientNamePlaceholder} />
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 uppercase tracking-tight leading-none">Colorado Motor Speech Framework</p>
          <p className="text-xs text-slate-600 uppercase mt-2 font-bold tracking-widest">{t.movementSubtitle}</p>
        </div>
      </div>

      {/* INSTRUCTION BOX & TOGGLE */}
      <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10 no-print">
        <div className="flex-grow p-6 bg-slate-50 rounded-3xl border border-slate-200 flex items-center gap-4">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wide leading-relaxed">
            {t.movementNote}
          </p>
        </div>
        <ModeCard />
      </div>

      {/* TABLE */}
      <div
        ref={tableScrollRef}
        className="mb-10 shadow-lg rounded-xl border border-slate-300 overflow-x-auto lg:overflow-x-visible print:overflow-visible"
      >
        <table
          className="table-fixed text-center border-collapse w-full min-w-[920px]"
          onMouseLeave={() => setHoveredCol(null)}
        >
          <thead>
            <tr className="bg-slate-100">
              <th rowSpan={2} className="cmsf-th sticky left-0 top-auto lg:top-16 z-40 p-3 bg-slate-100 w-80 text-xs font-black uppercase text-slate-900 text-left pl-6 print:static">{t.characteristics}</th>
              <th rowSpan={2} className="cmsf-th lg:sticky lg:top-16 z-30 p-3 bg-slate-100 w-16 text-xs font-black uppercase text-slate-900 print:static">{t.yesNo}</th>
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
          onClick={toggleHidden}
          className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 transition-all"
        >
          {hidden ? t.showAll : t.hideUnchecked}
        </button>
      </div>

      {/* SCORECARD */}
      <div className="mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto no-print">
        <table className="table-fixed text-center border-collapse w-full min-w-[920px]">
          <thead>
            <tr className="bg-slate-800 text-white text-xs font-black uppercase">
              <th colSpan={2} className="p-4 text-left pl-8 tracking-widest border border-slate-700">{t.movementScorecard}</th>
              {scorecardHeader}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">{t.keyCommon}</td>
              {counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">{t.keyDistinguishing}</td>
              {counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}
            </tr>
            <tr>
              <td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase">{t.keyUnexpected}</td>
              {counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}
            </tr>
            <tr className="bg-slate-100 font-black">
              <td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase tracking-widest">{t.movementScore}</td>
              {counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50 text-sm">{item}</td>)}
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 no-print">
        <p className="text-[11px] text-slate-600 max-w-3xl mx-auto leading-relaxed italic uppercase font-bold">
          © 2023-2026 Regents of the University of Colorado.
        </p>
      </footer>
    </div>
  );
}

export default BodyMovement;
