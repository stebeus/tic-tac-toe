"use strict";

const board = [];

for (let row = 0; row < 3; row++) {
  board[row] = [];
  for (let column = 0; column < 3; column++) {
    board[row].push(0);
  }
}

const createPlayer = (integer, score) => ({ integer, score });

const playerOne = createPlayer(1, 0);
const playerTwo = createPlayer(2, 0);

let currentPlayer = playerOne.integer;

function changeTurn() {
  if (currentPlayer === playerOne.integer) {
    currentPlayer = playerTwo.integer;
  } else {
    currentPlayer = playerOne.integer;
  }

  console.clear();
  console.log(`%cPLAYER ${currentPlayer} TURN`, "font-weight: bold;");
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

console.log("Use mark(row,column) to select a space in the board");
console.log(`%cPLAYER ${currentPlayer} TURN`, "font-weight: bold;");
console.table(board);
