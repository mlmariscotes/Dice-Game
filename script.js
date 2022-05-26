"use strict";

// Selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0"); // Player 1
const current1EL = document.getElementById("current--1"); // Player 2

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Declaring initial value
let scores, currentScore, activePlayer, playing;

// Switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggle both will insure that the background color will be on the  active player only.
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

const init = function () {
  // Starting conditions
  // Reassigning value
  scores = [0, 0]; // Storing scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEL.classList.add("hidden");
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active"); // Player 1 is the initial player.
  player1EL.classList.remove("player--active");
};
init();

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dioce roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // 3. Check for rolled one 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if palyer's score is >= 3100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Reset GAME
btnNew.addEventListener("click", init);
