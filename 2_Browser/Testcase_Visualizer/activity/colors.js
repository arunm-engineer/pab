highlightBtn.addEventListener("click", (e) => {
    try {
        highlightFlag = !highlightFlag;
        highlighter = "";                                                               // On highlight btn (active or inactive), nullify highlighter btn color
        if (highlightFlag) {
            if (highlighterColorsCont.classList.contains("animate-colors-pop-in")) highlighterColorsCont.classList.remove("animate-colors-pop-in");
            highlighterColorsCont.classList.add("animate-colors-pop-out");
            highlighterColorsCont.style.display = "flex";

            if (pencilFlag) {                                                         // Either highlighter can be active or pencil, not both
                pencilFlag = !pencilFlag;
                if (pencilColorsCont.classList.contains("animate-colors-pop-out")) pencilColorsCont.classList.remove("animate-colors-pop-out");
                pencilColorsCont.classList.add("animate-colors-pop-in");
                setTimeout(() => { pencilColorsCont.style.display = "none" }, 500);
            }

            connectorBoardOn();                                                       // Manage canvas board respect to z-index

        }
        else {
            if (highlighterColorsCont.classList.contains("animate-colors-pop-out")) highlighterColorsCont.classList.remove("animate-colors-pop-out");
            highlighterColorsCont.classList.add("animate-colors-pop-in");
            setTimeout(() => { highlighterColorsCont.style.display = "none" }, 500);
        }
    }
    catch (e) {
        console.log(e);
    }
});
highlightColorElements.forEach(color => {                                   // Change highlighter color on click istener
    try {
        color.addEventListener("click", (e) => {
            highlighter = `#${e.target.classList[0].slice(1)}`;                  // Slice since 1st char is dummmy char   
        });
    }
    catch (e) {
        console.log(e);
    }
});

pencilBtn.addEventListener("click", (e) => {
    try {
        pencilFlag = !pencilFlag;
        pencil = "transparent";
        if (pencilFlag) {
            if (pencilColorsCont.classList.contains("animate-colors-pop-in")) pencilColorsCont.classList.remove("animate-colors-pop-in");
            pencilColorsCont.classList.add("animate-colors-pop-out");
            pencilColorsCont.style.display = "flex";

            if (highlightFlag) {                                                               // Either highlighter can be active or pencil, not both
                highlightFlag = !highlightFlag;
                if (highlighterColorsCont.classList.contains("animate-colors-pop-out")) highlighterColorsCont.classList.remove("animate-colors-pop-out");
                highlighterColorsCont.classList.add("animate-colors-pop-in");
                setTimeout(() => { highlighterColorsCont.style.display = "none" }, 500);
            }

            drawBoardOn();                                                                // Manage canvas board respect to z-index
        }
        else {
            if (pencilColorsCont.classList.contains("animate-colors-pop-out")) pencilColorsCont.classList.remove("animate-colors-pop-out");
            pencilColorsCont.classList.add("animate-colors-pop-in");
            setTimeout(() => { pencilColorsCont.style.display = "none" }, 500);

        }
    }
    catch (e) {
        console.log(e);
    }
})
pencilColorElements.forEach(color => {
    try {
        color.addEventListener("click", (e) => {
            pencil = `#${e.target.classList[0].slice(1)}`;                          // Slice since 1st char is dummmy char
        });
    }
    catch (e) {
        console.log(e);
    }
});

highlightBtn.addEventListener("blur", drawBoardOn);
pencilBtn.addEventListener("blur", connectorBoardOn);

function connectorBoardOn() {                                               // Manage canvas board respect to z-index
    try {
        pencil = "transparent";
        let drawBoard = document.querySelector(".draw-board");
        drawBoard.style.zIndex = 0;

        let connectorBoard = document.querySelector(".connector-board");
        connectorBoard.style.zIndex = 1;
    }
    catch (e) {
        console.log(e);
    }
}
function drawBoardOn() {                                                     // Manage canvas board respect to z-index
    try {
        pencil = "transparent";
        let drawBoard = document.querySelector(".draw-board");
        drawBoard.style.zIndex = 1;

        let connectorBoard = document.querySelector(".connector-board");
        if (connectorBoard) {
            connectorBoard.style.zIndex = 0;
        }
    }
    catch (e) {
        console.log(e);
    }
}


function highlightNode(e) {                                                           // Highlight node
    try {
        if (highlightFlag && highlighter) {
            let node = e.target;
            node.style.backgroundColor = highlighter;
        }
    }
    catch (e) {
        console.log(e);
    }
}

eraserBtn.addEventListener("click", (e) => {
    try {
        eraserFlag = !eraserFlag;
        if (eraserFlag) {
            pencil = "#f5f6fa";
            eraserBtn.style.backgroundColor = activeColor;
        }
        else eraserBtn.style.backgroundColor = inactiveColor;
    }
    catch (e) {
        console.log(e);
    }
})