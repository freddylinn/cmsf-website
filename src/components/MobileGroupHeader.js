import React, { useState } from "react";

// Subsystem header for the narrow-screen feature list.
//
// The desktop table exposes the recommended tasks through a hover tooltip on
// the section row. On touch there is no hover and no room for a 600px popover,
// so the same content expands inline underneath instead — which also means it
// can stay open while the clinician works through the tasks.
//
// Deliberately not sticky: the pattern grid already pins its column key at the
// same offset, and two sticky bands at one offset overlap and hide rows.
function MobileGroupHeader({ groupName, checkedCount, task, tasksLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-200 border-y border-slate-400">
      <div className="flex items-stretch">
        <div className="flex items-center gap-2 flex-1 min-w-0 px-4 py-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-800 leading-tight">
            {groupName}
          </span>
          {checkedCount > 0 && (
            <span className="shrink-0 px-2 py-0.5 rounded-full bg-sky-700 text-white text-[10px] font-black">
              {checkedCount}
            </span>
          )}
        </div>

        {task && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="shrink-0 flex items-center gap-1.5 px-3 border-l border-slate-400 text-slate-800"
          >
            <span className="text-[10px] font-black uppercase tracking-wider">
              {tasksLabel}
            </span>
            <span
              aria-hidden="true"
              className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>
        )}
      </div>

      {open && task && (
        <div className="px-4 pb-4 pt-1 bg-white border-t border-slate-300">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-800 mb-2">
            {tasksLabel}
          </p>
          <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line">
            {task}
          </p>
        </div>
      )}
    </div>
  );
}

export default MobileGroupHeader;
