let fs = require("fs");

let files = ["../f1.txt","../f2.txt","../f3.txt","../f4.txt"];

//This code may not work for serial task as the main task may never be ending.

// for (let i = 0;i < files.length;) {
//     fs.readFile(files[i], "utf-8", function cb(err, content) {
//         if (err) console.log(err);
//         else {
//             console.log("content ->", content);
//             i++;
//         } 
//     });
// }


//Recursive code for serial task.

function serialReader(n) {
    if (n == files.length) return;

    fs.readFile(files[n], "utf-8", function cb(err, content) {
        if (err) console.log(err);
        else {
            console.log("content ->", content);
            serialReader(n+1);
        }
    });
}

serialReader(0);

