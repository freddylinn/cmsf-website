import { FITI_ENABLED } from "../config/features";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Row from "../components/Row";
import MobileFeature from "../components/MobileFeature";
import PatternGrid from "../components/PatternGrid";
import MobileGroupHeader from "../components/MobileGroupHeader";
import { getLang, rowKey, lookupDefinition, lookupLaterality } from "../i18n";

// Helper for Google Analytics
const trackEvent = (action, label) => {
  if (window.gtag) {
    window.gtag('event', action, {
      'event_category': 'Engagement',
      'event_label': label,
    });
  }
};

// The two rating modes, shown as a single card that states which mode is
// active, why it exists, and what the button will do. The previous two-label
// switch left people unsure which side was the current state.
const ModeCard = ({ showHighlights, setShowHighlights, t }) => {
  const revealed = showHighlights;
  const step = revealed ? t.revealStep : t.blindStep;
  const title = revealed ? t.revealTitle : t.blindTitle;
  const body = revealed ? t.revealBody : t.blindBody;
  const action = revealed ? t.revealAction : t.blindAction;

  return (
    <div
      className={`no-print flex flex-col justify-between gap-4 px-6 py-5 rounded-2xl border-2 shadow-sm transition-colors lg:w-[380px] shrink-0 ${
        revealed ? "bg-amber-50 border-amber-500" : "bg-white border-slate-400"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span
            aria-hidden="true"
            className={`inline-flex items-center justify-center w-6 h-6 rounded-lg ${
              revealed ? "bg-amber-500 text-white" : "bg-slate-700 text-white"
            }`}
          >
            {revealed ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.6 10.7a3 3 0 004.2 4.2M9.9 5.7A9 9 0 0112 5.5c6.5 0 9.5 6.5 9.5 6.5a15 15 0 01-3 4M6.2 7.4A15 15 0 002.5 12S5.5 18.5 12 18.5c1 0 1.9-.15 2.7-.4" />
              </svg>
            )}
          </span>
          <span className={`text-[10px] font-black uppercase tracking-widest ${revealed ? "text-amber-800" : "text-slate-700"}`}>
            {step}
          </span>
        </div>
        <p className="text-sm font-bold text-slate-900 leading-snug">{title}</p>
        <p className="text-xs text-slate-700 leading-relaxed mt-1">{body}</p>
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
        {action}
      </button>
    </div>
  );
};

function Tool({ lang = "en" }) {
  const L = getLang(lang);
  const t = L.ui;
  const { characteristics: charData, locations: locData, tasks: taskData,
          custom: customData, definitions: charTasksData } = L.data;
  const CUSTOM_KEYS = Object.keys(customData);
  const [SELF, INTEL, NAT, EFF] = CUSTOM_KEYS;

  const [hidden, setHidden] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [openTask, setOpenTask] = useState(null);
  const taskRef = useRef(null);

  // Same dismissal rules as the feature definitions: tap away or press Escape.
  useEffect(() => {
    if (!openTask) return;
    const onDown = (e) => {
      if (taskRef.current && !taskRef.current.contains(e.target)) setOpenTask(null);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpenTask(null); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openTask]);
  const tableScrollRef = useRef(null);

  // Toggling the row filter changes the table's height underneath a retained
  // scroll position, which drops you into empty space below the last row.
  // Reset to the top so the first visible feature is always where you look.
  const toggleHidden = () => {
    setHidden(prev => !prev);
    if (tableScrollRef.current) {
      const top = tableScrollRef.current.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };
  const [showHighlights, setShowHighlights] = useState(false); 
  const [checkedItems, setCheckedItems] = useState({});
  const [laterality, setLaterality] = useState({});
  
  // State for the research recruitment banner
  
  const [customValues, setCustomValues] = useState({
    [SELF]: "", [INTEL]: "", [NAT]: "50", [EFF]: "50"
  });

  const headerKeys = Object.values(locData).flatMap(arr => arr);
  const initialCount = headerKeys.map(() => 0);
  
  const [counts, setCounts] = useState({
    Yellow: initialCount, Green: initialCount, Red: initialCount, Total: initialCount,
  });

  const handleToggle = (key, isNowChecked, cellValues) => {
    setCheckedItems(prev => ({ ...prev, [key]: isNowChecked }));
    if (!isNowChecked) {
      setLaterality(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
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

  const generateSmartPhrase = () => {
    const checked = Object.keys(checkedItems)
      .filter(k => checkedItems[k])
      .map(k => {
        const name = k.split("|")[1];
        return laterality[k] ? `${name} (${laterality[k]})` : name;
      });
    const sp = t.sp;
    let text = `${sp.evaluation}\n`;
    text += `Hilger, A., Cloud, C., & Dunne-Platero, K. (2023). Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. https://cmsf.info\n\n`;
    text += `${sp.ratings}:\n- ${sp.selfRating}: ${customValues[SELF] || "N/A"}/10\n- ${sp.intelligibility}: ${customValues[INTEL] || "N/A"}%\n- ${sp.naturalness}: ${customValues[NAT]}/100\n- ${sp.efficiency}: ${customValues[EFF]}/100\n\n`;
    text += `${sp.observations}:\n` + (checked.length > 0 ? checked.map(c => `- ${c}`).join('\n') : sp.none);
    text += `\n\n${sp.differential}:\n` + headerKeys.map((k, i) => `${k}: ${sp.net} ${counts.Total[i]} (C:${counts.Yellow[i]} D:${counts.Green[i]} U:${counts.Red[i]})`).join('\n');
    text += `\n\n${sp.impressions}:\n${sp.impressionsBody}`;
    return text;
  };

  // One accent per subsystem. Used for the left spine on the feature-name cell
  // and for the inline eyebrow label, so grouping survives without costing a
  // full-width row or widening the table.
  // Deep jewel tones: a wide hue spread so subsystems stay distinguishable at
  // 5px, but low enough in value that they read as structure rather than
  // competing with the light, saturated diagnostic fills. Brightness was what
  // clashed before, not hue variety — these are the same hues, much darker.
  const SECTION_ACCENTS = [
    "#155E63", // deep teal
    "#2C4B8C", // indigo
    "#57399B", // violet
    "#8A2B62", // plum
    "#8C4A16", // umber
    "#2E6B4F", // pine
    "#6B2F3A", // wine
    "#3C5A6E", // steel
  ];
  const accentFor = (name) => {
    const names = Object.keys(charData);
    return SECTION_ACCENTS[names.indexOf(name) % SECTION_ACCENTS.length];
  };

  // The recommended-tasks popover lives in the section header while entering
  // features, and moves into the first row's eyebrow once headers are hidden.
  const taskPopover = (groupName) => (
    <div className="has-tooltip relative flex items-center no-print">
      <span className={`${openTask === groupName ? "" : "tooltip"} absolute left-0 top-full mt-2 md:left-full md:top-0 md:ml-6 md:mt-0 leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[300px] md:w-[600px] border border-slate-300 z-50 text-left whitespace-normal ring-1 ring-slate-200`}>
        <span className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[10px] font-black uppercase text-sky-700 tracking-widest">{t.recommendedTasks}</span>
          {openTask === groupName && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpenTask(null)}
              className="shrink-0 -mt-1 -mr-1 w-7 h-7 rounded-lg bg-slate-200 text-slate-800 text-base leading-none font-bold"
            >×</button>
          )}
        </span>
        {(taskData[groupName] || "").split("\n").map((item, key) => (<p className="my-2 first:mt-0 font-medium" key={key}>{item}</p>))}
      </span>
      <button
        type="button"
        aria-expanded={openTask === groupName}
        aria-label={t.recommendedTasks}
        onClick={() => setOpenTask(prev => (prev === groupName ? null : groupName))}
        className="print:hidden px-1.5 py-0.5 rounded bg-sky-100 text-[10px] text-sky-800 font-bold border border-sky-600 min-w-[22px] min-h-[22px]"
      >i</button>
    </div>
  );

  const charRows = Object.keys(charData).flatMap((groupName) => {
    const groupItems = Object.entries(charData[groupName]);
    const visibleItems = groupItems.filter(([name]) => !hidden || checkedItems[rowKey(groupName, name)]);
    const checkedInGroup = groupItems.filter(([name]) => checkedItems[rowKey(groupName, name)]).length;
    if (visibleItems.length === 0) return [];

    const rows = [];
    if (!hidden) rows.push(
      <tr key={`section-${groupName}`} className="bg-slate-50 border-y border-slate-200">
        <td
          colSpan={2}
          className="sticky left-0 z-10 hover:z-50 py-1.5 pl-6 pr-3 bg-slate-100 text-left border-x border-slate-300"
          style={{ borderLeft: `5px solid ${accentFor(groupName)}` }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[15px] font-black tracking-normal"
              style={{ color: accentFor(groupName) }}
            >
              {groupName}
            </span>
            {taskPopover(groupName)}
          </div>
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

    visibleItems.forEach(([charName, data], vIdx) => {
      const key = rowKey(groupName, charName);
      const leads = hidden && vIdx === 0;
      rows.push(
        <Row
          key={key}
          sectionLabel={leads ? groupName : null}
          sectionAccent={accentFor(groupName)}
          sectionCount={leads ? checkedInGroup : 0}
          sectionInfo={leads ? taskPopover(groupName) : null}
          rowData={[charName, data]}
          isChecked={!!checkedItems[key]}
          onToggle={(val) => handleToggle(key, val, data)}
          showHighlights={showHighlights}
          definition={lookupDefinition(charTasksData, groupName, charName)}
          definitionLabel={t.definition}
          definitionMissing={t.definitionMissing}
          hoveredCol={hoveredCol}
          onHoverCol={setHoveredCol}
          lateralityOptions={lookupLaterality(L, groupName, charName)}
          lateralityValue={laterality[key] || null}
          onLaterality={(val) => setLaterality(prev => ({ ...prev, [key]: val }))}
          sideLabel={t.sideLabel}
        />
      );
    });

    if (lang === "en" && groupName === "Articulation" && !hidden) {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50 print:hidden">
          <td colSpan={headerKeys.length + 2} className="p-4 border border-slate-700 text-center align-middle bg-white">
            {FITI_ENABLED && (
            <Link to="/fiti" className="text-xs font-black text-sky-700 hover:underline flex items-center justify-center gap-2 uppercase tracking-wide">
              {t.fitiPrompt}
            </Link>
            )}
          </td>
        </tr>
      );
    }
    return rows;
  });

  const customRows = Object.entries(customData).map(([title]) => {
    const isSlider = title === NAT || title === EFF;
    const isSelfRating = title === SELF;
    const isIntelligibility = title === INTEL;

    return (
      <tr key={title}>
        <th className="px-6 py-4 border border-slate-700 w-48 bg-slate-50 text-center text-[10px] uppercase font-black text-slate-900 tracking-wider">
          {title}
        </th>
        <td className="p-3 border border-slate-700 text-center">
          <div className="flex items-center justify-center gap-3">
            <input 
              type={isSlider ? "range" : "number"} 
              className={`border p-2 rounded font-bold text-slate-900 text-center print:border-none ${isSlider ? 'w-full' : 'w-20'}`} 
              value={customValues[title] || ""}
              min={isSlider || isIntelligibility ? "0" : (isSelfRating ? "1" : "0")}
              max={isSlider || isIntelligibility ? "100" : (isSelfRating ? "10" : "100")}
              onChange={(e) => setCustomValues(prev => ({ ...prev, [title]: e.target.value }))}
            />
            {isSlider && <span className="font-mono text-sm w-8 font-bold text-slate-600 print:ml-2">{customValues[title]}</span>}
            {isSelfRating && <span className="text-xs font-black text-slate-600">/ 10</span>}
            {isIntelligibility && <span className="text-xs font-black text-slate-600">%</span>}
          </div>
        </td>
      </tr>
    );
  });

  const firstRow = Object.keys(locData).map(item => (
    <th
      colSpan={locData[item].length}
      key={item}
      className="cmsf-th lg:sticky lg:top-16 z-30 h-[52px] px-2 bg-slate-100 text-[11px] leading-tight uppercase font-black tracking-tight print:static"
    >
      {item}
    </th>
  ));
  const secondRow = headerKeys.map((val, i) => (
    <th
      key={val}
      onMouseEnter={() => setHoveredCol(i)}
      className={`cmsf-th lg:sticky lg:top-[116px] z-30 p-2 h-9 text-[11px] uppercase font-bold transition-colors print:static ${
        hoveredCol === i ? "text-sky-800 bg-sky-100" : "text-slate-700 bg-slate-100"
      }`}
    >
      {val}
    </th>
  ));

  // --- Narrow-screen views -------------------------------------------------
  // Both derive from the same checkedItems/laterality state as the table.
  const mobileGroups = Object.keys(charData).map((groupName) => ({
    groupName,
    items: Object.entries(charData[groupName]).map(([charName, values]) => {
      const key = rowKey(groupName, charName);
      return { key, charName, values };
    }),
  }));

  const patternGroups = mobileGroups.map(({ groupName, items }) => ({
    groupName,
    checkedCount: items.filter(({ key }) => checkedItems[key]).length,
    items: items.map(({ key, charName, values }) => ({
      key,
      name: charName,
      checked: !!checkedItems[key],
      side: laterality[key] || null,
      values,
    })),
  }));

  const checkedTotal = Object.values(checkedItems).filter(Boolean).length;

  const scorecardHeader = headerKeys.map(val => (
    <th key={val} className="p-2 border border-slate-700 bg-slate-100 text-[11px] uppercase font-bold text-slate-700">
      {val}
    </th>
  ));

  return (
    <div className="p-2 sm:p-4 md:p-10 max-w-[1600px] mx-auto min-h-screen bg-white font-sans text-slate-900 text-left relative">
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
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b-2 border-slate-100 pb-8 gap-6">
        <div className="w-full md:w-80">
          <label className="block text-xs font-black uppercase text-slate-600 mb-1 tracking-widest">{t.patientName}</label>
          <input className="w-full border-b-2 border-slate-200 focus:border-sky-500 outline-none p-1 text-lg font-bold text-slate-900 print:border-none" type="text" placeholder={t.patientNamePlaceholder} />
        </div>
        <div className="text-left md:text-right">
          <p className="text-lg md:text-xl font-bold text-slate-900 leading-none mb-1 uppercase tracking-tight">Colorado <span className="font-normal text-slate-600">Motor Speech Framework</span></p>
          {t.editionSub && <p className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">{t.editionSub}</p>}
        </div>
      </div>

      <div className="print-scale">

        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-10 no-print">
          <div className="flex-grow p-6 bg-sky-50 rounded-3xl border border-sky-100 flex items-start gap-4 shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-100 text-sky-700 font-bold text-sm border border-sky-200 mt-0.5 shrink-0">?</div>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-700 mb-1">{t.methodologyTitle}</h4>
                <p className="text-xs font-bold text-sky-800 leading-relaxed">{t.methodologyBody}</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 pt-3 border-t border-sky-200/60">
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-sky-600 mb-1">{t.quickInstructionsTitle}</p>
                  <p className="text-xs font-bold text-sky-800">{t.quickInstructionsBody}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/50 rounded-xl border border-sky-200/50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <p className="text-[9px] font-black uppercase tracking-tighter text-slate-600">{t.privacyNote}</p>
                </div>
              </div>
            </div>
          </div>
          <ModeCard showHighlights={showHighlights} setShowHighlights={setShowHighlights} t={t} />
        </div>

        {showHighlights && (
          <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-200 shadow-sm print:border-slate-400">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">{t.keyTitle}</h3>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-yellow-200 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">x</div><span className="text-xs font-bold text-slate-700 uppercase">{t.keyCommon}</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-green-300 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">xx</div><span className="text-xs font-bold text-slate-700 uppercase">{t.keyDistinguishing}</span></div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded bg-red-300 border border-slate-400 flex items-center justify-center font-bold text-xs uppercase">—</div><span className="text-xs font-bold text-slate-700 uppercase">{t.keyUnexpected}</span></div>
            </div>
          </div>
        )}

        <div
          ref={tableScrollRef}
          className="hidden lg:block mb-10 shadow-lg rounded-xl border border-slate-300 lg:overflow-x-visible print:block print:overflow-visible print:border-slate-800"
        >
          <table
            className="table-fixed text-center border-collapse w-full min-w-[920px] print:min-w-0"
            onMouseLeave={() => setHoveredCol(null)}
          >
            <thead>
              <tr className="bg-slate-100">
                <th rowSpan={2} className="cmsf-th sticky left-0 top-auto lg:top-16 z-40 p-3 bg-slate-100 w-64 md:w-80 text-xs font-black uppercase text-left pl-6 print:static">{t.characteristics}</th>
                <th rowSpan={2} className="cmsf-th lg:sticky lg:top-16 z-30 p-3 bg-slate-100 w-16 text-xs font-black uppercase print:static">{t.yesNo}</th>
                {firstRow}
              </tr>
              <tr>{secondRow}</tr>
            </thead>
            <tbody>{charRows}</tbody>
          </table>
        </div>

        {/* NARROW SCREENS: the same assessment as a vertical list, with the
            diagnostic pattern shown as a condensed grid rather than a matrix. */}
        <div className="lg:hidden print:hidden mb-10">
          <div className="mb-8 rounded-2xl border border-sky-300 bg-sky-50 p-5">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-sky-800 mb-2">
              {t.mobileIntroTitle}
            </h3>
            <p className="text-xs text-sky-900 leading-relaxed">
              {t.mobileIntroBody}
            </p>
          </div>

          {showHighlights && (
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-3 px-1">
                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
                  {t.mobilePatternTitle}
                </h3>
                <span className="text-[11px] font-bold text-slate-600">
                  {checkedTotal} {t.mobileCheckedCount}
                </span>
              </div>
              <PatternGrid
                groups={patternGroups}
                headerKeys={headerKeys}
                abbrev={t.colAbbrev}
                counts={counts}
                t={t}
              />
            </div>
          )}

          <div className="flex items-baseline justify-between mb-3 px-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              {t.mobileFeaturesTitle}
            </h3>
            <span className="text-[11px] font-bold text-slate-600">
              {checkedTotal} {t.mobileCheckedCount}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-300 overflow-hidden shadow-sm">
            {mobileGroups.map(({ groupName, items }) => {
              const visible = items.filter(({ key }) => !hidden || checkedItems[key]);
              if (!visible.length) return null;
              const checkedInGroup = items.filter(({ key }) => checkedItems[key]).length;
              return (
                <div key={groupName}>
                  <MobileGroupHeader
                    groupName={groupName}
                    checkedCount={checkedInGroup}
                    task={taskData[groupName]}
                    tasksLabel={t.mobileTasksLabel}
                  />
                  {visible.map(({ key, charName, values }) => (
                    <MobileFeature
                      key={key}
                      charName={charName}
                      isChecked={!!checkedItems[key]}
                      onToggle={(val) => handleToggle(key, val, values)}
                      definition={lookupDefinition(charTasksData, groupName, charName)}
                      definitionLabel={t.definition}
                      definitionMissing={t.definitionMissing}
                      lateralityOptions={lookupLaterality(L, groupName, charName)}
                      lateralityValue={laterality[key] || null}
                      onLaterality={(val) => setLaterality(prev => ({ ...prev, [key]: val }))}
                      sideLabel={t.sideLabel}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <ModeCard
              showHighlights={showHighlights}
              setShowHighlights={setShowHighlights}
              t={t}
            />
          </div>
        </div>

        {/* UI BUTTONS */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16 no-print">
          <button
            onClick={() => setShowHighlights(!showHighlights)}
            aria-pressed={showHighlights}
            className={`hidden lg:inline-flex px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-colors shadow-sm ${
              showHighlights
                ? "bg-white text-amber-900 border-2 border-amber-600 hover:bg-amber-100"
                : "bg-slate-900 text-white hover:bg-slate-700"
            }`}
          >
            {showHighlights ? t.revealAction : t.blindAction}
          </button>
          <button 
            onClick={() => {
              trackEvent('toggle_view_mode', !hidden ? 'Switched to Compact View' : 'Switched to Full View');
              toggleHidden();
            }} 
            className="px-10 py-4 bg-sky-500 text-white text-sm font-black uppercase rounded-2xl shadow-xl transition-all hover:bg-sky-600"
          >
            {hidden ? t.showAll : t.hideUnchecked}
          </button>

          <button 
            onClick={() => {
              trackEvent('generate_pdf', 'PDF Report Generated');
              window.print();
            }} 
            className="px-10 py-4 bg-slate-800 text-white text-sm font-black uppercase rounded-2xl shadow-xl transition-all hover:bg-slate-900"
          >
            {t.generatePdf}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          <div className="lg:col-span-1"><table className="border border-slate-700 w-full rounded-xl overflow-hidden print:border-slate-800"><tbody>{customRows}</tbody></table></div>
          <div className="lg:col-span-2"><textarea className="w-full border-2 border-slate-200 rounded-2xl p-6 min-h-[220px] outline-none print:border-slate-800" placeholder={t.observationsPlaceholder}></textarea></div>
        </div>

        {/* SCORECARD */}
        <div className="hidden lg:block print:block mt-16 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto print:shadow-none print:border-slate-800">
          <table className="table-fixed text-center border-collapse w-full min-w-[920px] print:min-w-0">
            <thead><tr className="bg-slate-800 text-white text-xs font-black uppercase"><th colSpan={2} className="p-4 text-left pl-8 border border-slate-700 uppercase font-black">{t.scorecard}</th>{scorecardHeader}</tr></thead>
            <tbody>
              <tr><td colSpan={2} className="bg-yellow-200 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">{t.keyCommon}</td>{counts.Yellow.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-yellow-200">{item}</td>)}</tr>
              <tr><td colSpan={2} className="bg-green-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">{t.keyDistinguishing}</td>{counts.Green.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-green-300">{item}</td>)}</tr>
              <tr><td colSpan={2} className="bg-red-300 p-3 border border-slate-700 text-xs font-black text-left pl-8 uppercase font-bold">{t.keyUnexpected}</td>{counts.Red.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-bold bg-red-300">{item}</td>)}</tr>
              <tr className="bg-slate-100 font-black"><td colSpan={2} className="p-4 border border-slate-700 text-sm text-left pl-8 uppercase font-black">{t.differentialScore}</td>{counts.Total.map((item, i) => <td key={i} className="p-2 border border-slate-700 font-black bg-slate-50">{item}</td>)}</tr>
            </tbody>
          </table>
        </div>

        {/* EPIC SMART PHRASE */}
        <div className="mt-20 p-8 bg-slate-50 rounded-3xl border-2 border-slate-200 print:bg-white print:border-slate-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex flex-col gap-1 text-left">
              <h2 className="text-lg font-black text-slate-900 uppercase leading-none">{t.summaryTitle}</h2>
              <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed max-w-md">
                {t.summaryHelp}
              </p>
            </div>
            
            <button 
              onClick={() => { 
                navigator.clipboard.writeText(generateSmartPhrase()); 
                trackEvent('copy_smart_phrase', 'Clinical Summary Copied');
                alert(t.copied); 
              }} 
              className="px-8 py-4 bg-sky-600 text-white font-black uppercase rounded-2xl shadow-lg no-print hover:bg-sky-700 transition-colors"
            >
              {t.copySummary}
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 text-left shadow-inner max-h-96 overflow-y-auto print:max-h-none print:border-none print:shadow-none">
            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700">{generateSmartPhrase()}</pre>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-100 text-center pb-16 px-4">
          <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-loose text-center">
            Hilger, A., Cloud, C., & Dunne-Platero, K. (2023). <br />
            Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. <br />
            https://cmsf.info
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto my-4 no-print"></div>
          <p className="text-[11px] text-slate-600 max-w-3xl mx-auto italic font-bold">
            © 2023-2026, Regents of the University of Colorado. All rights reserved. <br />
            Website by Frederick Linn (Frederick.Linn@colorado.edu).
          </p>
        </footer>
      </div> 

    </div>
  );
}

export default Tool;
