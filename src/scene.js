import pkg from 'terminal-kit';
const terminal = pkg.terminal;

export class Scene {
    constructor(type, text, choices = []) {
        this.type = type;
        this.text = text;
        this.choices = choices;
    }

    async play() {
        switch (this.type) {
            case 'dialogue': {
                await new Promise((resolve) => {
                    terminal.slowTyping(this.text, {}, resolve);
                });
                break;
            }
            case 'input': {
                await new Promise((resolve) => {
                    terminal.slowTyping(`\n${this.text}\n`, { style: terminal.yellow }, resolve);
                });
                const input = await new Promise((resolve, reject) => {
                    terminal.inputField({}, (error, response) => {
                        if (error) {
                            reject(new Error(error));
                        } else {
                            resolve(response.trim());
                        }
                    });
                });
                return input;
            }
            case 'choice': {
                await new Promise((resolve) => {
                    terminal.slowTyping(`\n${this.text}\n`, { style: terminal.yellow }, resolve);
                });
                const choice = await new Promise((resolve, reject) => {
                    terminal.singleColumnMenu(this.choices, (error, response) => {
                        if (error) {
                            reject(new Error(error));
                        } else {
                            resolve(response.selectedText.trim());
                        }
                    });
                });
                return choice;
            }
            default: {
                throw new Error(`${this.type} is not a valid scene type.`);
            }
        }
    }
}