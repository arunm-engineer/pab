let fs = require("fs");

//Async function always returns a promise ->
//If you return a value then it will return a promise with that value as its resolve value
//If you return a pending promise then it will return that promise
async function fn() {
    console.log('Hello');
    let frp = fs.promises.readFile("f1.txt");
    return frp;
}

let fnKaP = fn();
console.log(fnKaP);
fnKaP.then(function (data) {
    console.log("data"+data);
})