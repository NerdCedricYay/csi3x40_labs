let game;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let fruitStored = false;
let gameOver = false;

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
    if (gameOver) return game;

    let pacmanIndex = game.indexOf("C");
    let newIndex = (pacmanIndex - 1 + game.length) % game.length;

    game[pacmanIndex] = "";

    if (game[newIndex] === ".") {
        score++;
        game[newIndex] = "C";
    } else if (game[newIndex] === "@") {
        score++;
        fruitStored = true;
        game[newIndex] = "C";
    } else if (game[newIndex] === "^") {
        if (fruitStored) {
            game[newIndex] = "C";
            fruitStored = false;
        } else {
            endGame();
        }
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    updateScore();
    updateFruit();
    return game;
}

function moveRight(game) {
    if (gameOver) return game;

    let pacmanIndex = game.indexOf("C");
    let newIndex = (pacmanIndex + 1) % game.length;

    game[pacmanIndex] = "";

    if (game[newIndex] === ".") {
        score++;
        game[newIndex] = "C";
    } else if (game[newIndex] === "@") {
        score++;
        fruitStored = true;
        game[newIndex] = "C";
    } else if (game[newIndex] === "^") {
        if (fruitStored) {
            game[newIndex] = "C";
            fruitStored = false;
        } else {
            endGame();
        }
    } else {
        game[newIndex] = "C" + game[newIndex];
    }

    updateScore();
    updateFruit();
    return game;
}

function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById("hiscore").innerText = "High Score: " + highScore;
    }
}

function updateFruit() {
    document.getElementById("fruit").innerText = "Fruit: " + (fruitStored ? "Stored" : "None");
}

function endGame() {
    gameOver = true;
    document.getElementById("gameover").style.display = "block";
}

function renderGame(game) {
    let table = document.getElementById("game_screen");
    table.innerHTML = "";
    let row = table.insertRow();

    game.forEach((cell, index) => {
        let td = row.insertCell();
        td.classList.add("empty");
        if (cell.includes("C")) {
            td.classList.add("pacman");
            td.innerText = "C";
        } else if (cell.includes("^")) {
            td.classList.add("ghost");
            td.innerText = "^";
        } else if (cell.includes("@")) {
            td.classList.add("fruit");
            td.innerText = "@";
        } else if (cell === ".") {
            td.classList.add("pellet");
            td.innerText = ".";
        }
    });
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
updateFruit();
document.getElementById("hiscore").innerText = "High Score: " + highScore;
