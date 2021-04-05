let fs = require("fs");

console.log("2", "Before");

function myFileReadPromise(filePath) {
    return new Promise(function cb(resolve, reject) {
        console.log("7", "Hello Before in Promise");
        fs.readFile(filePath, function cb (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
        console.log("16", "Hello After in Promise");
    });
}

console.log("20", "Before promise work");
// let frP = fs.promises.readFile("f1.txt");
let frP = myFileReadPromise("f1.txt");
console.log("23", frP);

// setTimeout(function() {
//     console.log("25", frP);
// }, 2000);
console.log("28 Hello");
frP
    .then(function (data) {
        console.log("31", data+"");
    })
console.log("33 Hello");
frP
    .catch(function (err) {
        console.log("36", err);
    })
console.log("38 After");