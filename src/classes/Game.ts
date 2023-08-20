import { ICard, IGame, IPatron, IToken, IBoard } from "../types.ts";
import { shuffle } from "../utils.ts";
import { tierOneCards, tierThreeCards, tierTwoCards } from "../pieces.ts";
import { patronPool } from "../pieces/patronPool.ts";
import Player from "./Player.ts";

export default class Game implements IGame {
  board: IBoard;
  patrons: Array<IPatron>;
  players: Array<Player>;
  tierOneCards: Array<ICard>;
  tierThreeCards: Array<ICard>;
  tierTwoCards: Array<ICard>;
  tokens: Array<IToken>;

  constructor(playerNames: Array<string>) {
    this.board = {
      tierOne: [],
      tierTwo: [],
      tierThree: [],
    };

    this.patrons = [];
    this.players = [];

    playerNames.forEach((name: string) => {
      this.players.push(new Player(name));
    });

    this.tierOneCards = shuffle(tierOneCards);
    this.tierTwoCards = shuffle(tierTwoCards);
    this.tierThreeCards = shuffle(tierThreeCards);

    this.tokens = Array(5).fill({ type: "wild" });
    for (let i = 0; i < 7; i++) {
      this.tokens.push({ type: "green" });
      this.tokens.push({ type: "red" });
      this.tokens.push({ type: "black" });
      this.tokens.push({ type: "blue" });
      this.tokens.push({ type: "white" });
    }

    this.patrons = shuffle(patronPool).slice(0, this.players.length + 1);

    this.updateGameState();
  }

  updateGameState() {
    this._checkPatrons();
    this._updateBoardCards("tierOne");
    this._updateBoardCards("tierTwo");
    this._updateBoardCards("tierThree");
  }

  _updateBoardCards(tier: "tierOne" | "tierTwo" | "tierThree") {
    while (this.board[tier].length < 4) {
      const nextCard = this[`${tier}Cards`].pop();
      if (!nextCard) {
        break;
      }
      this.board[tier].push(nextCard);
    }
  }

  _checkPatrons() {
    this.patrons.forEach((patron, i) => {
      this.players.forEach((player) => {
        const { red, blue, black, green, white } = player.getCardTypes();
        if (patron.cost.red > red) {
          console.log("cant afford red", patron);
          return;
        }
        if (patron.cost.blue > blue) {
          console.log("cant afford blue", patron);
          return;
        }
        if (patron.cost.black > black) {
          console.log("cant afford black", patron);
          return;
        }
        if (patron.cost.green > green) {
          console.log("cant afford green", patron);
          return;
        }
        if (patron.cost.white > white) {
          console.log("cant afford white", patron);
          return;
        }
        player.patrons.push(patron);
        this.patrons.splice(i, 1);
      });
    });
  }
}
