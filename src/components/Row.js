import Cell from "./Cell";
import { useState } from "react";

function Row({rowData}){

    const [isChecked, setIsChecked] = useState(false);

    const title = rowData[0];
    const cellValues = rowData[1];
    const cells = cellValues.map(item => <Cell checked={isChecked} color={item[0]} notes={item[1]}/>)

    return(
        <tr>
            <td className="p-4 border border-slate-700">{title}</td>
            <td className="p-4 border border-slate-700"><input type="checkbox" onChange={() => setIsChecked((prev) => !prev)}/></td>
            {cells}
        </tr>
    );
}


//const temp = rowData.map((item, index) => <Cell checked={true} color={item[0]} notes={item[1]} />);


export default Row;