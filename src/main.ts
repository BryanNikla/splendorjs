import splendor from "./splendor.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";

const { newGame, takeTurn, getGameState } = splendor();

newGame(["Bryan", "Lea"]);

console.log("game state", getGameState());

takeTurn(new TakeTokens("bryan", 0, 2, 0, 0, 0));
