import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import taskData from "../data/tasks.json";
import charTaskData from "../data/char-tasks.json";

function Row({ rowData, group, isChecked, isFirstInVisibleGroup, visibleGroupSpan, onToggle, hidden }) {
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  const tasks = taskData;
  const charTasks = charTaskData;

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

  if (hidden && !isChecked) return null;

  return (
    <tr>
      {isFirstInVisibleGroup && (
        <th rowSpan={visibleGroupSpan} className="w-32 border border-slate-700 bg-slate-50 p-3 align-middle">
          <div className="has-tooltip relative flex flex-col items-center">
            {/* WIDER TOOLTIP: Changed max-w-xs to max-w-2xl for horizontal reading */}
            <span className="tooltip leading-relaxed rounded-xl shadow-2xl p-6 bg-white text-slate-800 text-sm font-semibold max-w-2xl border border-slate-200 z-50 text-left">
              {tasks[group].split("\n").map((item, key) => (
                <p className="my-2" key={key}>{item}</p>
              ))}
            </span>
            <button className="-rotate-90 print:hidden px-2 mb-2 rounded bg-sky-100 text-[10px] text-sky-700 font-black uppercase tracking-tighter hover:bg-sky-200 transition-colors">
              Info
            </button>
          </div>
          <p
            className="rotate-180 mx-auto text-xs font-black text-slate-800 uppercase tracking-widest"
            style={{ writingMode: "vertical-rl" }}
          >
            {group}
          </p>
        </th>
      )}

      {/* CHARACTERISTIC TITLE: Restored dark font color and larger size */}
      <td className={`p-3 border border-slate-700 text-sm leading-snug text-left transition-all ${
        isChecked ? 'bg-white font-bold text-slate-900' : 'bg-slate-50 text-slate-700 font-medium'
      }`}>
        <div className="flex justify-between items-center gap-3">
          <span>{title}</span>
          {charTasks[title] && (
            <div className="has-tooltip relative">
              {/* WIDER TOOLTIP: Changed max-w-xs to max-w-xl */}
              <span className="tooltip rounded-xl leading-relaxed shadow-2xl p-6 bg-white text-slate-800 text-sm font-semibold max-w-xl text-left border border-slate-200 z-50">
                {charTasks[title].split("\n").map((item, key) => (
                  <p className="my-2" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-2 rounded bg-sky-100 text-[10px] text-sky-700 font-black">i</button>
            </div>
          )}
        </div>
      </td>

      <td className={`p-3 border border-slate-700 ${isChecked ? 'bg-white' : 'bg-slate-50'}`}>
        <div className="flex flex-col items-center">
          <input
            type="checkbox"
            checked={isChecked}
            className="h-5 w-5 text-sky-500 rounded border-slate-400 focus:ring-sky-500 cursor-pointer"
            onChange={() => onToggle(!isChecked)}
          />
          {isChecked && directional && (
            <div className="flex justify-center mt-3 gap-3 border-t border-slate-100 pt-3">
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" />
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase">L</span>
              </div>
              <div className="flex flex-col items-center">
                <input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" />
                <span className="text-[10px] font-black text-slate-400 mt-1 uppercase">R</span>
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
