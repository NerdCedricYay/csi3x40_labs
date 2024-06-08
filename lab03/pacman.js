function createGame(n) {
    // Check if n is less than 3
    if (n < 3) {
        console.log("Error: The number of tiles must be at least 3.");
        return;
    }

    // Initialize the game array with empty tiles
    let game = Array(n).fill(".");

    // Generate random indexes for Pacman, Ghost, and Fruit
    let pacmanIndex = Math.floor(Math.random() * n);
    let ghostIndex = Math.floor(Math.random() * n);
    let fruitIndex = Math.floor(Math.random() * n);

    // Ensure Pacman, Ghost, and Fruit are not in the same position
    while (ghostIndex === pacmanIndex || fruitIndex === pacmanIndex || ghostIndex === fruitIndex) {
        ghostIndex = Math.floor(Math.random() * n);
        fruitIndex = Math.floor(Math.random() * n);
    }

    // Place Pacman, Ghost, and Fruit on the game array
    game[pacmanIndex] = "C";
    game[ghostIndex] = "^";
    game[fruitIndex] = "@";

    return game;
}

function moveLeft(game){
    
}

function moveLeft(game){
    
}

console.log(createGame(10));
