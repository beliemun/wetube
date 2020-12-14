import { initialize } from "passport";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");

const handlePlayClick = () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
}

const init = () => {
    console.log("init");
    playButton.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
    init();
}