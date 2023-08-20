export type tokenType = "red" | "blue" | "green" | "black" | "white" | "wild";
export type resourceType = "red" | "blue" | "green" | "black" | "white";

export interface IToken {
  type: tokenType;
}

export interface IPlayer {
  name: String;
  cards: Array<any>;
  score: number;
  tokens: Array<IToken>;
  patrons: Array<IPatron>;
  reserved: Array<ICard>;
}

export interface ICard {
  value: number;
  cost: ICost;
  resource: resourceType;
}

export interface ICost {
  red: number;
  blue: number;
  black: number;
  green: number;
  white: number;
}

export interface IPatron {
  value: number;
  cost: ICost;
}

export interface IGame {
  board: IBoard;
  patrons: Array<IPatron>;
  tokens: Array<IToken>;
  players: Array<IPlayer>;
  tierOneCards: Array<ICard>;
  tierTwoCards: Array<ICard>;
  tierThreeCards: Array<ICard>;
}

export interface IBoard {
  tierOne: Array<ICard>;
  tierTwo: Array<ICard>;
  tierThree: Array<ICard>;
}

export interface ITurn {
  player: string;
  type: TurnTypeTakeTokens | TurnTypeReserveCard | TurnTypeBuyCard;
}

export interface TurnTypeTakeTokens {
  type: "take";
  green: number;
  red: number;
  blue: number;
  white: number;
  black: number;
}

export interface TurnTypeReserveCard {
  type: "reserve";
  card: ICard;
}

export interface TurnTypeBuyCard {
  type: "buy";
  card: ICard;
}
