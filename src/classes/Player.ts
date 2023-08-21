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

  getTokens() {
    return {
      red: this.tokens.filter((t) => t.type === "red").length,
      white: this.tokens.filter((t) => t.type === "white").length,
      blue: this.tokens.filter((t) => t.type === "blue").length,
      black: this.tokens.filter((t) => t.type === "black").length,
      green: this.tokens.filter((t) => t.type === "green").length,
      wild: this.tokens.filter((t) => t.type === "wild").length,
    };
  }

  getTotalValues() {
    const cardTypes = this.getCardTypes();
    const tokens = this.getTokens();
    return {
      red: cardTypes.red + tokens.red,
      white: cardTypes.white + tokens.white,
      blue: cardTypes.blue + tokens.blue,
      black: cardTypes.black + tokens.black,
      green: cardTypes.green + tokens.green,
      wild: this.tokens.filter((t) => t.type === "wild").length,
    };
  }
}
