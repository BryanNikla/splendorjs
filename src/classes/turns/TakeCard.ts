import { ICard } from "../../types.ts";

export default class TakeCard {
  card: ICard;
  constructor(card: ICard) {
    this.card = card;
  }
}
