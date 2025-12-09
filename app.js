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

const GameController = (function () {
  const board = GameBoard.board;
  const players = [1, 2];

  let currPlayer = players[0];

  function logGame(str = `PLAYER ${currPlayer} TURN`, style = "") {
    console.clear();
    console.log(
      "%cType game.mark(row, column) to select a space in the board",
      "color: gray; font-style: italic;"
    );
    console.log(`%c${str}`, `${style} font-weight: bold;`);
    GameBoard.log();
  }

  function switchTurn() {
    switch (true) {
      case checkWin():
        logGame(
          `PLAYER ${currPlayer} WON! Type game.restart() to play again`,
          "color: lime;"
        );
        break;

      case checkTie():
        logGame("TIE! Type game.restart() to play again", "color: orange;");
        break;

      default:
        currPlayer = currPlayer === players[0] ? players[1] : players[0];
        logGame();
        break;
    }
  }

  function mark(row, col) {
    if (row >= board.length || col >= board.length) {
      throw Error("The selected row or column does not exist");
    }

    if (board[row][col] !== 0) {
      throw Error(`The row ${row} in column ${col} is already marked`);
    }

    board[row][col] = currPlayer;
    switchTurn();
  }

  function checkWin() {
    if (board.some(row => row.every(cell => cell === currPlayer))) {
      return true;
    }

    if (board[0].some(col => board.every(row => row[col] === currPlayer))) {
      return true;
    }

    if (
      board.every((row, col) => row[col] === currPlayer) ||
      board.every((row, col) => row[board.length - 1 - col] === currPlayer)
    ) {
      return true;
    }

    return false;
  }

  function checkTie() {
    return board.every(row => row.every(cell => cell !== 0));
  }

  logGame();

  return { mark };
})();

const game = GameController;
