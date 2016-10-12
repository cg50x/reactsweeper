import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //  cell states: 'flag' || 'hidden' || 'empty' || 'mine' || 'hot mine'
  renderCell({cellState, colIndex}) {
    let contents = null;
    let cellStyle = {};

    switch (cellState) {
      case 'mine':
        contents = <img src={logo} />
        break;
      case 'hot mine':
        contents = <img src={logo} />
        cellStyle.backgroundColor = 'red';
        break;
      case 'hidden':
        cellStyle.backgroundColor = 'blue';
        break;
      case 'flag':
        contents = 'flag';
        cellStyle.color = 'black';
        cellStyle.backgroundColor = 'blue';
        break;
      case 'empty':
      default:
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

  renderRow({ numRows, numCols, rowIndex }) {
    let cells = Array(numCols).fill();
    cells = cells.map((val, colIndex) => {
      let cellType = '';
      let rand = Math.random();
      if (rand <= .2) {
        cellType = 'mine';
      } else if (rand <= .4) {
        cellType = 'hot mine';
      } else if (rand <= .6) {
        cellType = 'hidden';
      } else if (rand <= .8) {
        cellType = 'flag';
      } else {
        cellType = 'empty';
      }
      return this.renderCell({cellType, colIndex});
    });
    return (
      <tr className="Reactsweeper-row" key={rowIndex}>
        { cells }
      </tr>
    );
  }

  renderGrid() {
    let numRows = 10;
    let numCols = 10;
    let rows = Array(10).fill();
    rows = rows.map((val, rowIndex) => {
      return this.renderRow({ numRows, numCols, rowIndex });
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
