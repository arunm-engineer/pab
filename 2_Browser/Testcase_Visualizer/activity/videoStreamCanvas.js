let tempVideoDisplay = document.createElement("video");
tempVideoDisplay.autoplay = true;

let streamBtn = document.querySelector(".stream-btn");
let videoElement;
let streamFlag = false;
let recorder;
let response = null;

let snipBoard;
let snipTool;
let snipBtn = document.querySelector(".snip-btn");
let snipFlag = false;

snipBtn.addEventListener("click", (e) => {
        let tempCanvas = document.createElement("canvas");                            // Temporary canvas to store image
        let tool = tempCanvas.getContext("2d");
        tempCanvas.width = tempVideoDisplay.videoWidth;
        tempCanvas.height = tempVideoDisplay.videoHeight;

        console.log(tempVideoDisplay.videoWidth, tempVideoDisplay.videoHeight);
        tool.drawImage(tempVideoDisplay, 0, 0, tempCanvas.width, tempCanvas.height);
        tempVideoDisplay.pause();

        let url = tempCanvas.toDataURL();

        let id = shortid();                                                   // Init image in DB with unique ID
        if (db) {                     
            let imageDbtransaction = db.transaction("image", "readwrite");    // Create image db transaction
            let imageStore = imageDbtransaction.objectStore("image");
            let imageEntry = {
                imageID: `img-${id}`,
                value: url
            }
            imageStore.add(imageEntry);
        }

        createImageFileUI(id);                                                  // Create Video File UI
        tempCanvas.remove();
})

streamBtn.addEventListener("click", (e) => {
    streamFlag = !streamFlag;
    let icon = document.querySelector(".stream-btn > i");
    if (streamFlag) {
        // Options for user
        response = Number(prompt(`1 - Screenshare                                   
2 - Screenshare with video(Green screen chroma key)`, 1));
        if (!response) return;

        icon.classList.remove("fa-video");
        icon.classList.add("fa-video-slash"); 
        if (response === 1) {
            let screenShareElement = document.createElement("video");
            screenShareElement.setAttribute("class", "screen-share");
            screenShareElement.autoplay = true;
            screenShareElement.width = 250;
            screenShareElement.height = 130;
            if (recursiveTreeFlag) screenShareElement.style.transform = "rotate(180deg)";
            let dsCont = document.querySelector(".ds-cont");
            dsCont.appendChild(screenShareElement);


            screenshareStart(screenShareElement);                               // Start screen share stream
        }
        else if (response === 2) {

        }
    }
    else {
        icon.classList.remove("fa-video-slash");
        icon.classList.add("fa-video");
        screenshareStop();
        response = null;
    }
});

function screenshareStart(videoElement) {
    navigator.mediaDevices.getDisplayMedia({
        video: true
    })
    .then( async function(screenStream) {
        tempVideoDisplay.srcObject = screenStream;                                  // Init screen stream to temp video for screenshot

        let stream = await navigator.mediaDevices.getUserMedia({                
            video: true,
            audio: true
        })

        videoElement.srcObject = stream;
        let tracks = stream.getTracks();

        let [screenTrack] = screenStream.getVideoTracks();
        let [audioTrack] = stream.getAudioTracks();
        let combinedStream = new MediaStream([screenTrack, audioTrack]);            // Since browser compatibility might not have access to screenshare audio, get audio track from another source

        let screenchunks = [];
        recorder = new MediaRecorder(combinedStream);
        recorder.start();
        recorder.addEventListener("dataavailable", function(e) {
            screenchunks.push(e.data);
        })

        recorder.onstop = function(e) {                                             // Stop video stream
            let blob = new Blob(screenchunks, { type: "video/webm" } );
            let id = shortid();                                                   // Init image in DB with unique ID
            if (db) {                                                                      
                let videoDbtransaction = db.transaction("video", "readwrite");     // Create video db transaction
                let videoStore = videoDbtransaction.objectStore("video");
                let videoEntry = {
                    videoID: `vid-${id}`,
                    value: blob
                }
                videoStore.add(videoEntry);
            }

            tracks.forEach(track => track.stop());
            createVideoFileUI(id);                                                      // Create Video File UI
            recorder = null;
        }

    })
}

