"use strict";

function releaseGame(player) {
  startCron();
  document.getElementById('board').style.display = 'block';
  document.getElementById('choose-side').style.display = 'none';
  document.getElementById('player').innerHTML = player;
  document.getElementById('turn').style.display = 'block';
  setPlayerColor();
  if (player == 'Your') {
    enableClickEvents();
  } else {
    disableClickEvents();
  }
}

function setPlayerColor() {
  let parentEl = document.getElementsByClassName("board-line");

  for (let index = 0; index < parentEl.length; index++) {
    const element = parentEl[index];
    element.childNodes.forEach((node) => {
      if (node.textContent == X) {
        node.style.color = "#FCE77D";
      }
      if (node.textContent == O) {
        node.style.color = "#8DC3F1";
      }
    });
  }
}

function disableClickEvents() {
  const board = document.getElementById("board");
  board.style.pointerEvents = "none";
}

function enableClickEvents() {
  const board = document.getElementById("board");
  board.style.pointerEvents = "all";
}

function checkGameOver() {
  let result = checkWinner();
  if (result !== null) {
    let winner = '';

    if (result == 'tie') {
      winner = result;
    } else {
      if ((result == X && human == X) || (result == O && human == O)) {
        winner = 'You Win';
      } else {
        winner = 'AI Win';
      }
    }

    disableClickEvents();
    document.getElementById('winner').innerHTML = winner;
    document.getElementById('winner').style.display = 'block';
    document.getElementById('turn').style.display = 'none';
    document.getElementById('reset-game').style.display = 'block';
    pauseCron();
  }
}

function resetGame() {
  document.getElementById('choose-side').style.display = 'block';
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let parentEl = document.getElementsByClassName("board-line");

  for (let index = 0; index < parentEl.length; index++) {
    const element = parentEl[index];
    element.childNodes.forEach((node) => {
      node.textContent = '';
    });
  }
  document.getElementById('board').style.display = 'none';
  document.getElementById('turn').style.display = 'none';
  document.getElementById('winner').style.display = 'none';
  document.getElementById('reset-game').style.display = 'none';
  resetCron();
}