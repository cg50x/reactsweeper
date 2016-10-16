import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RSGame from './RSGame';

class App extends Component {
  constructor () {
    super();
    this._game = new RSGame({rows: 10, cols: 10});
  }
  //  cell states: 'flag' || 'hidden' || 'empty' || 'mine' || 'hot mine'
  renderCell({rowIndex, colIndex}) {
    let contents = null;
    let cellStyle = {};

    // Only rendering based on minefield now
    let gameState = this._game.getState();
    let minefield = gameState.minefield;
    let cellValue = minefield[rowIndex][colIndex];

    if (cellValue === RSGame.MINE_CELL) {
      contents = <img src={logo} role="presentation"/>
    } else if (cellValue === RSGame.HOT_MINE_CELL) {
      contents = <img src={logo} role="presentation"/>
      cellStyle.backgroundColor = 'red';
    } else if (typeof cellValue === 'number') {
      contents = <span>{cellValue}</span>;
      cellStyle.color = 'black';
    }
    return (
      <td
        className="Reactsweeper-cell"
        style={cellStyle}
        key={ colIndex }>
        { contents }
      </td>
    );
  }

  renderRow({row, rowIndex }) {
    let cells = row.map((cellValue, colIndex) => {
      return this.renderCell({rowIndex, colIndex});
    });
    return (
      <tr className="Reactsweeper-row" key={rowIndex}>
        { cells }
      </tr>
    );
  }

  renderGrid() {
    let gameState = this._game.getState();
    let minefield = gameState.minefield;
    let rows = minefield.map((row, rowIndex) => {
      return this.renderRow({ row, rowIndex });
    });
    return (
      <table className="Reactsweeper-grid">
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reactsweeper</h2>
          { this.renderGrid() }
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
