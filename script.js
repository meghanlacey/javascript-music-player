const musicContainer = document.getElementById("music-container");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const volume = document.getElementById("volume-slider");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles
const songs = ["beinspired", "megaepic", "newbeginning"];

// Keep track of the song
let songIndex = 0;

// Starting audio volume
const startingVolume = (audio.volume = 0.2);

// Initially load the song details into the DOM
loadSong(songs[songIndex]);

// Update the song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
const playSong = function () {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

// Pause song
const pauseSong = function () {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};

// Previous song
const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = song.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = function () {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

// Update the song play progress bar
const updateProgress = function (event) {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Set the progress bar of the song when you click on it
const setProgress = function (event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  // Calculating the time duration of the song based on where you click on the progress bar
  audio.currentTime = (clickX / width) * duration;
};

// Event Listeners

// Click play/pause button to start/stop song
playBtn.addEventListener("click", function () {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change to the prev/next song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time and song update event
audio.addEventListener("timeupdate", updateProgress);

// Click on the progress bar
progressContainer.addEventListener("click", setProgress);

// Audio controls
volume.addEventListener("change", function (event) {
  audio.volume = event.currentTarget.value / 100;
});

// The song ends
audio.addEventListener("ended", nextSong);
