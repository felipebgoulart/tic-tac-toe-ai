"use strict";

const X = 'X';
const O = 'O';

let human = '';
let ai = '';
let currentPlayer = human;

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let gabarito = [
  ['a3', 'b3', 'c3'],
  ['a2', 'b2', 'c2'],
  ['a1', 'b1', 'c1']
]

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function chooseSide(side) {
  human = side;
  if (human == X) {
    currentPlayer = human;
    ai = O;
    scores['X'] = -10;
    scores['O'] = 10;
    releaseGame('Your');
  } else {
    ai = X;
    currentPlayer = ai;
    scores['O'] = -10;
    scores['X'] = 10;
    document.getElementById('turn').style.display = 'block';
    bestMove();
  }
}

function onFieldClick(x, y, id) {
  if (isValidMove(x, y)) {
    board[x][y] = human;
    document.getElementById(id).innerHTML = human;
    currentPlayer = ai;
    releaseGame('AI\'s');
    checkGameOver();
    setTimeout(() => bestMove(), 1000) // begin ai turn
  }
}

function isValidMove(x, y) {
  return board[x][y] == '';
}

function checkWinner() {
  let winner = null;

  // Horizontal Check
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical Check
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal Check
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}