function screenshareStop() {                                                         // Stop screen share
    recorder.stop();
    let videoElement = document.querySelector("video");
    videoElement.remove();
}



function createVideoFileUI(id) {
    let videoFilesContainer = document.querySelector(".video-files-container");
    let videoFileUI = document.createElement("div");
    videoFileUI.setAttribute("class", "file");
    videoFileUI.setAttribute("id", `vid-${id}`);
    videoFileUI.innerHTML = `Video - ${new Date().toString()}
        <div class="play-btn file-btn">
            <i class="fas fa-play"></i>
        </div>
        <div class="download-btn file-btn">
            <i class="fas fa-download"></i>
        </div>
    </div>`
    videoFilesContainer.prepend(videoFileUI);

    let playBtns = document.querySelectorAll(".play-btn");
    playBtns.forEach(btn => btn.removeEventListener("click", playListener));
    playBtns.forEach(btn => btn.addEventListener("click", playListener));                     // Add play listeners

    let downloadBtns = document.querySelectorAll(".download-btn");
    downloadBtns.forEach(btn => btn.removeEventListener("click", downloadListener));          // Add download listeners
    downloadBtns.forEach(btn => btn.addEventListener("click", downloadListener));

}

function createImageFileUI(id) {
    let imageFilesContainer = document.querySelector(".image-files-container");
    let imageFileUI = document.createElement("div");
    imageFileUI.setAttribute("class", "file");
    imageFileUI.setAttribute("id", `img-${id}`);
    imageFileUI.innerHTML = `Image - ${new Date().toDateString()}
       <div class="download-btn file-btn">
            <i class="fas fa-download"></i>
        </div> 
    </div>`
    imageFilesContainer.prepend(imageFileUI);
}

function playListener(e) {
    console.log(e.target, e.target.parentElement, e.target.parentElement.parentElement);
    let mediaElementID = e.target.parentElement.parentElement.getAttribute("id");
    let dbTransaction = db.transaction("video", "readonly");
    let videoStore = dbTransaction.objectStore("video");
    let cursorResponse = videoStore.openCursor();
    cursorResponse.onsuccess = function(e) {
        let cursor = cursorResponse.result;
        if (cursor) {
            let id = cursor.key;                                                         // Fetches the unique key
            let value = cursor.value;                                                    // Fetches the mapped value to the key
            if (id === mediaElementID) {
                let blob = value.value;
                let url = URL.createObjectURL(blob);

                let videoPlayer = document.querySelector(".video-player");
                videoPlayer.src = url;
            }
            cursor.continue();                                                          // Loops you through all store elements 1-by-1
        }
    }
}

function downloadListener(e) {
    let mediaElementID = e.target.parentElement.parentElement.getAttribute("id");
    if (db) {
        if (mediaElementID.slice(0, 3) === "vid") {
            let dbTransaction = db.transaction("video","readonly");
            let videoStore = dbTransaction.objectStore("video");
            let cursorResponse = videoStore.openCursor();
            cursorResponse.onsuccess = function(e) {
                let cursor = cursorResponse.result;
                if (cursor) {
                    let id = cursor.key;
                    let value = cursor.value;
                    if (id === mediaElementID) {
                        let blob = value.value;
                        let url = URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = "VideoStream.webm"
                        a.click();
                        a.remove();
                    }
                    cursor.continue();
                }
            }
        }
        else {
            let dbTransaction = db.transaction("image", "readonly");
            let imageStore = dbTransaction.objectStore("image");
            let cursorResponse = imageStore.openCursor();
            cursorResponse.onsuccess = function(e) {
                let cursor = cursorResponse.result;
                if (cursor) {
                    let id = cursor.key;
                    let value = cursor.value;
                    if (id === mediaElementID) {
                        let blob = value.value;
                        let url = URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = "Screencapture.png"
                        a.click();
                        a.remove();
                    }
                    cursor.continue();
                }
            }
        }
        
    }
}