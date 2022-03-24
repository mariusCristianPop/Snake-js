
// created the snake object with it's proprieties and methods
var snake = {
    x: 100,
    y: 100,
    speed: 25,
    tail: [],
    direction: "",
    tailSize: 4,
    growTail: function(x, y) { // method show
        this.tail.push({x:x, y:y})
        console.log(`Added to tail: ${x}, ${y}`);
    }
};

  // p5.js setup function
  function setup() {
    createCanvas(800, 600);
    frameRate(5)
    background(64);
    for (let i = 0; i < 5; ++i) {
        snake.growTail(snake.x += i, snake.y)
    }
    snake.direction = ""
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
        console.log("drawing")
        square(snake.tail[i].x, snake.tail[i].y, 24);
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
    if (snake.x > width || snake.x < 0 || snake.y < 0 || snake.y > height) {
        console.log("Game over")
        noLoop()
    }
}

// Detect what keyboard arrow is pressed
function keyPressed() {
    console.log("key pressed?")
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