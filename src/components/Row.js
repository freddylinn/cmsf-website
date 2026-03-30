import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import taskData from "../data/tasks.json";
import charTaskData from "../data/char-tasks.json";

function Row({ rowData, group, isChecked, isFirstInVisibleGroup, visibleGroupSpan, onToggle, headerLength }) {
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  useEffect(() => {
    if (title.slice(-1) === "*") {
      setDirectional(true);
      setTitle(title.slice(0, -1));
    }
  }, [title]);

  const cellValues = rowData[1];
  
  // FIX: Map strictly based on headerLength to ensure body columns match headers perfectly
  const cells = Array.from({ length: headerLength }).map((_, i) => (
    <Cell key={i} checked={isChecked} color={cellValues[i]?.[0]} notes={cellValues[i]?.[1]} />
  ));

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      {/* COLUMN 1: Groups */}
      {isFirstInVisibleGroup && (
        <th rowSpan={visibleGroupSpan} className="w-32 border border-slate-700 bg-slate-50 p-4 align-middle">
          <div className="has-tooltip relative flex flex-col items-center">
            {/* WIDER TOOLTIP: max-w-4xl and whitespace-normal for horizontal reading */}
            <span className="tooltip leading-relaxed rounded-2xl shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[600px] max-w-4xl border border-slate-300 z-50 text-left whitespace-normal">
              {taskData[group].split("\n").map((item, key) => (
                <p className="my-3 first:mt-0" key={key}>{item}</p>
              ))}
            </span>
            <button className="-rotate-90 print:hidden px-2 py-0.5 mb-2 rounded bg-sky-100 text-[11px] text-sky-700 font-bold hover:bg-sky-200 transition-colors">
              i
            </button>
          </div>
          <p
            className="rotate-180 mx-auto text-xs font-black text-slate-900 uppercase tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            {group}
          </p>
        </th>
      )}

      {/* COLUMN 2: Characteristics (REVERTED TO DARK BOLD) */}
      <td className={`p-4 border border-slate-700 text-sm leading-snug text-left transition-all ${
        isChecked ? 'bg-white font-black text-slate-900 underline decoration-sky-100 decoration-4 underline-offset-4' : 'bg-slate-50 text-slate-900 font-bold'
      }`}>
        <div className="flex justify-between items-center gap-4">
          <span>{title}</span>
          {charTaskData[title] && (
            <div className="has-tooltip relative">
              {/* WIDER TOOLTIP */}
              <span className="tooltip rounded-2xl leading-relaxed shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[600px] max-w-4xl text-left border border-slate-300 z-50 whitespace-normal">
                {charTaskData[title].split("\n").map((item, key) => (
                  <p className="my-3 first:mt-0" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-2 rounded-md bg-sky-100 text-[11px] text-sky-700 font-bold">i</button>
            </div>
          )}
        </div>
      </td>

      {/* COLUMN 3: Y/N */}
      <td className={`p-4 border border-slate-700 ${isChecked ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center">
          <input
            type="checkbox"
            checked={isChecked}
            className="h-6 w-6 text-sky-500 rounded border-slate-400 focus:ring-sky-500 cursor-pointer shadow-sm"
            onChange={() => onToggle(!isChecked)}
          />
          {isChecked && directional && (
            <div className="flex justify-center mt-3 gap-4 border-t-2 border-slate-100 pt-3">
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" />
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">L</span>
              </div>
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" />
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tighter">R</span>
              </div>
            </div>
          )}
        </div>
      </td>
      {cells}
    </tr>
  );
}

export default Row;
