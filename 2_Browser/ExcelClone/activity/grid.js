let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");
let grid = document.querySelector(".grid");
let addressBar = document.querySelector(".address-bar");

let bold = document.querySelector(".bold");   //text style button selectors
let underline = document.querySelector(".underline");
let italic = document.querySelector(".italic");

let center = document.querySelector(".center");  //text alignment button selectors
let left = document.querySelector(".left");
let right = document.querySelector(".right");

let allAlignBtn = document.querySelectorAll(".align");

let fontSize = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let optionFontFamily = document.querySelectorAll(".font-family > option");
let optionFontSize = document.querySelectorAll(".font-size > option");

let cellColor = document.querySelector(".color");
let cellBackgroundColor = document.querySelector(".background-color");

let inactive = "rgb(223, 230, 233)";
let active = "rgb(178, 190, 195)";
let rowColActiveColor = "aqua";
let rowColInactiveColor = "#dfe6e9";

let formulaBar = document.querySelector(".formula-bar");

let allCells = document.querySelectorAll(".grid .cell");  //This ensures that initial first cell of sheet is always clicked

let SheetCollectionDB = [];
let sheetDB = [];
let rows = 100;
let cols = 26;


// Make a common grid UI for all sheets. And shuffle it with new sheets DB and the current sheet's cell properties
for (let i = 0;i < rows;i++) {  // Creating initial left column
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class", "box");
    colBox.setAttribute("rid", i);
    leftCol.appendChild(colBox);
}
for (let i = 0;i < 26;i++) {  // Creating initial top row
    let topRowCell = document.createElement("div");
    topRowCell.setAttribute("class", "top-row-cells");
    topRowCell.setAttribute("cid", i);

    let rowBox = document.createElement("div");
    rowBox.innerText = String.fromCharCode(65+i);

    topRowCell.appendChild(rowBox);
    topRow.appendChild(topRowCell);   
}
for (let i = 0;i < rows;i++) {  // Creating grid box (with all cells of grid) of single sheet
    let gridRow = document.createElement("div");
    gridRow.setAttribute("class", "row");
    for (let j = 0;j < cols;j++) {
        let gridCell = document.createElement("div");
        // gridCell.innerText = `${String.fromCharCode(65+j)}${i+1}`
        gridCell.setAttribute("class", "cell");
        gridCell.setAttribute("rid", i);
        gridCell.setAttribute("cid", j);
        gridCell.setAttribute("contenteditable", "true");
        gridRow.appendChild(gridCell);

        gridCell.addEventListener("click", function() {  // To put value in address bar for easy access of cell throughout
            let cellRID = Number(gridCell.getAttribute("rid"));
            let cellCID = Number(gridCell.getAttribute("cid"));
            addressBar.value = `${String.fromCharCode(65 + cellCID)}${cellRID+1}`;
        });
        setCellUIProperties(gridCell);  // Initial cell properties management with respect to click event and current sheet
    }
    grid.appendChild(gridRow);
}


function setCellUIProperties(cell) {   //Set to default properties values on individual cell click
    cell.addEventListener("click", function() {
        let address = addressBar.value;
        let {rid, cid} = getRIDCIDfromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // On cell click, add its properties
        cell.innerText = cellProp.value;
        bold.style.backgroundColor = cellProp.bold ? active : inactive;
        italic.style.backgroundColor = cellProp.italic ? active : inactive;
        underline.style.backgroundColor = cellProp.underline ? active : inactive;
        cell.style.fontSize = cellProp.fontSizeVal + "px";
        cell.style.fontFamily = cellProp.fontFamilyVal;
        cell.style.color = cellProp.color;
        cellColor.value = cellProp.color;
        cellBackgroundColor.value = cellProp.BGcolor;
        formulaBar.value = cellProp.formula;
        

        let fontFamilySelectIdx;  // This sets to active cell font-family 
        for (let i = 0;i < optionFontFamily.length;i++) {
            if (optionFontFamily[i].value == cellProp.fontFamilyVal) fontFamilySelectIdx = i;
            optionFontFamily[i].selected = false;
        }
        optionFontFamily[fontFamilySelectIdx].selected = true;

        let fontSizeSelectIdx;   // This sets to active cell font-size
        for (let i = 0;i < optionFontSize.length;i++) {
            if (optionFontSize[i].value == cellProp.fontSizeVal) fontSizeSelectIdx = i;
            optionFontSize[i].selected = false;
        }
        optionFontSize[fontSizeSelectIdx].selected = true;

        switch (cellProp.align) {   // This sets to active cell font-alignment
            case "center":
                center.style.backgroundColor = active;
                left.style.backgroundColor = inactive;
                right.style.backgroundColor = inactive;
                cellProp.align = "center";
                break;
            case "left":
                center.style.backgroundColor = inactive;
                left.style.backgroundColor = active;
                right.style.backgroundColor = inactive;
                cellProp.align = "left";
                break;
            case "right":
                center.style.backgroundColor = inactive;
                left.style.backgroundColor = inactive;
                right.style.backgroundColor = active;
                cellProp.align = "right";
                break;
        }

    });

}


// Handling sheets
let addSheetBtn = document.querySelector(".add-sheets-btn-container");
let sheetsListContainer = document.querySelector(".sheets-list-container");
let firstSheet = document.querySelector(".sheet");

// Excel always has one sheet by default. So that sheet to be active
firstSheet.addEventListener("click", handleSheetActiveness);
firstSheet.click();

