var bodySquareSize = 24
// created the snake object with it's proprieties and methods
var snake = {
    x: 100,
    y: 100,
    speed: 25,
    tail: [],
    direction: "",
    tailSize: 5,
    growTail: function(x, y) { // method show
        this.tail.push({x:Math.floor(x), y:Math.floor(y)})
        //console.log(`Added to tail: ${x}, ${y}`);
    }
};

  // p5.js setup function
  function setup() {
    createCanvas(800, 600);
    background(64);
    for (let i = 0; i < 5; ++i) {
        snake.growTail(snake.x += bodySquareSize, snake.y)
    }
    snake.direction = ""
    frameRate(5)
}
// p5.js draw function
function draw() {
    background(64);
    stroke(50)
    fill(255)
    snakesDirection()
    snakeMoves()
    lifeCheck()   
}

// Draw the snake's tail
function snakeMoves() {
    for (let i = 0; i < snake.tail.length; ++i) {
        //console.log("drawing")
        rect(snake.tail[i].x, snake.tail[i].y, bodySquareSize, bodySquareSize);
    }
    if (snake.tail.length > snake.tailSize) {
        snake.tail.shift()
    }
}

// Grow the snake based on the direction 
function snakesDirection() {
    if (snake.direction == "right") {
        snake.growTail(snake.x += snake.speed, snake.y)
    }
    if (snake.direction == "up") {
        snake.growTail(snake.x, snake.y -= snake.speed)
    } 
    if (snake.direction == "left") {
        snake.growTail(snake.x -= snake.speed, snake.y)
    } 
    if (snake.direction == "down") {
        snake.growTail(snake.x, snake.y += snake.speed)
    }
}

// Check if we have not touched the canvas borders
function lifeCheck() {
    if (snake.x > width || snake.x < 0 || snake.y < 0 || snake.y > height) { //
        console.log("Game over")
        noLoop()
    }
    //console.log(`Snake x: ${snake.x}`)
    for (let i = 0; i < snake.tail.length - 1; ++i) {
        console.log(snake.tail[i].x + " | " + snake.tail[i].y)
        console.log(snake.tail[snake.tail.length - 1].x + " | " + snake.tail[snake.tail.length - 1].y)
        if (snake.tail[i].x - bodySquareSize / 2 < snake.tail[snake.tail.length - 1].x + bodySquareSize / 2 &&
            snake.tail[i].x + bodySquareSize / 2 > snake.tail[snake.tail.length - 1].x - bodySquareSize / 2 &&
            snake.tail[i].y - bodySquareSize / 2 < snake.tail[snake.tail.length - 1].y + bodySquareSize / 2 &&
            snake.tail[i].y + bodySquareSize / 2 > snake.tail[snake.tail.length - 1].y - bodySquareSize / 2) 
            {
                console.log("Bingo")
                noLoop()
            }
    }
}

// Detect what keyboard arrow is pressed
function keyPressed() {
    //console.log("key pressed?")
    if (keyCode === UP_ARROW) {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "up"
            snakesDirection() // calling it in here as well in order to avoid the snake overalay itself
        }
    } else if (keyCode === DOWN_ARROW) {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "down"
            snakesDirection()
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (snake.direction == "up" || snake.direction == "down") {
            snake.direction = "left"
            snakesDirection()
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.direction == "up" || snake.direction == "down" || snake.direction == "") {
            snake.direction = "right"
            snakesDirection()
        }
    }
}