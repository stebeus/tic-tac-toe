"use strict";

const rows = 3;
const columns = 3;
const board = [];

for (let row = 0; row < rows; row++) {
  board[row] = [];
  for (let column = 0; column < columns; column++) {
    board[row].push(0);
  }
}

const createPlayer = (integer, score) => ({ integer, score });

const playerOne = createPlayer(1, 0);
const playerTwo = createPlayer(2, 0);

let currentPlayer = playerOne.integer;

function mark(row, column) {
  if (row >= board.length || column >= board.length) {
    throw Error("The indicated row/column is bigger than the board");
  }

  if (board[row][column] !== 0) {
    throw Error(`The row ${row} in column ${column} is already marked`);
  }

  board[row][column] = currentPlayer;
  console.table(board);
}
