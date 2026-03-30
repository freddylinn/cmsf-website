import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import taskData from "../data/tasks.json";
import charTaskData from "../data/char-tasks.json";

function Row({ 
  rowData, 
  group, 
  isChecked,             // Controlled by Tool.js
  isFirstInVisibleGroup, // Handles Subsystem Group alignment
  visibleGroupSpan,      // Corrects rowspan when rows are hidden
  onToggle,              // Notifies parent to update counts and filter
  hidden 
}) {
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  const tasks = taskData;
  const charTasks = charTaskData;

  // Handles "directional" logic for items marked with an asterisk
  useEffect(() => {
    if (title.slice(-1) === "*") {
      setDirectional(true);
      setTitle(title.slice(0, -1));
    }
  }, [title]);

  const cellValues = rowData[1];
  const cells = cellValues.map((item, index) => (
    <Cell key={index} checked={isChecked} color={item[0]} notes={item[1]} />
  ));

  // Skip rendering entirely if hidden and unchecked to prevent "ghost rows"
  if (hidden && !isChecked) return null;

  return (
    <tr className="transition-colors duration-150">
      {/* Subsystem Group Header: Only renders for the first visible row of a section */}
      {isFirstInVisibleGroup && (
        <th 
          rowSpan={visibleGroupSpan} 
          className="w-24 border border-slate-700 bg-slate-50 p-2 align-middle"
        >
          <div className="has-tooltip relative flex flex-col items-center">
            <span className="tooltip leading-relaxed rounded shadow-xl p-4 bg-white text-slate-800 text-xs font-semibold max-w-xs border border-slate-200 z-50">
              {tasks[group].split("\n").map((item, key) => (
                <p className="my-1 text-left" key={key}>{item}</p>
              ))}
            </span>
            <button className="-rotate-90 print:hidden px-1 mb-2 rounded bg-sky-100 text-[9px] text-sky-700 font-black uppercase tracking-tighter hover:bg-sky-200 transition-colors">
              Info
            </button>
          </div>
          <p
            className="rotate-180 mx-auto text-[11px] font-black text-slate-700 uppercase tracking-tighter"
            style={{ writingMode: "vertical-rl" }}
          >
            {group}
          </p>
        </th>
      )}

      {/* Characteristic Title Cell */}
      <td className={`p-2 border border-slate-700 text-[11px] leading-tight text-left transition-all ${
        isChecked ? 'bg-white font-bold text-slate-900' : 'bg-slate-50 text-slate-400 italic'
      }`}>
        <div className="flex justify-between items-center gap-2">
          <span>{title}</span>
          {charTasks[title] && (
            <div className="has-tooltip relative">
              <span className="tooltip rounded leading-relaxed shadow-xl p-4 bg-white text-slate-800 text-xs font-semibold max-w-xs text-left border border-slate-200 z-50">
                {charTasks[title].split("\n").map((item, key) => (
                  <p className="my-1 text-left" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-1.5 rounded bg-sky-100 text-[10px] text-sky-700 font-black">i</button>
            </div>
          )}
        </div>
      </td>

      {/* Y/N Checkbox Cell */}
      <td className={`p-2 border border-slate-700 transition-colors ${isChecked ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center">
          <input
            type="checkbox"
            checked={isChecked}
            className="h-4 w-4 text-sky-500 rounded border-slate-300 focus:ring-sky-500 cursor-pointer"
            onChange={() => onToggle(!isChecked)}
          />
          {isChecked && directional && (
            <div className="flex justify-center mt-2 gap-2 border-t border-slate-100 pt-2 animate-in fade-in zoom-in-90">
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-3 w-3 rounded text-sky-400 border-slate-300" />
                <span className="text-[8px] font-bold text-slate-400 mt-1">L</span>
              </div>
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-3 w-3 rounded text-sky-400 border-slate-300" />
                <span className="text-[8px] font-bold text-slate-400 mt-1">R</span>
              </div>
            </div>
          )}
        </div>
      </td>

      {/* Diagnostic Context Cells (X, XX, X*) */}
      {cells}
    </tr>
  );
}

export default Row;
