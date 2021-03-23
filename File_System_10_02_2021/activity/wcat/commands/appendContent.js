let fs = require("fs");


function writeFileContent(filePath1, filePath2) {
    let path1 = false;
    if (fs.lstatSync(filePath1).isFile() == true) {
        path1 = true;
    }

    if (path1 == true) {
        write(filePath1, filePath2);
    } 
    else {
        console.log("File does not exists. Type help for commands.");
    } 
}

function write(src, dest) {
    let src_content = fs.readFileSync(src,"utf-8").toString();
    let des_content = fs.readFileSync(dest,"utf-8").toString();
    let finalContent = des_content+src_content;
    fs.writeFileSync(dest,finalContent);
}

module.exports = {
    writeFileContent: writeFileContent
}