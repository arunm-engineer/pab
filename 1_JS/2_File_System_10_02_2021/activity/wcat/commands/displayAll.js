let fs = require("fs");

function displayFile(files) {
    for (let i = 0; i < files.length; i++) {
        if (fs.lstatSync(files[i]).isFile() == true) {
            display(files[i]);
        }
        else {
            console.log("File does not exists. Type help for commands.");
        }
    }

}

function display(filePath) {
    let content = fs.readFileSync(filePath, "utf-8");
    console.log(content);
}

module.exports = {
    displayFile: displayFile
}