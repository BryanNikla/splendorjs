import { ICard, IGame, IPatron, IToken, IBoard } from "../types.ts";
import { shuffle } from "../utils.ts";
import { tierOneCards, tierThreeCards, tierTwoCards } from "../pieces.ts";
import { patronPool } from "../pieces/patronPool.ts";
import Player from "./Player.ts";
import TakeTokens from "./turns/TakeTokens.ts";

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

  // TODO: Check if a turn is a legal action
  validateTurn(turn: TakeTokens) {
    if (turn instanceof TakeTokens) {
      const colors = ["green", "red", "blue", "white", "black"];

      const issue = colors.find((color: string) => {
        const count = parseInt(String(turn[color as keyof typeof turn]));
        const available = this.tokens.filter((t) => t.type === color).length;
        if (count <= 0) {
          return false;
        }
        if (available <= 0) {
          console.log("nothing to take:", color, turn);
          return true; // have nothing to take
        }
        if (count > 2) {
          console.log(
            "can never take more than two of this color:",
            color,
            turn,
          );
          return true; // Can never take more than two
        }
        if (count === 2) {
          if (available < 4) {
            console.log("cannot take two if stack is less than 4", color, turn);
            return true; // Cannot take two if stack is less than 4
          }

          const takingOtherColors = colors
            .filter((c) => c !== color)
            .find((_color) => {
              const count = parseInt(String(turn[_color as keyof typeof turn]));
              return count > 0;
            });

          if (takingOtherColors) {
            console.log("taking other colors while taking 2", color, turn);
            return true;
          }
        }
      });

      let totalTokens = 0;
      colors.forEach((color) => {
        totalTokens += parseInt(String(turn[color as keyof typeof turn]));
      });

      // TODO: Check if player token count + totalTokens is greater than 10, invalid. should be able to accept a negative token count for other colors

      if (totalTokens > 3) {
        console.log("total tokens greater than 3", turn);
        return false;
      }

      if (issue) {
        return false;
      }
    } // end of TakeToken

    console.log("this turn is legal", turn);
    return true;
  }

  // TODO: Actually just do a turn
  // processTurn(turn: TakeTokens) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
