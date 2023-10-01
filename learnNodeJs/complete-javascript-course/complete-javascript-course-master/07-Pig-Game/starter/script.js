'use strict';

let score0 = 0;
let score1 = 0;
let current = 0;
let player = 0;
let playing = true;
const img = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
let totalScore0 = document.getElementById('score--0');
const totalScore1 = document.querySelector('#score--1');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

rollBtn.addEventListener('click', () => {
  if (playing) {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    img.src = `dice-${randomNumber}.png`;
    img.classList.remove('hidden');
    if (randomNumber === 1) {
      current = 0;
      if (player) {
        player = 0;
        currentScore1.textContent = current;
      } else {
        player = 1;
        currentScore0.textContent = current;
      }
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    } else {
      if (player) {
        current += randomNumber;
        currentScore1.textContent = current;
      } else {
        current += randomNumber;
        currentScore0.textContent = current;
      }
    }
  }
});

holdBtn.addEventListener('click', () => {
  if (playing) {
    if (player) {
      score1 += current;
      totalScore1.textContent = score1;
      current = 0;
      currentScore1.textContent = current;
      player = 0;
    } else {
      score0 += current;
      totalScore0.textContent = score0;
      current = 0;
      currentScore0.textContent = current;
      player = 1;
    }
    if (score0 >= 20) {
      playing = false;
      player0El.classList.remove('player--active');
      player0El.classList.add('player--winner');
      img.classList.add('hidden');
    } else if (score1 >= 20) {
      playing = false;
      player1El.classList.remove('player--active');
      player1El.classList.add('player--winner');
      img.classList.add('hidden');
    } else {
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

newBtn.addEventListener('click', () => {
  current = 0;
  player = 0;
  score0 = 0;
  score1 = 0;
  playing = true;
  currentScore0.textContent = current;
  currentScore1.textContent = current;
  totalScore0.textContent = score0;
  totalScore1.textContent = score1;
  img.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
