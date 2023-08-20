import { IPatron } from "../types.ts";
import Cost from "../classes/Cost.ts";

export const patronPool: Array<IPatron> = [
  {
    value: 3,
    cost: new Cost().setWhite(3).setBlue(3).setBlack(3),
  },
  {
    value: 3,
    cost: new Cost().setBlue(3).setGreen(3).setRed(3),
  },
  {
    value: 3,
    cost: new Cost().setWhite(3).setRed(3).setBlack(3),
  },
  {
    value: 3,
    cost: new Cost().setGreen(4).setRed(4),
  },
  {
    value: 3,
    cost: new Cost().setBlue(4).setGreen(4),
  },
  {
    value: 3,
    cost: new Cost().setRed(4).setBlack(4),
  },
  {
    value: 3,
    cost: new Cost().setWhite(4).setBlack(4),
  },
  {
    value: 3,
    cost: new Cost().setWhite(3).setBlue(3).setGreen(3),
  },
  {
    value: 3,
    cost: new Cost().setGreen(3).setRed(3).setBlack(3),
  },
  {
    value: 3,
    cost: new Cost().setWhite(4).setBlue(4),
  },
];
