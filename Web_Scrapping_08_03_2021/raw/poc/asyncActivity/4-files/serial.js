//Serial task through async code
let fs = require("fs");

console.log("f1 read sent");
fs.readFile("../f1.txt", "utf-8", cb1);

function cb1(err, content) {
    if (err) console.log(err);
    else {
        console.log(content);
        console.log("f2 read sent");
        fs.readFile("../f2.txt", "utf-8", cb2);
    }
}
function cb2(err, content) {
    if (err) console.log(err);
    else {
        console.log(content);
        console.log("f3 read sent");
        fs.readFile("../f3.txt", "utf-8", cb3);
    }
}
function cb3(err, content) {
    if (err) console.log(err);
    else {
        console.log(content);
        console.log("f4 read sent");
        fs.readFile("../f4.txt", "utf-8", cb4);
    }
}
function cb4(err, content) {
    if (err) console.log(err);
    else {
        console.log(content);
    }
}

//CallBack Hell version (Same above code)

// console.log("f1 read sent");
// fs.readFile("../f1.txt", "utf-8", function cb1(err, content) {
//     if (err) console.log(err);
//     else {
//         console.log(content);
//         console.log("f2 read sent");
//         fs.readFile("../f2.txt", "utf-8", function cb2(err, content) {
//             if (err) console.log(err);
//             else {
//                 console.log(content);
//                 console.log("f3 read sent");
//                 fs.readFile("../f3.txt", "utf-8", function cb3(err, content) {
//                     if (err) console.log(err);
//                     else {
//                         console.log(content);
//                         console.log("f4 read sent");
//                         fs.readFile("../f4.txt", "utf-8", function cb4(err, content) {
//                             if (err) console.log(err);
//                             else {
//                                 console.log(content);
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// });




