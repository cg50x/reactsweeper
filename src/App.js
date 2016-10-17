import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RSGrid from './components/RSGrid';
import RSGame from './RSGame';

class App extends Component {
  constructor () {
    super();
    this._game = new RSGame({rows: 10, cols: 10});
    this._state = {
      gameState: this._game.getState()
    };
    this.onCellClick = this.onCellClick.bind(this);
  }
  
  onCellClick({rowIndex, colIndex}) {
    let gameState = this._game.revealPosition({row: rowIndex, col: colIndex});
    this.setState({ gameState });
  }

  render() {
    let gameState = this._game.getState();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reactsweeper</h2>
          <RSGrid gameState={ gameState } onCellClick={ this.onCellClick }></RSGrid>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
