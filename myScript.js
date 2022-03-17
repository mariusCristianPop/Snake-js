var x, y, snakeSpeed, direction, generateFood
var snakeFood = {
    x: 100,
    y: 50,
}
function setup() {
    //createCanvas(800, 600);
    var cnv = createCanvas(windowWidth - 50, windowHeight - 50);
    cnv.style('display', 'block');
    // Starts with drawing the circle in the middle of the screen
    x = width / 2
    y = height / 2
    snakeSpeed = 1.05
    direction = ""
    generateFood = true;
}

// Draws the circle
function draw() {
    background(200)
    // Draw a circle
    stroke(50)
    fill(100)
    ellipse(x, y, 24, 24)
    if (x > width || x < 0 || y < 0 || y > height) {
        console.log("Game over")
        noLoop()
    }
    if (direction == "right") {
        x += snakeSpeed
    }
    if (direction == "up") {
        y -= snakeSpeed
    } 
    if (direction == "left") {
        x -= snakeSpeed
    } 
    if (direction == "down") {
        y += snakeSpeed
    }
    if (generateFood) {
        generateFood = false;
        snakeFood.x = random (0, width - 30);
        snakeFood.y = random (0, height - 30);
        ellipse(snakeFood.x, snakeFood.y, 15, 15);
    } else {
        ellipse(snakeFood.x, snakeFood.y, 15, 15);
    }
    hit = collidePointEllipse(snakeFood.x, snakeFood.y, x, y, 24, 24)
    if (hit) {
        generateFood = true;
        console.log("collision")
    }
}

// Changes the position of the circle based on keys pressed
function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (direction == "left" || direction == "right" || direction == "") {
            direction = "up"
        }
    } else if (keyCode === DOWN_ARROW) {
        if (direction == "left" || direction == "right" || direction == "") {
            direction = "down"
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (direction == "up" || direction == "down") {
            direction = "left"
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (direction == "up" || direction == "down" || direction == "") {
            direction = "right"
        }
    }
}