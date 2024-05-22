//player creator
var player;

//Start function
function startGame() {
    gameArea.start();
    player = new component(30, 30, 'white', 400, 300);
}

document.body.style.width = '90vw';
document.body.style.height = '90vh';
document.body.style.margin = 'auto';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

//Motion Functions
function up(){
    player.speedY = -5;
}
function down(){
    player.speedY = 5;
}
function left(){
    player.speedX = -5;
}
function right(){
    player.speedX = 5;
}

function stop(){
    player.speedX = 0;
    player.speedY = 0;
}

//Key listeners
function handleKeyDown(event){
    switch(event.key){
        case 'w':
            up();
        break;
        case 'a':
            left();
        break;
        case 's':
            down();
        break;
        case 'd':
            right();
        break;
        case 'e':
            //implement action button
        break;
    }
}
function handleKeyUp(event){
    stop();
}
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);


//create canvas game area
var gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.canvas.style.backgroundColor = 'rgb(30,30,50)';
        this.canvas.style.margin = 'auto';
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    gameArea.clear();
    player.newPos();
    player.update();
}

