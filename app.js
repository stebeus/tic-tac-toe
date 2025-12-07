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

function mark(row, column) {
  if (row >= board.length || column >= board.length) {
    console.error("The indicated row/column is bigger than the board");
    return;
  }

  if (board[row][column] !== 0) {
    console.error(`The row ${row} in column ${column} is already marked`);
    return;
  }

  board[row][column] = playerOne.integer;
  console.table(board);
}
