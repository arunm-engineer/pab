let decrBtn = document.querySelector(".decrease-btn");
let incrBtn = document.querySelector(".increase-btn");
let levelIndicator = document.querySelector(".tree-level-indicator-btn")
let removeSubtreeBtn = document.querySelector(".remove-subtree-btn");
let highlightBtn = document.querySelector(".highlighter-btn");

let removeSubtreeFlag = false;

let activeColor = "#fff200";
let inactiveColor = "#f5f6fa";


decrBtn.addEventListener("click", (e) => {
    let level = Number(levelIndicator.textContent);
    if (level > -1) {
        level--;
        levelIndicator.textContent = level;
        clearTree();
        displayTree(level);
    }
});
incrBtn.addEventListener("click", (e) => {
    let level = Number(levelIndicator.textContent);
    if (level < 6) {
        level++;
        levelIndicator.textContent = level;
        clearTree();
        displayTree(level);
    }
});

function clearTree() {
    let rootContainer = document.querySelector(".root-cont");
    if (rootContainer) rootContainer.remove();
    let canvas = document.querySelector("canvas");
    if (canvas) canvas.remove();
}

removeSubtreeBtn.addEventListener("click", (e) => {
    removeSubtreeFlag = !removeSubtreeFlag;
    if (removeSubtreeFlag) removeSubtreeBtn.style.backgroundColor = activeColor;
    else removeSubtreeBtn.style.backgroundColor = inactiveColor;
});

function removeSubtree(e) {
    if (removeSubtreeFlag) {
        let subtreeNode = e.target;
        let subTreeNodeID = subtreeNode.getAttribute("id");
        let subtreeContainer = subtreeNode.parentElement;

        let childtreeContainer = subtreeContainer.querySelectorAll(".node-cont");
        for (let i = 0;i < childtreeContainer.length;i++) {
            childtreeContainer[i].remove();
        }

        let rootContainer = document.querySelector(".root-cont");
        let rootRectObj = rootContainer.getBoundingClientRect();

        let canvas = document.querySelector("canvas");
        let tool = canvas.getContext("2d");

        let top = rootRectObj.top - (3*16) - (3*16);                        // header 3rem, controls 3rem
        tool.clearRect(rootRectObj.left, top, rootRectObj.width, rootRectObj.height);

        let treeAvailableNodes = rootContainer.querySelectorAll(".node");
        drawAvailableNodeConnectors(treeAvailableNodes, tool, subTreeNodeID); // Draw connector P -> L,R child nodes
    }
}

function drawAvailableNodeConnectors(treeAvailableNodes, tool, subTreeNodeID) {

    Array.from(treeAvailableNodes).forEach( node => {
        let nodeID = node.getAttribute("id");
        if (subTreeNodeID != nodeID) {
            let nodeInfo = nodeObj[nodeID];
            console.log(nodeID);
            console.log(nodeInfo);
    
            if (nodeInfo) {
                tool.lineWidth = 1;
                tool.strokeStyle = "#227093";                             // Page BGcolor for accurate transparency of child connector nodes
    
                tool.beginPath();                                         // Erase P -> L,R child node connectors
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

