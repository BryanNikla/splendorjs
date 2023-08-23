import {ICard, ICardData} from "./types.ts";
import Card from "./classes/Card.ts";
import Cost from "./classes/Cost.ts";
import _data from "./data/cards.json";
const cardData = _data as ICardData[];

export const tierOneCards: Array<Card> = [];

export const tierTwoCards: Array<ICard> = [];

export const tierThreeCards: Array<ICard> = [];

//Add Cards from Raw Json Data
cardData.forEach(function (c: ICardData) {
    switch (c.tier) {
        case 1:
            tierOneCards.push(
                new Card(new Cost().setRed(c.red).setGreen(c.green).setBlue(c.blue).setWhite(c.white).setBlack(c.black), c.resource, c.value)
            );
            break;
        case 2:
            tierTwoCards.push(
                new Card(new Cost().setRed(c.red).setGreen(c.green).setBlue(c.blue).setWhite(c.white).setBlack(c.black), c.resource, c.value)
            );
            break;
        case 3:
            tierThreeCards.push(
                new Card(new Cost().setRed(c.red).setGreen(c.green).setBlue(c.blue).setWhite(c.white).setBlack(c.black), c.resource, c.value)
            );
    }
});
