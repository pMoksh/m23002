const songList = document.getElementById("songList");
const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let songs = [];
let currentSong = -1;

fetch("songs.json")
    .then(res => res.json())
    .then(data => {
        songs = data;
        renderSongs();
    });

function renderSongs() {

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const div = document.createElement("div");

        div.className = "song";

        div.innerHTML = `
            <strong>${song.title}</strong><br>
            ${song.artist}
        `;

        div.onclick = () => playSong(index);

        songList.appendChild(div);

    });

}

function playSong(index) {

    currentSong = index;

    const song = songs[index];

    audio.src = song.file;

    title.textContent = song.title;
    artist.textContent = song.artist;

    cover.src = song.cover;

    audio.play();

    updateActiveSong();

}

function updateActiveSong() {

    document.querySelectorAll(".song").forEach((element, index) => {

        element.classList.toggle("active", index === currentSong);

    });

}

nextBtn.onclick = () => {

    if (currentSong < songs.length - 1)
        playSong(currentSong + 1);

};

prevBtn.onclick = () => {

    if (currentSong > 0)
        playSong(currentSong - 1);

};

audio.addEventListener("ended", () => {

    if (currentSong < songs.length - 1)
        playSong(currentSong + 1);

});