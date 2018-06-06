import React from 'react';
import ReactDOM from 'react-dom';
import App, { isConnectFour } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const arrayWithWin = [0, 1, 2, 1, 1, 1, 1];
const arrayWithNoWin = [0, 1, 2, 1, 2, 1, 1];

test('array with 4 in a row returns true', () => {
  expect(isConnectFour(arrayWithWin)).toBe(true);
  expect(isConnectFour(arrayWithNoWin)).toBe(false);
});
