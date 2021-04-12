let fs = require("fs");

console.log("Before");

let frP1 = fs.promises.readFile("../f1.txt");

// Another wasy of writing then and catch. Basically this is the easier 'syntax' version over then and catch in promise.
(async function fn() {
    try {
        let content = await frP1;
        console.log('content -> ', content + "");
    }
    catch (err) {
        console.log(err);
    }
})();

//This async function by default will return a promise.
//If async function has some await work then it return a pending promise.
//If there is no await work then it will return promise undefined.
let readingFile2 = (async function () {  
    let frP2 = fs.promises.readFile("../f2.txt");
    let content = await frP2;
    console.log('content -> ', content + "");
})();
//readFile2 variable will have the "pending promise" returned from the async function called becuse of await work within the async function..
