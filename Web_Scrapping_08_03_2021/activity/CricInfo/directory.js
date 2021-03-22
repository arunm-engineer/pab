let fs = require("fs");
let path = require("path");

function createDirectory(folderName) {
    let dir = path.join(__dirname, folderName);
    if (fs.existsSync(dir) == false) {
        fs.mkdirSync(dir);
    }
}

module.exports = {
    createDirectory: createDirectory
}