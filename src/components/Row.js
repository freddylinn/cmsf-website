import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import charTaskData from "../data/char-tasks.json";

function Row({ rowData, isChecked, onToggle, headerLength }) {
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  useEffect(() => {
    if (title.slice(-1) === "*") {
      setDirectional(true);
      setTitle(title.slice(0, -1));
    }
  }, [title]);

  const cellValues = rowData[1] || [];
  const cells = Array.from({ length: headerLength }).map((_, i) => (
    <Cell key={i} checked={isChecked} color={cellValues[i]?.[0]} notes={cellValues[i]?.[1]} />
  ));

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className={`p-4 border border-slate-700 text-sm text-left transition-all pl-6 ${
        isChecked ? 'bg-white font-black text-slate-900 underline decoration-sky-100 decoration-4' : 'bg-slate-50 text-slate-900 font-bold'
      }`}>
        <div className="flex justify-between items-center gap-4">
          <span>{title}</span>
          {charTaskData[title] && (
            <div className="has-tooltip relative">
              <span className="tooltip absolute left-full -top-4 ml-6 rounded-2xl leading-relaxed shadow-2xl p-8 bg-white text-slate-900 text-sm font-semibold w-[600px] text-left border border-slate-300 z-50 whitespace-normal ring-1 ring-slate-200">
                <p className="mb-2 text-[10px] font-black uppercase text-sky-700 tracking-widest">Definition:</p>
                {charTaskData[title].split("\n").map((item, key) => <p className="my-3 first:mt-0 font-medium" key={key}>{item}</p>)}
              </span>
              <button className="print:hidden px-2 py-0.5 rounded bg-sky-100 text-[11px] text-sky-700 font-bold border border-sky-200">i</button>
            </div>
          )}
        </div>
      </td>

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
              <div className="flex flex-col items-center"><input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" /><span className="text-[10px] font-black text-slate-400 mt-1 uppercase">L</span></div>
              <div className="flex flex-col items-center"><input type="checkbox" className="h-4 w-4 rounded text-sky-400 border-slate-400" /><span className="text-[10px] font-black text-slate-400 mt-1 uppercase">R</span></div>
            </div>
          )}
        </div>
      </td>
      {cells}
    </tr>
  );
}

export default Row;
