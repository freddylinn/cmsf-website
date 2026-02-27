import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import customData from "../data/custom.json";

import Row from "../components/Row";
import { useState } from "react";

function Tool() {
  const characteristics = charData;
  const locations = locData;
  const customInputs = customData;

  const [hidden, setHidden] = useState(false);

  const initialCount = Object.values(locations)
    .flatMap((arr) => arr)
    .map((value) => 0);
  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

  const yellowCells = counts["Yellow"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">
      {item}
    </td>
  ));
  const greenCells = counts["Green"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">
      {item}
    </td>
  ));
  const redCells = counts["Red"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">
      {item}
    </td>
  ));
  const totalCells = counts["Total"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">
      {item}
    </td>
  ));

  const firstRow = Object.keys(locations).map((item) => (
    <th
      colSpan={locations[item].length}
      key={item}
      className="p-4 border border-slate-700"
    >
      {item}
    </th>
  ));
  const secondRow = Object.values(locations)
    .flatMap((arr) => arr)
    .map((value) => (
      <th key={value} className="p-4 border border-slate-700">
        {value}
      </th>
    ));

  const charRows = Object.keys(characteristics).map((groupName) =>
    Object.entries(characteristics[groupName]).map((item, index) => (
      <Row
        key={item}
        rowData={item}
        group={groupName}
        groupLength={Object.keys(characteristics[groupName]).length}
        index={index}
        setCounts={setCounts}
        hidden={hidden}
        form="main"
      />
    ))
  );

  // --- THIS IS THE UPDATED SECTION ---
  const customRows = Object.entries(customInputs).map((pairs) => {
    const title = pairs[0];
    const values = pairs[1];
    let inputVal = <></>;
    let outOf = "";

    if (values["type"] === "number") {
      const isSlider = title === "Naturalness" || title === "Efficiency";

      inputVal = (
        <div className="flex items-center gap-3">
          <input
            type={isSlider ? "range" : "number"}
            min={0}
            max={values["max"]}
            defaultValue={isSlider ? 50 : 0}
            className={isSlider ? "w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "rounded m-1 w-16"}
            onChange={(e) => {
              if (isSlider) e.target.nextSibling.innerText = e.target.value;
            }}
          />
          {isSlider && <span className="font-mono text-sm w-8">50</span>}
        </div>
      );

      if (values["value"] === "number") {
        outOf = isSlider ? "" : `/ ${values["max"]}`;
      } else if (values["value"] === "percentage") {
        outOf = "%";
      }
    } else if (values["type"] === "select") {
      inputVal = (
        <select className="rounded m-1" defaultValue="default">
          <option value="default" disabled defaultValue>
            --Select--
          </option>
          {values["options"].map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      );
    }
return (
      <tr key={title}>
        {/* We use a fixed minimum width here to prevent the slider from overlapping the text */}
        <th className="px-6 border border-slate-700 w-48 min-w-[12rem]">
          <div className="flex justify-center items-center gap-2">
            <span>{title}</span>
            <div className="has-tooltip">
              <span className="tooltip rounded leading-relaxed shadow-lg p-4 bg-gray-50 text-slate-800 text-md font-semibold max-w-96 text-left">
                {values["tip"].split("\n").map((item, key) => (
                  <p className="my-2 text-left" key={key}>
                    {item}
                  </p>
                ))}
              </span>
              <button className="print:hidden px-1 rounded bg-sky-200 text-sm text-slate-800">
                i
              </button>
            </div>
          </div>
        </th>
        <td className="p-4 border border-slate-700">
          {/* This grid-cols-[1fr_auto] ensures the slider gets the space it needs 
              while the number label stays neatly tucked to the right */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 max-w-[300px] mx-auto">
            <div className="flex justify-center w-full">
              {inputVal}
            </div>
            <div className="flex justify-start font-medium text-slate-600 min-w-[2.5rem]">
              {outOf}
            </div>
          </div>
        </td>
      </tr>
    );

  return (
    <div className="">
      <div className="flex items-center justify-around mb-8">
        <div className="mt-2 w-128 flex flex-col gap-2">
          <label htmlFor="patientName">Patient Name (optional)</label>
          <input className="rounded w-64" type="text" id="patientName" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="w-128 text-center print:hidden mt-8">
            Note: to save as a PDF, right click this webpage and select “Print”
            (alternatively, press ctrl + p on Windows or cmd + p on Mac) then
            change the printing destination to “Save as PDF.”{" "}
            <em>
              If you exit out of this page or refresh, you will lose your data.
            </em>
          </p>
        </div>
      </div>
      <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
        <thead>
          <tr>
            {!hidden ? (
              <th rowSpan={2} className="border border-slate-700">
                Groups
              </th>
            ) : (
              <></>
            )}
            <th rowSpan={2} className="p-4 border border-slate-700">
              Characteristics
            </th>
            <th rowSpan={2} className="p-4">
              Y/N
            </th>
            {firstRow}
          </tr>
          <tr>{secondRow}</tr>
        </thead>
        <tbody>{charRows}</tbody>
      </table>
      <button
        onClick={() => setHidden((prev) => !prev)}
        className="block print:hidden rounded-lg text-lg mx-auto px-5 py-3 mt-8 mb-16 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-semibold"
      >
        {hidden ? "Show" : "Hide"} Unchecked Rows
      </button>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mt-10">
        <tbody>{customRows}</tbody>
      </table>
      <div className="flex w-2/3 flex-col items-start mx-auto mt-12 mb-16">
        <h2 className="text-xl font-medium text-center mb-4">
          Additional notes on patient observations
        </h2>
        <textarea className="w-full" rows="6" />
      </div>
      <div className="flex flex-wrap gap-4 justify-center mt-10 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-yellow-200"></div>
          <span> = Common feature</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-green-300"></div>
          <span> = Highly distinguishing feature</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-red-300"></div>
          <span> = Unexpected feature</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-white"></div>
          <span> = No correlation</span>
        </div>
      </div>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mb-10">
        <thead>
          <tr>
            <th className="p-4 border border-slate-700"></th>
            {secondRow}
          </tr>
          <tr>
            <td className="bg-yellow-200 p-2 border border-slate-700 font-semibold">
              Total Yellow Count
            </td>
            {yellowCells}
          </tr>
          <tr>
            <td className="bg-green-300 p-2 border border-slate-700 font-semibold">
              Total Green Count
            </td>
            {greenCells}
          </tr>
          <tr>
            <td className="bg-red-300 p-2 border border-slate-700 font-semibold">
              Total Red Count
            </td>
            {redCells}
          </tr>
          <tr>
            <td className="bg-slate-100 w-48 p-2 border border-slate-700 font-semibold">
              Total Yellow & Green Count Subtracting Red
            </td>
            {totalCells}
          </tr>
        </thead>
      </table>
      <footer className="bg-amber-100 p-4">
        <p className="pl-5 w-full md:w-1/2 text-slate-800 text-center mx-auto">
          Please cite this tool if you use it in your research: Dunne-Platero,
          K., Cloud, C. S., & Hilger, A. (2024, May 8). Colorado Motor Speech
          Framework. https://doi.org/10.17605/OSF.IO/PM936
        </p>
      </footer>
    </div>
  );
}

export default Tool;
