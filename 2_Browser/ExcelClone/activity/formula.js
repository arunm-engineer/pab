for (let i = 0;i < rows;i++) {
    for (let j = 0;j < cols;j++) {
        allCells[i].addEventListener("blur", function(e) {  // Blur event gets triggered first compared to click ( so you can get base address directly from address bar without confusion of click( click event added to same element in grid.js ) and blur event on same element

            let cellDetails = getActiveCell();
            let cell = cellDetails[0];
            let cellProp = cellDetails[1];
            let activeAddress = addressBar.value;

            let enteredData = cell.innerText;
            
            if (cellProp.value == enteredData) {  // If hardcoded new value and previous value ( access from DB ) are same, no operation to be made
                return;
            }
            if (cellProp.formula) {  // If active cell has a formula means a child cell, so break parent-child relationship first, then continue remaining operation
                removeChildFromParent(cellProp, activeAddress);
            }
            
            cellProp.value = enteredData; // Updating data from active cell UI in DB
            
            // If intermediate parent gets updated ( hardcoded value ) -> perform updated evaluation on dependents ( child cells ) 
            updateChildrenCells(cellProp);
        });
    }
}

formulaBar.addEventListener("keydown", function(e) {  // On formula registry in formula bar
    if (e.key === "Enter" && formulaBar.value) {
        let inputFormula = formulaBar.value;
        let activeAddress = addressBar.value;
        let {rid, cid} = getRIDCIDfromAddress(activeAddress);
        let cellProp = sheetDB[rid][cid];

        if (inputFormula != cellProp.formula) {  // If formula is updated to new formula, break it's parent-child relationship, then evaluate on new formula
            removeChildFromParent(cellProp, activeAddress);
        }

        let evaluatedValue = evaluateFormula(inputFormula);  // Evaluate the input formula
        addChildToParent(activeAddress, inputFormula);  // Connect parent - child relationship from formula
        setCellUIAndProp(evaluatedValue, inputFormula);  // Update cell's evaluated value in UI and DB

        // Update formula again on change in formula
        updateChildrenCells(cellProp);
    }
});

function removeChildFromParent(cellProp, activeAddress) {   // Break child-parent relationship
    let formula = cellProp.formula;
    let decodedFormula = formula.split(" ");
    for (let i = 0;i < decodedFormula.length;i++) {
        let asciiVal = decodedFormula[i].charCodeAt(0);  
        if (asciiVal >= 65 && asciiVal <= 90) {
            let {rid, cid} = getRIDCIDfromAddress(decodedFormula[i]);
            let parentCellProp = sheetDB[rid][cid];
            let removeIdx = parentCellProp.children.indexOf(activeAddress);  // Get index of child from parent to remove child
            parentCellProp.children.splice(removeIdx, 1);  // Remove child in parent
        }
    }

    cellProp.formula = "";  // Nullify formula ( Empty formula )
}



function evaluateFormula(formula) {  // Formula evaluation
    let decodedFormula = formula.split(" ");  // Decode formula for easy parsing
    for (let i = 0;i < decodedFormula.length;i++) {
        let asciiVal = decodedFormula[i].charCodeAt(0);  
        if (asciiVal >= 65 && asciiVal <= 90) {  // Check for a valid address to evaluate
            let {rid, cid} = getRIDCIDfromAddress(decodedFormula[i]);
            let cellProp = sheetDB[rid][cid];   
            decodedFormula[i] = cellProp.value;
        }
    }

    let encodedFormula = decodedFormula.join(" "); // Finally encode after parsing of formula to evaluate
    return eval(encodedFormula);  // Evaluate
}

function addChildToParent(childAddress, formula) {  // Make parent - child relationship   ( Base address of cell to be added )
    let decodedFormula = formula.split(" ");
    for (let i = 0;i < decodedFormula.length;i++) {
        let asciiVal = decodedFormula[i].charCodeAt(0);
        if (asciiVal >= 65 && asciiVal <= 90) {  // If valid parent -> add child(active) cell in parent
            let parentAddress = decodedFormula[i];
            let {rid, cid} = getRIDCIDfromAddress(parentAddress);
            let parentProp = sheetDB[rid][cid];
            parentProp.children.push(childAddress);
        }
    }
}

function setCellUIAndProp(value, formula) {  // Update evaluated value in UI and DB in active cell
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cell.innerText = value;
    cellProp.value = value;
    cellProp.formula = formula;
}

function updateChildrenCells(parentProp) {  // Update every children value ( on parent value change by evaluating ) from root -> recursively
    let children = parentProp.children;
    for (let i = 0;i < children.length;i++) {
        let childAddress = children[i];
        let {rid, cid} = getRIDCIDfromAddress(childAddress);
        let childProp = sheetDB[rid][cid];
        let childFormula = childProp.formula;

        let evaluatedValue = evaluateFormula(childFormula);
        setUpdatedCellUIAndProp(evaluatedValue, childFormula, rid, cid);
        updateChildrenCells(childProp);
    }
}

function setUpdatedCellUIAndProp(value, formula, rid, cid) {  // Update every children value ( on parent value change by evaluating ) in UI and DB
    let cell = grid.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    
    cell.innerText = value;
    cellProp.value = value;
    cellProp.formula = formula;
}


