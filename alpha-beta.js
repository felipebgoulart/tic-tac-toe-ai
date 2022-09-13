"use strict";

function bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    let coord;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, 0, false);
          board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
            coord = board[i][j];
          }
        }
      }
    }
  
    if (move) {
      board[move.i][move.j] = ai;
  
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i == move.i && j == move.j) {
            document.getElementById(gabarito[i][j]).innerHTML = ai;
          }
        }
      }
    
      currentPlayer = human;
      releaseGame('Your');
      checkGameOver();
    }
  }
  
  function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }