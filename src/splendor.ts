import Game from "./classes/Game.ts";

export default function splendor() {
  const game: Game = new Game([]);

  function newGame(playerNames: Array<string>) {
    Object.assign(game, new Game(playerNames));

    console.log({ game });
  }

  return {
    newGame,
    getGameState: () => ({
      board: game.board,
      players: game.players,
      patrons: game.patrons,
      tokens: game.tokens,
    }),
  };
}
