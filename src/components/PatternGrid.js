import React from "react";

// The narrow-screen equivalent of scanning down a column in the full matrix.
//
// Names sit in a fixed left column and the seven subtype cells run to the
// right, so the columns are continuous from the top of the grid to the bottom
// and the eye can travel down one to read a pattern. Subsystem headers occupy
// the name column only — exactly as they do in the desktop table — so grouping
// never interrupts a column the way a full-width band would.
//
// Column widths are shared by the header, the group rows and the feature rows
// through one CSS variable, which keeps everything aligned without a table.
const GRID = {
  display: "grid",
  gridTemplateColumns: "minmax(0,1fr) repeat(7, var(--cmsf-cell))",
};

function PatternGrid({ groups, headerKeys, abbrev = {}, counts, t }) {
  const visibleGroups = groups
    .map((g) => ({ ...g, items: g.items.filter((it) => it.checked) }))
    .filter((g) => g.items.length > 0);

  if (!visibleGroups.length) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-400 p-6 text-center">
        <p className="text-sm text-slate-600 leading-relaxed">
          {t.mobilePatternEmpty}
        </p>
      </div>
    );
  }

  const cellStyle = (type) => {
    if (type === 2) return "bg-green-300 text-slate-900";
    if (type === 1) return "bg-yellow-200 text-slate-900";
    if (type === -1) return "bg-red-300 text-slate-900";
    return "bg-white text-transparent";
  };
  const glyph = (type) =>
    type === 2 ? "XX" : type === 1 ? "X" : type === -1 ? "—" : "";

  return (
    <div
      className="rounded-2xl border border-slate-400 overflow-hidden shadow-sm [--cmsf-cell:30px] sm:[--cmsf-cell:40px]"
    >
      {/* Column key. Deliberately not sticky: it would pin over the first row
          of the first group and hide it, and now that the grid contains only
          ticked features it is short enough to read without pinning. */}
      <div
        style={GRID}
        className="bg-slate-200 border-b-2 border-slate-500"
      >
        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-800 self-center">
          {t.mobileFeaturesTitle}
        </div>
        {headerKeys.map((k) => (
          <div
            key={k}
            className="py-2 px-0.5 text-center text-[8px] sm:text-[9px] font-black uppercase text-slate-800 leading-none border-l border-slate-400 flex items-center justify-center"
          >
            {abbrev[k] || k}
          </div>
        ))}
      </div>

      {visibleGroups.map((group) => (
        <div key={group.groupName}>
          {/* Subsystem label. The seven cells are empty but present, so the
              column rules carry straight through the grouping. */}
          <div style={GRID} className="bg-slate-100 border-y border-slate-300">
            <div className="px-3 py-2 flex items-center gap-2 min-w-0">
              <span className="text-[11px] font-black text-slate-700 leading-tight truncate">
                {group.groupName}
              </span>
              {group.items.length > 0 && (
                <span className="shrink-0 px-1.5 rounded-full bg-sky-700 text-white text-[9px] font-black">
                  {group.items.length}
                </span>
              )}
            </div>
            {headerKeys.map((k) => (
              <div key={k} className="border-l border-slate-300" />
            ))}
          </div>

          {group.items.map((item) => (
            <div
              key={item.key}
              style={GRID}
              className="border-b border-slate-200 last:border-b-0 bg-white"
            >
              <div className="px-3 py-2.5 min-w-0 flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-900 leading-tight">
                  {item.name}
                </span>
                {item.side && (
                  <span className="shrink-0 px-1 rounded bg-sky-700 text-white text-[9px] font-black">
                    {item.side}
                  </span>
                )}
              </div>
              {item.values.map((v, i) => (
                <div
                  key={i}
                  title={headerKeys[i]}
                  className={`border-l border-slate-300 flex items-center justify-center text-[10px] font-black leading-none ${cellStyle(
                    v[0]
                  )}`}
                >
                  {glyph(v[0])}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Totals, on the same seven columns so they read as the foot of the
          grid: net score above, then common / distinguishing / unexpected. */}
      <div style={GRID} className="bg-slate-900 text-white border-t-2 border-slate-700">
        <div className="px-3 py-2 self-center">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-300 leading-none">
            {t.mobileNetLabel}
          </p>
          <p className="mt-1 text-[8px] font-bold leading-none">
            <span className="text-yellow-300">C</span>
            <span className="text-slate-500">/</span>
            <span className="text-green-300">D</span>
            <span className="text-slate-500">/</span>
            <span className="text-red-300">U</span>
          </p>
        </div>
        {headerKeys.map((k, i) => (
          <div key={k} className="py-2 px-0.5 text-center border-l border-slate-700">
            <p
              className={`text-sm font-black leading-none ${
                counts.Total[i] > 0 ? "text-sky-300" : "text-slate-500"
              }`}
            >
              {counts.Total[i]}
            </p>
            <p className="mt-1 text-[8px] font-bold leading-none tabular-nums">
              <span className="text-yellow-300">{counts.Yellow[i]}</span>
              <span className="text-slate-600">/</span>
              <span className="text-green-300">{counts.Green[i]}</span>
              <span className="text-slate-600">/</span>
              <span className="text-red-300">{counts.Red[i]}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatternGrid;
