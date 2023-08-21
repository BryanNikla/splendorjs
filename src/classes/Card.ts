import { ICard, resourceType } from "../types.ts";
import Cost from "./Cost.ts";

export default class Card implements ICard {
  cost: Cost;
  resource: resourceType;
  value: number;

  constructor(cost: Cost, resource: resourceType, value: number) {
    this.cost = cost;
    this.resource = resource;
    this.value = value;
  }
}
