import splendor from "./splendor.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";

const { newGame, takeTurn, getGameState } = splendor();

newGame(["Bryan", "Lea"]);

takeTurn(new TakeTokens("bryan", 0, 2, 0, 0, 0));

takeTurn(new TakeTokens("doesnt matter", 1, 1, 1, 0, 0));

console.log("new game state", getGameState());
