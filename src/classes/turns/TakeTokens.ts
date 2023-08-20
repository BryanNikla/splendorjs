export default class TakeTokens {
  player: string;
  red: number;
  blue: number;
  green: number;
  white: number;
  black: number;

  constructor(
    player: string,
    red: number,
    blue: number,
    green: number,
    white: number,
    black: number,
  ) {
    this.player = player;
    this.red = red;
    this.blue = blue;
    this.green = green;
    this.white = white;
    this.black = black;
  }
}
