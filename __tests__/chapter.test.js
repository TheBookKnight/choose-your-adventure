import { Chapter } from '../src/chapter.js';
import { Scene } from '../src/scene.js';
import pkg from 'terminal-kit';

const terminal = pkg.terminal;

// Mock terminal-kit methods
jest.mock('terminal-kit', () => ({
    terminal: {
        slowTyping: jest.fn((text, options, callback) => callback()),
        inputField: jest.fn((options, callback) => callback(null, 'user input')),
        singleColumnMenu: jest.fn((choices, callback) => callback(null, { selectedText: 'choice 1' })),
        yellow: 'yellow'
    }
}));

describe('Chapter', () => {
    test('should play all scenes sequentially', async () => {
        const scenes = [
            new Scene('dialogue', 'Scene 1'),
            new Scene('input', 'Enter your name:'),
            new Scene('choice', 'Choose an option:', ['choice 1', 'choice 2'])
        ];
        const chapter = new Chapter(1, 'Chapter 1', scenes);

        await chapter.play();

        expect(terminal.slowTyping).toHaveBeenCalledTimes(4); // 1 for chapter title + 3 for scenes
        expect(terminal.inputField).toHaveBeenCalledTimes(1);
        expect(terminal.singleColumnMenu).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if plot contains invalid objects', async () => {
        const invalidPlot = ['invalid scene'];
        const chapter = new Chapter(1, 'Chapter 1', invalidPlot);

        await expect(chapter.play()).rejects.toThrow('Invalid chapter plot. Only Scene objects are allowed.');
    });
});