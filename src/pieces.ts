import {ICard} from "./types.ts";
import Card from "./classes/Card.ts";
import Cost from "./classes/Cost.ts";

export const tierOneCards: Array<Card> = [
    new Card(new Cost().setRed(1).setWhite(1).setBlue(1), "black", 0),
    new Card(new Cost().setRed(1).setWhite(1).setBlue(1), "black", 1),
    new Card(new Cost().setRed(1).setWhite(1).setBlue(1), "black", 2),
];

export const tierTwoCards: Array<ICard> = [
    {
        value: 1,
        resource: "black",
        cost: new Cost().setRed(1).setWhite(1).setBlue(1),
    },
];

export const tierThreeCards: Array<ICard> = [
    {
        value: 3,
        resource: "black",
        cost: new Cost().setRed(1).setWhite(1).setBlue(1),
    },
];
