import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RSGrid from './components/RSGrid';
import RSGame from './RSGame';

class App extends Component {
  constructor () {
    super();
    this._game = new RSGame({rows: 10, cols: 10});
    this.state = {
      gameState: this._game.getState()
    };
    this.onCellClick = this.onCellClick.bind(this);
    this.onCellRightClick = this.onCellRightClick.bind(this);
  }
  
  onCellClick({rowIndex, colIndex}) {
    let gameState = this._game.revealPosition({row: rowIndex, col: colIndex});
    this.setState({gameState});
  }

  onCellRightClick({rowIndex, colIndex}) {
    let gameState = this._game.toggleFlagPosition({row: rowIndex, col: colIndex});
    this.setState({gameState});
  }

  render() {
    let gridStyle = {
      marginLeft: 'auto',
      marginRight: 'auto'
    };
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Reactsweeper</h2>
        </div>
        <RSGrid
            gameState={this.state.gameState}
            onCellClick={this.onCellClick}
            onCellRightClick={this.onCellRightClick}
          ></RSGrid>
      </div>
    );
  }
}

export default App;
