import { Game } from "../index.js";
import { intro } from "./chapters/intro.js";

function startGame() {
    const chapters = [
        intro
    ];
    const game = new Game('Testing Game Title', chapters);
    game.playFromBeginning();
}

startGame();