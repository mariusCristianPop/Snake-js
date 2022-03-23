// created the snake object with it's starting x y position and its tail. 
var snake = {
    x: 100,
    y: 100,
    tail: [],
    growTail: function(x, y) { // method show
        this.tail.push(x, y)
        console.log(`Added to tail: ${x}, ${y}`);
    },
    shrinkTail: function() {
        console.log(`Removed from tail ${this.tail.pop()}`);
        this.tail.pop()
    }
  };

  // Defining what appears on the canvas when the page loads
  function setup() {
    createCanvas(800, 600);
    background(64);
    for (let i = 0; i < 5; ++i) {
        ellipse(snake.x += 10, snake.y, 20, 20);
    }
}