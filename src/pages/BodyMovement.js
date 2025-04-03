import charData from "../data/movement-characteristics.json";
import locData from "../data/locations.json";

import Row from "../components/Row";
import { useState } from "react";

function BodyMovement() {
  const characteristics = charData;
  const locations = locData;

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
        form="movement"
      />
    ))
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
      <p className="min-w-64 max-w-256 w-1/2 mx-auto p-6 m-12 bg-gray-100 rounded-md print:hidden">
        This is an optional additional body movement form to document
        confirmatory behaviors that might help support the perceptual
        observations from the CMSF form. Note that motor speech diagnosis should
        be made primarily based on speech and oral-motor findings, and not body
        movement observations. However, body movement observations in this form
        can be used as confirmatory signs of a motor speech disorder.
      </p>
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
        className="block print:hidden rounded-lg text-lg mx-auto px-5 py-3 mt-8 mb-12 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-semibold"
      >
        {hidden ? "Show" : "Hide"} Unchecked Rows
      </button>
      <div className="flex w-2/3 flex-col items-start mx-auto mb-16">
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

export default BodyMovement;
