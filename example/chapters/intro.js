import { Chapter } from '../../index.js';
import { Scene } from '../../index.js';

const enterMainCharacter = new Scene('input', 'What is the name of your character?');
const chooseDifficultyLevel = new Scene('choice', 'What level of difficulty you want?', ['Easy', 'Medium', 'Hard']);

export const intro = new Chapter(0, 'Intro', [enterMainCharacter, chooseDifficultyLevel]);