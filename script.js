
console.log('Welcome to Spotify');
let songIndex = 0;
let audioElement = new Audio('1.mp3');  // Adjust the path if necessary
let masterPlay = document.getElementById('masterPlay');
let myBar = document.getElementById('myBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('songTitle'); // Add this line to reference the song name element
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "Let Me Love You", filePath: "1.mp3", coverPath: "images/song1.jpg"},
    {songName: "Clam Down", filePath: "2.mp3", coverPath: "images/song2.jpg"},
    {songName: "Dance At Night", filePath: "3.mp3", coverPath: "images/song3.jpeg"},
    {songName: "Vampire", filePath: "4.mp3", coverPath: "images/song4.jpeg"},
    {songName: "Miracle", filePath: "5.mp3", coverPath: "images/song5.jpeg"},
    {songName: "Not One Time", filePath: "6.mp3", coverPath: "images/song6.jpeg"},
    {songName: "Dynamite", filePath: "7.mp3", coverPath: "images/song7.jpeg"}
];

// Toggle Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});

// Update Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myBar.value = progress;
});

// Change song position based on the progress bar
myBar.addEventListener('change', () => {
    audioElement.currentTime = (myBar.value * audioElement.duration) / 100;
});
myBar.addEventListener('input', () => {
    audioElement.currentTime = (myBar.value * audioElement.duration) / 100;
});

// Populate song list with song names and covers
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Reset all play icons to play state
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

// Play selected song from the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName; // Update the song name
        gif.src = songs[songIndex].coverPath; // Update the song cover image
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// Next song functionality
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    gif.src = songs[songIndex].coverPath; // Update the song cover image
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Handle wrap around
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName; // Update the song name
    gif.src = songs[songIndex].coverPath; // Update the song cover image
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

// Automatically move to the next song when the current song ends
audioElement.addEventListener('ended', () => {
    document.getElementById('next').click(); // Trigger next song when current song ends
});


