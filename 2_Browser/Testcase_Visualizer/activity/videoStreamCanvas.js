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
    try {

        streamFlag = !streamFlag;
        let icon = document.querySelector(".stream-btn > i");
        if (streamFlag) {
            // Options for user
            response = Number(prompt(`1 - Screenshare                                   
    2 - Screenshare with video(Green screen chroma key)`, 1));
            if (!response) return;

            icon.classList.remove("fa-video");
            icon.classList.add("fa-video-slash"); 

            let screenShareElement = document.createElement("video");                   // Add video element to display
            screenShareElement.setAttribute("class", "screen-share");
            screenShareElement.autoplay = true;
            screenShareElement.width = 250;
            screenShareElement.height = 130;
            
            if (recursiveTreeFlag) screenShareElement.style.transform = "rotate(180deg)";
            let dsCont = document.querySelector(".ds-cont");
            dsCont.appendChild(screenShareElement);

            if (response === 1) {
                
                screenshareStart(screenShareElement);                               // Start screen share stream
            }
            else if (response === 2) {
                let screenShareCanvas = document.createElement("canvas");
                let tool = screenShareCanvas.getContext("2d");
                screenShareCanvas.setAttribute("class", "screen-share-canvas");
                screenShareCanvas.width = 250;
                screenShareCanvas.height = 130;
                dsCont.appendChild(screenShareCanvas);
                screenshareStart(screenShareElement, true, screenShareCanvas, tool);                         // true indicates to display with green screen (chroma)
            }
        }
        else {
            icon.classList.remove("fa-video-slash");
            icon.classList.add("fa-video");
            screenshareStop();
            response = null;
        }

    }
    catch(e) {
        console.log(e);
    }

});

function screenshareStart(videoElement, greenScreen, screenShareCanvas, tool) {
    try {
    
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

            if (greenScreen) {                                                          // This part is to add green screen effect in display
                let tool = screenShareCanvas.getContext("2d");
                videoElement.addEventListener("play", function() {
                    videoMainpulationTimer();                                       // On video play -> Initiate Chroma manipulation
                });
            }

            function videoMainpulationTimer() {                                 // Call timer for repeated chroma manipulation to the video stream
                if (videoElement.paused || videoElement.ended) {
                    return;
                }

                computeFrame();
                setTimeout(function() {
                    videoMainpulationTimer();
                }, 0)
            }

            function computeFrame() {  // Manipulate video stream with conditions of chroma
                tool.drawImage(videoElement, 0, 0, screenShareCanvas.width, screenShareCanvas.height);
                let frame = tool.getImageData(0, 0, screenShareCanvas.width, screenShareCanvas.height);
                let len = frame.data.length;
    
                for (let i = 0; i < len; i++) {
                    let r = frame.data[i + 0];
                    let g = frame.data[i + 1];
                    let b = frame.data[i + 2];
                    if (r >= 0 && g >= 100 && b >= 50)  // Chroma condition (for standard chroma condition (r > 0 && g > 177 && b > 64))
                        frame.data[i + 3] = 0;
                }

                tool.putImageData(frame, 0, 0);
                return;
            }

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
    catch(e) {
        console.log(e);
    }
}

function screenshareStop() {                                                         // Stop screen share
    try {
        recorder.stop();
        let videoElement = document.querySelector("video");
        videoElement.remove();
        let screenShareCanvas = document.querySelector(".screen-share-canvas");
        if (screenShareCanvas) screenShareCanvas.remove();
    } 
    catch (e) {
        console.log(e);
    }
    
}

function createVideoFileUI(id) {
    try {

        let videoFilesContainer = document.querySelector(".video-files-container");
        let videoFileUI = document.createElement("div");
        videoFileUI.setAttribute("class", "file");
        videoFileUI.setAttribute("id", `vid-${id}`);
        videoFileUI.innerHTML = `Video - ${new Date().toString().split("GMT")[0].trim()}
            <div class="play-btn file-btn">
                <i class="fas fa-play"></i>
            </div>
            <div class="delete-btn file-btn">
                <i class="fas fa-trash"></i>
            </div>
            <div class="download-btn file-btn">
                <i class="fas fa-download"></i>
            </div>
        </div>`
        videoFilesContainer.prepend(videoFileUI);

        let playBtn = videoFileUI.querySelector(".play-btn");
        playBtn.addEventListener("click", playListener);                     // Add listeners

        let downloadBtn = videoFileUI.querySelector(".download-btn");
        downloadBtn.addEventListener("click", downloadListener);

        let deleteBtn = videoFileUI.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteListener);

    }
    catch(e) {
        console.log(e);
    }

}

