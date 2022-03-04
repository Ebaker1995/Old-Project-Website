'use strict';
/*
/DOM MANIPULATION
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.secretNumber').textContent = 13;
document.querySelector('.score').textContent = 10;

/sets value
document.querySelector('.guess').value = 23;

/reads value
console.log(document.querySelector('.guess').value);
*/

//Random secretNumber between 1 and 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = '20';
});
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  //When incorrect input
  if (!guess) {
    // document.querySelector('.message').textContent = '😠 No number!';
    displayMessage('😠 No number!');

    //When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber ? '📈 Guess too high' : '📉 Guess too low'
      );
      score--;
      document.querySelector('.score').textContent = score;

      //When player looses
    } else {
      displayMessage('💣You lost the game');
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#FF0000';
      document.querySelector('.number').style.width = '15rem';
    }
  }

  //When player is too high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Guess too high';
  //     score--;
  //     document.querySelector('.score').textContent = score;

  //When player looses
  //   } else {
  //     document.querySelector('.message').textContent = '💣You lost the game';
  //     document.querySelector('.number').textContent = secretNumber;
  //     document.querySelector('body').style.backgroundColor = '#FF0000';
  //     document.querySelector('.number').style.width = '30rem';
  //   }

  //When player is too low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Guess too low';
  //     score--;
  //     document.querySelector('.score').textContent = score;

  //When player looses
  //   } else {
  //     document.querySelector('.message').textContent = '💣You lost the game';
  //     document.querySelector('.number').textContent = secretNumber;
  //     document.querySelector('body').style.backgroundColor = '#FF0000';
  //     document.querySelector('.number').style.width = '30rem';
  //   }
  // }
});

const chkElement = document.getElementById('chk');

const ElementId = function (id) {
  document.querySelector(id).classList.toggle('dark');
};

chkElement.addEventListener('change', () => {
  // document.body.classList.toggle('dark');
  ElementId('body');
  ElementId('.left');
  ElementId('.number');
  ElementId('.label');
  ElementId('header');
  ElementId('.guess');
  ElementId('.right');
});
