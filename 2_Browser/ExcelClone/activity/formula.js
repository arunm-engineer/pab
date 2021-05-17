for (let i = 0;i < rows;i++) {
    for (let j = 0;j < cols;j++) {
        allCells[i].addEventListener("blur", function() {  // On blur update cell data in UI & sheetDB
            let data = allCells[i].innerText;  // Get data of cell
            let cellDetails = getActiveCell();
            let cell = cellDetails[0];
            let cellProp = cellDetails[1];

            cellProp.value = data;
        });
    }
}

formulaBar.addEventListener("keydown", function(e) {  // On formula entered evaluate and update data
    if (e.key === "Enter" && formulaBar.value) {
        let inputFormula = formulaBar.value;  //Get user entered formula
        let value = evaluateFormula(inputFormula); // Evaluate user formula
        setCellPostEvaluation(value, inputFormula);
    }
});

function evaluateFormula(formula) {
    let formulaTokens = formula.split(" ");
    for (let i = 0;i < formulaTokens.length;i++) {
        let asciiVal = formulaTokens[i].charCodeAt(0); //Get ascii value of every expression

        if (asciiVal >= 65 && asciiVal <= 90) { //Check if expression is valid address value
            let {rid, cid} = getRIDCIDfromAddress(formulaTokens[i]);
            let value = sheetDB[rid][cid].value;
            formulaTokens[i] = value;  // Update value of cell to replace expression
        }
    }

    let parsedFormula = formulaTokens.join(" ");  // Parsed expression for calculation
    return eval(parsedFormula); // Use eval to calculate
}

function setCellPostEvaluation(value, formula) {
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];


    cell.innerText = value;
    cellProp.value = value;
    cellProp.formula = formula;
}



