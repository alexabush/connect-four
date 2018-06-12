import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

const Row = styled.div`
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class Board extends Component {
  render() {
    let highlight;
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
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
        <button className="btn btn-primary" onClick={this.props.playAgain}>
          Play Again?
        </button>
      </div>
    );
  }
}

export default Board;
