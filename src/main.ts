import splendor from "./splendor.ts";
import TakeTokens from "./classes/turns/TakeTokens.ts";
import TakeCard from "./classes/turns/TakeCard.ts";
import {setupPlayTestUI, subscribe} from "./PlayTestUI.ts";
import Card from "./classes/Card.ts";

const {newGame, takeTurn, getGameState} = splendor();
const {updateGameUI} = setupPlayTestUI();

//
const newGameButton = document.getElementById("newGameButton");
//initial game for testing
// newGame(["Bryan", "Lea", "John", "Jill"]);
// update();

newGameButton?.addEventListener("click", function () {
    let playerNames: string | null = prompt(`Player Names (comma separated): `, "Bryan,Lea,Jack,Jill");
    if (playerNames !== null) {
        newGame(playerNames.split(",").map((e) => e.trim()));
        update();
    }
    const newGameInput = document.getElementById("newGameInput");
    if (newGameInput instanceof HTMLTextAreaElement) {
        console.log(newGameInput.value.split("\n"));
    }
});

function update() {
    const {board, players, tokens, activePlayer} = getGameState();
    updateGameUI(board, players, tokens, activePlayer);
}

subscribe("TAKE_TOKENS", (takeTokens: TakeTokens) => {
    console.log("tokens taken", takeTokens);
    takeTurn(takeTokens);

    update();
});

subscribe("TAKE_CARD", (data: {tier: number; index: number}) => {
    console.log("card taken", data);

    const {board} = getGameState();

    let selectedCard = null;
    switch (data.tier) {
        case 0:
            selectedCard = board.tierOne[data.index];
            break;
        case 1:
            selectedCard = board.tierTwo[data.index];
            break;
        case 2:
            break;
    }
    if (selectedCard instanceof Card) {
        console.log(selectedCard);
        takeTurn(new TakeCard(selectedCard));
    }

    update();
});
subscribe("GAME_ERROR", (error: string) => {
    console.error(error);
});

// takeTurn(new TakeTokens(1, 1, 1, 0, 0)); // p1
// takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
// takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
// takeTurn(new TakeTokens(2, 0, 0, 0, 0)); // p1
// takeTurn(new TakeTokens(1, 1, 1, 0, 0)); // p1
// takeTurn(new TakeTokens(0, 1, 1, 1, 0)); // p1
//
// const firstCard = board.tierOne[0];
// const otherCard = board.tierTwo[3];
//
// console.log("firstCard", firstCard);
//
// takeTurn(new TakeCard(firstCard));
// console.log(board);
//
// console.log("getGameState", getGameState());
