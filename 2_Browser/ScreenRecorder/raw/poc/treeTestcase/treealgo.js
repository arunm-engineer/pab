"use strict";

// let input = [1, 2, 3, null, 4, null, 5, 6, 7, 8, 9];
// let input = [1, null, 2];
// let input = [1, null, 2, null, 3];
let input = [1, null, null, 2, 3, 4, 5];
// let input = [null, 2, null, 3, null, 4, null, null, 5];

let q = [];
let root = input.shift();
if (root != null)
    q.push(root);
    
    
// console.log(q);
    
let powincr = 1;

while (q.length > 0 && input.length > 0) {

    // remove q.len cond from while & put it here for strict mode, and check before this line

    let childCounter = Math.pow(2, powincr);  // To pull child nodes at each level
    let parentCounter = 0;  // To pull out parent node
    let parentNode = null;
    while (input.length > 0 && childCounter > 0) {
        if (parentCounter%2 == 0)  // To get the parent node;
            parentNode = q.shift();


        let inputNode = input.shift();   // Get node
        if (parentCounter%2 == 0) console.log(parentNode, "parent", inputNode, "LC");  // Even case, left child
        else console.log(parentNode, "parent", inputNode, "RC");  // Odd case, right child


        if (inputNode != null)
            q.push(inputNode);  // Push child as forthcoming parent for tree 

        childCounter--;
        parentCounter++;
    }
    // console.log(q);
    powincr++;
}