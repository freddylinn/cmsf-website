import React, { useState } from "react";
import { Link } from "react-router-dom";
import charData from "../data/characteristics.json";
import locData from "../data/locations.json";
import customData from "../data/custom.json";
import Row from "../components/Row";

function Tool() {
  const characteristics = charData;
  const locations = locData;
  const customInputs = customData;
  const [hidden, setHidden] = useState(false);

  const initialCount = Object.values(locations)
    .flatMap((arr) => arr)
    .map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

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

  const firstRow = Object.keys(locations).map((item) => (
    <th colSpan={locations[item].length} key={item} className="p-4 border border-slate-700 bg-slate-50">
      {item}
    </th>
  ));

  const secondRow = Object.values(locations)
    .flatMap((arr) => arr)
    .map((value) => (
      <th key={value} className="p-4 border border-slate-700 bg-slate-50 min-w-[5rem]">
        {value}
      </th>
    ));

  const charRows = Object.keys(characteristics).map((groupName) => {
    const rows = Object.entries(characteristics[groupName]).map((item, index) => (
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
    ));

    if (groupName === "Articulation") {
      rows.push(
        <tr key="fiti-link" className="bg-sky-50/50 print:hidden">
          {/* REMOVED !hidden check: Placeholder for Groups column is now always visible */}
          <td className="border border-slate-700 bg-slate-50"></td>
          <td colSpan={2} className="p-3 border border-slate-700 text-center">
            <Link to="/fiti" className="text-[11px] font-bold text-sky-700 hover:underline flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Perform Modular FITI Assessment for detailed phonetic coverage
            </Link>
          </td>
          {initialCount.map((_, i) => (
            <td key={i} className="border border-slate-700 bg-slate-50/30"></td>
          ))}
        </tr>
      );
    }
    return rows;
  });

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
        <th className="px-6 border border-slate-700 w-48 min-w-[12rem] bg-slate-50 text-center">
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

  return (
    <div className="p-4">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: portrait; margin: 0.5cm; }
          body { zoom: 58%; -webkit-print-color-adjust: exact; }
          /* REMOVED conditional display: First column now always displays in print */
          .overflow-x-auto { overflow: visible !important; }
          table { table-layout: auto !important; width: 100% !important; font-size: 14px; }
          .bg-yellow-200 { background-color: #fef08a !important; }
          .bg-green-300 { background-color: #86efac !important; }
          .bg-red-300 { background-color: #fca5a5 !important; }
          tr { page-break-inside: avoid; }
        }
      `}} />

      <div className="max-w-4xl mx-auto mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center gap-3 print:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p className="text-sm font-medium text-blue-800 italic text-center">
          Note: No input data are saved to this website to protect patient privacy.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-around mb-8 gap-4">
        <div className="mt-2 w-full md:w-64 flex flex-col gap-2">
          <label htmlFor="patientName" className="font-semibold">Patient Name (optional)</label>
          <input className="rounded border-slate-300 w-full p-2" type="text" id="patientName" />
        </div>
        <div className="flex flex-col items-center gap-2 max-w-lg">
          <p className="text-center print:hidden mt-8 text-sm text-slate-500">
            Note: To save as a PDF, click the Print to PDF button below. 
            Ensure destination is “Save as PDF” and orientation is set to Portrait.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr className="bg-slate-100">
              {/* REMOVED !hidden check: Groups header is now always visible */}
              <th rowSpan={2} className="border border-slate-700 w-32 min-w-[8rem]">Groups</th>
              <th rowSpan={2} className="p-4 border border-slate-700 w-80 min-w-[20rem]">Characteristics</th>
              <th rowSpan={2} className="p-4 border border-slate-700 w-20 min-w-[5rem]">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-12 mb-12 print:hidden">
        <button
          onClick={() => setHidden((prev) => !prev)}
          className="rounded-lg text-lg px-6 py-3 bg-sky-500 hover:bg-sky-500 active:bg-sky-600 text-white font-semibold transition-all shadow-md"
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

      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mt-10">
        <tbody>{customRows}</tbody>
      </table>

      <div className="flex w-full md:w-2/3 flex-col items-start mx-auto mt-12 mb-16">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Additional notes on patient observations</h2>
        <textarea className="w-full border-2 border-slate-200 rounded-lg p-4 outline-none transition-all" rows="6" placeholder="Type notes here..." />
      </div>

      <div className="flex flex-wrap gap-6 justify-center mt-10 mb-8 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-yellow-200"></div>
          <span className="text-sm font-medium">Common feature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-green-300"></div>
          <span className="text-sm font-medium">Highly distinguishing feature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-red-300"></div>
          <span className="text-sm font-medium">Unexpected feature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full border border-slate-700 bg-white"></div>
          <span className="text-sm font-medium">No correlation</span>
        </div>
      </div>

      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mb-16">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-4 border border-slate-700">Metric</th>
            {secondRow}
          </tr>
          <tr>
            <td className="bg-yellow-200 p-2 border border-slate-700 font-semibold text-left pl-4">Total Yellow Count</td>
            {yellowCells}
          </tr>
          <tr>
            <td className="bg-green-300 p-2 border border-slate-700 font-semibold text-left pl-4">Total Green Count</td>
            {greenCells}
          </tr>
          <tr>
            <td className="bg-red-300 p-2 border border-slate-700 font-semibold text-left pl-4">Total Red Count</td>
            {redCells}
          </tr>
          <tr className="bg-slate-100 font-bold">
            <td className="w-48 p-2 border border-slate-700 text-left pl-4">Net Diagnostic Score</td>
            {totalCells}
          </tr>
        </thead>
      </table>

      <footer className="bg-slate-50 p-10 rounded-t-[3rem] mt-16 border-t border-slate-200 no-print">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <p className="text-slate-600 text-center text-sm leading-relaxed">
            Please cite this tool if you use it in your research: <br />
            <span className="font-bold text-slate-800 italic">
              Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024, May 8). Colorado Motor Speech Framework. https://doi.org/10.17605/OSF.IO/PM936
            </span>
          </p>
          <div className="border-t border-slate-200 w-24"></div>
          <p className="text-slate-400 text-center text-xs tracking-wide">
            © 2023 to 2026, Regents of the University of Colorado, a body corporate. <br />
            Developed in the Colorado Motor Speech lab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Tool;
