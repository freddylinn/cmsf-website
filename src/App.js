import charData from './data/characteristics.json';
import locData from './data/locations.json';

import Row from './components/Row';
import { useState } from 'react';

function App() {

  const characteristics = charData;
  const locations = locData;

  const initialCount = Object.values(locations).flatMap(arr => arr).map(value => 0);
  const [counts, setCounts] = useState({
    "Yellow": initialCount,
    "Green": initialCount,
    "Red": initialCount, 
    "Total": initialCount
  });
  const yellowCells = counts["Yellow"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>)
  const greenCells = counts["Green"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>)
  const redCells = counts["Red"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>)
  const totalCells = counts["Total"].map((item, index) => <td key={index} className="p-2 border border-slate-700">{item}</td>)

  const firstRow = Object.keys(locations).map(item => <th colSpan={locations[item].length} key={item} className="p-4 border border-slate-700">{item}</th>);
  const secondRow = Object.values(locations).flatMap(arr => arr).map(value => <th key={value} className="p-4 border border-slate-700">{value}</th>);
  const charRows = Object.keys(characteristics).map(groupName => Object.entries(characteristics[groupName]).map(item => <Row key={item} rowData={item} setCounts={setCounts}/>));


  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center my-6">Colorado Motor Speech Framework: Scoring Form</h1>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto">
        <thead>
        <tr>
          <th rowSpan={2} className="p-4 border border-slate-700">Characteristics</th>
          <th rowSpan={2} className="p-4">Y/N</th>
          {firstRow}
        </tr>
        <tr>
          {secondRow}
        </tr>
        </thead>
        <tbody>
          {charRows}
        </tbody>
      </table>
      <h2 className="mt-8 text-center">*Count functionality still in progress</h2>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mt-1">
        <thead>
          <tr>
            <th className="p-4 border border-slate-700"></th>
            {secondRow}
          </tr>
          <tr>
            <td className="bg-yellow-200 p-2 border border-slate-700 font-semibold">Total Yellow Count</td>
            {yellowCells}
          </tr>
          <tr>
            <td className="bg-green-300 p-2 border border-slate-700 font-semibold">Total Green Count</td>
            {greenCells}
          </tr>
          <tr>
            <td className="bg-red-300 p-2 border border-slate-700 font-semibold">Total Red Count</td>
            {redCells}
          </tr>
          <tr>
            <td className="w-48 p-2 border border-slate-700 font-semibold">Total Yellow & Green Count Subtracting Red</td>
            {totalCells}
          </tr>
        </thead>
      </table>
    </div>

  );
}

export default App;
