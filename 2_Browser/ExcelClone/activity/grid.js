//#b2bec3 -> active(dark), #dfe6e9 -> inactive(light)

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

let sheetDB = [];
let rows = 100;
let cols = 26;


for (let i = 0;i < rows;i++) {  // Creating initial left column
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class", "box");
    leftCol.appendChild(colBox);
}
for (let i = 0;i < 26;i++) {  // Creating initial top row
    let rowBox = document.createElement("div");
    rowBox.innerText = String.fromCharCode(65+i);
    rowBox.setAttribute("class", "cell");
    topRow.appendChild(rowBox);   
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

        gridCell.addEventListener("click", function() {
            let cellRID = Number(gridCell.getAttribute("rid"));
            let cellCID = Number(gridCell.getAttribute("cid"));
            addressBar.value = `${String.fromCharCode(65 + cellCID)}${cellRID+1}`;
        });
    }
    grid.appendChild(gridRow);
}



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
            BGcolor : "#e0ffff"
        });

        let cell = grid.querySelector(`.cell[rid="${i}"][cid="${j}"]`);  //Get address of cell
        setCellProperties(cell);
    }
    sheetDB.push(sheetRows);
}

function setCellProperties(cell) {   //Set to default properties values on individual cell click
    cell.addEventListener("click", function() {
        let address = addressBar.value;
        let {rid, cid} = getRIDCIDfromAddress(address);
        let cellProp = sheetDB[rid][cid];

        // On cell click, add its properties
        bold.style.backgroundColor = cellProp.bold ? "#b2bec3" : "#dfe6e9";
        italic.style.backgroundColor = cellProp.italic ? "#b2bec3" : "#dfe6e9";
        underline.style.backgroundColor = cellProp.underline ? "#b2bec3" : "#dfe6e9";
        cell.style.fontSize = cellProp.fontSizeVal + "px";
        cell.style.fontFamily = cellProp.fontFamilyVal;
        cell.style.color = cellProp.color;
        cellColor.value = cellProp.color;
        // cell.style.backgroundColor = cellProp.BGcolor;
        cellBackgroundColor.value = cellProp.BGcolor;

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
                center.style.backgroundColor = "#b2bec3";
                left.style.backgroundColor = "#dfe6e9";
                right.style.backgroundColor = "#dfe6e9";
                cellProp.align = "center";
                break;
            case "left":
                center.style.backgroundColor = "#dfe6e9";
                left.style.backgroundColor = "#b2bec3";
                right.style.backgroundColor = "#dfe6e9";
                cellProp.align = "left";
                break;
            case "right":
                center.style.backgroundColor = "#dfe6e9";
                left.style.backgroundColor = "#dfe6e9";
                right.style.backgroundColor = "#b2bec3";
                cellProp.align = "right";
                break;
        }

    });
}

let allCells = document.querySelectorAll(".grid .cell");  //This ensures that initial first cell of sheet is always clicked
allCells[0].click();

// Update cell properties on click
bold.addEventListener("click", function() {   // Update cell bold property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];
    
    cellProp.bold = !cellProp.bold; 
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    bold.style.backgroundColor = cellProp.bold ? "#b2bec3" : "#dfe6e9";
});

italic.addEventListener("click", function() {  // Update cell italic property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.italic = !cellProp.italic; 
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    italic.style.backgroundColor = cellProp.italic ? "#b2bec3" : "#dfe6e9";
});

underline.addEventListener("click", function() {   // Update cell underline property
    let cellDetails = getActiveCell();
    let cell = cellDetails[0];
    let cellProp = cellDetails[1];

    cellProp.underline = !cellProp.underline; 
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    underline.style.backgroundColor = cellProp.underline ? "#b2bec3" : "#dfe6e9";
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
                center.style.backgroundColor = "#b2bec3";
                left.style.backgroundColor = "#dfe6e9";
                right.style.backgroundColor = "#dfe6e9";
                break;
            case "left":
                center.style.backgroundColor = "#dfe6e9";
                left.style.backgroundColor = "#b2bec3";
                right.style.backgroundColor = "#dfe6e9";
                break;
            case "right":
                center.style.backgroundColor = "#dfe6e9";
                left.style.backgroundColor = "#dfe6e9";
                right.style.backgroundColor = "#b2bec3";
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