function createImageFileUI(id) {
    try {

        let imageFilesContainer = document.querySelector(".image-files-container");
        let imageFileUI = document.createElement("div");
        imageFileUI.setAttribute("class", "file");
        imageFileUI.setAttribute("id", `img-${id}`);
        imageFileUI.innerHTML = `Image - ${new Date().toDateString().split("GMT")[0].trim()}
            <div class="delete-btn file-btn">
                <i class="fas fa-trash"></i>
            </div>   
            <div class="download-btn file-btn">
                <i class="fas fa-download"></i>
            </div> 
        </div>`
        imageFilesContainer.prepend(imageFileUI);

        let downloadBtn = imageFileUI.querySelector(".download-btn");
        downloadBtn.addEventListener("click", downloadListener);

        let deleteBtn = videoFileUI.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteListener);

    }
    catch(e) {
        console.log(e);   
    }
}

function deleteListener(e) {
    try {
        
        let mediaElementID = e.target.parentElement.parentElement.getAttribute("id");
        e.target.parentElement.parentElement.remove();                                          // Remove from UI
        if (mediaElementID.slice(0, 3) === "vid") {
            console.log(mediaElementID);
            let dbTransaction = db.transaction("video","readwrite");
            let videoStore = dbTransaction.objectStore("video");
            videoStore.delete(mediaElementID);
        }
        else {
            console.log(mediaElementID);
            let dbTransaction = db.transaction("image", "readwrite");
            let imageStore = dbTransaction.objectStore("image");
            imageStore.delete(mediaElementID);
        }

    }
    catch(e) {
        console.log(e);
    }
}

function playListener(e) {
    try {

        let mediaElementID = e.target.parentElement.parentElement.getAttribute("id");
        let dbTransaction = db.transaction("video", "readonly");
        let videoStore = dbTransaction.objectStore("video");
        let cursorResponse = videoStore.openCursor();
        cursorResponse.onsuccess = function(e) {
            console.log('play');
            let cursor = cursorResponse.result;
            if (cursor) {
                let id = cursor.key;                                                         // Fetches the unique key
                let value = cursor.value;                                                    // Fetches the mapped value to the key
                if (id === mediaElementID) {
                    let blob = value.value;
                    let url = URL.createObjectURL(blob);
                    console.log(url);

                    let videoPlayer = document.querySelector(".video-player");
                    videoPlayer.src = url;
                }
                cursor.continue();                                                          // Loops you through all store elements 1-by-1
            }
        }
    }
    catch(e) {
        console.log(e);        
    }
}

function downloadListener(e) {
    try {

        let mediaElementID = e.target.parentElement.parentElement.getAttribute("id");
        console.log(mediaElementID);
        if (mediaElementID.slice(0, 3) === "vid") {
            let dbTransaction = db.transaction("video","readonly");
            let videoStore = dbTransaction.objectStore("video");
            let cursorResponse = videoStore.openCursor();
            cursorResponse.onsuccess = function(e) {
                let cursor = cursorResponse.result;
                console.log(cursor);
                if (cursor) {
                    console.log('in');
                    let id = cursor.key;
                    let value = cursor.value;
                    if (id == mediaElementID) {
                        console.log('int this');
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
    catch(e) {
        console.log(e);
    }
}