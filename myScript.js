// created the snake object with it's starting x y position and its tail. 
var snake = {
    x: 100,
    y: 100,
    tail: [],
    growTail: function(x, y) { // method show
        this.tail.push({x:x, y:y})
        console.log(`Added to tail: ${x}, ${y}`);
    }
};


  // Defining what appears on the canvas when the page loads
  function setup() {
    createCanvas(800, 600);
    background(64);
    for (let i = 0; i < 5; ++i) {
        snake.growTail(snake.x += 10, snake.y)
    }
}

function draw() {
    background(64);
    stroke(50)
    fill(255)
    for (let i = 0; i < snake.tail.length; ++i) { // draw the snake's tail
        console.log("drawing")
        ellipse(snake.tail[i].x += 1, snake.tail[i].y, 24, 24);
        
    }
    snake.tail.pop()
    snake.growTail(snake.x += 1, snake.y)
    if (snake.x > width || snake.x < 0 || snake.y < 0 || snake.y > height) {
        console.log("Game over")
        noLoop()
    }
}