import Game from "./classes/Game.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";
import TakeCard from "./classes/turns/TakeCard.ts";

export default function splendor() {
    let game: Game = new Game([]);

    function newGame(playerNames: Array<string>) {
        game = new Game(playerNames);
    }

    function takeTurn(turn: TakeTokens | TakeCard) {
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
