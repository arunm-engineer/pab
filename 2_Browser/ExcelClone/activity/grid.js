let leftCol = document.querySelector(".left-col");
let topRow = document.querySelector(".top-row");
let grid = document.querySelector(".grid");
let addressBar = document.querySelector(".address-bar");
let bold = document.querySelector(".bold");
let rows = 100;
let cols = 26;

for (let i = 0;i < rows;i++) {
    let colBox = document.createElement("div");
    colBox.innerText = i+1;
    colBox.setAttribute("class", "box");
    leftCol.appendChild(colBox);
}
for (let i = 0;i < 26;i++) {
    let rowBox = document.createElement("div");
    rowBox.innerText = String.fromCharCode(65+i);
    rowBox.setAttribute("class", "cell");
    topRow.appendChild(rowBox);   
}

for (let i = 0;i < rows;i++) {
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

bold.addEventListener("click", function() {
    let address = addressBar.value;
    let {rid, cid} = getRIDCIDfromAddress(address);
    let cell = grid.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    console.log(cell);
    cell.style.fontWeight = "none";
});


let allCells = document.querySelectorAll(".grid .cell");
allCells[0].click();

function getRIDCIDfromAddress(address) {
    let cid = Number(address.charCodeAt(0) - 65);
    let rid = Number(address.slice(1)) - 1;
    return {rid, cid};
}