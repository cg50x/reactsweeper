class RSGame {
  constructor({ rows, cols }) {
    this._state = this._getInitialState({ rows, cols });
  }

  getState() {
    return this._state;
  }

  // revealPosition equivalent to a click on the board
  // returns new game state
  // returns false if not a valid move
  // note: this mutates the state
  revealPosition({row, col}) {
    // if game state is finished or cell is not hidden, return game state
    let gameFinished = this._state.endgame !== RSGame.GAME_IN_PROGRESS;
    let isHiddenCell = this._state.fog[row][col] === RSGame.HIDDEN_CELL;
    if (gameFinished || !isHiddenCell) {
      return this._state;
    }
    // find out which cells to reveal and reveal them
    let cellsToReveal = this._getCellsToReveal({row, col});
    cellsToReveal.forEach(({row, col}) => {
      this._state.fog[row][col] = RSGame.REVEALED_CELL;
    });
    // if revealing a mine cell, convert it to a hot mine
    if (this._state.minefield[row][col] === RSGame.MINE_CELL) {
      this._state.minefield[row][col] === RSGame.HOT_MINE;
    }
    return this._state;
  }

  // puts a flag at the position x, y
  // returns a new game state
  // returns false if not a valid move
  // if x,y is already flagged, returns the game state
  toggleFlagPosition({row, col}) {
    // TODO impl
    // if game state is finished, return game state
    // if cell is not flagged and hidden, flag it and return game state
    // if cell is already flagged, unflag it and return game state
    // else return game state
  }

  _getInitialState({rows, cols}) {
    // get empty minefield
    let minefield = Array(rows).fill().map(() => {
      return Array(cols).fill(RSGame.EMPTY_CELL);
    });
    let fog = Array(rows).fill().map(() => {
      return Array(cols).fill(RSGame.HIDDEN_CELL);
    });

    minefield = this._addMinesToMinefield(minefield);

    return {
      minefield: minefield,
      fog: fog,
      endgame: RSGame.GAME_IN_PROGRESS
    };
  }

  _addMinesToMinefield(minefield) {
    let maxRow = minefield.length;
    let maxCol = minefield[0].length;
    // Generate an array of available coordinates
    let openCoords = [];
    for (let row = 0; row < maxRow; row++) {
      for (let col = 0; col < maxCol; col++) {
        openCoords.push({row, col});
      }
    }
    for (let i = 0; i < maxRow; i++) {
      // Choose a random coordinate from the remaining set of open coordinates
      let randIndex = Math.floor(openCoords.length * Math.random());
      let randCoord = openCoords[randIndex];
      minefield[randCoord.row][randCoord.col] = RSGame.MINE_CELL;
      // Remove the chosen coordinate from the set of open coordinates
      openCoords.splice(randIndex, 1);
    }
    return minefield;
  }

  /*
    Takes in a row, col position and returns a collection of cell positions {row, col}
    that should be revealed if the cell at (row, col) was clicked.
    if cell at (row, col) is a numbered cell, return an array containing that cell
    if cell at (row, col) is a mine cell, return an array containing all mine cells
    - helper to get all mines
    if cell at (row, col) is a hot mine, return empty array
    if cell at (row, col) is empty, return an array containing the cell itself as well as other cells that should be revealed if adjacent cells were clicked
    - adjacent cells (top, right, bottom, left)
    - helper recursive function?
  */
  _getCellsToReveal({row, col}) {
    return this._getCellsToRevealHelper({row, col}, {});
  }

  // helper
  // takes in {row, col} and visitedCells (object)
  // 
  _getCellsToRevealHelper({row, col}, visitedCells) {
    // mark this cell as visited
    visitedCells[row] = visitedCells[row] || {};
    visitedCells[row][col] = true;

    let currentCell = this._state.minefield[row, col];
    if (typeof currentCell === 'number') {
      return [{row, col}];
    } else if (currentCell === RSGame.MINE_CELL) {
      return this._getAllMinePositions();
    } else if (currentCell === RSGame.HOT_MINE) {
      return [];
    } else if (currentCell == RSGame.EMPTY_CELL) {
      // get unvisited neighbors
      let neighbors = this._getNeighboringCells({row, col}, this._state.minefield);
      let unvisitedNeighbors = neighbors.filter(({row, col}) => {
        return !visitedCells[row][col];
      });
      // recursively call revealHelper on unvisited neighbors
      // for each neighbor cell, make a recursive call to revealHelper
      let result = [{row, col}];
      unvisitedNeighbors.forEach(({row, col}) => {
        result = result.concat(this._getCellsToRevealHelper({row, col}, visitedCells));
      });
      return result;
    }
    return [];
  }

  // given a cell position {row, col} and a 2D array (either minefield or fog)
  // returns the neighboring cells as an array of cell positions
  _getNeighboringCells({row, col}, board) {
    // initialize result
    let result = [];
    // try to retrieve top neighbor (if neighbor within bounds, add it to the results)
    if (row - 1 >= 0) {
      result.push({row: row - 1, col});
    }
    // try to retrieve right neighbor
    // assumes that the board has at least one row
    if (col + 1 < board[0].length) {
      result.push({row, col: col + 1});
    }
    // try to retrieve bottom neighbor
    if (row + 1 < board.length) {
      result.push({row: row + 1, col});
    }
    // try to retrieve left neighbor
    if (col - 1 >= 0) {
      result.push({row, col: col - 1});
    }
    return result;
  }

  _getAllMinePositions() {
    let results = [];
    let minefield = this._state.minefield;
    for (let row = 0; row < minefield.length; row++) {
      for (let col = 0; col < minefield.length; col++) {
        if (minefield[row][col] === RSGame.MINE_CELL) {
          results.push({row, col});
        }
      }
    }
    return results;
  }
}

// Static Fields
RSGame.EMPTY_CELL = null;
RSGame.MINE_CELL = 'x';
RSGame.HOT_MINE = 'X';

RSGame.HIDDEN_CELL = 0;
RSGame.REVEALED_CELL = 1;
RSGame.FLAGGED_CELL = 2;

RSGame.GAME_IN_PROGRESS = 0;
RSGame.PLAYER_LOST = 1;
RSGame.PLAYER_WON = 2;

export default RSGame;
/*
minefield:
[
  [, 1, -1, ],
  [],
  [],
  [],
  [],
  []
]

null = empty cell
'x' = mine
'X' = hot mine
1-8 = numbered cell

fog:
0 = hidden cell
1 = revealed cell
2 = flagged cell

{
  revealedCells: {}
  flaggedCells: {}
  mineCells: {}
  numberedCells: {}
}
*/