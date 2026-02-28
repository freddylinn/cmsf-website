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
        <th className="px-6 border border-slate-700 w-48 min-w-[12rem]">
          <div className="flex justify-center items-center
