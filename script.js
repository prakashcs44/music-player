


const play = document.querySelector(".play");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector(".progress-container");
const audio = document.querySelector("#audio");
const title = document.querySelector(".title");
const playIcon = document.querySelector(".play img");

const SERVER_URL = 'http://localhost:3000'

let songIndex = 0;
let songs = [];





const addSongs = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/songs`, {
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
  
      const data = await response.json();
      songs = data;
     // console.log(songs);
      
      loadSong();
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  


addSongs();




function loadSong(){
    title.innerHTML = `${songs[songIndex].title}`;
    audio.src = `${songs[songIndex].audio}`;
}



function playSong(){
   audio.play();
   playIcon.src = "img/pause-button.png";
}
function pauseSong(){
    audio.pause();
    playIcon.src = "img/play.png";
}
function prevSong(){
    songIndex = (songs.length-1+songIndex)%songs.length;
    loadSong();
    playSong();
}

function nextSong(){
    songIndex = (songIndex+1)%songs.length;
    loadSong();
    playSong();
}

function updateProgress(e){
   const {duration,currentTime} = e.srcElement
   let percentWidth = (currentTime/duration)*100;
   let width = percentWidth*400/100;
   progress.style.width = `${width}px`;
    
}
function setProgress(e){
  const clicked = e.offsetX;
  const percent = clicked/400*100;
  const duration = audio.duration;
  audio.currentTime = duration*percent/100;
}
// event listeners

play.addEventListener("click",()=>{
    if(playIcon.src.match("play")) playSong();
    else pauseSong();
})

prev.addEventListener("click",prevSong);
next.addEventListener("click",nextSong);
audio.addEventListener("timeupdate",updateProgress);//
progressContainer.addEventListener("click",setProgress);
audio.addEventListener("ended",nextSong)//