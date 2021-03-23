let fs = require("fs");

function displayFile(filePath) {
    if (fs.lstatSync(filePath).isFile() == true) {
        display(filePath);
    }   
    else {
        console.log("File does not exists. Type help for commands.");
    } 
}

function display(filePath) {
    let content = fs.readFileSync(filePath,"utf-8");
    console.log(content);
}

module.exports = {
    displayFile: displayFile
}