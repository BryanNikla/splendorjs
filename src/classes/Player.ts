import { ICard, IPlayer, IPatron, IToken } from "../types.ts";

export default class Player implements IPlayer {
  name: string;
  cards: Array<ICard>;
  patrons: Array<IPatron>;
  reserved: Array<ICard>;
  score: number;
  tokens: Array<IToken>;

  constructor(name: string) {
    this.name = name;
    this.cards = [];
    this.patrons = [];
    this.reserved = [];
    this.score = 0;
    this.tokens = [];
  }

  getCardTypes() {
    return {
      red: this.cards.filter((c) => c.resource === "red").length,
      white: this.cards.filter((c) => c.resource === "white").length,
      blue: this.cards.filter((c) => c.resource === "blue").length,
      black: this.cards.filter((c) => c.resource === "black").length,
      green: this.cards.filter((c) => c.resource === "green").length,
    };
  }
}
