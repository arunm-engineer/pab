
// call base pe hi define hota
// method call -> this would current object
// obj.sayHi();
// let fn = obj.sayHi;
// console.log(window);
// window
// function call -> this window
// console.log(fn);
// fn();

// 1. this is everytime decided on the basis of call
// 2. Normal function 
// method call ->  current object to whom you belong to
// function call -> window object
// strict mode function call ->undefined
// 3. Arrow function->
// 2nd rule is not applicable for arrow function
// / it don't have my own this -> i will take it from outside 
// 4. bind function -> if you want to always pass same object as this whenever a function is called




// name = "Karan"
// let obj = {
//     name: "arun",
//     fn: function() {
//         console.log(this.name);
//         function sample() {
//             console.log(this.name);
//         }
//         sample();
//     }
// }
// obj.fn();




// name = "Karan"
// let obj = {
//     name: "arun",
//     fn: function() {
//         console.log(this.name);
//         function sample() {
//             console.log(this.name);
//         }
//         sample();
//     }
// }
// let fun = obj.fn;
// fun();



// Test question 8 & 9

// let obj = {
//     name: "Original hello",
//     fun() {
//         console.log(name);
//     }
// }

// setTimeout(obj.fun, 1000);  // address passed, "this" align to window

// setTimeout(function() {  // "this" aligns to the obj as itself, either you can also bind with obj to get same o/p
//     obj.fun();
// }, 1000);


// Test question 10

// const object = {
//     who: 'World',
//     greet() {
//     return `Hello, ${this.who}!`;
//     },
//     farewell: () => {
//                 return `Goodbye, ${this.who}!`;
//             }
//    };
   

// console.log(object.greet()); // What is logged?

// console.log(object.farewell()); // What is logged?

//---------------------------------------------------------------------


// const object = {
//     who: 'World',
//     greet() {
//     return `Hello, ${this.who}!`;
//     },
//     farewell: function() {
//         () => {
//             return `Goodbye, ${this.who}!`;
//         }
//     }
//    };
   

// console.log(object.greet()); // What is logged?

// console.log(object.farewell()); // What is logged?


//---------------------------------------------------------------------


// const object = {
//     who: 'World',
//     greet() {
//     return `Hello, ${this.who}!`;
//     },
//     farewell: function() {
//         return (() => {
//             return `Goodbye, ${this.who}!`;
//         })()
//     }
//    };
   

// console.log(object.greet()); // What is logged?

// console.log(object.farewell()); // What is logged?



