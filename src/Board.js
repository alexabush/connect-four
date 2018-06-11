import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

const Row = styled.div`
  /* flex-direction: row; */
`;

class Board extends Component {
  render() {
    let highlight = false;
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((square, column) => {
          if (this.props.lastMove) {
            const currentCoordinate = [rowIndex, column];
            let flag = true;
            for (let i = 0; i < 2; i++) {
              if (this.props.lastMove[i] !== currentCoordinate[i]) flag = false;
            }
            if (flag) {
              // debugger;
              highlight = true;
            }
          }
          return (
            <Square
              key={column}
              position={[rowIndex, column]}
              value={square}
              squareClicked={this.props.squareClicked}
              highlight={highlight}
            />
          );
        })}
      </Row>
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
