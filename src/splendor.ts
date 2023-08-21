import Game from "./classes/Game.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";

export default function splendor() {
  const game: Game = new Game([]);

  function newGame(playerNames: Array<string>) {
    Object.assign(game, new Game(playerNames));

    console.log({ game });
  }

  function takeTurn(turn: TakeTokens) {
    if (game.validateTurn(turn)) {
      game.processTurn(turn);
    }
  }

  return {
    newGame,
    takeTurn,
    getGameState: () => ({
      board: game.board,
      players: game.players,
      patrons: game.patrons,
      tokens: game.tokens,
    }),
  };
}
