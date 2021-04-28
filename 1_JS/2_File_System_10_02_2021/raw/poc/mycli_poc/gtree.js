let fs = require("fs");

function checkFileOrFolder(path){
    return fs.lstatSync(path).isFile();
}

function contentReader(path){
    return fs.readdirSync(path);
}

function printFlat(path){
    let isFile = checkFileOrFolder(path);
    if (isFile == true){
        console.log(path,"*");
    }
    else{
        console.log(path);
        
        let childrens = contentReader(path);
        for (let i = 0;i < childrens.length;i++){
            printFlat(path + "\\" + childrens[i]);
        }
    }
}

printFlat("F:\\PAB\\File_System_10_02_2021\\raw\\poc\\f10");