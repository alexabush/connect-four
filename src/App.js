import React, { Component } from 'react';
import Board from './Board';
import './App.css';

const DEFAULT_STATE = {
  winStatus: 0,
  board: Array.from({ length: 6 }, val => {
    return Array.from({ length: 7 }, val => 0);
  }),
  lastMove: null
};

class App extends Component {
  constructor(props) {
    super(props);
    //deep clone
    this.state = {
      ...JSON.parse(JSON.stringify(DEFAULT_STATE)),
      isPlayer1Start: true,
      isPlayer1Turn: true
    };
  }

  squareClicked = position => {
    console.log('position: ', position);
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      const newState = { ...prevState };
      newState.lastMove = position;
      if (
        newState.board[targetRow][targetColumn] === 0 &&
        this.isBottomSquare(position)
      ) {
        if (newState.isPlayer1Turn) {
          newState.board[targetRow][targetColumn] = 1;
        } else {
          newState.board[targetRow][targetColumn] = 2;
        }
        newState.isPlayer1Turn = !newState.isPlayer1Turn;
      }
      return newState;
    });
    this.checkWin();
    this.checkStalemate();
  };

  isBottomSquare = coordinate => {
    const board = this.state.board;
    const columnVals = [];
    const coordinateRow = coordinate[0];
    const coordinateColumn = coordinate[1];
    for (let i = board.length - 1; i >= 0; i--) {
      if (i === coordinateRow) break;
      columnVals.push(board[i][coordinateColumn]);
    }
    return columnVals.every(val => val !== 0);
  };

  checkStalemate = () => {
    this.setState(prevState => {
      const newState = { ...prevState };
      const currentBoard = newState.board;
      let stalemate = true;
      currentBoard.forEach((row, rowIndex) => {
        if (row.some(value => value === 0)) stalemate = false;
      });
      if (stalemate) newState.winStatus = 3;
      return newState;
    });
  };

  checkWin = () => {
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      const newState = { ...prevState };
      const currentBoard = newState.board;
      let p1Wins,
        p2Wins = false;
      const columns = Array.from({ length: currentBoard.length }, val => []);
      const diagonals = Array.from({ length: 24 }, val => []);
      // const di1 = [];
      // const di2 = [];
      currentBoard.forEach((row, rowIndex) => {
        if (isConnectFour(row, 1)) p1Wins = true;
        if (isConnectFour(row, 2)) p2Wins = true;

        row.forEach((value, column, row) => {
          if (column < columns.length) columns[column].push(value);
          //the challenge is figuring out WHICH diagonal to push each value into
          for (let i = 0; i <= 3; i++) {
            if (column === rowIndex + i) {
              diagonals[i].push(value);
            } else if (column === rowIndex - i) {
              diagonals[i + 10].push(value);
            }
          }
          //   if (column === row.length - rowIndex - 1) di2.push(value);
        });
      });
      // if (di1.every(val => val === 1)) p1Wins = true;
      // if (di1.every(val => val === 2)) p2Wins = true;
      // if (di2.every(val => val === 1)) p1Wins = true;
      // if (di2.every(val => val === 2)) p2Wins = true;

      // use last move data from state so I only need to calculate one row

      debugger;
      diagonals.forEach(arr => {
        if (arr.length >= 4) {
          if (isConnectFour(arr, 1)) p1Wins = true;
          if (isConnectFour(arr, 2)) p2Wins = true;
        }
      });

      columns.forEach(column => {
        if (isConnectFour(column, 1)) p1Wins = true;
        if (isConnectFour(column, 2)) p2Wins = true;
      });
      if (p1Wins) newState.winStatus = 1;
      if (p2Wins) newState.winStatus = 2;
      return newState;
    });
  };

  playAgain = () =>
    this.setState(prevState => {
      const newState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      newState.isPlayer1Start = !prevState.isPlayer1Start;
      newState.isPlayer1Turn = newState.isPlayer1Start;
      return newState;
    });

  render() {
    return (
      <div className="App">
        <h1>Connect Four</h1>
        <Board
          board={this.state.board}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          winStatus={this.state.winStatus}
          playAgain={this.playAgain}
          lastMove={this.state.lastMove}
        />
      </div>
    );
  }
}

export default App;

//this needs to be tested more rigorously
export const isConnectFour = (arr, player) => {
  let maxCount = 0;
  let counter = 0;
  let current;
  //need to see if there is four in a row of the player's number
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === player) {
      current = player;
      counter++;
    } else {
      current = arr[i];
      if (maxCount < counter) maxCount = counter;
      counter = 0;
    }
  }
  if (maxCount < counter) maxCount = counter;
  return maxCount >= 4;
};
