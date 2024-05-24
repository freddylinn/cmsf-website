import Cell from "./Cell";
import { useState } from "react";

function Row({rowData}){

    const [isChecked, setIsChecked] = useState(false);

    const title = rowData[0];
    const cellValues = rowData[1];
    const cells = cellValues.map(item => <Cell checked={isChecked} color={item[0]} notes={item[1]}/>)

    const titleDefault = "bg-slate-100 w-48 py-4 px-1 border border-slate-700"
    const titleChecked = "bg-white w-48 py-4 px-1 border border-slate-700"
    const checkboxDefault = "bg-slate-100 p-4 px-1 border border-slate-700"
    const checkboxChecked = "bg-white p-4 px-1 border border-slate-700"


    return(
        <tr>
            <td className={isChecked ? titleChecked : titleDefault}>{title}</td>
            <td className={isChecked ? checkboxChecked : checkboxDefault}><input type="checkbox" onChange={() => setIsChecked((prev) => !prev)}/></td>
            {cells}
        </tr>
    );
}


//const temp = rowData.map((item, index) => <Cell checked={true} color={item[0]} notes={item[1]} />);


export default Row;