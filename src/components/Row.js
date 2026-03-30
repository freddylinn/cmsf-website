import Cell from "./Cell";
import taskData from "../data/tasks.json";
import charTaskData from "../data/char-tasks.json";
import { useState, useEffect } from "react";

function Row({ 
  rowData, 
  group, 
  setCounts, 
  hidden, 
  isFirstInVisibleGroup, // New: from Tool.js
  visibleGroupSpan,      // New: from Tool.js
  onCheck                // New: from Tool.js
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  const tasks = taskData;
  const charTasks = charTaskData;

  const cellValues = rowData[1];
  const cells = cellValues.map((item, index) => (
    <Cell key={index} checked={isChecked} color={item[0]} notes={item[1]} />
  ));

  // Styles
  const titleDefault = "bg-slate-100 py-4 px-1 border border-slate-700 text-xs";
  const titleChecked = "bg-white py-4 px-1 border border-slate-700 text-xs font-bold";
  const checkboxDefault = "bg-slate-100 px-2 py-4 border border-slate-700";
  const checkboxChecked = "bg-white px-2 py-4 border border-slate-700";

  useEffect(() => {
    if (title.slice(-1) === "*") {
      setDirectional(true);
      setTitle(title.slice(0, -1));
    }
  }, [title]);

  const toggleCheck = (newVal) => {
    setIsChecked(newVal);
    
    // 1. Notify Parent (Tool.js) to recalculate row visibility and rowSpan
    if (onCheck) onCheck(newVal);

    // 2. Handle Diagnostic Counts
    const multiplier = newVal ? 1 : -1;
    setCounts((prevCounts) => {
      const updatedRed = [...prevCounts["Red"]];
      const updatedYellow = [...prevCounts["Yellow"]];
      const updatedGreen = [...prevCounts["Green"]];
      const updatedTotal = [...prevCounts["Total"]];

      for (let i = 0; i < cellValues.length; i++) {
        const colorType = cellValues[i][0];
        if (colorType === -1) {
          updatedRed[i] += multiplier;
          updatedTotal[i] -= multiplier;
        } else if (colorType === 1) {
          updatedYellow[i] += multiplier;
          updatedTotal[i] += multiplier;
        } else if (colorType === 2) {
          updatedGreen[i] += multiplier;
          updatedTotal[i] += multiplier;
        }
      }

      return { 
        ...prevCounts, 
        Red: updatedRed, 
        Yellow: updatedYellow, 
        Green: updatedGreen, 
        Total: updatedTotal 
      };
    });
  };

  // Skip rendering if "Hide Unchecked" is on and this row isn't checked
  if (hidden && !isChecked) return null;

  return (
    <tr>
      {/* FIX: The "Groups" cell only renders if this is the first visible row.
        It uses 'visibleGroupSpan' to cover exactly the right number of rows.
      */}
      {isFirstInVisibleGroup && (
        <th 
          rowSpan={visibleGroupSpan} 
          className="w-24 border border-slate-700 bg-slate-50 p-2"
        >
          <div className="has-tooltip relative">
            <span className="tooltip leading-relaxed rounded shadow-xl p-4 bg-white text-slate-800 text-xs font-semibold max-w-xs border border-slate-200 z-50">
              {tasks[group].split("\n").map((item, key) => (
                <p className="my-1 text-left" key={key}>{item}</p>
              ))}
            </span>
            <button className="-rotate-90 print:hidden px-1 mb-2 rounded bg-sky-100 text-[10px] text-sky-700 font-black uppercase">
              Info
            </button>
          </div>
          <p
            className="rotate-180 mx-auto text-sm font-black text-slate-700 uppercase tracking-tighter"
            style={{ writingMode: "vertical-rl" }}
          >
            {group}
          </p>
        </th>
      )}

      <td className={isChecked ? titleChecked : titleDefault}>
        <div className="flex justify-center items-center gap-1 m-1">
          <span>{title}</span>
          {charTasks[title] && (
            <div className="has-tooltip relative">
              <span className="tooltip rounded leading-relaxed shadow-xl p-4 bg-white text-slate-800 text-xs font-semibold max-w-xs text-left border border-slate-200 z-50">
                {charTasks[title].split("\n").map((item, key) => (
                  <p className="my-1 text-left" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-1 rounded bg-sky-100 text-[10px] text-sky-700 font-black">i</button>
            </div>
          )}
        </div>
      </td>

      <td className={isChecked ? checkboxChecked : checkboxDefault}>
        <input
          type="checkbox"
          checked={isChecked}
          className="block my-auto mx-auto h-4 w-4 rounded text-sky-500 border-slate-300 focus:ring-sky-500"
          onChange={() => toggleCheck(!isChecked)}
        />
        {isChecked && directional && (
          <div className="flex justify-center mt-2 gap-2 border-t border-slate-100 pt-2">
            <div className="flex flex-col items-center">
              <input type="checkbox" className="h-3 w-3 rounded text-sky-400" />
              <span className="text-[9px] font-bold text-slate-400 mt-1">L</span>
            </div>
            <div className="flex flex-col items-center">
              <input type="checkbox" className="h-3 w-3 rounded text-sky-400" />
              <span className="text-[9px] font-bold text-slate-400 mt-1">R</span>
            </div>
          </div>
        )}
      </td>
      {cells}
    </tr>
  );
}

export default Row;
