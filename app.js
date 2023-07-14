class SnakeGame{
    constructor(){
        this.canvas = document.querySelector("#canvas");
        this.context2d = this.canvas.getContext("2d");
        this.snake = [];
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
            if(!this.pauseGame) this.moveSnake(this.dx, this.dy);
            this.drawFood();
            this.drawSnake();
            
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
        this.makeSnake(5);
        this.randomFood();
        console.log(this.food);
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
}

const snakeGame = new SnakeGame();
