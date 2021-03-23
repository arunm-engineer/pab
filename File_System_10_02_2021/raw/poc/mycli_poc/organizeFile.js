let fs = require("fs");
let path = require("path");
let input = process.argv.slice(2);

let types = {
    media: ['mp4','mkv','mp3'],
    archives: ['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents: ['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app: ['exe','dmg','pkg','deb']
}

function isFileOrNot(src) {
    return fs.lstatSync(src).isFile();
}

function contentReader(src) {
    return fs.readdirSync(src);
}

function checkExtension(src) {
    let ext = src.split(".").pop();

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
    if (fs.existsSync(folderToMake) == false) {
        fs.mkdirSync(folderToMake);
    }

    let pathToDestFile = path.join(folderToMake, path.basename(src));
    fs.copyFileSync(src,pathToDestFile);
}

function organizeFile(src) {
    let folderToMake = path.join(src,"Organized_Files");
    if (fs.existsSync(folderToMake) == false){
        fs.mkdirSync(folderToMake);
    }
    organize(src,folderToMake);
}

function organize(src, dest) {
    let isFile = isFileOrNot(src);
    if (isFile == true) {
        let folderName = checkExtension(src);
        sendFile(src,dest,folderName);
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

organizeFile(input[0]);