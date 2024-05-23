import charData from './data/characteristics.json';
import locData from './data/locations.json';

import Cell from './components/Cell';

function App() {

  const characteristics = charData;
  const locations = locData;
  console.log(Object.values(locations));

  const firstRow = Object.keys(locations).map(item => <th colSpan={locations[item].length} className="p-8 border border-slate-700">{item}</th>)
  const secondRow = Object.values(locations).flatMap(arr => arr).map(value => <th className="p-4 border border-slate-700">{value}</th>);
  const temp = characteristics["Rate of Speech"]["Slow rate of speech"].map(item => <Cell checked={true} color={item[0]} notes={item[1]} />);
  // TO-DO: Make row component that adjusts checked prop based on checkbox


  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center my-6">Colorado Motor Speech Framework: Scoring Form</h1>
      <table className="table-auto text-center border border-slate-700 border-collapse mx-auto">
        <thead>
        <tr>
          <th rowSpan={2} className="p-4">Y/N</th>
          {firstRow}
        </tr>
        <tr>
          {secondRow}
        </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border border-slate-700"><input type="checkbox"/></td>
            {temp}
          </tr>
        </tbody>
      </table>
    </div>

  );
}

export default App;
