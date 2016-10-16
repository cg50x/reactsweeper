import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RSGame from './RSGame';

class App extends Component {
  constructor () {
    super();
    this._game = new RSGame({rows: 10, cols: 10});
  }
  
  onCellClick({rowIndex, colIndex}) {
    this._game.revealPosition({row: rowIndex, col: colIndex});
    // TODO the click should be calling set state
    // Need to change the code so that all render functions only
    // read from state or props. may need to put renderCell and renderRow
    // into their own components.
    this.forceUpdate();
  }

  renderCell({rowIndex, colIndex}) {
    let contents = null;
    let cellStyle = {};

    // Only rendering based on minefield now
    let {minefield, fog} = this._game.getState();
    let minefieldValue = minefield[rowIndex][colIndex];
    let fogValue = fog[rowIndex][colIndex];

    if (fogValue === RSGame.HIDDEN_CELL) {
      cellStyle.backgroundColor = '#ccc';
    } else if (fogValue === RSGame.FLAGGED_CELL) {
      cellStyle.backgroundColor = '#ccc';
      cellStyle.color = 'black';
      contents = <span>flag</span>
    } else if (fogValue === RSGame.REVEALED_CELL) {
      if (minefieldValue === RSGame.MINE_CELL) {
        contents = <img src={logo} role="presentation"/>
      } else if (minefieldValue === RSGame.HOT_MINE_CELL) {
        contents = <img src={logo} role="presentation"/>
        cellStyle.backgroundColor = 'red';
      } else if (typeof minefieldValue === 'number') {
        contents = <span>{minefieldValue}</span>;
        cellStyle.color = 'black';
      }
    }
    
    return (
      <td
        onClick={this.onCellClick.bind(this, {rowIndex, colIndex})}
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
