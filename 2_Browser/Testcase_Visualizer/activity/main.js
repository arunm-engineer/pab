let decrBtn = document.querySelector(".decrease-btn");
let incrBtn = document.querySelector(".increase-btn");
let levelIndicator = document.querySelector(".tree-level-indicator");
let removeSubtreeBtn = document.querySelector(".remove-subtree-btn");
let removeSubtreeFlag = false;                                                      // Flag for removal of subtree accr to removeSubTreeBtn
let highlightBtn = document.querySelector(".highlighter-btn");
let highlighterColorsCont = document.querySelector(".highlighter-colors-cont");
let pencilBtn = document.querySelector(".pencil-btn");
let pencilColorsCont = document.querySelector(".pencil-colors-cont");
let highlightFlag = false;
let pencilFlag = false;
let mouseDown = false;                                                             // Flag for drawing on board on mouseDown event
let highlightColorElements = document.querySelectorAll(".highlight-color");
let pencilColorElements = document.querySelectorAll(".pencil-color");
let highlighter;                                                                   // Highlighter color tool for nodes
let pencil = "transparent";
let recursiveTreeBtn = document.querySelector(".recursive-tree-btn");
let recursiveTreeFlag = false;
let clearPageBtn = document.querySelector(".clear-page-btn");
let eraserBtn = document.querySelector(".eraser-btn");
let eraserFlag = false;

let pageFactor = 0;

let activeColor = "#fff200";                                                       // Active & inactive color for functionality btns
let inactiveColor = "#f5f6fa";

recursiveTreeBtn.addEventListener("click", (e) => {                                 // Recursive tree active
    if (pageFactor%2 == 1) location.reload();
    clearPage();
    recursiveTreeFlag = !recursiveTreeFlag;                                        
    if (recursiveTreeFlag) recursiveTreeBtn.style.backgroundColor = activeColor;
    else recursiveTreeBtn.style.backgroundColor = inactiveColor;

    pageFactor++;
});

clearPageBtn.addEventListener("click", (e) => {
    clearPage();
});

function clearPage() {                                                             // Clear entire page
    clearTreeStructure();
    let drawBoard = document.querySelector(".draw-board");
    let tool = drawBoard.getContext("2d");
    tool.clearRect(0, 0,drawBoard.width, drawBoard.height);
    nodeObj = {};
    levelIndicator.textContent = "-1";
}

decrBtn.addEventListener("click", (e) => {
    let level = Number(levelIndicator.textContent);
    if (level > -1) {
        level--;

        levelIndicator.textContent = level;
        clearTreeStructure();                                          // Clear existing tree node and node connectors to draw tree with decr level 

        if (level == -1) {
            let rootContainer = document.querySelector(".root-cont");
            if (rootContainer) rootContainer.remove();
            return;
        }

        if (recursiveTreeFlag) {                                 // Recursive Tree
            displayTree(level, recursiveTreeFlag);
            rotateTree();
        }
        else {
            displayTree(level);
        }

        initNodeProperties();                                // Init node properties to not lose previous nodes properties
    }
});

incrBtn.addEventListener("click", (e) => {
    let level = Number(levelIndicator.textContent);
    if (level < 6) {
        level++;
        levelIndicator.textContent = level;
        clearTreeStructure();                                         // Clear existing tree node and node connectors to draw tree with incr level 

        if (recursiveTreeFlag) {                                 // Recursive Tree
            displayTree(level, recursiveTreeFlag);
            rotateTree();
        }
        else {
            displayTree(level, recursiveTreeFlag);
        }

        initNodeProperties();                                // Init node properties to not lose previous nodes properties
    }
});

function rotateTree() {                                      // Rotate tree Structure of recusive tree
    let dsCont = document.querySelector(".ds-cont");
    dsCont.style.transform = "rotate(180deg)";
    let connectorBoard = document.querySelector(".connector-board");
    connectorBoard.style.transform = "rotate(180deg)";
    let drawBoard = document.querySelector(".draw-board");               // Rotate draw board, since it rotates with it's parent (counter-rotate for drawing alignment)
    drawBoard.style.transform = "rotate(180deg)";
    let videoElement = document.querySelectorAll("video");
    if (videoElement.length > 1) {                                        // Counter Rotate video element 
        videoElement[0].style.transform = "rotate(180deg)";
    }
}

