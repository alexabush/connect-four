import React, { Component } from 'react';
import Board from './Board';
import './App.css';

const DEFAULT_STATE = {
  winStatus: 0,
  board: Array.from({ length: 6 }, val => {
    return Array.from({ length: 7 }, val => 0);
  })
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
    // this.checkWin();
    // this.checkStalemate();
  };

  isBottomSquare = coordinate => {
    //don't modify the board, just return boolean
    const board = this.state.board;
    const coordinateColumn = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (coordinate[1] !== j) continue;
        coordinateColumn.push(board[i][j]);
        if (board[i][j] === coordinate) break;
      }
    }
    console.log(coordinate);
    console.log(coordinateColumn);
    //I have all the columns in this row
    //need to get all the columns values 'under' the target coordinate
    //if any values under coordinate are 0, return false
    //else, return true (use some/every)
    debugger;
    return true;
  };

  // checkStalemate = () => {
  //   this.setState(prevState => {
  //     const newState = { ...prevState };
  //     const currentBoard = newState.board;
  //     let stalemate = true;
  //     currentBoard.forEach((row, rowIndex) => {
  //       if (row.some(value => value === 0)) stalemate = false;
  //     });
  //     if (stalemate) newState.winStatus = 3;
  //     return newState;
  //   });
  // };

  // checkWin = () => {
  //   this.setState(prevState => {
  //     if (prevState.winStatus !== 0) return prevState;
  //     const newState = { ...prevState };
  //     const currentBoard = newState.board;
  //     let p1Wins,
  //       p2Wins = false;
  //     const columns = Array.from({ length: currentBoard.length }, val => []);
  //     const di1 = [];
  //     const di2 = [];
  //     currentBoard.forEach((row, rowIndex) => {
  //       if (row.every(square => square === 1)) p1Wins = true;
  //       if (row.every(square => square === 2)) p2Wins = true;
  //       row.forEach((value, column, row) => {
  //         columns[column].push(value);
  //         if (column === rowIndex) di1.push(value);
  //         if (column === row.length - rowIndex - 1) di2.push(value);
  //       });
  //     });
  //     if (di1.every(val => val === 1)) p1Wins = true;
  //     if (di1.every(val => val === 2)) p2Wins = true;
  //     if (di2.every(val => val === 1)) p1Wins = true;
  //     if (di2.every(val => val === 2)) p2Wins = true;
  //     columns.forEach(column => {
  //       if (column.every(val => val === 1)) p1Wins = true;
  //       if (column.every(val => val === 2)) p2Wins = true;
  //     });
  //     if (p1Wins) newState.winStatus = 1;
  //     if (p2Wins) newState.winStatus = 2;
  //     return newState;
  //   });
  // };

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
        />
      </div>
    );
  }
}

export default App;
