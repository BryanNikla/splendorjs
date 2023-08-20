import { ICost } from "../types.ts";

export default class Cost implements ICost {
  black: number;
  blue: number;
  green: number;
  red: number;
  white: number;

  constructor() {
    this.black = 0;
    this.blue = 0;
    this.green = 0;
    this.red = 0;
    this.white = 0;
  }

  setRed(value: number) {
    this.red = value;
    return this;
  }

  setWhite(value: number) {
    this.white = value;
    return this;
  }

  setBlue(value: number) {
    this.blue = value;
    return this;
  }

  setGreen(value: number) {
    this.green = value;
    return this;
  }

  setBlack(value: number) {
    this.black = value;
    return this;
  }
}
