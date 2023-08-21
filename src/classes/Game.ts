import { ICard, IGame, IPatron, IToken, IBoard, tokenType } from "../types.ts";
import { shuffle } from "../utils.ts";
import { tierOneCards, tierThreeCards, tierTwoCards } from "../pieces.ts";
import { patronPool } from "../pieces/patronPool.ts";
import Player from "./Player.ts";
import TakeTokens from "./turns/TakeTokens.ts";
import {
  BlackToken,
  BlueToken,
  GreenToken,
  RedToken,
  WhiteToken,
  WildToken,
} from "./tokens.ts";

export default class Game implements IGame {
  board: IBoard;
  patrons: Array<IPatron>;
  players: Array<Player>;
  tierOneCards: Array<ICard>;
  tierThreeCards: Array<ICard>;
  tierTwoCards: Array<ICard>;
  tokens: Array<IToken>;
  turnNumber: number;

  constructor(playerNames: Array<string>) {
    this.players = playerNames.map((name: string) => new Player(name));

    this.board = {
      tierOne: [],
      tierTwo: [],
      tierThree: [],
    };

    this.turnNumber = 0;

    this.tierOneCards = shuffle(tierOneCards);
    this.tierTwoCards = shuffle(tierTwoCards);
    this.tierThreeCards = shuffle(tierThreeCards);

    this.patrons = shuffle(patronPool).slice(0, this.players.length + 1);

    this.tokens = Array(5).fill(new WildToken());
    for (let i = 0; i < 7; i++) {
      this.tokens.push(new GreenToken());
      this.tokens.push(new RedToken());
      this.tokens.push(new BlueToken());
      this.tokens.push(new BlackToken());
      this.tokens.push(new WhiteToken());
    }

    this.updateGameState();
  }

  updateGameState() {
    this._checkPatrons();
    this._updateBoardCards("tierOne");
    this._updateBoardCards("tierTwo");
    this._updateBoardCards("tierThree");
  }

  // TODO: Actually just do a turn
  processTurn(turn: TakeTokens) {
    const player = this._getActivePlayer();
    console.log("active player", player);

    const moveTokenToPlayer = (type: tokenType) => {
      const tokenIndex = this.tokens.findIndex((t) => t.type === type);
      if (tokenIndex !== -1) {
        player.tokens.push(...this.tokens.splice(tokenIndex, 1));
      }
    };

    if (turn instanceof TakeTokens) {
      const colors: tokenType[] = ["green", "red", "blue", "white", "black"];
      colors.forEach((color) => {
        const count = parseInt(String(turn[color as keyof typeof turn]));
        for (let i = 0; i < count; i++) {
          moveTokenToPlayer(color);
        }
      });
    }

    this.turnNumber++;
  }

  // TODO: Check if a turn is a legal action
  validateTurn(turn: TakeTokens) {
    if (turn instanceof TakeTokens) {
      const colors: tokenType[] = ["green", "red", "blue", "white", "black"];

      const issue = colors.find((color: string) => {
        const count = parseInt(String(turn[color as keyof typeof turn]));
        const available = this.tokens.filter((t) => t.type === color).length;
        if (count === 0) {
          return false; // not using this color
        }

        if (count < 0) {
          // TODO: giving back tokens. need to check if we even have those tokens
        }

        if (available <= 0) {
          console.log("nothing to take:", color, turn);
          return true; // have nothing to take
        }
        if (count > 2) {
          console.log("can never take more than two of this color:", color);
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

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  _getActivePlayer() {
    const playerIndex = this.turnNumber % this.players.length;
    return this.players[playerIndex];
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
