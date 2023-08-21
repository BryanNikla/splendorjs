import splendor from "./splendor.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";
import TakeCard from "./classes/turns/TakeCard.ts";
// import TakeCard from "./classes/turns/TakeCard.ts";

const {newGame, takeTurn, getGameState} = splendor();

newGame(["Bryan", "Lea"]);

takeTurn(new TakeTokens(1, 1, 1, 0, 0)); // p1
takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
takeTurn(new TakeTokens(1, 1, 1, 0, 0)); // p1
takeTurn(new TakeTokens(0, 1, 1, 1, 0)); // p1

const {board} = getGameState();
const firstCard = board.tierOne[0];
console.log("firstCard", firstCard);

takeTurn(new TakeCard(firstCard));

console.log("getGameState", getGameState());
