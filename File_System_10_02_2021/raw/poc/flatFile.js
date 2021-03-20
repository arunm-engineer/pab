let fs = require("fs");
let src = process.argv.slice(2);

function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}
function readContent(src) {
    return fs.readdirSync(src);
}

function viewFlat(src) {
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        console.log(src,"*");
    }
    else {
        console.log(src);
        let childDirNames = readContent(src);
        for (let i = 0;i < childDirNames.length;i++){
            let child = childDirNames[i];
            let childPath = src + "\\" + child;
            viewFlat(childPath);
        }
    }
}

viewFlat(src);