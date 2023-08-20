import { ICard, ICost, resourceType } from "./types.ts";

export class CardClass implements ICard {
  cost: ICost;
  resource: resourceType;
  value: number;

  constructor(cost: ICost, resource: resourceType, value: number) {
    this.cost = cost;
    this.resource = resource;
    this.value = value;
  }
}
