let fs = require('fs');

console.log('Before');

async function fn() {
    console.log('F1 read sent');
    let frp1 = fs.promises.readFile('../f1.txt');
    console.log('F1 read sent');
    let frp2 = fs.promises.readFile('../f2.txt');
    console.log('F3 read sent');
    let frp3 = fs.promises.readFile('../f3.txt');
    console.log(frp1, frp2, frp3);
    let ans = await Promise.all([frp1, frp2, frp3]);
    console.log(ans);

}

let fnKaP = fn();
console.log(fnKaP);

fnKaP.then(function(data) {
    console.log(data);
})


console.log('After');