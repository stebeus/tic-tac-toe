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
