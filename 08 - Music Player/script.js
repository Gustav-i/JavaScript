const img = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')

const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')


const songs = [
  {
    name: "BWV 1 - Coro Wie schon leuchtet der Morgenstern",
    artist: "Bach",
    cover: "001"
  },
  {
    name: "BWV 4 - Sinfonia",
    artist: "Bach",
    cover: "002"
  },
  {
    name: "BWV 7 - Coro Christ unser Herr zum Jordan kam",
    artist: "Bach",
    cover: "003"
  },
  {
    name: "BWV 10 - Coro Meine Seel erhebt den Herren",
    artist: "Bach",
    cover: "004"
  },
]

let isPlaying = false

// Play
function playSong()
{
  isPlaying = true
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'Pause')
  music.play()    
}

// Pause
function pauseSong() 
{
  isPlaying = false
  playBtn.classList.replace('fa-pause', 'fa-play')
  playBtn.setAttribute('title', 'Play')
  music.pause()    
}

playBtn.addEventListener('click', () => 
{
  isPlaying ? pauseSong() : playSong()
})

// Update DOM
function loadSong(song) 
{
  title.textContent = song.name
  artist.textContent = song.artist
  music.src = `music/${song.name}.mp3`
  img.src = `img/${song.cover}.jpg`
}

let songIndex = 0

function prevSong() 
{
  songIndex--

  if (songIndex < 0) 
  {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])
  playSong()
}

function nextSong() 
{
  songIndex++

  if (songIndex > songs.length - 1) 
  {
    songIndex = 0
  }

  loadSong(songs[songIndex])
  playSong()
}

loadSong(songs[songIndex])

function updateProgressBar(e) 
{
  if (isPlaying) 
  {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) 
    {
      durationSeconds = `0${durationSeconds}`
    }

    if (durationSeconds) 
    {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) 
    {
      currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

function setProgressBar(e) 
{
  const width = this.clientWidth
  const clickX = e.offsetX
  const { duration } = music
  music.currentTime = (clickX / width) * duration
}

// Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)