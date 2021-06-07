let nodeObj = {};                                                    // Node information storage

function displayTree(treeLevels, recursiveTree) {

    let dsCont = document.querySelector(".ds-cont");
    let dsContStyle = getComputedStyle(dsCont);

    // let connectorCanvas = document.createElement("canvas");         
    // connectorCanvas.setAttribute("class", "connector-board");
    let connectorBoard = document.querySelector(".connector-board");
    let tool = connectorBoard.getContext("2d");
    // dsCont.appendChild(connectorBoard);


    let rootNodeContainer = document.createElement("div");       // Initial root node Container & root node to be added by manually
    rootNodeContainer.setAttribute("class", "root-cont");
    dsCont.appendChild(rootNodeContainer);

    let rootNode = document.createElement("div");
    rootNode.setAttribute("id", "0-1");                           // 0 -> 0th level, 1 -> 1st node @0th level (defalut id given for root node)
    rootNode.setAttribute("class", "node");
    rootNode.setAttribute("contenteditable", "true");
    rootNode.addEventListener("click", removeSubtree);          // Event listener to remove subtree accr to use-case
    rootNode.addEventListener("click", highlightNode);          // Event listener to highlight nodes
    rootNode.addEventListener("blur", storeNodeProperties);           // Store node Info (properties)
    rootNodeContainer.appendChild(rootNode);

    let q = [];                                                 // Queue DS to track parent and add child nodes
    let factor = 0;                                             // Nodes tracker factor @ each levels
    q.push(rootNodeContainer);

    for (let level = 1;level <= treeLevels;level++) {                            // Levels Tracker
        let nodeNumber = 1;                                          // Track node number for unique node ID
        let nodeFactor = Math.pow(2, factor);                   // Num of nodes @ particular level

        for (let j = 1;j <= nodeFactor;j++) {                   // Node tracker @ levels
            let parentContainer = q.shift();

            for (let k = 0;k < 2;k++) {                         // Child tracker
                let nodeContainer = document.createElement("div");
                nodeContainer.setAttribute("class", "node-cont");
                if (k%2 == 0) {                                 // Left child
                    nodeContainer.style.left = 0;
                    addNodeToNodeContainer(nodeContainer, level, nodeNumber);
                }
                else {                                          //Right child
                    nodeContainer.style.right = 0;
                    addNodeToNodeContainer(nodeContainer, level, nodeNumber);
                }
                parentContainer.appendChild(nodeContainer);
                q.push(nodeContainer);

                nodeNumber++;                                         
            }

            // To connect child nodes
            if (recursiveTree) levels_node_connector_recusive_tree(parentContainer);    // Recursive tree
            else levels_node_connector_normal_tree(parentContainer);                    // Normal tree
        }
        factor++;
    }

    function levels_node_connector_normal_tree(parentContainer) {
        let childrenNodeContainer = parentContainer.querySelectorAll(".node-cont");
        let parentNode = parentContainer.querySelector(".node");
        let LChildNode = childrenNodeContainer[0].querySelector(".node");
        let RChildNode = childrenNodeContainer[1].querySelector(".node");
        
        let PRectObj = parentNode.getBoundingClientRect();
        let LChildRectObj = LChildNode.getBoundingClientRect();
        let RChildRectObj = RChildNode.getBoundingClientRect();

        let PCenX = ((PRectObj.left+PRectObj.right)/2);        // 2nd expression eval, -> 1rem margin, so minus it for perfection in node connection
        let PCenY = PRectObj.bottom - (3*16);         // 3rem header, 1rem margin, 3rem controls

        let LCenX = ((LChildRectObj.left+LChildRectObj.right)/2);  // 2nd evaluation because of 1rem margin, so minus it for perfection in node connection
        let LCenY = LChildRectObj.top - (3*16);           // 3rem header, 1rem margin, 3rem controls

        let RCenX = ((RChildRectObj.left+RChildRectObj.right)/2);  // 2nd evaluation because of 1rem margin, so minus it for perfection in node connection
        let RCenY = RChildRectObj.top - (3*16);           // 3rem header, 1rem margin, 3rem controls

        tool.lineWidth = 1;
        tool.strokeStyle = "#227093";

        tool.beginPath();                                                // Connect P -> L,R children nodes
        tool.moveTo(PCenX, PCenY);                                                          
        tool.lineTo(LCenX, LCenY);
        tool.stroke();
        tool.beginPath();
        tool.moveTo(PCenX, PCenY);
        tool.lineTo(RCenX, RCenY);
        tool.stroke();


        let Pid = parentNode.getAttribute("id");
        if (!nodeObj[Pid]) nodeObj[Pid] = {};                              // Create node property storage, if node doesn't exist
        let nodeProp = nodeObj[Pid];
        nodeProp.PCenX = PCenX;
        nodeProp.PCenY = PCenY;
        nodeProp.LCenX = LCenX;
        nodeProp.LCenY = LCenY;
        nodeProp.RCenX = RCenX;
        nodeProp.RCenY = RCenY;
    }

    function levels_node_connector_recusive_tree(parentContainer) {
        let childrenNodeContainer = parentContainer.querySelectorAll(".node-cont");
        let parentNode = parentContainer.querySelector(".node");
        let LChildNode = childrenNodeContainer[0].querySelector(".node");
        let RChildNode = childrenNodeContainer[1].querySelector(".node");
        
        let PRectObj = parentNode.getBoundingClientRect();
        let LChildRectObj = LChildNode.getBoundingClientRect();
        let RChildRectObj = RChildNode.getBoundingClientRect();

        let PCenX = ((PRectObj.left+PRectObj.right)/2);        // 2nd expression eval, -> 1rem margin, so minus it for perfection in node connection
        let PCenY = PRectObj.top - (3*16);         // 3rem header, 1rem margin, 3rem controls

        let LCenX = ((LChildRectObj.left+LChildRectObj.right)/2);  // 2nd evaluation because of 1rem margin, so minus it for perfection in node connection
        let LCenY = LChildRectObj.bottom - (3*16);           // 3rem header, 1rem margin, 3rem controls

        let RCenX = ((RChildRectObj.left+RChildRectObj.right)/2);  // 2nd evaluation because of 1rem margin, so minus it for perfection in node connection
        let RCenY = RChildRectObj.bottom - (3*16);           // 3rem header, 1rem margin, 3rem controls

        tool.lineWidth = 1;
        tool.strokeStyle = "#227093";

        tool.beginPath();                                                // Connect P -> L,R children nodes
        tool.moveTo(PCenX, PCenY);                                                          
        tool.lineTo(LCenX, LCenY);
        tool.stroke();
        tool.beginPath();
        tool.moveTo(PCenX, PCenY);
        tool.lineTo(RCenX, RCenY);
        tool.stroke();


        let Pid = parentNode.getAttribute("id");
        if (!nodeObj[Pid]) nodeObj[Pid] = {};                              // Create node property storage, if node doesn't exist
        let nodeProp = nodeObj[Pid];
        nodeProp.PCenX = PCenX;
        nodeProp.PCenY = PCenY;
        nodeProp.LCenX = LCenX;
        nodeProp.LCenY = LCenY;
        nodeProp.RCenX = RCenX;
        nodeProp.RCenY = RCenY;
    }


    function addNodeToNodeContainer(nodeContainer, level, nodeNumber) {
        let node = document.createElement("div");
        node.setAttribute("id", `${level}-${nodeNumber}`);
        node.setAttribute("class", "node");
        node.setAttribute("contenteditable", "true");
        node.addEventListener("click", removeSubtree);          // Event Listener to remove subtree accr to use-case
        node.addEventListener("click", highlightNode);
        node.addEventListener("blur", storeNodeProperties);
        nodeContainer.appendChild(node);
    }

};