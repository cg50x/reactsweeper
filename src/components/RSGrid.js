import React, { Component } from 'react';

import logo from '../logo.svg';
import RSGame from '../RSGame';

class RSGrid extends Component {
  render() {
  	let gameState = this.props.gameState;
  	let rows = gameState.minefield.map((row, rowIndex) => {
  	  return this._renderRow({
  	  	row,
  	  	rowIndex,
  	  	gameState
  	  });
  	});
  	return (
  	  <table className="Reactsweeper-grid">
  	    <tbody>
  	      { rows }
  	    </tbody>
  	  </table>
  	);
  }

  onCellClick({rowIndex, colIndex}) {
  	return this.props.onCellClick({rowIndex, colIndex});
  }

  _renderRow({ row, rowIndex, gameState }) {
    let cells = row.map((cellValue, colIndex) => {
      return this._renderCell({rowIndex, colIndex, gameState });
    });
    return (
      <tr className="Reactsweeper-row" key={rowIndex}>
        { cells }
      </tr>
    );
  }

  _renderCell({ rowIndex, colIndex, gameState }) {
    let contents = null;
    let cellStyle = {};

    // Only rendering based on minefield now
    let {minefield, fog} = gameState;
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
}

export default RSGrid;