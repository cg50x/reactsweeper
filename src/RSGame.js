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
  revealPosition(x, y) {
  	// TODO impl
  }

  // puts a flag at the position x, y
  // returns a new game state
  // returns false if not a valid move
  // if x,y is already flagged, returns the game state
  flagPosition(x, y) {
  	// TODO impl
  }

  _getInitialState({rows, cols}) {
    // get empty minefield
    let minefield = Array(rows).fill(Array(cols).fill(RSGame.EMPTY_CELL));
    let fog = Array(rows).fill(Array(cols).fill(RSGame.HIDDEN_CELL));

    // TODO Add mines randomly
    return {
    	minefield: minefield,
    	fog: fog,
    	endgame: RSGame.GAME_IN_PROGRESS
    };
  }
}

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