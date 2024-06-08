let game;
let score = 0;
let highScore = 0;

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
        score++;
        game[newIndex] = "C";
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    updateScore();
    return game;
}

function moveRight(game) {
    let pacmanIndex = game.indexOf("C");
    let newIndex = (pacmanIndex + 1) % game.length;

    game[pacmanIndex] = "";
    if (game[newIndex] === ".") {
        score++;
        game[newIndex] = "C";
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    updateScore();
    return game;
}

function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
    if (score > highScore) {
        highScore = score;
        document.getElementById("hiscore").innerText = "High Score: " + highScore;
    }
}

function renderGame(game) {
    document.getElementById("game_screen").innerText = game.join(" ");
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        game = moveLeft(game);
    } else if (event.key === "ArrowRight") {
        game = moveRight(game);
    }
    renderGame(game);
});

game = createGame(10);
renderGame(game);
updateScore();
