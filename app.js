var obj = [];
var songs = [];
var albumCover = [];
var songNameArtist = [];


window.onload = setup();

function setup() {
  fetch('http://5dd1894f15bbc2001448d28e.mockapi.io/playlist')
    .then(res => res.json())
    .then((out) => {
      obj.push(out);
      var a = obj[0];
      for (i = 0; i < a.length; i++) {
        albumCover.push(a[i].albumCover);
        songs.push(a[i].file);
        songNameArtist.push((a[i].track) + "-" + (a[i].artist))
      }
      for (j = 0; j < songNameArtist.length; j++) {
        document.querySelectorAll("img")[j].setAttribute("src", albumCover[j]);
        document.querySelectorAll("p")[j].innerHTML = songNameArtist[j];
      }
      document.querySelectorAll("img")[9].setAttribute("src", albumCover[0]);
      document.querySelectorAll("p")[9].innerHTML = songNameArtist[0];

    });
}

var song=new Audio();
var currentSong = 0;

function playSong(){
  song.src = songs[currentSong];
  song.play();
}

function playOrPauseSong(){

  if(song.paused){
    playSong();
    document.querySelectorAll("i")[1].className = "fas fa-pause";
  }else{
    song.pause();
    document.querySelectorAll("i")[1].className = "fas fa-play";
  }
}
song.addEventListener("timeupdate",function(){
  var position = song.currentTime / song.duration;
  fill.style.width = position * 100 +"%";

  if(song.ended){
    next();
  }
});

function next(){
  currentSong++;

  if(currentSong > 9){
    currentSong = 0;
  }
  playSong();
  document.querySelectorAll("img")[0].setAttribute("src", albumCover[currentSong]);
  document.querySelectorAll("p")[0].innerHTML = songNameArtist[currentSong];
}

function previous(){
  currentSong--;

  if(currentSong < 0){
    currentSong = 9;
  }
  playSong();
  document.querySelectorAll("img")[0].setAttribute("src", albumCover[currentSong]);
  document.querySelectorAll("p")[0].innerHTML = songNameArtist[currentSong];
}

function selectedSong(w){
  console.log(w);
  song.src = songs[w];
  song.play();
  document.querySelectorAll("img")[0].setAttribute("src", albumCover[w]);
  document.querySelectorAll("p")[0].innerHTML = songNameArtist[w];
}
