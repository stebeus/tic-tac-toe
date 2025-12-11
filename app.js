"use strict";

const GameBoard = (function () {
  const board = [];

  for (let row = 0; row < 3; row++) {
    board[row] = [];
    for (let col = 0; col < 3; col++) {
      board[row].push("");
    }
  }

  const reset = () => board.map(row => row.fill(""));

  return { board, reset };
})();

const GameController = (function () {
  const board = GameBoard.board;
  const players = ["X", "O"];

  let currPlayer = players[0];

  const getCurrPlayer = () => currPlayer;

  function switchTurn() {
    switch (true) {
      case checkWin():
        break;

      case checkTie():
        break;

      default:
        currPlayer = currPlayer === players[0] ? players[1] : players[0];

        break;
    }
  }

  function mark(row, col) {
    if (board[row][col] !== "") return;
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
    return board.every(row => row.every(cell => cell !== ""));
  }

  function restart() {
    GameBoard.reset();
    currPlayer = players[0];
  }

  return { getCurrPlayer, mark, restart };
})();

const GameRender = (function () {
  const announcement = document.querySelector(".announcement");
  const boardDiv = document.querySelector(".board");
  const btnRestart = document.querySelector("#restart");

  const board = GameBoard.board;
  const game = GameController;

  function elementFromHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function delegateEvent(type, selector, callback, parent = document) {
    parent.addEventListener(type, e => {
      if (e.target.closest(selector)) {
        callback(e);
      }
    });
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const cell = elementFromHTML(
        `<div class="cell" data-index="${row}-${col}"></div>`
      );
      boardDiv.appendChild(cell);
    }
  }
})();
