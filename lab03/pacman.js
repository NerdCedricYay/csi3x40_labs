function createGame(n) {
    if (n < 3) {
        console.log("Error: The number of tiles must be at least 3.");
        return;
    }

    let game = Array(n).fill(".");

    let pacmanIndex = Math.floor(Math.random() * n);
    let ghostIndex = Math.floor(Math.random() * n);
    let fruitIndex = Math.floor(Math.random() * n);

    while (ghostIndex === pacmanIndex || fruitIndex === pacmanIndex || ghostIndex === fruitIndex) {
        ghostIndex = Math.floor(Math.random() * n);
        fruitIndex = Math.floor(Math.random() * n);
    }

    game[pacmanIndex] = "C";
    game[ghostIndex] = "^";
    game[fruitIndex] = "@";

    return game;
}

function moveLeft(game) {
    let pacmanIndex = game.indexOf("C");

    let newIndex = (pacmanIndex - 1 + game.length) % game.length;

    game[pacmanIndex] = "";
    if (game[newIndex] === ".") {
        game[newIndex] = "C";
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    return game;
}

function moveRight(game) {
    let pacmanIndex = game.indexOf("C");

    let newIndex = (pacmanIndex + 1) % game.length;

    game[pacmanIndex] = "";
    if (game[newIndex] === ".") {
        game[newIndex] = "C";
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    return game;
}

let game = createGame(10);
console.log("Initial game state:", game);

game = moveRight(game);
console.log("After moving right:", game);

game = moveLeft(game);
console.log("After moving left:", game);
