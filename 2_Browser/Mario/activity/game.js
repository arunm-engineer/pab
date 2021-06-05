// Drawing and rendering
const render = {
    init(gameObj) {
        gameObj.tool.fillStyle = "#7ed6df";
        gameObj.tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
        gameObj.tool.drawImage(castleImg, 50, 50, 100, 100);
    }
}


// Game initilization and start
class Game {
    init() {
        const canvas = document.querySelector(".board");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        const tool = canvas.getContext("2d");

        // This will represent the state of the game
        let gameObj = {
            canvas, tool
        }

        render.init(gameObj);
    }

    run() {

    }

    reset() {
        location.reload();
    }
}

preloadImages()
.then(function() {
    let game = new Game();
    game.init();
})