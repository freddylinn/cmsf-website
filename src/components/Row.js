import Cell from "./Cell";
import { useState } from "react";

function Row({rowData, group, groupLength, index, setCounts}){

    const [isChecked, setIsChecked] = useState(false);

    const title = rowData[0];
    const cellValues = rowData[1];
    const cells = cellValues.map((item, index) => <Cell key={index} checked={isChecked} color={item[0]} notes={item[1]}/>)

    const titleDefault = "bg-slate-100 w-48 py-4 px-1 border border-slate-700"
    const titleChecked = "bg-white w-48 py-4 px-1 border border-slate-700"
    const checkboxDefault = "bg-slate-100 px-4 py-6 border border-slate-700"
    const checkboxChecked = "bg-white px-4 py-6 border border-slate-700"

    const toggleCheck = (newVal) => {
        setIsChecked(newVal)
        if(newVal){
            for(let i = 0; i < cellValues.length; i++){
                if(cellValues[i][0] === -1){
                    setCounts((prevCounts) => {
                        const updatedRed = [...prevCounts["Red"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedRed[i]++;
                        updatedTotal[i]--;
                        return {...prevCounts, "Red": updatedRed, "Total": updatedTotal}
                    });
                }
                else if(cellValues[i][0] === 1){
                    setCounts((prevCounts) => {
                        const updatedYellow = [...prevCounts["Yellow"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedYellow[i]++;
                        updatedTotal[i]++;
                        return {...prevCounts, "Yellow": updatedYellow, "Total": updatedTotal}
                    });
                }
                else if(cellValues[i][0] === 2){
                    setCounts((prevCounts) => {
                        const updatedGreen = [...prevCounts["Green"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedGreen[i]++;
                        updatedTotal[i]++;
                        return {...prevCounts, "Green": updatedGreen, "Total": updatedTotal}
                    });
                }
            }
        }
        else{
            for(let i = 0; i < cellValues.length; i++){
                if(cellValues[i][0] === -1){
                    setCounts((prevCounts) => {
                        const updatedRed = [...prevCounts["Red"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedRed[i]--;
                        updatedTotal[i]++;
                        return {...prevCounts, "Red": updatedRed, "Total": updatedTotal}
                    });
                }
                else if(cellValues[i][0] === 1){
                    setCounts((prevCounts) => {
                        const updatedYellow = [...prevCounts["Yellow"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedYellow[i]--;
                        updatedTotal[i]--;
                        return {...prevCounts, "Yellow": updatedYellow, "Total": updatedTotal}
                    });
                }
                else if(cellValues[i][0] === 2){
                    setCounts((prevCounts) => {
                        const updatedGreen = [...prevCounts["Green"]]
                        const updatedTotal = [...prevCounts["Total"]]
                        updatedGreen[i]--;
                        updatedTotal[i]--;
                        return {...prevCounts, "Green": updatedGreen, "Total": updatedTotal}
                    });
                }
            } 
        }
    }




    return(
        <tr>
            {index === 0 ? <th rowSpan={groupLength} className="w-20 border border-slate-700"><p className="rotate-180 mx-auto text-lg font-semibold" style={{ writingMode: 'vertical-rl' }}>{group}</p></th> : <></>}
            <td className={isChecked ? titleChecked : titleDefault}>{title}</td>
            <td className={isChecked ? checkboxChecked : checkboxDefault}><input type="checkbox" className="block my-auto mx-auto rounded text-sky-500 focus:border-sky-300 focus:ring focus:ring-offset-0 focus:ring-sky-200 focus:ring-opacity-50" onChange={() => toggleCheck(!isChecked)}/></td>
            {cells}
        </tr>
    );
}


export default Row;