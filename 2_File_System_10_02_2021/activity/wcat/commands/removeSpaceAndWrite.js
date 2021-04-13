let fs = require("fs");

function removeLineBreaksAndWrite(filePath1, filePath2) {
    let path1 = false;
    let path2 = false;
    if (fs.lstatSync(filePath1).isFile() == true) {
        path1 = true;
    }   
    if (fs.lstatSync(filePath2).isFile() == true) {
        path2 = true;
    }  

    if (path1 == true && path2 == true) {
        processRemovalAndWrite(filePath1, filePath2);
    } 
    else {
        console.log("File does not exists. Type help for commands.");
    } 
}

function processRemovalAndWrite(filePath1, filePath2) {
    //Remove Line Breaks
    let contentArr = fs.readFileSync(filePath1,"utf-8").toString().split("\n");
    let newContentArr = [];
    for (let i = 0;i < contentArr.length;i++) {
        if (contentArr[i].length > 2) {
            newContentArr.push(contentArr[i]);
        }
    }
    let path1FinalContent = newContentArr.join("\n");

    //Append file content
    let src_content = fs.readFileSync(filePath1,"utf-8").toString();
    let des_content = fs.readFileSync(filePath2,"utf-8").toString();
    let finalContent = des_content+path1FinalContent;
    fs.writeFileSync(filePath2,finalContent);

}

module.exports = {
    removeLineBreaksAndWrite: removeLineBreaksAndWrite
}