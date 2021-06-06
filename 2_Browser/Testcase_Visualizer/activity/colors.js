highlightBtn.addEventListener("click", (e) => {
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
            setTimeout(()=>{pencilColorsCont.style.display = "none"}, 500);
        }

        connectorBoardOn();                                                       // Manage canvas board respect to z-index

    }
    else {
        if (highlighterColorsCont.classList.contains("animate-colors-pop-out")) highlighterColorsCont.classList.remove("animate-colors-pop-out");
        highlighterColorsCont.classList.add("animate-colors-pop-in");
        setTimeout(()=>{highlighterColorsCont.style.display = "none"}, 500);
    }

    
});
highlightColorElements.forEach( color => {
    color.addEventListener("click", (e) => {
        highlighter = `#${e.target.classList[0].slice(1)}`;                                    // Change highlighter color on click istener
    });
});

pencilBtn.addEventListener("click", (e) => {
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
            setTimeout(()=>{highlighterColorsCont.style.display = "none"}, 500);
        }

        drawBoardOn();                                                                // Manage canvas board respect to z-index
    }
    else {
        if (pencilColorsCont.classList.contains("animate-colors-pop-out")) pencilColorsCont.classList.remove("animate-colors-pop-out");
        pencilColorsCont.classList.add("animate-colors-pop-in");
        setTimeout(()=>{pencilColorsCont.style.display = "none"}, 500);

    }
})
pencilColorElements.forEach( color => {
    color.addEventListener("click", (e) => {
        pencil = `#${e.target.classList[0].slice(1)}`;
    });
});

highlightBtn.addEventListener("blur", drawBoardOn);                         
pencilBtn.addEventListener("blur", connectorBoardOn);                       

function connectorBoardOn() {                                               // Manage canvas board respect to z-index
    pencil = "transparent";
    let drawBoard = document.querySelector(".draw-board");
    drawBoard.style.zIndex = 0;

    let connectorBoard = document.querySelector(".connector-board");
    connectorBoard.style.zIndex = 1;
}
function drawBoardOn() {                                                     // Manage canvas board respect to z-index
    pencil = "transparent";
    let drawBoard = document.querySelector(".draw-board");
    drawBoard.style.zIndex = 1;

    let connectorBoard = document.querySelector(".connector-board");
    if (connectorBoard) {
        connectorBoard.style.zIndex = 0;
    }
}


function highlightNode(e) {                                                           // Highlight node
    if (highlightFlag && highlighter) {
        let node = e.target;
        node.style.backgroundColor = highlighter;
    }
}