let fs = require("fs");

let f1P = fs.promises.readFile("f1.txt");
let thenKaPromise = f1P.then(scb);
function scb(data) {
    console.log("iniside scb", data+"");
    let f2P = fs.promises.readFile("f2.txt");
    return f2P;
}
console.log("Then ka promise", thenKaPromise);
setTimeout(function () {
    console.log("f1p", f1P);
    console.log("Then ka promise", thenKaPromise);
}, 1000);
console.log("After");