import '../assets/alert.mp3';

const defaultSession = 1;
let maxTime = defaultSession * 60;

let totalRemaining = 0;
let isRunning = false;

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const incButton = document.querySelector('.inc');
const decButton = document.querySelector('.dec');
const totalTime = document.querySelector('.totaltime');
const progressBar = document.querySelector('.progressbar');

function updateTime(time) {
  const newTime = maxTime + time * 60;
  if (newTime > 0 && newTime <= 7200) {
    maxTime = newTime;
    totalTime.innerText = `${maxTime / 60}:00`;
  }
}

function reset() {
  document.querySelector('.app').style.backgroundColor = '#1a237e';
  incButton.classList.remove('hidden');
  decButton.classList.remove('hidden');
  startButton.classList.remove('hidden');
  stopButton.classList.add('hidden');
  progressBar.classList.add('hidden');

  isRunning = false;
  totalTime.innerText = `${defaultSession}:00`;
}

function countdownTimer() {
  if (totalRemaining != 0 && isRunning) {
    totalRemaining--;
    setTimeout(countdownTimer, 1000);
    totalTime.innerText = secondsToTimeConverter(totalRemaining);
    progressBar.style.width = `${(totalRemaining * 45) / maxTime}%`;
  } else {
    reset();

    let audio = new Audio('../assets/alert.mp3');
    let promise = audio.play();
    if (promise) {
      //Older browsers may not return a promise, according to the MDN website
      promise.catch(function(error) {
        console.error(error);
      });
    }
  }
}

function secondsToTimeConverter(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;
  if (mins < 10) {
    mins = '0' + mins;
  }
  if (secs < 10) {
    secs = '0' + secs;
  }
  return `${mins}:${secs}`;
}

reset();

incButton.addEventListener('click', () => {
  updateTime(5);
});
decButton.addEventListener('click', () => {
  updateTime(-5);
});

startButton.addEventListener('click', () => {
  document.querySelector('.app').style.backgroundColor = '#5d928d';
  incButton.classList.add('hidden');
  decButton.classList.add('hidden');
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  progressBar.classList.remove('hidden');

  totalRemaining = maxTime;
  isRunning = true;
  countdownTimer();
});

stopButton.addEventListener('click', () => reset());
