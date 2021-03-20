let fs = require("fs");
let path = require("path");
let util = require("../util");  //  ../ -> To go one step behind from current folder.  ./ -> For current folder.
let types = util.types;
// {
//     media: ['mp4','mkv','mp3'],
//     archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
//     documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
//     app: ['exe','dmg','pkg','deb']
// }

function organizeFile(dirName){
    // console.log('organize command was called for',dirName);
    if (dirName == undefined){
        dirName = process.cwd();   //To get the path from the current working directory (from where we executed command). Returns path.
    }
    console.log(dirName);
    organizeFolder(dirName);
}

function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();    // To check is it a file or not. Returns boolean.
}

function contentReader(src) {
    return fs.readdirSync(src);   // Reads all path from the give folder to the last files or folder. Return array of all folder/file names. 
}

function checkExtension(src) {
    let ext = src.split(".").pop();  // Split to get the file extension type.

    for (let key in types) {
        for (let i = 0;i < types[key].length;i++){
            if (ext == types[key][i]) {
                return key;
            }
        }
    }
    return "others";
}

function sendFile(src, dest, folderName) {
    let folderToMake = path.join(dest,folderName);
    if (fs.existsSync(folderToMake) == false) {   // To check if such file or folder exists (w.r.t path). Returns boolean.
        fs.mkdirSync(folderToMake);    // To create a directory or folder.
    }

    let pathToDestFile = path.join(folderToMake, path.basename(src));   //path.join() -> To join and create a path. 
    //path.basename() -> To get the name of the file from the given path. Ex: activity\commands\organize.js -> Returns organize.js
    fs.copyFileSync(src,pathToDestFile);   //Copies file content from src path and pastes to given des path.
}

function organizeFolder(src) {
    let folderToMake = path.join(src,"Organized_Files");
    if (fs.existsSync(folderToMake) == false){
        fs.mkdirSync(folderToMake);
    }
    organize(src,folderToMake);
}

function organize(src, dest) {      //Recursive function to get the depth folder and files.
    let isFile = isFileOrNot(src);    
    if (isFile == true) {
        let folderName = checkExtension(src);
        sendFile(src,dest,folderName);   // If it is a file, copy the contentof the file.
    }
    else {
        let dirNames = contentReader(src);
        for (let i = 0;i < dirNames.length;i++) {
            let child = dirNames[i];
            let childPath = path.join(src,child);
            organize(childPath,dest);
        }
    }
}


module.exports = {
    fn: organizeFile
};