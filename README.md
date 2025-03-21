# Choose Your Adventure

Choose Your Adventure is a framework for creating CLI-based adventure games. The framework is structured into three main components: Game, Chapter, and Scene. This allows you to build interactive stories with ease.

## Installation

To install the package, run:

```sh
npm install choose-your-adventure
```

## Usage

### Importing the Components

You can import the components from the package as follows

```javascript
import { Game, Chapter, Scene } from "choose-your-adventure";
```

### Creating a Game

A `Game` holds multiple `Chapters`. Each `Chapter` contains multiple `Scenes`.

Example

```javascript
import { Game, Chapter, Scene } from "choose-your-adventure";

// Create scenes
const scene1 = new Scene("dialogue", "Welcome to the adventure!");
const scene2 = new Scene("input", "Enter your name:");
const scene3 = new Scene("choice", "Choose an option:", [
  "Option 1",
  "Option 2",
]);

// Create a chapter
const chapter1 = new Chapter(1, "Introduction", [scene1, scene2, scene3]);

// Create a game
const game = new Game("My Adventure Game", [chapter1]);

// Play the game from the beginning
game.playFromBeginning();
```

### Components

#### Game

The `Game` class is the main entry point for your adventure game. It holds multiple `Chapters`.

##### Constructor

```javascript
new Game(title, chapters);
```

- `title` (string): The title of the game.
- `chapters` (array): An array of `Chapter` objects.

##### Methods

- `playFromBeginning()`: Starts the game from the beginning.

#### Chapter

The `Chapter` class represents a chapter in your adventure game. It holds multiple `Scenes`

##### Constructor

```javascript
new Chapter(id, title, plot);
```

- `id` (number): The ID of the chapter.
- `title` (string): The title of the chapter.
- `plot` (array): An array of `Scene` objects

##### Methods:

- `play()`: Plays the chapter.

#### Scene

The `Scene` class represents a scene in your adventure game. It can be of different types: `dialogue`, `input`, or `choice`.

##### Constructor

```javascript
new Scene(type, text, choices);
```

- `type` (string): The type of the scene (`dialogue`, `input`, or `choice`).
- `text` (string): The text to display in the scene.
- `choices` (array): An array of choices (only for `choice` type scenes).

###### Methods

- `play()`: Plays the scene.

## Example Project Structure

```sh
choose-your-adventure/
├── src/
│ ├── game.js
│ ├── chapter.js
│ ├── scene.js
│ └── [index.js](http://_vscodecontentref_/0)
├── example/
│ └── chapters/
│ └── intro.js
├── [package.json](http://_vscodecontentref_/1)
└── [README.md](http://_vscodecontentref_/2)
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub

## License

This project is licensed under the ISC License.
