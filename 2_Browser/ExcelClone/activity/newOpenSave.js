let newFile = document.querySelector(".new");
let openFile = document.querySelector(".open");
let saveFile = document.querySelector(".download");

saveFile.addEventListener("click", function() {  // Download file
    let jsonData = JSON.stringify(sheetDB);
    let file = new Blob([jsonData], { type: 'application/json' }); // Convert to file like object
    let fileURL = URL.createObjectURL(file); // Convert to URL for anchor href

    let a = document.createElement("a");
    a.href = fileURL;
    a.download = "sheetDB.json";  // Download attribute with filename
    a.click();
    
});

openFile.addEventListener("click", function() {  // Open file
    let newSheetDB;
    let inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.click();


    inputFile.addEventListener("change", function() {
        let fr = new FileReader();  // Let's read file content asynchronously

        let allFiles = inputFile.files;  // List of all files
        let fileObj = allFiles[0];  // First file of list
        
        fr.readAsText(fileObj);  // Reads file content
        fr.addEventListener("load", function() {  // Once loaded the content is put in the result attribute
            newSheetDB = JSON.parse(fr.result);
            // console.log(newSheetDB[0]);

            for (let i = 0;i < rows;i++) {  // Set individual properties for each cell of a single sheet
                for (let j = 0;j < cols;j++) {
                    let cell = grid.querySelector(`.cell[rid="${i}"][cid="${j}"]`);  //Get address of cell
                    let cellProp = newSheetDB[i][j];
                    fileOpenSheetProperties(cell, cellProp);
                }
            }

            sheetDB = newSheetDB;
        });
    });
});

function fileOpenSheetProperties(cell, cellProp) {  // Set sheet properties to opened file values

    cell.innerText = cellProp.content;
    cell.style.fontSize = cellProp.fontSizeVal + "px";
    cell.style.fontFamily = cellProp.fontFamilyVal;
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.color = cellProp.color;
    cell.style.backgroundColor = cellProp.BGcolor;
    cell.style.textAlign = cellProp.align;

}