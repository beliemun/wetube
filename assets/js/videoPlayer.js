import { initialize } from "passport";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySeleter("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");

const handlePlayClick = () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.paused();
    }
}

const init = () => {
    console.log("init");
    playButton.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
    init();
}