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

  // Initialize counts for the summary table based on the locations data
  const initialCount = Object.values(locations)
    .flatMap((arr) => arr)
    .map(() => 0);

  const [counts, setCounts] = useState({
    Yellow: initialCount,
    Green: initialCount,
    Red: initialCount,
    Total: initialCount,
  });

  // --- Summary Table Cell Mappings ---
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
      <th key={value} className="p-4 border border-slate-700 bg-slate-50">
        {value}
      </th>
    ));

  // --- Scoring Row Mappings ---
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

  // --- Custom Input Mappings (Naturalness, Efficiency, etc.) ---
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
      {/* 1. Header Section */}
      <div className="flex flex-wrap items-center justify-around mb-8 gap-4">
        <div className="mt-2 w-full md:w-64 flex flex-col gap-2">
          <label htmlFor="patientName" className="font-semibold">Patient Name (optional)</label>
          <input className="rounded border-slate-300 w-full" type="text" id="patientName" />
        </div>
        <div className="flex flex-col items-center gap-2 max-w-lg">
          <p className="text-center print:hidden mt-8 text-sm text-slate-500">
            Note: To save as a PDF, click the <strong>Print to PDF</strong> button below. 
            Change the destination to “Save as PDF” and set the orientation to <strong>Landscape</strong>.
          </p>
        </div>
      </div>

      {/* 2. Main Scoring Table */}
      <div className="overflow-x-auto">
        <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
          <thead>
            <tr>
              {!hidden && (
                <th rowSpan={2} className="border border-slate-700 bg-slate-100">Groups</th>
              )}
              <th rowSpan={2} className="p-4 border border-slate-700 bg-slate-100">Characteristics</th>
              <th rowSpan={2} className="p-4 border border-slate-700 bg-slate-100">Y/N</th>
              {firstRow}
            </tr>
            <tr>{secondRow}</tr>
          </thead>
          <tbody>{charRows}</tbody>
        </table>
      </div>

      {/*
