var x, y, snakeSpeed, direction

function setup() {
    //createCanvas(800, 600);
    var cnv = createCanvas(windowWidth - 50, windowHeight - 50);
    cnv.style('display', 'block');
    // Starts with drawing the circle in the middle of the screen
    x = width / 2
    y = height / 2
    snakeSpeed = 1.05
    direction = "right"
}

// Draws the circle
function draw() {
    console.log(wallX + " + " + floor(x))
    background(200)
    // Draw a circle
    stroke(50)
    fill(100)
    ellipse(x, y, 24, 24)
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
    if (x == windowHeight - 50) {
        console.log(x)
    }
   
}

// Changes the position of the circle based on keys pressed
function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (direction == "left" || direction == "right") {
            direction = "up"
        }
    } else if (keyCode === DOWN_ARROW) {
        if (direction == "left" || direction == "right") {
            direction = "down"
        }
    }
    if (keyCode === LEFT_ARROW) {
        if (direction == "up" || direction == "down") {
            direction = "left"
        }
    } else if (keyCode === RIGHT_ARROW) {
        if (direction == "up" || direction == "down") {
            direction = "right"
        }
    }
}
