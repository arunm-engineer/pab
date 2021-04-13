let fs = require("fs");

// Create own promise based function.
// return Promise object
// resolve -> work complete
// reject -> work error
function myFileReadPromise(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, function cb (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

console.log("My fileread Promise Before");
let myFrP = myFileReadPromise("f1.txt");

myFrP
.then(function (data) {
    console.log("data->" + data);
})
myFrP
.catch(function (err) {
    console.log(err);
})
console.log("My fileread Promise After");



//Default present promise in fs
console.log("Default fileread promise Before");
let defaultFrP = fs.promises.readFile("f1.txt");

defaultFrP
.then(function (data) {
    console.log("data->" + data);
})
defaultFrP
.catch(function (err) {
    console.log(err);
})
console.log("Default fileread promise After");

