
function Cell({checked, color, notes}) {

    let styles = "w-32 p-2 bg-slate-100 print:bg-slate-100 border border-slate-700";
    let checkedStyles = "";
    let mark = "";
    switch(color){
        case -1:
            checkedStyles = "w-32 p-2 bg-red-300 print:bg-red-300 border border-slate-700";
            mark = "-";
        break;
        case 0:
            checkedStyles = "w-32 p-2 bg-white print:bg-white border border-slate-700";
        break;
        case 1:
            checkedStyles = "w-32 p-2 bg-yellow-200 print:bg-yellow-200 border border-slate-700";
            mark = "X";
        break;
        case 2:
            checkedStyles = "w-32 p-2 bg-green-300 print:bg-green-300 border border-slate-700";
            mark = "XX";
        break;
        default:
            checkedStyles = styles;
            mark = "";
        break;
    }

    return(
        <td className={checked ? checkedStyles : styles}>{mark} {notes}</td>
    );

}

export default Cell;