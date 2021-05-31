let arr = [1, 2, 3, 4, 5];

let mappedArr = arr.map(function(num) {
    return num * num;
})
console.log(mappedArr);

let filteredEvenArr = arr.filter(function(num) {
    return num%2 == 0;
})

console.log(filteredEvenArr);

console.log(arr);

