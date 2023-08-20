import splendor from "./splendor.ts";

const { newGame, getGameState } = splendor();

newGame(["Bryan", "Lea"]);

console.log("game state", getGameState());