function clearTreeStructure() {                                                              // Clear tree to default
    let rootContainer = document.querySelector(".root-cont");
    if (rootContainer) rootContainer.remove();
    let connectorBoard = document.querySelector(".connector-board");
    let tool = connectorBoard.getContext("2d");
    tool.clearRect(0, 0, connectorBoard.width, connectorBoard.height);
}

function initNodeProperties() {                                                // Init previous node properties on modificaton with tree levels
    let allNodes = document.querySelectorAll(".node");
    allNodes.forEach( node => {
        let nodeID = node.getAttribute("id");
        let nodeProp = nodeObj[nodeID];
        if (nodeProp) {                                                             // Edge case since leaf node might not it's prop
            node.textContent = nodeProp.value;
            node.style.backgroundColor = nodeProp.BGColor;
        }
    });
}

removeSubtreeBtn.addEventListener("click", (e) => {
    removeSubtreeFlag = !removeSubtreeFlag;
    if (removeSubtreeFlag) removeSubtreeBtn.style.backgroundColor = activeColor;
    else removeSubtreeBtn.style.backgroundColor = inactiveColor;
});

function removeSubtree(e) {
    if (removeSubtreeFlag) {
        let subtreeNode = e.target;                                                     // Target node
        let subTreeNodeID = subtreeNode.getAttribute("id");
        let subtreeContainer = subtreeNode.parentElement;

        let childtreeContainer = subtreeContainer.querySelectorAll(".node-cont");
        for (let i = 0;i < childtreeContainer.length;i++) {
            childtreeContainer[i].remove();                                             // Remove children nodes container
        }

        let canvas = document.querySelector(".connector-board");                                  // Get canvas for future use (clear & redraw connectors)
        let tool = canvas.getContext("2d");

        let rootContainer = document.querySelector(".root-cont");
        let rootRectObj = rootContainer.getBoundingClientRect();

        let top = rootRectObj.top - (3*16);                                    // header 3rem, controls 3rem
        tool.clearRect(rootRectObj.left, top, rootRectObj.width, rootRectObj.height);  // Clear canvas to remove connectors

        let treeAvailableNodes = rootContainer.querySelectorAll(".node");
        drawAvailableNodeConnectors(treeAvailableNodes, tool, subTreeNodeID);     
    }
}

function drawAvailableNodeConnectors(treeAvailableNodes, tool, subTreeNodeID) {        // Redraw connector for available nodes (P -> L,R child nodes)

    Array.from(treeAvailableNodes).forEach( node => {
        let nodeID = node.getAttribute("id");
        if (subTreeNodeID != nodeID) {
            let nodeInfo = nodeObj[nodeID];
    
            if (nodeInfo) {
                tool.lineWidth = 1;
                tool.strokeStyle = "#227093";                                       // Page BGcolor for accurate transparency of child connector nodes
    
                tool.beginPath();                                                    // Erase P -> L,R child node connectors
                tool.moveTo(nodeInfo.PCenX, nodeInfo.PCenY);
                tool.lineTo(nodeInfo.LCenX, nodeInfo.LCenY);
                tool.stroke();
                tool.beginPath();
                tool.moveTo(nodeInfo.PCenX, nodeInfo.PCenY);
                tool.lineTo(nodeInfo.RCenX, nodeInfo.RCenY);
                tool.stroke();
            }
        }
        else {
            delete nodeObj[nodeID];
        }
    });
}

function getChildCount(nodeID) {
    let node = document.querySelector(`.node[id="${nodeID}"]`);
    let parentContainer = node.parentElement;
    let childContainer = parentContainer.querySelectorAll(".node-cont");
    return childContainer.length;
}

function storeNodeProperties(e) {
    let node = e.target;
    let nodeID = node.getAttribute("id");

    let nodeValue = node.innerText;
    let BGColor = getComputedStyle(node).backgroundColor;

    if (!nodeObj[nodeID]) nodeObj[nodeID] = {};                                         // Since leaf node mightnot have property, initialize it
    nodeObj[nodeID]["value"] = nodeValue;
    nodeObj[nodeID]["BGColor"] = BGColor;
}