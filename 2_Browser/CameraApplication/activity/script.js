let videoElem = document.querySelector("video");
let recordBtn = document.querySelector(".record");
let capture = document.querySelector(".capture");
let filterLayer = document.querySelector(".filter-layer");
let filterContainer = document.querySelector(".filter-container");
let timerBox = document.querySelector(".timer-box");
let timer = document.querySelector(".timer");
let isRecording = false;
let recordingData = [];
let filterColorOnImage;
let clearTimer;
let counter = 0;


let mediaRecoringObjectForCurrentStream;
// Asks user access for given constraints 
let constraint = {
    audio: true, 
    video: true
}

// Returns promise, of user reply 
let userMediaPromise = navigator.mediaDevices.getUserMedia(constraint);

// If resoved -> streams gets your stream 
userMediaPromise
    .then(function(stream) {
        videoElem.srcObject = stream;  // srcObject represents your stream source

        //  Object for media recording
        mediaRecoringObjectForCurrentStream = new MediaRecorder(stream);

        mediaRecoringObjectForCurrentStream.ondataavailable = function(e) {
            recordingData.push(e.data);  // Push chunks of data
        }

        // Download video on stop event of media object
        mediaRecoringObjectForCurrentStream.addEventListener("stop", function() {
            // recordingData -> convert to url
            // MIME type -> video/mp4

            let blob = new Blob(recordingData, {type: "video/mp4"});  // MIME type for video
            let url = window.URL.createObjectURL(blob);

            let a = document.createElement("a");
            a.download = "file.mp4";
            a.href = url;
            a.click();
            recordingData = [];
        });
    })
    .catch(function(err) {
        alert("Please allow access to audio and video");
    })

    recordBtn.addEventListener("click", function() {
        if (isRecording == false) {
            mediaRecoringObjectForCurrentStream.start();  // Start recording
            recordBtn.innerText = "Recording..";
            startTimer();
        }
        else {
            stopTimer();
            mediaRecoringObjectForCurrentStream.stop();  // Stop recording
            recordBtn.innerText = "Record";
        }

        isRecording = !isRecording;
    });

    capture.addEventListener("click", function(e){
            let canvasBoard = document.createElement("canvas");  // Create canvas element to add photo 
            let tool = canvasBoard.getContext("2d");  // Get control tool of canvas
            let height = videoElem.videoHeight;
            let width = videoElem.videoWidth;

            canvasBoard.height = height;
            canvasBoard.width = width;

            // Take that one frame from video source to draw image
            tool.drawImage(videoElem, 0, 0, canvasBoard.width, canvasBoard.height);  // Fix dimensions of image (0, 0 -> x,y-coordinate ; canvasBoard.width, height -> destination image width and height)

            // Apply filter color over image after image is ready
            if (filterColorOnImage) {
                tool.fillStyle = filterColorOnImage;
                tool.fillRect(0, 0, width, height);
            }

            let a = document.createElement("a");
            let videourl = canvasBoard.toDataURL();  // Create canvas to url format for download
            a.download = "Myphoto.png";
            a.href = videourl;
            a.click();
    });

// Filter application
let allFilters = filterContainer.children;
for (let i = 0;i < allFilters.length;i++) {     // Apply filter on image with respect to specified filter option
    allFilters[i].addEventListener("click", function() {
        let filterColorToApply = allFilters[i].style.backgroundColor;
        filterLayer.style.backgroundColor = filterColorToApply;
        filterColorOnImage = filterColorToApply;
    });
}


function startTimer() {
    timerBox.style.display = "flex";
    function displayRecorderTime() {  // Timer logic
        let totalSeconds = counter;
        let hours = Number.parseInt(totalSeconds/3600);
        totalSeconds = totalSeconds%3600;
        let minutes = Number.parseInt(totalSeconds/60);
        totalSeconds = totalSeconds%60;
        let seconds = totalSeconds;

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;
        
        timer.innerText = `${hours}:${minutes}:${seconds}`;
        counter++;
    }
    clearTimer = setInterval(displayRecorderTime, 1000);
}

function stopTimer() {
    timerBox.style.display = "none";
    clearInterval(clearTimer);
    timer.innerText = "00:00:00";
    counter = 0;
}