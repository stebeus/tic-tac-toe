"use strict";

const GameBoard = (function () {
  const board = [];

  for (let row = 0; row < 3; row++) {
    board[row] = [];
    for (let col = 0; col < 3; col++) {
      board[row].push(0);
    }
  }

  const log = () => console.table(board);
  const reset = () => board.map(row => row.fill(0));

  return { board, log, reset };
})();

function createPlayer(integer) {
  let score = 0;

  const getScore = () => score;
  const increaseScore = () => score++;

  return { integer, getScore, increaseScore };
}

const GameController = (function () {
  const board = GameBoard.board;
  const players = [createPlayer(1), createPlayer(2)];

  let currentPlayer = players[0];

  function switchPlayerTurn() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    console.log(`PLAYER ${currentPlayer.integer} TURN`);
  }

  function playRound() {
    console.clear();

    switch (true) {
      case checkWin(currentPlayer.integer):
        currentPlayer.increaseScore();
        console.log(`PLAYER ${currentPlayer.integer} WON!`);
        break;

      case checkTie():
        console.log(`TIE!`);
        break;

      default:
        switchPlayerTurn();
        break;
    }

    GameBoard.print();
  }

  function mark(row, col) {
    if (row >= board.length || col >= board.length) {
      throw Error("The selected row or column does not exist");
    }

    if (board[row][col] !== 0) {
      throw Error(`The row ${row} in column ${col} is already marked`);
    }

    board[row][col] = currentPlayer.integer;
    playRound();
  }

  function checkWin(integer) {
    if (board.some(row => row.every(cell => cell === integer))) {
      return true;
    }

    if (board[0].some(col => board.every(row => row[col] === integer))) {
      return true;
    }

    if (
      board.every((row, col) => row[col] === integer) ||
      board.every((row, col) => row[board.length - 1 - col] === integer)
    ) {
      return true;
    }

    return false;
  }

  function checkTie() {
    return board.every(row => row.every(cell => cell !== 0));
  }

  console.log("Use mark(row,column) to select a space in the board");
  console.log(`PLAYER ${currentPlayer.integer} TURN`);
  GameBoard.print();

  return { mark };
})();

const game = GameController;
