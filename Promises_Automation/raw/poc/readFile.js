let fs = require("fs");

//Callback pattern to do async task
// console.log("Before");

// fs.readFile("./f1.txt", "utf-8", function cb(err, content) {
//     if (err) console.log("Error",err);
//     else console.log(content);
// })

// console.log("After");

// Promises pattern to do async task
console.log("Before");

let frp = fs.promises.readFile("./f1.txt","utf-8");
frp.then(function (content){
    console.log(content);
})
frp.catch(function (err) {
    console.log("err",err);
})

console.log("After");