let fs = require("fs");

function removeLineBreaks(filePath) {
    if (fs.lstatSync(filePath).isFile() == true) {
        processLineBreaksRemoval(filePath);
    }   
    else {
        console.log("File does not exists. Type help for commands.");
    } 
}

function processLineBreaksRemoval(filePath) {
    let contentArr = fs.readFileSync(filePath,"utf-8").toString().split("\n");
    let newContentArr = [];
    for (let i = 0;i < contentArr.length;i++) {
        if (contentArr[i].length > 2) {
            newContentArr.push(contentArr[i]);
        }
    }
    let finalContent = newContentArr.join("\n");
    fs.writeFileSync(filePath, finalContent);
}

module.exports = {
    removeLineBreaks: removeLineBreaks
}