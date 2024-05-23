
function Cell({checked, color, notes}) {

    let styles = "bg-default border border-slate-700";
    let checkedStyles = "";
    switch(color){
        case -1:
            checkedStyles = "p-2 bg-red-300 border border-slate-700";
        break;
        case 0:
            checkedStyles = styles
        break;
        case 1:
            checkedStyles = "p-2 bg-yellow-200 border border-slate-700";
        break;
        case 2:
            checkedStyles = "p-2 bg-green-300 border border-slate-700";
        break;
    }

    return(
        <td className={checked ? checkedStyles : styles}>{notes}</td>
    );

}

export default Cell;