let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");

canvas.width = 1350;
canvas.height = 600;

tool.fillStyle = "transparent";
tool.fillRect(0, 0, canvas.width, canvas.height)
tool.strokeStyle ="blue";
tool.lineWidth = 3;
tool.beginPath();
tool.moveTo(canvas.width/2, 0);
tool.lineTo(0, 100);
tool.stroke();

tool.scale(3, 3);
tool.clearRect(0, 0, canvas.width, canvas.height);
tool.fillRect(0, 0, canvas.width, canvas.height)

// tool.strokeStyle = "red";
// tool.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1350, 600);
tool.beginPath();
tool.moveTo(canvas.width/2, 0);
tool.lineTo(0, 100);
tool.stroke();
// tool.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1350, 600);
