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
      it('constructs a minefield with 10 mines', () => {
        // Count number of mines
        let mineCount = gameState.minefield.reduce((mineCount, row) => {
          return row.reduce((mineCount, cell) => {
            return cell === RSGame.MINE_CELL ? mineCount + 1: mineCount;
          }, mineCount);
        }, 0);

        expect(mineCount).toBe(10);
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

  describe('revealPosition', () => {
    let game;
    beforeEach(() => {
      game = new RSGame({
        rows: 10,
        cols: 10
      });
    });
    it('does not crash with basic input', () => {
      expect(() => {
        game.revealPosition({row: 1, col: 1});
      }).not.toThrow();
    });
  });

  // TODO
  describe('toggleFlagPosition', () => {
    let game;
    beforeEach(() => {
      game = new RSGame({
        rows: 10,
        cols: 10
      });
    });
    it('does not crash with basic input', () => {
      expect(() => {
        game.toggleFlagPosition({row: 1, col: 1});
      }).not.toThrow();
    });
  });
});