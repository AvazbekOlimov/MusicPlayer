const container = document.getElementById('container')
const audio = document.getElementById('audio')
const title = document.getElementById('title')
const cover = document.getElementById('cover')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressCont = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')


nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)
audio.addEventListener('timeupdate', setProgress)
progressCont.addEventListener('click', setProgressTime)
audio.addEventListener('ended', nextSong)


const songs = [
  'Caradag', 
  'Arcane',
  'Oceans',
]
let indexSong = 0
loadSong(songs[indexSong])
function loadSong(song) {
  title.textContent = song
  audio.src = `musics/${song}.mp3`
  cover.src = `album/${song}.jpg`
}
function playSong() {
  container.classList.add('play')
  playBtn.innerHTML = `<i class="fas fa-pause"></i>`
  audio.play()
}
function pauseSong() {
  container.classList.remove('play')
  playBtn.innerHTML = `<i class="fas fa-play"></i>`
  audio.pause()
}
function nextSong() {
  indexSong++
  if (indexSong > songs.length - 1) {
    indexSong = 0
  }
  loadSong(songs[indexSong])
  playSong()
}
function prevSong() {
  indexSong--
  if (indexSong < 0) {
    indexSong = songs.length - 1
  }
  loadSong(songs[indexSong])
  playSong()
}
function setProgress(e) { 
  const { currentTime, duration } = e.srcElement
  const currentTimeMusic = currentTime
  const durationMusic = duration
  const progressPresent = (currentTimeMusic / durationMusic) * 100
  progress.style.width = `${progressPresent}%`
  let minutes = Math.floor(durationMusic / 60)
  let seconds = Math.floor(durationMusic % 60)
  end.textContent = `${minutes}:${(seconds =
    seconds < 10 ? '0' + seconds : seconds)}`
  let currentMinutes = Math.floor(currentTimeMusic / 60)
  let currentSecond = Math.floor(currentTimeMusic % 60)
  start.textContent = `${currentMinutes}:${(currentSecond =
    currentSecond < 10 ? '0' + currentSecond : currentSecond)}`
}
function setProgressTime(e) {
  const width = this.clientWidth
  const clientX = e.offsetX
  const duration = audio.duration
  audio.currentTime = (clientX / width) * duration
}
playBtn.addEventListener('click', () => {
  const isPlaying = container.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})
