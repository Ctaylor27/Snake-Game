const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const h1 = document.querySelector('h1');
const gridUnitSize= 32; // Used to determine the proportions of the squares
const easyBtn = document.getElementById('easy');
const normalBtn = document.getElementById('normal');
const hardBtn = document.getElementById('hard');
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');
let fpsMod = 5; // Used to change the Framerate and Difficulty
let count = 0; // Used to count frames during fps calculation
let startingLength = 4; //starting length of the snake


const Snake = function(){
  this.x = Math.floor(Math.random() * 20) * gridUnitSize;  // Starting X Position
  this.dx = gridUnitSize;                                  // delta X
  this.y = Math.floor(Math.random() * 15) * gridUnitSize;  // Starting Y
  this.dy = 0;                                             // delta Y
  this.length = startingLength;                            // Snake length
  this.cells = [];                                         // Stores Data for individual snake cells
}

let snake = new Snake();                                   // Generate Initial Snake

const Apple = function(){
  this.x =  Math.floor(Math.random() * 20) * gridUnitSize;  // Apple starting X
  this.y = Math.floor(Math.random() * 15) * gridUnitSize;   // Apple starting Y
}

let apple = new Apple();                                    // Generate initial Y

//Event Listeners

startBtn.addEventListener('click', function(e) {
  startBtn.style.display = 'none';                          // Hides start button
  animate();                                                // Starts Game
})

window.addEventListener('keydown', (e) => { //Up Arrow
  let key = e.which;
  if (key === 38) {
    if (snake.dy === gridUnitSize || snake.dy === -gridUnitSize){
      return; // Stops invalid directions
    }
    snake.dx = 0;
    snake.dy = -gridUnitSize;
  }
})
window.addEventListener('keydown', (e) => { //left Arrow
  let key = e.which;
  if (key === 37) {
    if (snake.dx === -gridUnitSize || snake.dx === gridUnitSize){
      return;  // Stops invalid directions
    }
    snake.dy = 0;
    snake.dx = -gridUnitSize;
  }
})
window.addEventListener('keydown', (e) => { //right Arrow
  let key = e.which;
  if (key === 39) {
    if (snake.dx === gridUnitSize || snake.dx === -gridUnitSize){
      return; // Stops invalid directions
    }
    snake.dy = 0;
    snake.dx = gridUnitSize;
  }
})
window.addEventListener('keydown', (e) => { //Up Arrow
  let key = e.which;
  if (key === 40) {
    if (snake.dy === gridUnitSize || snake.dy === -gridUnitSize){
      return; // Stops invalid directions
    }
    snake.dx = 0;
    snake.dy = gridUnitSize;
  }
})

resetBtn.addEventListener('click', () => {              // Resets Snake, Apple, and Score Display
  snake = new Snake();
  apple = new Apple();
});

easyBtn.addEventListener('click', () => {
  easyBtn.classList.add('active');
  normalBtn.classList.remove('active');
  hardBtn.classList.remove('active');
  fpsMod = 12;                                          // Slows down Snake
})

normalBtn.addEventListener('click', () => {
  normalBtn.classList.add('active');
  easyBtn.classList.remove('active');
  hardBtn.classList.remove('active');
  fpsMod = 6;
})

hardBtn.addEventListener('click', () => {
  hardBtn.classList.add('active');
  normalBtn.classList.remove('active');
  easyBtn.classList.remove('active');
  fpsMod = 3;                                           // Speeds up snake
})


function animate(){
  requestAnimationFrame(animate);
    
  if (++count < fpsMod) {
    return;                                             // Stops code if not on the right frame
  }
  count = 0;

  
  ctx.clearRect(0, 0, canvas.width, canvas.height);     // Clears previous Drawings
  
  // Draw Apple
  ctx.fillStyle = "#e0d68a";
  ctx.fillRect(apple.x, apple.y, gridUnitSize, gridUnitSize);

  // Off Screen Rules
  if(snake.x + snake.dx >= canvas.width) {
    snake.x = -gridUnitSize;
  } else if (snake.x + snake.dx < 0){
    snake.x = canvas.width;
  } else if(snake.y + snake.dy >= canvas.height) {
    snake.y = -gridUnitSize;
  } else if(snake.y + snake.dy <= -gridUnitSize) {
    snake.y = canvas.height;
  } 
  
  snake.x += snake.dx;
  snake.y += snake.dy;
  
  //Generate Snake
  snake.cells.unshift({x: snake.x, y: snake.y});

  if (snake.cells.length > snake.length){
    snake.cells.pop();
  }

  // Draw Snake
  ctx.fillStyle = "#8e443d";
  snake.cells.forEach(function(cell, index){
    ctx.fillRect(cell.x, cell.y, gridUnitSize, gridUnitSize);
  })

  // Eating the Apple

  if (snake.x === apple.x && snake.y === apple.y) {
    snake.length++;
    apple = new Apple();
  }
  
  h1.textContent = `Snake Game - ${snake.length - startingLength} Points`
  // Snake Dies

  for (let i = 1; i < snake.cells.length; i++){
    if (snake.cells[0].x === snake.cells[i].x && snake.cells[0].y === snake.cells[i].y){
      console.log('ouch')
      snake = new Snake;
    }
  }
  
}
