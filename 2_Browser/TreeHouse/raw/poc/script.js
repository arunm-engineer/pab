let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
tool.fillRect(0, 0, canvas.width, canvas.height);
let nodeRadius = 15;

// let mainInput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let mainInput = [1, 2, 3,null,4, 5,null,null,6,7,null,null,8,9];

let coordinatesObj = {};


let input = [...mainInput]; /// Copy of main input



// Incase nodes merges in-between
let changeFactor = 300;

// Queue Data structure for child node storage (forth-coming parent)

function visualizeTree(input, changeFactor) {
    let canvasCenX = Number.parseInt(canvas.width/2);  // To get whole number
    let canvasCenY = 0;
    tool.strokeStyle = "grey";

    let widthGapX = 25;  // Gap in x-axis
    let widthGapY = 35;  // Gap in y-axis

    let q = []; // Queue for child storage

    let root = input.shift();
    let rootNodeX = canvasCenX;  // Inital points for root node
    let rootNodeY = canvasCenY+50;

    tool.lineWidth = 2;
    tool.beginPath();  // Root node in UI
    tool.arc(rootNodeX, rootNodeY, nodeRadius, 0, 2*Math.PI);
    tool.stroke();

    if (root != null) {
        let parentBottomX = canvasCenX;  // From parent, points for child nodes
        let parentBottomY = rootNodeY + nodeRadius;
        let parentObj = { parentBottomX, parentBottomY };
        q.push(parentObj);

    }

    let nodeFactor = 1;  // Interms of powers of 2


    while (q.length > 0 && input.length > 0) {  // Algo for tree generation

        // Pull child nodes @ each level
        // Pull parent node @ level
        let childrenToExtractAtLevel = Math.pow(2, nodeFactor);
        let parentToExtractAtLevel = 0;  
        let parentObj = null;

        while (input.length > 0 && childrenToExtractAtLevel > 0) {
            if (parentToExtractAtLevel%2 == 0) // Parent node extracted     @ even case
                parentObj = q.shift();

            let { parentBottomX, parentBottomY } = parentObj;

            let inputNode = input.shift();   // Get node

            if (parentToExtractAtLevel%2 == 0) {
                if (inputNode != null) {
                    let leftNodeCenX = parentBottomX - widthGapX - changeFactor;  // Left center point x
                    let leftNodeCenY = parentBottomY + widthGapY;  // Left center point x
                    let leftNodeTopX = leftNodeCenX;
                    let leftNodeTopY = leftNodeCenY - nodeRadius;

                    // checkLeftNodeUIOverlapping(leftNodeCenX, leftNodeCenY, canvasCenX);

                    tool.beginPath();  // Left child node
                    tool.arc(leftNodeCenX, leftNodeCenY, nodeRadius, 0, 2*Math.PI);
                    tool.stroke();

                    tool.beginPath();  // Left child connect
                    tool.moveTo(parentBottomX, parentBottomY);
                    tool.lineTo(leftNodeTopX, leftNodeTopY);
                    tool.stroke();

                    addChildToQueue(q, leftNodeCenX, leftNodeCenY);
                // console.log(parentObj, "parent", inputNode, "LC");  // Even case, left child
                }
            }
            else {
                if (inputNode != null) {
                    let rigthNodeCenX = parentBottomX + widthGapX + changeFactor; // Right center point x
                    let rightNodeCenY = parentBottomY + widthGapY;  // Right center point x
                    let rightNodeTopX = rigthNodeCenX;
                    let rightNodeTopY = rightNodeCenY - nodeRadius;
    
    
                    tool.beginPath(); // Right child node
                    tool.arc(rigthNodeCenX, rightNodeCenY, nodeRadius, 0, 2*Math.PI);
                    tool.stroke();
    
                    tool.beginPath(); // Right child connect
                    tool.moveTo(parentBottomX, parentBottomY);
                    tool.lineTo(rightNodeTopX, rightNodeTopY);
                    tool.stroke();
                    // console.log(parentObj, "parent", inputNode, "RC");  // Odd case, right child
    
                    addChildToQueue(q, rigthNodeCenX, rightNodeCenY);
                }
                
            }

            childrenToExtractAtLevel--;
            parentToExtractAtLevel++;
        }

        nodeFactor++;
        changeFactor /= 2.2;
    }

}

// function checkLeftNodeUIOverlapping(leftNodeCenX, leftNodeCenY, canvasCenX) {
//     let leftNodeX;
// }

function addChildToQueue(q, nodeCenX, nodeCenY) {
    let forthComingParentX = nodeCenX; 
    let forthComingParentY = nodeCenY + nodeRadius;
    let forthComingParentObj = { parentBottomX: forthComingParentX, parentBottomY: forthComingParentY };
    
    q.push(forthComingParentObj);  // Forthcoming parent 
}

visualizeTree(input, changeFactor);
// tool.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 500, 500);