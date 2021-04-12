let fs = require("fs");

console.log("Before");

let frP1 = fs.promises.readFile("../f1.txt");

(async function fn() {
    let content = await frP1;  //This return directly the data(content) which is in the callback of the .then(function cb(data));
    console.log('content -> ', content+"");
    let frP2 = fs.promises.readFile("../f2.txt");
    content = await frP2;
    console.log('content -> ', content+"");
    let frP3 = fs.promises.readFile("../f3.txt");
    content = await frP3;
    console.log('content -> ', content+"");
})();