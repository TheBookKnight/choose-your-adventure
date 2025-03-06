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

describe('Scene', () => {
    test('should play dialogue scene', async () => {
        const scene = new Scene('dialogue', 'Scene 1');
        await scene.play();
        expect(terminal.slowTyping).toHaveBeenCalledWith('Scene 1', {}, expect.any(Function));
    });

    test('should play input scene and return user input', async () => {
        const scene = new Scene('input', 'Enter your name:');
        const input = await scene.play();
        expect(terminal.slowTyping).toHaveBeenCalledWith('\nEnter your name:\n', { style: terminal.yellow }, expect.any(Function));
        expect(terminal.inputField).toHaveBeenCalledWith({}, expect.any(Function));
        expect(input).toBe('user input');
    });

    test('should play choice scene and return selected choice', async () => {
        const scene = new Scene('choice', 'Choose an option:', ['choice 1', 'choice 2']);
        const choice = await scene.play();
        expect(terminal.slowTyping).toHaveBeenCalledWith('\nChoose an option:\n', { style: terminal.yellow }, expect.any(Function));
        expect(terminal.singleColumnMenu).toHaveBeenCalledWith(['choice 1', 'choice 2'], expect.any(Function));
        expect(choice).toBe('choice 1');
    });

    test('should throw an error for invalid scene type', async () => {
        const scene = new Scene('invalid', 'Invalid scene');
        await expect(scene.play()).rejects.toThrow('invalid is not a valid scene type.');
    });
});