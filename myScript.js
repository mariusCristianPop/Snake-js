var bodySquareSize = 24
// created the snake object with it's proprieties and methods
const snake = new Object();
snake.x = 100;
snake.y = 100;
snake.speed = 25;
snake.tail = [];
snake.direction = "";
snake.tailSize = 5;
snake.growTail = function(x, y) { // method show
        x = Math.floor(x)
        y = Math.floor(y)
        this.tail.push({x:x, y:y})
        //console.log(`Added to tail: ${x}, ${y}`);
}


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
    lifeCheck()
    background(64)
    stroke(50)
    fill(255)
    snakesDirection()
    snakeMoves()
     
}

// Draw the snake's tail
function snakeMoves() {
    for (let i = 0; i < snake.tail.length; ++i) {
        //console.log("drawing")
        ellipse(snake.tail[i].x, snake.tail[i].y, bodySquareSize, bodySquareSize);
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
    let headX = snake.tail.slice(snake.tail.length - 1) // save the coordinates of snake's head into a variable
    let found = snake.tail.slice(0, snake.tail.length - 3) // save the coordinates of snake's body (without head and 2 body parts after that)
    for (let i = 0; i < found.length; ++i) { // if the head (XY) interesects with any body part(XY) game ends. 
        if (headX[0].x == found[i].x && headX[0].y == found[i].y) {
            snake.direction = ""
            console.log("Game over")
            noLoop()
            break;
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