let db;
let Opendb = indexedDB.open("files");
Opendb.addEventListener("success", (e) => {
    db = Opendb.result;
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