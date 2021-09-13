function promisefn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(10);
        }, 1000)
    })
}
console.log("Before");
promisefn()
.then((val) => {
    console.log("Then error");
}, (err) => {
    console.log(13, err);
})
.catch(() => {
    console.log("Some error");
})
console.log("After");