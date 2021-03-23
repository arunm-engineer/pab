let fs = require("fs");
let path = require("path");

function viewfn(dirName, mode){
    if (mode === "tree"){
        console.log("tree mode will be shown for this",dirName);
        treeView(dirName);
    }
    else if (mode === "flat"){
        console.log("flat mode will be shown for this",dirName);
        flatView(dirName);
    }
    else{
        console.log("Wrong mode. Type help for all commands.");
        // console.log(dirName);
    }
}

function flatView(src){  
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
                let childPath = path.join(src,child);

                viewFlat(childPath);
            }
        }
    }
    function isFileOrNot(src) {
        return fs.lstatSync(src).isFile();
    }
    function readContent(src) {
        return fs.readdirSync(src);
    }
    
    viewFlat(src);
}
function treeView(src){
    function viewTree(src,indent) {
        let isFile = isFileOrNot(src);
        if (isFile == true) {
            console.log(indent, path.basename(src), "*");
        }
        else {
            console.log(indent, path.basename(src));
            let childDirNames = readContent(src);
            for (let i = 0;i < childDirNames.length;i++){
                let child = childDirNames[i];
                let childPath = path.join(src,child);

                viewTree(childPath,indent+"\t");
            }
        }
    }
    function isFileOrNot(src) {
        return fs.lstatSync(src).isFile();
    }
    function readContent(src) {
        return fs.readdirSync(src);
    }

    viewTree(src,"");
}

module.exports = {
    fn: viewfn
};