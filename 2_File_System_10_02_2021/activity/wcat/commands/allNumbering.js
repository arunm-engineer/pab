let fs = require("fs");


function lineNumbering(filePath) {
    if (fs.lstatSync(filePath).isFile() == true) {
        processAllLinesNumbering(filePath);
    }   
    else {
        console.log("File does not exists. Type help for commands.");
    } 
}

function processAllLinesNumbering(filePath) {
    let contentArr = fs.readFileSync(filePath,"utf-8").toString().split("\n");
    let lineNum = 1;
    for (let i = 0;i < contentArr.length;i++) {
        contentArr[i] = lineNum + ". " + contentArr[i];
        lineNum++;
    }
    let finalContent = contentArr.join("\n");
    fs.writeFileSync(filePath, finalContent);
}

module.exports = {
    lineNumbering: lineNumbering
}