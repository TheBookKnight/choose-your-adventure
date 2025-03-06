import { Scene } from './scene.js';
import pkg from 'terminal-kit';
const terminal = pkg.terminal;

export class Chapter {
    constructor(id, title, plot = []) {
        if (typeof id !== 'number') {
            throw new Error('Chapter id must be a number.');
        }
        if (typeof title !== 'string') {
            throw new Error('Chapter title must be a string.');
        }
        if (!Array.isArray(plot)) {
            throw new Error('Chapter plot must be an array.');
        }
        if (plot.length === 0) {
            throw new Error('Chapter plot must not be empty.');
        }
        this.id = id;
        this.title = title;
        this.plot = plot;
    }

    async play() {
        await new Promise((resolve) => {
            terminal.slowTyping(`Chapter ${this.id}: ${this.title}\n`, {}, resolve);
        });
        for (const scene of this.plot) {
            if (scene instanceof Scene) {
                await scene.play();
            } else {
                throw new Error('Invalid chapter plot. Only Scene objects are allowed.');
            }
        }
    }
}