addSheetBtn.addEventListener("click", function() {
    let totalSheets = document.querySelectorAll(".sheet");
    let lastSheet = totalSheets[totalSheets.length-1];
    let lastSheetID = Number(lastSheet.getAttribute("id"));

    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("id", `${lastSheetID+1}`);
    newSheet.textContent = `Sheet${lastSheetID+2}`;
    sheetsListContainer.appendChild(newSheet);
    
    // Maintaining sheets activeness on user click
    for (let i = 0;i < totalSheets.length;i++) {  // Make newly added sheet tab active
        totalSheets[i].classList.remove("active");
    }
    newSheet.classList.add("active");

    newSheet.addEventListener("click", handleSheetActiveness);  // To keep track of activeness of sheets

    createNewSheet();  // Create entire new sheet and with its cells properties

    sheetDB = SheetCollectionDB[lastSheetID+1];  // Assign new sheet as current UI sheet
    setSheetUI();
});

function handleSheetActiveness(e) {
    let curSheet = e.currentTarget;  // Gets element on which this eventlistener was called 
    let totalSheets = document.querySelectorAll(".sheet");
    for (let i = 0;i < totalSheets.length;i++) {
        totalSheets[i].classList.remove("active");
    }

    curSheet.classList.add("active");

    let sheetId = curSheet.getAttribute("id");
    if (!SheetCollectionDB[sheetId]) {  // This case is when you put a entire new workbook and there are no sheets. So you must create one as default and make that first sheet active
        createNewSheet();  // This will generate DB for new sheet
    }

    sheetDB = SheetCollectionDB[sheetId];

    setSheetUI();  // Set UI corresponding to current sheet properties
}

function createNewSheet() {
    let newMonoSheetDB = [];
    for (let i = 0;i < rows;i++) {  // Set individual properties for each cell of a single sheet
        let sheetRows = [];
        for (let j = 0;j < cols;j++) {
            sheetRows.push({  //Default properties of every cell of sheet
                bold : false,
                italic : false,
                underline : false,
                align : "center",
                fontSizeVal : "14",
                fontFamilyVal : "sans-serif",
                color : "#000000",
                BGcolor : "#e0ffff",
                value : "",
                formula : "",
                children : []
            });

            // let cell = grid.querySelector(`.cell[rid="${i}"][cid="${j}"]`);  //Get address of cell
            // cell.click();
        }
        newMonoSheetDB.push(sheetRows);
      
    }
    SheetCollectionDB.push(newMonoSheetDB);  // Push entire mono sheet details in the main Sheet collection DB
}

function setSheetUI() {  // Put complete UI of current sheet properties
    for (let i = 0;i < rows;i++) {
        for (let j = 0;j < cols;j++) {
            let cell = grid.querySelector(`.cell[rid="${i}"][cid="${j}"]`);  //Get address of cell
            let cellProp = sheetDB[i][j];
            cell.click();
        }
    }
    clickFirstCellByDefault();  // Make sure that every click to be at first cell by defualt
}

function clickFirstCellByDefault() {
    let firstCell = document.querySelector(".grid .cell");  //This ensures that initial first cell of sheet is always clicked
    firstCell.click();
}

// Initial first click for the sheet
clickFirstCellByDefault();

// Update cell properties on click
bold.addEventListener("click", function() {   // Update cell bold property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];
    
    cellProp.bold = !cellProp.bold; 
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? active : inactive;
});

italic.addEventListener("click", function() {  // Update cell italic property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.italic = !cellProp.italic; 
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? active : inactive;
});

underline.addEventListener("click", function() {   // Update cell underline property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.underline = !cellProp.underline; 
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? active : inactive;
});

for(let i = 0;i < allAlignBtn.length;i++) {   // Update cell alignment property
    allAlignBtn[i].addEventListener("click", function(e) {
        let cellDetails = getActiveCell();
        let cell = cellDetails[0];
        let cellProp = cellDetails[1];
        

        cellProp.align = e.target.classList[0];
        cell.style.textAlign = cellProp.align;
        switch (cellProp.align) {
            case "center":
                center.style.backgroundColor = active;
                left.style.backgroundColor = inactive;
                right.style.backgroundColor = inactive;
                cellProp.align = "center";
                break;
            case "left":
                center.style.backgroundColor = inactive;
                left.style.backgroundColor = active;
                right.style.backgroundColor = inactive;
                cellProp.align = "left";
                break;
            case "right":
                center.style.backgroundColor = inactive;
                left.style.backgroundColor = inactive;
                right.style.backgroundColor = active;
                cellProp.align = "right";
                break;
        }

    });
}

fontSize.addEventListener("change", function() {   // Update cell font size property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.fontSizeVal = fontSize.value;
    cell.style.fontSize = cellProp.fontSizeVal + "px";
});

fontFamily.addEventListener("change", function() {    // Update cell font family property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.fontFamilyVal = fontFamily.value;
    cell.style.fontFamily = cellProp.fontFamilyVal;
});

cellColor.addEventListener("change", function() {   // Update active cell font color
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.color = cellColor.value;
    cell.style.color = cellProp.color;
    cellColor.value = cellProp.color;
});

cellBackgroundColor.addEventListener("change", function() {   // Update active cell background color
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.BGcolor = cellBackgroundColor.value;
    cell.style.backgroundColor = cellProp.BGcolor;
    cellBackgroundColor.value = cellProp.BGcolor;
});


function getActiveCell() {   // Get current cell & its properties which is active(clicked)
    let address = addressBar.value;
    let {rid, cid} = getRIDCIDfromAddress(address);
    let cell = grid.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell, cellProp];
}

function getRIDCIDfromAddress(address) {   // Get current cell row id, col id which is active(clicked) 
    let cid = Number(address.charCodeAt(0) - 65);
    let rid = Number(address.slice(1)) - 1;
    return {rid, cid};
}



