let fs = require('fs');

//1. Await is only valid in async function
//2. Await will wait for a promise to resolve and give its resolved value
//3. Await suspends the execution of currently executing async function and 
// async function returns a promise that will be resolved when the whole async 
// function is executed.

console.log('Before');


async function fn() {
    console.log('Hello');
    let frp = fs.promises.readFile("f1.txt");
    let data = await frp;  //After you encounter await "all" other lines in execution context will be running and the only it will return here
    console.log(data+"");
    // return frp;
}

let fnKaP = fn();
console.log(fnKaP);

fnKaP.then(function (data) {
    console.log("data"+data);
})

console.log('After');