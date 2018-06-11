import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

class Board extends Component {
  render() {
    let highlight;
    const squares = this.props.board.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((square, column) => {
          const position = [rowIndex, column];
          if (this.props.lastMove) {
            if (
              this.props.lastMove[0] === position[0] &&
              this.props.lastMove[1] === position[1]
            ) {
              highlight = true;
            } else {
              highlight = false;
            }
          }
          return (
            <Square
              key={column}
              position={position}
              value={square}
              squareClicked={this.props.squareClicked}
              highlight={highlight}
            />
          );
        })}
      </div>
    ));

    let playStatus;
    switch (this.props.winStatus) {
    case 0:
      playStatus = 'Keep Playing!';
      break;
    case 1:
      playStatus = 'Player 1 Wins!';
      break;
    case 2:
      playStatus = 'Player 2 Wins!';
      break;
    case 3:
      playStatus = 'Stalemate!';
      break;
    }
    return (
      <div>
        <div>{squares}</div>
        <p>Ready: {this.props.currentTurn ? 'Player 1' : 'Player 2'}</p>
        <p>{playStatus}</p>
        <button onClick={this.props.playAgain}>Play Again?</button>
        <p>Last Move: {this.props.lastMove}</p>
      </div>
    );
  }
}

export default Board;
