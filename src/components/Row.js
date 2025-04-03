import Cell from "./Cell";
import taskData from "../data/tasks.json";
import movementTaskData from "../data/movement-tasks.json";
import { useState, useEffect } from "react";

function Row({ rowData, group, groupLength, index, setCounts, hidden, form }) {
  const [isChecked, setIsChecked] = useState(false);
  const [directional, setDirectional] = useState(false);
  const [title, setTitle] = useState(rowData[0]);

  let tasks;
  if (form === "main") {
    tasks = taskData;
  }
  if (form === "movement") {
    tasks = movementTaskData;
  }

  const cellValues = rowData[1];
  const cells = cellValues.map((item, index) => (
    <Cell key={index} checked={isChecked} color={item[0]} notes={item[1]} />
  ));

  const titleDefault = "bg-slate-100 w-48 py-4 px-1 border border-slate-700";
  const titleChecked = "bg-white w-48 py-4 px-1 border border-slate-700";
  const checkboxDefault = "bg-slate-100 px-4 py-6 border border-slate-700";
  const checkboxChecked = "bg-white px-4 py-6 border border-slate-700";

  useEffect(() => {
    if (title.slice(-1) === "*") {
      setDirectional(true);
      setTitle(title.slice(0, -1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleCheck = (newVal) => {
    setIsChecked(newVal);
    if (newVal) {
      for (let i = 0; i < cellValues.length; i++) {
        if (cellValues[i][0] === -1) {
          setCounts((prevCounts) => {
            const updatedRed = [...prevCounts["Red"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedRed[i]++;
            updatedTotal[i]--;
            return { ...prevCounts, Red: updatedRed, Total: updatedTotal };
          });
        } else if (cellValues[i][0] === 1) {
          setCounts((prevCounts) => {
            const updatedYellow = [...prevCounts["Yellow"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedYellow[i]++;
            updatedTotal[i]++;
            return {
              ...prevCounts,
              Yellow: updatedYellow,
              Total: updatedTotal,
            };
          });
        } else if (cellValues[i][0] === 2) {
          setCounts((prevCounts) => {
            const updatedGreen = [...prevCounts["Green"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedGreen[i]++;
            updatedTotal[i]++;
            return { ...prevCounts, Green: updatedGreen, Total: updatedTotal };
          });
        }
      }
    } else {
      for (let i = 0; i < cellValues.length; i++) {
        if (cellValues[i][0] === -1) {
          setCounts((prevCounts) => {
            const updatedRed = [...prevCounts["Red"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedRed[i]--;
            updatedTotal[i]++;
            return { ...prevCounts, Red: updatedRed, Total: updatedTotal };
          });
        } else if (cellValues[i][0] === 1) {
          setCounts((prevCounts) => {
            const updatedYellow = [...prevCounts["Yellow"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedYellow[i]--;
            updatedTotal[i]--;
            return {
              ...prevCounts,
              Yellow: updatedYellow,
              Total: updatedTotal,
            };
          });
        } else if (cellValues[i][0] === 2) {
          setCounts((prevCounts) => {
            const updatedGreen = [...prevCounts["Green"]];
            const updatedTotal = [...prevCounts["Total"]];
            updatedGreen[i]--;
            updatedTotal[i]--;
            return { ...prevCounts, Green: updatedGreen, Total: updatedTotal };
          });
        }
      }
    }
  };

  if (!hidden || isChecked) {
    return (
      <tr>
        {index === 0 && !hidden ? (
          <th rowSpan={groupLength} className="w-20 border border-slate-700">
            <div className="has-tooltip">
              <span className="tooltip leading-relaxed rounded shadow-lg p-4 bg-gray-50 text-slate-800 text-md font-semibold max-w-128">
                {tasks[group].split("\n").map((item, key) => {
                  return (
                    <p className="my-2 text-left" key={key}>
                      {item}
                    </p>
                  );
                })}
              </span>
              <button className="-rotate-90 print:hidden px-1 mb-2 rounded bg-sky-200 text-sm text-slate-800">
                i
              </button>
            </div>
            <p
              className="rotate-180 mx-auto text-lg font-semibold"
              style={{ writingMode: "vertical-rl" }}
            >
              {group}
            </p>
          </th>
        ) : (
          <></>
        )}
        <td className={isChecked ? titleChecked : titleDefault}>{title}</td>
        <td className={isChecked ? checkboxChecked : checkboxDefault}>
          <input
            type="checkbox"
            className="block my-auto mx-auto rounded text-sky-500 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-200 focus:ring-opacity-50"
            onChange={() => toggleCheck(!isChecked)}
          />
          {isChecked && directional && (
            <div className="flex mt-3 gap-1">
              <div>
                <input
                  type="checkbox"
                  className="block my-auto mx-auto rounded text-sky-500 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-200 focus:ring-opacity-50"
                />
                <p>L</p>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="block my-auto mx-auto rounded text-sky-500 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-200 focus:ring-opacity-50"
                />
                <p>R</p>
              </div>
            </div>
          )}
        </td>
        {cells}
      </tr>
    );
  } else {
    return <></>;
  }
}

export default Row;
