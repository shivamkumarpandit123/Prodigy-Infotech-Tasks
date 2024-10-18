let startTime;
let updatedTime;
let difference;
let running = false;
let interval;

const display = document.getElementById('display');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stopTimer() {
    clearInterval(interval);
    running = false;
}

function resetTimer() {
    clearInterval(interval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
