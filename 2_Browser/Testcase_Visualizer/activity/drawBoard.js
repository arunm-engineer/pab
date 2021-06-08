(function setupCanvasDrawBoard() {                                                  // Set up draw board canvas for drawing
    let dsCont = document.querySelector(".ds-cont");
    let dsContStyle = getComputedStyle(dsCont);
    let dsContRectObj = dsCont.getBoundingClientRect();

    let drawBoard = document.querySelector(".draw-board");
    let tool = drawBoard.getContext("2d");
    drawBoard.width = Number(dsContStyle.width.split("px")[0]);
    drawBoard.height = Number(dsContStyle.height.split("px")[0]);
    drawBoard.style.top = dsContRectObj.top;
    drawBoard.style.left  = dsContRectObj.left;

    drawBoard.addEventListener("mousedown", (e) => {
        if (!pencilFlag) return;                                // Only if pencil is selected

        mouseDown = true;
        if (eraserFlag) tool.lineWidth = 30;
        else tool.lineWidth = 2;
        tool.strokeStyle = pencil;
        tool.beginPath();
        tool.moveTo(e.clientX, getY(e.clientY));
    });
    drawBoard.addEventListener("mousemove", (e) => {
        if (mouseDown) {
            tool.lineTo(e.clientX, getY(e.clientY));
            tool.stroke();
        }
    });
    drawBoard.addEventListener("mouseup", (e) => {
        mouseDown = false;
        undoRedoTracker.push(drawBoard.toDataURL());
        track = undoRedoTracker.length-1;
    });

    let undoBtn = document.querySelector(".undo-btn");
    let redoBtn = document.querySelector(".redo-btn");

    undoBtn.addEventListener("click", (e) => {
        if (track > 0) track--;
        console.log(track);
        console.log(undoRedoTracker);
        let img = new Image();
        img.src = undoRedoTracker[track];
        img.onload = (e) => {tool.drawImage(img, 0, 0, drawBoard.width, drawBoard.height)};         // Draw previously stored image on undo
    })

    redoBtn.addEventListener("click", (e) => {
        if (track < undoRedoTracker.length-1) track++;
        let img = new Image();
        img.src = undoRedoTracker[track];
        img.onload = (e) => {tool.drawImage(img, 0, 0, drawBoard.width, drawBoard.height)};         // Draw previously stored image on redo
    })

    
})();

function getY(orginalY) {
    return orginalY - (3*16);                                                  // 3rem contols
}

(function setupCanvasConnectorBoard() {                                                  // Set up connector board canvas for drawing
    let dsCont = document.querySelector(".ds-cont");
    let dsContStyle = getComputedStyle(dsCont);
    let connectorBoard = document.createElement("canvas");
    connectorBoard.setAttribute("class", "connector-board");
    connectorBoard.width = Number(dsContStyle.width.split("px")[0]);
    connectorBoard.height = Number(dsContStyle.height.split("px")[0]);
    dsCont.appendChild(connectorBoard);
})();