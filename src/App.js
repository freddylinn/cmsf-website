import charData from './data/characteristics.json';
import locData from './data/locations.json';
import customData from './data/custom.json';

import Row from './components/Row';
import Modal from './components/Modal';
import { useState } from 'react';

function App() {

  const characteristics = charData;
  const locations = locData;
  const customInputs = customData;

  const [hidden, setHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const modalDescription = <>
  <p className="text-lg leading-relaxed text-left indent-12 mb-8 w-11/12 mx-auto">This is a tool to help guide the assessment of motor speech disorders. There are suggested tasks to administer in the popup window if you hover over the blue “i” in the far left-hand column. 
  Using those tasks, you will identify which characteristics you are observing with your patient by checking the yes/no box for that characteristic. The resulting boxes for that row will be highlighted to indicate if 
  that characteristic is a highly distinguishing feature for a particular motor speech disorder subtype (green and XX), a common feature for that subtype (yellow and X), not common (blank), or would be very unexpected 
  (red and -). As you scroll down, you can then click the box “Hide Unchecked Rows” to isolate only the observed characteristics. You will also notice a count total at the very bottom to assist your diagnostic decision 
  making. However, remember that your clinical knowledge should be used foremost over the count of X's to make a decision. We also recommend logging participant self-rating of their speech and then your clinician estimates 
  of intelligibility, naturalness, and efficiency in the provided box at the end. When you are completed with the assessment, you can save it as a PDF by going right clicking the window, selecting “Print,” and changing 
  the destination to “Save as PDF.” If you have any comments or suggestions, please email Dr. Allison Hilger at <a className="underline text-blue-500" href="mailto:Allison.Hilger@colorado.edu">Allison.Hilger@colorado.edu</a></p>
  <p className="leading-relaxed text-center mb-8 w-1/2 mx-auto text-slate-600">This tool was developed by Kylie Dunne-Platero, MA, CCC-SLP, Caitlin Cloud, MA, CCC-SLP, and Allison Hilger, PhD, CCC-SLP. This web tool was developed by Frederick Linn (<a href="mailto:frederick.linn@colorado.edu" className="underline text-blue-500">Frederick.Linn@colorado.edu.</a>)</p>
  </>

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

  const charRows = Object.keys(characteristics).map(groupName => Object.entries(characteristics[groupName])
            .map((item, index) => <Row key={item} rowData={item} group={groupName} groupLength={Object.keys(characteristics[groupName]).length} index={index} setCounts={setCounts} hidden={hidden}/>));

  const customRows = Object.entries(customInputs).map(pairs => {
    const title = pairs[0];
    const values = pairs[1];
    let inputVal = <></>;
    let outOf = '';
    if(values["type"] === "number"){
      inputVal = <input type="number" min={0} max={values["max"]} className="rounded m-1"/>
      if(values["value"] === "number"){
        outOf = `/ ${values["max"]}`
      }
      else if(values["value"] === "percentage"){
        outOf = "%"
      }
    }
    else if(values["type"] === "select"){
      inputVal = <select className="rounded m-1" defaultValue="default"><option value="default" disabled defaultValue>--Select--</option>{values["options"].map(opt => <option>{opt}</option>)}</select>
    }
    return(
      <tr>
        <th className="px-6 border border-slate-700">
          <div className="flex justify-center items-center gap-2">
            <span>{title}</span>
              <div className="has-tooltip">
              <span className="tooltip rounded leading-relaxed shadow-lg p-4 bg-gray-50 text-slate-800 text-md font-semibold max-w-96 text-left">{values["tip"].split('\n').map((item, key) => {return <p className="my-2 text-left" key={key}>{item}</p>})}</span>
              <button className="print:hidden px-1 rounded bg-sky-200 text-sm text-slate-800">i</button>
              </div>
          </div>
        </th>
        <td className="p-4 border border-slate-700">{inputVal} {outOf}</td>
      </tr>
    )
  })


  return (
    <div className="">
      <header className="flex justify-around items-center p-4 mb-8 bg-amber-100 print:hidden">
        <h1 className="text-2xl font-bold text-center bg-amber-100">Colorado Motor Speech Framework</h1>
        <p className=" text-center rounded-lg">Contact Dr. Allison Hilger with comments or questions at <a className="underline text-blue-500" href="mailto:Allison.Hilger@colorado.edu">Allison.Hilger@colorado.edu</a></p>
      </header>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Welcome to the Colorado Motor Speech Framework!"
        description={modalDescription}
      >
        <button onClick={() => setModalOpen(false)} className="px-8 py-2 text-white bg-sky-400 hover:bg-sky-500 rounded text-lg">Close</button>
      </Modal>
      <div className="flex items-center justify-around mb-8">
        <div className="mt-2 w-128 flex flex-col gap-2">
          <label htmlFor="patientName">Patient Name (optional)</label>
          <input className="rounded w-64" type="text" id="patientName"/>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button onClick={() => setModalOpen(true)} className="px-5 py-2 mt-2 bg-sky-400 hover:bg-sky-500 rounded text-white print:bg-white">Show Instructions</button>
          <p className="w-128 text-center print:hidden">Note: to save as a PDF, right click this webpage and select “Print” (alternatively, press ctrl + p on Windows or cmd + p on Mac) then change the printing destination to “Save as PDF.” <em>If you exit out of this page or refresh, you will lose your data.</em></p>
        </div>
      </div>
      <table className="table-fixed text-center border border-slate-700 border-collapse mx-auto">
        <thead>
        <tr>
          {!hidden ? <th rowSpan={2} className='border border-slate-700'>Groups</th> : <></>}
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
      <button onClick={() => setHidden(prev => !prev)} className="block print:hidden rounded-lg text-lg mx-auto px-5 py-3 mt-8 mb-12 bg-sky-400 hover:bg-sky-500 active:bg-sky-600 text-white font-semibold">{hidden ? "Show" : "Hide"} Unchecked Rows</button>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto mt-10">
        <tbody>
          {customRows}
        </tbody>
      </table>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto my-10">
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
      <footer className="bg-amber-100 p-4">
        <p className="pl-5 w-full md:w-1/2 text-slate-800 text-center mx-auto">Please cite this tool if you use it in your research: Dunne-Platero, K., Cloud, C. S., & Hilger, A. (2024, May 8). Colorado Motor Speech Framework. https://doi.org/10.17605/OSF.IO/PM936</p>
      </footer>
    </div>

  );
}

export default App;
