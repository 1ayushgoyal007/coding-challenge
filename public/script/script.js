const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.79,    // confidence threshold for predictions.
  }


navigator.getUserMedia = navigator.getUserMedia || 
navigator.webkitGetUserMedia  || 
navigator.mozGetUserMedia || 
navigator.msGetUserMedia;


var video = document.querySelector("#video");
var audio = document.querySelector("#audio");
var canvas  = document.querySelector("#canvas");
var secondHeading = document.querySelector('.second-heading');
var pause = document.querySelector('.pause');
var resume = document.querySelector('.resume');

const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video).then(status => {
    if(status){
        navigator.getUserMedia({video:{}}, stream => {
            video.srcObject = stream;
            secondHeading.style.display = "none";
            setInterval(runDetection, 100);
        },
        err => {console.log(err);}
        );
    }
})

function runDetection(){
    model.detect(video).then( predictions => {
        console.log(predictions);
        model.renderPredictions(predictions, canvas, context, video);

        if(predictions.length > 0){
            audio.pause();
            pause.style.display= "block";
            resume.style.display = "none";

        }else{
            audio.play();
            resume.style.display  = "block";
            pause.style.display = "none";

        }
    });
}

handTrack.load(modelParams).then( lmodel => {
    model = lmodel;
    });