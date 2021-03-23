let fs = require("fs");

//Adding line numbers for all Lines

let contentArr = fs.readFileSync("./file.txt","utf-8").toString().split("\n");
console.log(contentArr);
let lineNum = 1;
for (let i = 0;i < contentArr.length;i++) {
    contentArr[i] = lineNum + ". " + contentArr[i];
    lineNum++;
}
let finalContent = contentArr.join("\n");
fs.writeFileSync("./file.txt", finalContent);
console.log(finalContent);


//Adding line numbers for all "non-empty" lines

// let contentArr = fs.readFileSync("./file.txt","utf-8").toString().split("\n");
// console.log(contentArr);
// let lineNum = 1;
// for (let i = 0;i < contentArr.length;i++) {
//     if (contentArr[i].length > 2) {
//         contentArr[i] = lineNum + ". " + contentArr[i];
//         lineNum++;
//     }
// }
// let finalContent = contentArr.join("\n");
// fs.writeFileSync("./file.txt", finalContent);
// console.log(finalContent);


//To remove line breaks

// let contentArr = fs.readFileSync("./file.txt","utf-8").toString().split("\n");
// console.log(contentArr);
// let newContentArr = [];
// for (let i = 0;i < contentArr.length;i++) {
//     if (contentArr[i].length > 2) {
//         newContentArr.push(contentArr[i]);
//     }
// }
// let finalContent = newContentArr.join("\n");
// fs.writeFileSync("./file.txt", finalContent);
// console.log(finalContent);