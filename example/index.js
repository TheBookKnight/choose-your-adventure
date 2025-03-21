import { GameEngine } from "../index.js";
import { intro } from "./chapters/intro.js";

function startGame() {
    const chapters = [
        intro
    ];
    const game = new GameEngine('Testing Game Title', chapters);
    game.playFromBeginning();
}

startGame();