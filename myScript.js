const BODY_SIZE = 24
const FOOD_SIZE = BODY_SIZE
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const INITIAL_XY = 100
const SNAKE_SPEED = 25
const SNAKE_INITIAL_BODY_LENGTH = 5
const CANVAS_BACKGROUND = 64
const CANVAS_BORDER = 20

var generateFood = true

// created the snake object
const snake = new Object()
snake.x = INITIAL_XY
snake.y = INITIAL_XY
snake.speed = SNAKE_SPEED
snake.tailArr = []
snake.direction = ""
snake.bodyLength = SNAKE_INITIAL_BODY_LENGTH
snake.bodySize = BODY_SIZE
snake.growTail = function(x, y) {
    x = Math.floor(x)
    y = Math.floor(y)
    this.tailArr.push({x:x, y:y})
}

// create food object
const snakeFood = new Object()
snakeFood.x = INITIAL_XY
snakeFood.y = INITIAL_XY
snakeFood.r = FOOD_SIZE / 2

// p5.js setup function
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT)
    background(CANVAS_BACKGROUND)
    for (let i = 0; i < SNAKE_INITIAL_BODY_LENGTH; ++i) { // make the snake appear on the page right after page loads
        snake.growTail(snake.x += BODY_SIZE, snake.y)
    }
    frameRate(5)
}

// p5.js draw function
function draw() {
    lifeCheck()
    eatFood()
    background(CANVAS_BACKGROUND)
    stroke(50)
    fill(255)
    foodGenerator()
    snakesDirection()
    snakeMoves()
}

// Draw the snake's tail
function snakeMoves() {
    while(snake.tailArr.length > snake.bodyLength) {
        snake.tailArr.shift()
    }
    for (let i = 0; i < snake.tailArr.length; ++i) {
        ellipse(snake.tailArr[i].x, snake.tailArr[i].y, BODY_SIZE, BODY_SIZE)
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
    let headX = snake.tailArr.slice(snake.tailArr.length - 1) // save the coordinates of snake's head into a variable
    let found = snake.tailArr.slice(0, snake.tailArr.length - 3) // save the coordinates of snake's body (without head and 2 body parts after that)
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

// Generate food
function foodGenerator() {
    if (generateFood) {
        generateFood = false;
        snakeFood.x = random(CANVAS_BORDER, CANVAS_WIDTH - CANVAS_BORDER)
        snakeFood.y = random(CANVAS_BORDER, CANVAS_HEIGHT - CANVAS_BORDER)
        let counter = 0
        for (let i = 0; i < snake.tailArr.length; ++ i) {
            let d = dist(snakeFood.x, snakeFood.y, snake.tailArr[i].x, snake.tailArr[i].y)
            if (d < snakeFood.r + snake.bodySize) {
                ++counter
                console.log("generated food where the snake tail is, retrying...")
                if (counter < 1000000) { // we try to generate food until counter == 1000000
                    foodGenerator()
                } else { // stop the game 
                    noLoop()
                }
            }
        }
        ellipse(snakeFood.x, snakeFood.y, FOOD_SIZE, FOOD_SIZE)
    } else {
        ellipse(snakeFood.x, snakeFood.y, FOOD_SIZE, FOOD_SIZE)
    }
}

// Eating food
function eatFood() {
    let snakeHead = snake.tailArr.length - 1
    let hit = collidePointEllipse(snakeFood.x, snakeFood.y, snake.tailArr[snakeHead].x, snake.tailArr[snakeHead].y, 32, 32)
    if (hit) {
        snake.bodyLength += 1
        generateFood = true;
        foodGenerator()
        console.log("collision")
    }
}