let castleImg = new Image();
let cloudsImg = new Image();
let mountainImg = new Image();
let spriteSheetImg = new Image();
let tileSetImg = new Image();


function preloadImages() {

    castleImg.src = "./assets/sprites/castle.png";
    cloudsImg.src = "./assets/sprites/clouds.png";
    mountainImg.src = "./assets/sprites/mountain.png";
    spriteSheetImg.src = "./assets/sprites/spritesheet.png";
    tileSetImg.src = "./assets/sprites/tileset_gutter.png";

    return new Promise((resolve, reject) => {
        let castleImgP = new Promise((resolve, reject) => {
            castleImg.addEventListener("load", (e) => {
                resolve();
            })
        })
        let cloudsImgP = new Promise((resolve, reject) => {
            cloudsImg.addEventListener("load", (e) => {
                resolve();
            })
        })
        let mountainImgP = new Promise((resolve, reject) => {
            mountainImg.addEventListener("load", (e) => {
                resolve();
            })
        })
        let spriteSheetImgP = new Promise((resolve, reject) => {
            spriteSheetImg.addEventListener("load", (e) => {
                resolve();
            })
        })
        let tileSetImgP = new Promise((resolve, reject) => {
            tileSetImg.addEventListener("load", (e) => {
                resolve();
            })
        })
        
        let allImageP = Promise.all([castleImgP, cloudsImgP, mountainImgP, spriteSheetImgP, tileSetImgP]);
        allImageP.then(function() {
            resolve();  
        })
    })
    
}
