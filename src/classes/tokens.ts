import { IToken, tokenType } from "../types.ts";

export class RedToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "red";
  }
}

export class BlueToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "blue";
  }
}

export class WhiteToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "white";
  }
}

export class BlackToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "black";
  }
}

export class GreenToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "green";
  }
}

export class WildToken implements IToken {
  type: tokenType;
  constructor() {
    this.type = "wild";
  }
}
