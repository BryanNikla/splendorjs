import {IBoard, ICard, IToken, tokenType} from "./types.ts";
import Player from "./classes/Player.ts";
import "./PlayTestStyles.css";
import TakeTokens from "./classes/turns/TakeTokens.ts";
export function setupPlayTestUI() {
    const gameBoardEl = getOrAddElement("game");
    const boardEl = getOrAddElement("board", gameBoardEl);
    const tokenEl = getOrAddElement("tokens", gameBoardEl);
    const tokenAction = getOrAddElement("tokenAction", gameBoardEl);

    const newButton = document.createElement("button");
    newButton.textContent = "Take Selected Tokens";
    newButton.className = "takeTokenButton";
    newButton.type = "button";
    tokenAction.style.display = "none";
    tokenAction.appendChild(newButton);

    const playerEl = getOrAddElement("players", gameBoardEl);

    const colors: tokenType[] = ["red", "blue", "green", "white", "black"];

    gameBoardEl.addEventListener("click", function (e: MouseEvent) {
        if (e.target instanceof HTMLElement) {
            const classes = e.target.className;
            if (classes.indexOf("token") > -1) {
                // console.log("clicked token", e.target);
                e.target.classList.toggle("selected");
            } else if (classes.indexOf("takeTokenButton") > -1) {
                // console.log("clicked take token button", e.target);
                let selectedTokens = this.querySelectorAll("#tokens .selected");

                if (selectedTokens.length > 3) {
                    publish("GAME_ERROR", "Only Select Max Three Items");
                    return false;
                }
                //Better way?
                let args: Array<number> = Array(5).fill(0);
                colors.forEach((color, i: number) => {
                    args[i] = this.querySelectorAll(`#tokens .${color}.selected`).length;
                });
                const [red, blue, green, white, black] = args;
                publish("TAKE_TOKENS", new TakeTokens(red, blue, green, white, black));
            } else if (classes.indexOf("card") > -1) {
                publish("TAKE_CARD", {tier: parseInt(e.target.dataset["tier"] || ""), index: parseInt(e.target.dataset["index"] || "")});
            }
        }
    });
    function updateGameUI(board: IBoard, players: Array<Player>, tokens: Array<IToken>, activePlayer: Player) {
        makePlayers(players, activePlayer);
        makeBoard(board);
        makeTokens(tokens);
    }

    function getOrAddElement(id: string, parent: HTMLElement = document.body, classes: string = "") {
        let el = document.getElementById(id);
        if (el == null) {
            el = document.createElement("div");
            el.id = id;
            el.className = classes;
            parent.append(el);
        }
        return el;
    }
    function makePlayers(players: Player[], activePlayer: Player) {
        let tmp = "";
        // let activePlayerIndex = 0;
        players.forEach((player) => {
            const isActiveLabel = player == activePlayer ? "active" : "";
            let cardtmp = "";
            player.cards.forEach((c: ICard, j: number) => (cardtmp += _getCardHtml(c, 0, j)));

            tmp += `<div class="player ${isActiveLabel}">
                <h2>${player.name} <span class="score">${player.score}</span></h2>
                <div class="tokens">
                ${makeTokens(player.tokens, true)}                    
                </div>             

                <div class="cards">
                    ${cardtmp}    
                  </div>   
                <div class="patrons"></div>
                
            </div>`;
            // if (player == activePlayer) {
            //     activePlayerIndex = index;
            // }
        });

        playerEl.innerHTML = tmp;
        let activePlayerEl: HTMLElement | null = playerEl.querySelector(".player.active");
        let activeScrollLeft = activePlayerEl?.offsetLeft || 0;
        let gap: number = 32;
        console.log(playerEl, activePlayerEl, activeScrollLeft);
        playerEl.scrollTo({
            top: 0,
            left: activeScrollLeft - gap,
            behavior: "smooth",
        });
    }
    function makeTokens(tokens: IToken[], bReturn: boolean = false) {
        let tmp = "";
        tokens.forEach((token) => {
            tmp += `<span class="token ${token.type}"></span>`;
        });
        if (bReturn) {
            return tmp;
        }
        tokenEl.innerHTML = tmp;

        tokenAction.style.display = !tokens.length ? "none" : "block";
    }
    function makeBoard(board: IBoard) {
        ["tierOne", "tierTwo", "tierThree"].forEach((tier, i: number) => {
            const el = getOrAddElement(tier, boardEl, tier + " tier");
            let tmp = "";
            board[tier as keyof typeof board].forEach((c: ICard, j: number) => (tmp += _getCardHtml(c, i, j)));
            el.innerHTML = tmp;
        });
    }

    function _getCardHtml(card: ICard, tier: number, i: number): string {
        let tmp = `<div class="card ${card.resource}"  data-tier="${tier}" data-index="${i}">
                    <div class="value">${card.value}</div>
                    <div class="cost">`;
        tmp += card.cost.red ? `<div class="red">${card.cost.red}</div>` : "";
        tmp += card.cost.blue ? `<div class="blue">${card.cost.blue}</div>` : "";
        tmp += card.cost.green ? `<div class="green">${card.cost.green}</div>` : "";
        tmp += card.cost.black ? `<div class="black">${card.cost.black}</div>` : "";
        tmp += card.cost.white ? `<div class="white">${card.cost.white}</div>` : "";
        tmp += `</div></div>`;
        return tmp;
    }

    return {
        gameBoardEl,
        updateGameUI,
        makePlayers,
        makeBoard,
        makeTokens,
        getOrAddElement,
    };
}

const eventBus = new Comment("event-bus");

type EventsDefinition = {
    TAKE_TOKENS: TakeTokens;
    TAKE_CARD: {tier: number; index: number};
    UPDATE_ALL: void;
    GAME_ERROR: string;
};
type PlayTestEvents = keyof EventsDefinition;

export function publish<T extends PlayTestEvents>(eventName: T, payload?: EventsDefinition[T]): void {
    const event = payload ? new CustomEvent(eventName, {detail: payload}) : new CustomEvent(eventName);
    eventBus.dispatchEvent(event);
}

type Unsubscribe = () => void;

export function subscribe<T extends PlayTestEvents>(eventName: T, handlerFn: (payload: EventsDefinition[T]) => void): Unsubscribe {
    const eventHandler = (event: Event) => {
        const eventPayload = (event as CustomEvent).detail as EventsDefinition[T];
        handlerFn(eventPayload);
    };
    eventBus.addEventListener(eventName, eventHandler);
    return () => {
        eventBus.removeEventListener(eventName, eventHandler);
    };
}
