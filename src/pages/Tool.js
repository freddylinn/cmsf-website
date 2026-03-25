import React, { useState } from "react";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import customData from "../data/custom.json";
import Row from "../components/Row";

function Tool() {
  const characteristics = charData;
  const locations = locData;
  const customInputs = customData;

  const [hidden, setHidden] = useState(false);

  // Initialize counts for the summary table
  const initialCount = Object.values(locations)
    .flatMap((arr) => arr)
    .map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

  // --- Table Cell Mappings ---
  const yellowCells = counts["Yellow"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">{item}</td>
  ));
  const greenCells = counts["Green"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">{item}</td>
  ));
  const redCells = counts["Red"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700">{item}</td>
  ));
  const totalCells = counts["Total"].map((item, index) => (
    <td key={index} className="p-2 border border-slate-700 font-bold">{item}</td>
  ));

  // --- Header Mappings ---
  const firstRow = Object.keys(locations).map((item) => (
    <th colSpan={locations[item].length} key={item} className="p-4 border border-slate-700 bg-slate-50">
      {item}
    </th>
  ));

  const secondRow = Object.values(locations)
    .flatMap((arr) => arr)
    .map((value) => (
      <th key={value} className="p-4 border border-slate-700 bg-slate-50 text-xs md:text-sm">
        {value}
      </th>
    ));

  // --- Row Logic ---
  const charRows = Object.keys(characteristics).map((groupName) =>
    Object.entries(characteristics[groupName]).map((item, index) => (
      <Row
        key={item[0]}
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
            className={isSlider ? "w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600" : "rounded m-1 w-16 border p-1"}
            onChange={(e) => {
              if (isSlider) e.target.nextSibling.innerText = e.target.value;
            }}
          />
          {isSlider && <span className="font-mono text-sm w-8">50</span>}
        </div>
      );

      if (values["value"] === "number") {
        outOf = title === "Self-Rating" ? "/ 10" : "";
      } else if (values["value"] === "percentage") {
        outOf = "%";
      }
    } else if (values["type"] === "select") {
      inputVal = (
        <select className="rounded m-1 border p-1" defaultValue="default">
          <option value="default" disabled>--Select--</option>
          {values["options"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    return (
      <tr key={title}>
        <th className="px-6 border border-slate-700 w-48 min-w-[12rem] bg-slate-50">
          <div className="flex justify-center items-center gap-2">
            <span>{title}</span>
            <div className="has-tooltip">
              <span className="tooltip rounded leading-relaxed shadow-lg p-4 bg-gray-50 text-slate-800 text-md font-semibold max-w-96 text-left border">
                {values["tip"].split("\n").map((item, key) => (
                  <p className="my-2 text-left" key={key}>{item}</p>
                ))}
              </span>
              <button className="print:hidden px-2 rounded bg-sky-100 text-xs text-slate-800 border border-sky-200">i</button>
            </div>
          </div>
        </th>
        <td className="p-4 border border-slate-700">
          <div className="flex justify-center items-center gap-4 w-fit mx-auto">
            <div>{inputVal}</div>
            <div className="font-medium text-slate-600 min-w-[2.5rem] text-left">{outOf}</div>
          </div>
        </td>
      </tr>
    );
  });

  // --- Main Return ---
  return (
    <div className="p-4">
      {/* Header: Patient Info */}
      <div className="flex flex-wrap items-center justify-around mb-8 gap-4">
        <div className="w-full md:w-64 flex flex-col gap-2">
          <label htmlFor="patientName" className="font-semibold text-slate-700">Patient Name (optional)</label>
          <input className="rounded border-slate-300 w-full" type="text" id="patientName" placeholder="Enter name..." />
        </div>
        <div className="max-w-md">
          <p className="text-center text-sm text-slate-500 print:hidden">
            Note: To save as a PDF, click the <strong>Print to PDF</strong> button below or press <strong>Ctrl+P</strong>. 
            Set the destination to "Save as PDF" and orientation to <strong>Landscape</strong>.
          </p>
        </div>
      </div>

      {/* Main Scoring Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr>
              {!hidden && <th rowSpan={2} className="border border-slate-700 bg-slate-100 p-2">Groups</th>}
              <th rowSpan={2} className="p-4 border border-slate-700 bg-slate-100">Characteristics</th>
              <th rowSpan={2} className="p-4 border border-slate-700 bg-slate-100">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-12 mb-12 print:hidden">
        <button
          onClick={() => setHidden((prev) => !prev)}
          className="rounded-lg text-lg px-6 py-3 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold transition-all shadow-md"
        >
          {hidden ? "Show" : "Hide"} Unchecked Rows
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg text-lg px-6 py-3 bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white font-semibold transition-all shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print to PDF
        </button>
      </div>

      {/* Custom Characteristics (Naturalness, etc.) */}
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mt-10">
        <tbody>{customRows}</tbody>
      </table>

      {/* Clinical Notes Section */}
      <div className="flex w-full md:w-2/3 flex-col items-start mx-auto mt-12 mb-16">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Additional notes on patient observations</h2>
        <textarea className="w-full border-2 border-slate-200 rounded-lg p-4 focus:border-sky-400 outline-none transition-all" rows="6" placeholder="Type clinical observations here..." />
      </div>

      {/* Color Legend */}
      <div className="flex flex-wrap gap-6 justify-center mt-10 mb-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-slate-700 bg-yellow-200"></div><span className="text-sm font-medium">Common feature</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-slate-700 bg-green-300"></div><span className="text-sm font-medium">Distinguishing feature</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-slate-700 bg-red-300"></div><span className="text-sm font-medium">Unexpected feature</span></div>
        <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full border border-slate-700 bg-white"></div><span className="text-sm font-medium">No correlation</span></div>
      </div>

      {/* Summary / Total Counts Table */}
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mb-16">
        <thead>
          <tr className="bg-slate-50"><th className="p-4 border border-slate-700">Metric</th>{secondRow}</tr>
          <tr><td className="bg-yellow-200 p-2 border border-slate-700 font-semibold text-left pl-4">Total Yellow Count</td>{yellowCells}</tr>
          <tr><td className="bg-green-300 p-2 border border-slate-700 font-semibold text-left pl-4">Total Green Count</td>{greenCells}</tr>
          <tr><td className="bg-red-300 p-2 border border-slate-70            </td>
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
