import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: inline-block;
`;

const StyledText = styled.p`
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${({ color }) => color || '#228B22'};
`;

class Square extends Component {
  render() {
    let color = this.props.highlight ? 'red' : 'black';
    return (
      <StyledDiv onClick={() => this.props.squareClicked(this.props.position)}>
        <StyledText color={color}>{this.props.value}</StyledText>
      </StyledDiv>
    );
  }
}

export default Square;
