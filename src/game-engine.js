import { Chapter } from './chapter.js';
import pkg from 'terminal-kit';
const terminal = pkg.terminal;

export class GameEngine {
    constructor(title, chapters = []) {
        this.title = title;
        this.chapters = [];
        for (const chapter of chapters) {
            if (!chapter instanceof Chapter) {
                throw new Error('Invalid chapter. Only Chapter objects are allowed.');
            }
            this.chapters.push(chapter);
        }
    }

    async playFromBeginning() {
        await terminal.slowTyping(`You are playing "${this.title}!"\n`);

        await terminal.spinner()

        await terminal.slowTyping('\tLoading game...\n');
        for (const chapter of this.chapters) {
            if (chapter instanceof Chapter) {
                await chapter.play();
            } else {
                throw new Error('Invalid chapter. Only Chapter objects are allowed.');
            }
        };
        terminal('Game completed!');
        process.exit()
    }
}