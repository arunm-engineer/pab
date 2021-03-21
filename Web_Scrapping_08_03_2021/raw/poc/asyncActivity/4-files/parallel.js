//Parallel task through async code
let fs = require("fs");

console.log("f1 read sent");
fs.readFile("../f1.txt","utf-8",cb);

console.log("f2 read sent");
fs.readFile("../f2.txt","utf-8",cb);

console.log("f3 read sent");
fs.readFile("../f3.txt","utf-8",cb);

console.log("f4 read sent");
fs.readFile("../f4.txt","utf-8",cb);

function cb(err, content) {
    if (err) console.log(err);
    else {
        console.log(content);
    }
}