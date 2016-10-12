import RSGame from './RSGame';

describe('RSGame', () => {
  describe('constructor', () => {
    describe('given { rows: 10, cols: 10 }', () => {
      let gameState;
      beforeEach(() => {
      	let game = new RSGame({
      		rows: 10,
      		cols: 10
      	});
      	gameState = game.getState();
      });
      it('constructs a minefield with 10 rows', () => {
        expect(gameState.minefield.length).toBe(10);
      });
      it('constructs a minefield with 10 cols', () => {
      	gameState.minefield.forEach((row) => {
      	  expect(row.length).toBe(10);
        });
      });
      it('constructs a fog with 10 rows', () => {
        expect(gameState.fog.length).toBe(10);
      });
      it('constructs a fog with 10 cols', () => {
      	gameState.fog.forEach((row) => {
      	  expect(row.length).toBe(10);
        });
      });
      it('constructs a fog full of hidden cells', () => {
      	gameState.fog.forEach((row) => {
      		row.forEach((cell) => {
      			expect(cell).toBe(RSGame.HIDDEN_CELL);
      		});
      	});
      });
    });
  });

  // TODO
  describe('revealPosition', () => {});

  // TODO
  describe('flagPosition', () => {});
});