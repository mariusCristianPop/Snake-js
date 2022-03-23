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


function addToTail() {
    for (let i = 0; i < 5; ++i) {
        snake.growTail(i, i + 1);
    }
}

function removeFromTail() {
    snake.shrinkTail();
}

addToTail();
removeFromTail();
console.log(snake.tail)