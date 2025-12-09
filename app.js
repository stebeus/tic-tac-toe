"use strict";

const GameBoard = (function () {
  const board = [];

  for (let row = 0; row < 3; row++) {
    board[row] = [];
    for (let column = 0; column < 3; column++) {
      board[row].push(0);
    }
  }

  return { board };
})();

const createPlayer = (integer, score) => ({ integer, score });

const playerOne = createPlayer(1, 0);
const playerTwo = createPlayer(2, 0);

let currentPlayer = playerOne.integer;

function changeTurn() {
  console.clear();

  if (checkWin(currentPlayer)) {
    console.log(`%cPlayer ${currentPlayer} won!`, "color: limeGreen");
  } else if (checkDraw()) {
    console.log("Draw!");
  } else {
    if (currentPlayer === playerOne.integer) {
      currentPlayer = playerTwo.integer;
    } else {
      currentPlayer = playerOne.integer;
    }
    console.log(`%cPLAYER ${currentPlayer} TURN`, "font-weight: bold;");
  }

  console.table(board);
}

function mark(row, column) {
  if (row >= board.length || column >= board.length) {
    throw Error("The selected row/column is bigger than the board");
  }

  if (board[row][column] !== 0) {
    throw Error(`The row ${row} in column ${column} is already marked`);
  }

  board[row][column] = currentPlayer;
  changeTurn();
}

function checkWin(integer) {
  for (const row of board) {
    if (row.every(cell => cell === integer)) {
      return true;
    }
  }

  for (let column = 0; column < 3; column++) {
    if (
      board[0][column] === integer &&
      board[1][column] === integer &&
      board[2][column] === integer
    ) {
      return true;
    }
  }

  if (
    board[0][0] === integer &&
    board[1][1] === integer &&
    board[2][2] === integer
  ) {
    return true;
  }

  if (
    board[0][2] === integer &&
    board[1][1] === integer &&
    board[2][0] === integer
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  return board.every(row => row.every(cell => cell !== 0));
}

console.log("Use mark(row,column) to select a space in the board");
console.log(`%cPLAYER ${currentPlayer} TURN`, "font-weight: bold;");
console.table(board);
