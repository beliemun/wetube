const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playButton = document.getElementById("jsPlayButton");
const volumeButton = document.getElementById("jsVolumeButton");
const fullScreenButton = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeRange = document.getElementById("jsVolumeRange");
const timeRange = document.getElementById("jsTimeRange");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log("videoId", videoId);
  fetch(`/api/${videoId}/view`, {
    method: "POST",
  });
};

const formatDate = (duration) => {
  const seconds = parseInt(duration, 10);
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let totalSeconds = parseInt(seconds - hours * 3600 - minutes * 60, 10);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

const setTimeRange = () => {
  timeRange.value = videoPlayer.currentTime / videoPlayer.duration;
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};

const setTotalTime = () => {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

const playInterval = () => setInterval(setTimeRange, 10);

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    playInterval();
  } else {
    videoPlayer.pause();
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    clearInterval(playInterval);
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const exitFullScreen = () => {
  fullScreenButton.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenButton.addEventListener("click", goFullScreen);
  document.exitFullscreen().catch((err) => Promise.resolve(err));
};

const goFullScreen = () => {
  videoContainer.requestFullscreen();
  fullScreenButton.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenButton.removeEventListener("click", goFullScreen);
  fullScreenButton.addEventListener("click", exitFullScreen);
};

const handleEnded = () => {
  registerView();
  videoPlayer.currentTime = 0;
  playButton.innerHTML = '<i class="fas fa-play"></i>';
};

const handleVolumeDrag = (event) => {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value > 0.6) {
    volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value > 0.2) {
    volumeButton.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeButton.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};

const handleTimeDrag = (event) => {
  clearInterval(playInterval);
  videoPlayer.currentTime = videoPlayer.duration * event.target.value;
};

const init = () => {
  videoPlayer.volume = 0.5;
  playButton.addEventListener("click", handlePlayClick);
  volumeButton.addEventListener("click", handleVolumeClick);
  fullScreenButton.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleVolumeDrag);
  timeRange.addEventListener("input", handleTimeDrag);
};

if (videoContainer) {
  init();
}
