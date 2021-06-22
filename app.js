const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const COLORS = ['tomato', 'lightblue', 'lightgreen', 'wheat'];
let time = 0;
let score = 0;

start.addEventListener('click', onStartGame);
timeList.addEventListener('click', onTimeChoice)
board.addEventListener('click', onTargetClick)

function onTargetClick(evt) {
    if (!evt.target.matches('.circle')) {
        return
    }
    score++;
    evt.target.remove();
    createRandomCircle();
}

function onStartGame(evt) {
    evt.preventDefault();
    screens[0].classList.add('up');
}

function onTimeChoice(evt) {
    evt.preventDefault();
    if (!evt.target.matches('.time-btn')) {
        return
    }
    screens[1].classList.add('up');
    time = Number(evt.target.dataset.time);
    startGame();
}

function startGame() {
    setInterval(onDecreaseTime, 1000);
    setTime(time);
    createRandomCircle();
}

function endGame() {
    timeEl.parentElement.style.visibility = 'hidden';
    board.innerHTML = `<h1>Счет <span class="primary">${score}</span></h1>`;
}

function onDecreaseTime() {
    if (time === 0) {
        endGame();
    } else {
        let current = --time;
        if (current < 10) {
            timeEl.textContent = `00:0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.textContent = `00:${value}`;
}

function createRandomCircle() {
    const {width, height} = board.getBoundingClientRect();
    const size = getRandomInt(15, 60);
    const x = getRandomInt(0, width - size);
    const y = getRandomInt(0, height - size);
    const color = COLORS[getRandomInt(0, COLORS.length-1)];
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background =`${color}`;
    board.append(circle);
}

function getRandomInt(min, max) {
    return Math.round((Math.random() * (max - min) + min));
}
