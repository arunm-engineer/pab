let db;
let Opendb = indexedDB.open("files");
Opendb.addEventListener("success", (e) => {
    db = Opendb.result;
    mediaFilesInit();    
});
Opendb.addEventListener("error", (e) => {
    console.log(e);
});
Opendb.addEventListener("upgradeneeded", (e) => {
    db = Opendb.result;                         // DB retrieved after build complete
    db.createObjectStore("video", {
        keyPath: "videoID"
    });
    db.createObjectStore("image", {
        keyPath: "imageID"
    })
});

function mediaFilesInit() {
    let videoDBTransaction = db.transaction("video", "readonly");           // Init all existing video files in UI
    let videoStore = videoDBTransaction.objectStore("video");
    let videoCursorResponse = videoStore.openCursor();
    videoCursorResponse.onsuccess = function(e) {
        let cursor = videoCursorResponse.result;
        if (cursor) {
            let id = cursor.key;                                                         
            createVideoFileUI(id.slice(4));
            cursor.continue();                                                          
        }
    }
    
    let imageDBTransaction = db.transaction("image", "readonly");       // Init all existing image files in UI
    let imageStore = imageDBTransaction.objectStore("image");
    let imageCursorResponse = imageStore.openCursor();
    imageCursorResponse.onsuccess = function(e) {
        let cursor = imageCursorResponse.result;
        if (cursor) {
            let id = cursor.key;
            createImageFileUI(id.slice(4));
            cursor.continue();
        }
    }
}
