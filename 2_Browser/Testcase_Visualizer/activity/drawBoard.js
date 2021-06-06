(function setupCanvasDrawBoard() {                                                  // Set up draw board canvas for drawing
    let dsCont = document.querySelector(".ds-cont");
    let dsContStyle = getComputedStyle(dsCont);
    let dsContRectObj = dsCont.getBoundingClientRect();

    let drawCanvas = document.querySelector(".draw-board");
    let tool = drawCanvas.getContext("2d");
    drawCanvas.width = Number(dsContStyle.width.split("px")[0]);
    drawCanvas.height = Number(dsContStyle.height.split("px")[0]);
    drawCanvas.style.top = dsContRectObj.top;
    drawCanvas.style.left  = dsContRectObj.left;


    drawCanvas.addEventListener("mousedown", (e) => {
        mouseDown = true;
        tool.strokeStyle = pencil;
        tool.beginPath();
        tool.moveTo(e.clientX, getY(e.clientY));
    });
    drawCanvas.addEventListener("mousemove", (e) => {
        if (mouseDown) {
            tool.lineTo(e.clientX, getY(e.clientY));
            tool.stroke();
        }
    });
    drawCanvas.addEventListener("mouseup", (e) => {
        mouseDown = false;
    });

    function getY(orginalY) {
        return orginalY - (3*16);                                                  // 3rem contols
    }
})();

(function setupCanvasConnectorBoard() {                                                  // Set up connector board canvas for drawing
    let dsCont = document.querySelector(".ds-cont");
    let dsContStyle = getComputedStyle(dsCont);
    let connectorBoard = document.createElement("canvas");
    connectorBoard.setAttribute("class", "connector-board");
    connectorBoard.width = Number(dsContStyle.width.split("px")[0]);
    connectorBoard.height = Number(dsContStyle.height.split("px")[0]);
    dsCont.appendChild(connectorBoard);
})();