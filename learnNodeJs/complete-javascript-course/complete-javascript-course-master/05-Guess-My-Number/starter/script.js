'use strict';

let displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

// initiate the secret number
let secretNumber = Math.trunc(Math.random() * 20 + 1);

// initialize score
let score = 20;
document.querySelector('.score').textContent = score;

let highscore = 0;
document.querySelector('.highscore').textContent = highscore;

// when check button clicked
document.querySelector('.check').addEventListener('click', () => {
  // get the guess value and create guess variable
  const guess = Number(document.querySelector('.guess').value);

  // compare guess number with secret number
  if (!guess) {
    // document.querySelector('.message').textContent = 'Make Sense 🤯';
    displayMessage('Make Some Sense 🤯');

    // when guess is equal to secretNumber
  } else if (guess === secretNumber) {
    if (score !== 0) {
      // document.querySelector('.message').textContent = 'You Win 🎉';
      displayMessage('You Win 🎉');
      document.querySelector('.number').textContent = secretNumber;
      if (highscore < score) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
      document.querySelector('body').style.backgroundColor = 'green';

      document.querySelector('.number').style.width = '30rem';
    } else {
      displayMessage('You Lose 💩');
      // document.querySelector('.message').textContent = 'You Lose 💩';
    }
  } else {
    displayMessage(guess > secretNumber ? 'Too High 📈' : 'Too Low 📉');
    // document.querySelector('.message').textContent =
    //   guess > secretNumber ? 'Too High 📈' : 'Too Low 📉';
    if (score === 0) {
      displayMessage('You Lose 💩');
      //   document.querySelector('.message').textContent = 'You Lose 💩';
    } else {
      score--;
      document.querySelector('.score').textContent = score;
    }
  }

  //     // when guess is too high
  //   } else if (guess > secretNumber) {
  //     document.querySelector('.message').textContent = 'Too High 📈';
  //     if (score === 0) {
  //       document.querySelector('.message').textContent = 'You Lose 💩';
  //     } else {
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     }

  //     //when guess is too low
  //   } else {
  //     document.querySelector('.message').textContent = 'Too Low 📉';
  //     if (score === 0) {
  //       document.querySelector('.message').textContent = 'You Lose 💩';
  //     } else {
  //       score--;
  //       document.querySelector('.score').textContent = score;
  //     }
  //   }
});

document.querySelector('.again').addEventListener('click', () => {
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';

  score = 20;
  document.querySelector('.score').textContent = score;

  displayMessage('Start guessing...');
  // document.querySelector('.message').textContent = 'Start guessing...';
});
