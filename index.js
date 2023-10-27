const timerEl = document.querySelector('.timer');
const playerHandlerBtn = document.getElementById('handle-playing');
const timeEl = document.getElementById('time');
const passedPomodorosEl = document.getElementById('passed-pomodoros');
const workingStatusContainer = document.querySelector('.working-status');
const workingStatusEl = document.querySelector('.working-status > span');
const displayerTimerBackground = document.querySelector('.display');
const increaseSizeBtn = document.getElementById('increase');

let playing = {
    onPlaying: false,
    onBreak: false,
    onWork: true
};

let minutes = 25;
let seconds = 0;
let pomodoros = 0;

const intervalFunc = () => {
    if(!playing.onPlaying) {
        clearInterval(timeInterval);
    } else {
        seconds -= 1;
        
        if(seconds <= 0) {
            minutes -= 1;
            seconds = 59;
        } else if(minutes === 0 && playing.onWork) {
            pomodoros += 1;
            minutes = 5;
            playing.onWork = false;
            playing.onBreak = true;

            workingStatusEl.innerText = 'ON BREAK';
            workingStatusContainer.style.background = "#156c35";
            displayerTimerBackground.style.background = "#156c35";
            passedPomodorosEl.innerText = `Passed pomodoros : ${pomodoros}`;
        } else if(minutes === 0 && playing.onBreak) {
            minutes = 25;
            playing.onWork = true;
            playing.onBreak = false;
            
            workingStatusContainer.style.background = "transparent";
            displayerTimerBackground.style.background = "#000000";
            workingStatusEl.innerText = 'ON WORK';
        }

        timeEl.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds}`;
    }
}

let timeInterval = null;

playerHandlerBtn.addEventListener('click', () => {
    if(!playing.onPlaying) {
        playing.onPlaying = true;
        timeInterval = setInterval(intervalFunc, 1000);
        playerHandlerBtn.innerText = "STOP";
    } else {
        playing.onPlaying = false;
        clearInterval(timeInterval);
        playerHandlerBtn.innerText = "START";
    }
});

increaseSizeBtn.addEventListener('click', () => {
    if(timerEl.style.transform === "scale(2)") {
        timerEl.style.transform = "scale(1)";
        increaseSizeBtn.innerText = "INCREASE SIZE";
    } else {
        timerEl.style.transform = "scale(2)";
        increaseSizeBtn.innerText = "DECREASE SIZE";
    }
});