var x, y;

function setup() {
    //createCanvas(800, 600);
    var cnv = createCanvas(windowWidth - 50, windowHeight - 50);
    cnv.style('display', 'block');
    // Starts with drawing the circle in the middle of the screen
    x = width / 2;
    y = height / 2;
}

// Draws the circle
function draw() {
    background(200);  
    // Draw a circle
    stroke(50);
    fill(100);
    ellipse(x, y, 24, 24); 
}

// Changes the position of the circle based on keys pressed
function keyPressed() {
    if (keyCode === UP_ARROW) {
        y = y - 10;
    } else if (keyCode === DOWN_ARROW) {
        y = y + 10;
    }
    if (keyCode === LEFT_ARROW) {
        x = x - 5;
    } else if (keyCode === RIGHT_ARROW) {
        x = x + 5;
    }
}