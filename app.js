class SnakeGame{
    constructor(){
        this.canvas = document.querySelector("#canvas");
        this.context2d = this.canvas.getContext("2d");
        this.pointSelector = document.getElementById("span");
        this.snake = [];
        this.snakeLength = 4;
        this.points = 0;
        this.wallSize = 10;
        this.dx = 0;
        this.dy = 0;
        this.food = {x:0, y:0, color:"white"};
        this.pauseGame = true;
        this.init();
    }

    init(){
        this.addEventLinsteners();
        this.resetGame();
        setInterval(() => {
            this.clearCanvas();
            this.checkFoodColision()
            this.checkWallsColision();
            this.checkSnakeColision();
            if(!this.pauseGame) this.moveSnake(this.dx, this.dy);
            this.drawFood();
            this.drawSnake();
            this.printPoints();
        }, 100)
    }

    addEventLinsteners = () => {
        document.addEventListener("keydown", (e) => this.keyDown(e));
    }

    keyDown = (e) => {
        if(this.pauseGame) this.pauseGame = false;

        switch (e.keyCode) {
            case 37: // left
            case 65: // a
                this.dy = 0;
                this.dx = -this.wallSize;
                break;
            case 38: // up
            case 87: // w
                this.dy = -this.wallSize;
                this.dx = 0;
                break;
            case 39: // right
            case 68: // d
                this.dy = 0;
                this.dx = this.wallSize;
                break;
            case 40: //down
            case 83: // s
                this.dy = this.wallSize;
                this.dx = 0;
                break;
        }
    }

    getRandomInt(max){
        return Math.floor(Math.random()*max);
    }

    drawRectRandomColor(x, y, width, height){
        this.context2d.fillStyle = `rgb(${this.getRandomInt(255)}, ${this.getRandomInt(255)}, ${this.getRandomInt(255)})`;
        this.context2d.fillRect(x, y, width, height);
    }

    clearCanvas(){
        this.context2d.fillStyle = "black";
        this.context2d.fillRect(0,0,this.canvas.width,this.canvas.height);
    }

    makeSnake(snakeLength){
        for(let i=0; i<snakeLength; i++){
            let x = this.canvas.width/2 + i*this.wallSize;
            let y = this.canvas.height/2;
            this.snake.push({x:x, y:y});
        }
    }

    resetGame(){
        this.snake = [];
        this.points = 0;
        this.snakeLength = 4;
        this.makeSnake(this.snakeLength);
        this.randomFood();
        this.pauseGame = true;
    }

    drawSnake(){
        this.snake.forEach((el) => {
            this.context2d.strokeStyle = "red";
            this.context2d.lineWidth = 5;
            this.context2d.lineJoin = "bevel";
            this.context2d.strokeRect(el.x, el.y, this.wallSize, this.wallSize);
        });
    }

    moveSnake(dx, dy){
        let headX = this.snake[0].x + dx;
        let headY = this.snake[0].y + dy;
        this.snake.unshift({x: headX, y: headY});
        this.snake.pop();
    }

    randomFood(){
        const randV = (min, max) =>{
            return Math.floor( (Math.random() * (max-min) + min) / this.wallSize) * this.wallSize;
        };
        let colors = ["yellow", "silver", "white", "orange", "green", "blue"];
        this.food.color = colors[Math.floor((Math.random() * colors.length))];
        this.food.x = randV(20, this.canvas.width - 20);
        this.food.y = randV(20, this.canvas.height - 20);
    }

    drawFood(){
        this.context2d.fillStyle = this.food.color;
        this.context2d.fillRect(this.food.x, this.food.y, this.wallSize, this.wallSize);
    }

    checkWallsColision(){
        this.snake.forEach( (el) => {
            if (el.x > this.canvas.width || el.x < 0) this.resetGame();
            if (el.y > this.canvas.height || el.y < 0) this.resetGame();
        });
    }

    checkFoodColision(){
        if (this.food.x === this.snake[0].x && this.food.y === this.snake[0].y){
            this.snake.push(Object.assign({},this.snake[this.snake.length-1]));
            this.randomFood();
            this.points++;
        }
    }

    checkSnakeColision() {
        for (let i = 1; i < this.snake.length; i++) {
          if (this.snake[i].x === this.snake[0].x && this.snake[i].y === this.snake[0].y) {
            this.resetGame();
            break;
          }
        }
      } 

    printPoints(){
        this.pointSelector.innerHTML = `Points: ${this.points}`;
    }
}

const snakeGame = new SnakeGame();
