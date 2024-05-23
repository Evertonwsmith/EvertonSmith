//player creator
var player;
var wall;
var borderLeft;
var borderRight;
var borderTop;
var borderBottom;
var item1;
var upAllowed = true;
var downAllowed = true;
var leftAllowed = true;
var rightAllowed = true;
var borders = [];
var wallColor = 'rgb(37, 28, 135)';
var tableColor = 'rgb(171, 135, 89)';
var doorColor = 'rgb(74, 74, 74)';
var interiorWallColor = 'black';
var bookshelfColor = 'rgb(125, 72, 44)';
var couchColor = 'rgb(117, 35, 35)';
var available = [];
var item1 = "Text Item";

//Start function
function startGame() {
    gameArea.start();
    //800x600
    player = new component(30, 30, 'white', 400, 300);
    wallLInterior = new wallComponent(20, 300, interiorWallColor, 150, 150);
    wallRInterior = new wallComponent(20, 300, interiorWallColor, 650, 150);
    wallTLInterior = new wallComponent(150, 20, interiorWallColor, 150, 150);
    wallTRInterior = new wallComponent(200, 20, interiorWallColor, 450, 150);
    wallBLInterior = new wallComponent(250, 20, interiorWallColor, 150, 450);
    wallBRInterior = new wallComponent(120, 20, interiorWallColor, 550, 450);
    table = new wallComponent(50,100,tableColor,550,250);
    table2 = new wallComponent(30,80,tableColor,200,0);
    table3 = new wallComponent(30,80,tableColor,200,200);

    bookshelf1 = new interactiveComponent(25,150,bookshelfColor,125,200,[item1]);
    bookshelf2 = new wallComponent(25,150,bookshelfColor,670,200);
    bookshelf3 = new wallComponent(50,100,bookshelfColor,750,0);
    bookshelf3 = new wallComponent(50,100,bookshelfColor,750,450);

    borderTop = new wallComponent(800, 10, wallColor, 0, 0);
    borderBottom = new wallComponent(800, 10, wallColor, 0, 590);
    borderRight = new wallComponent(10, 600, wallColor, 790, 0);
    borderLeft = new wallComponent(10, 600, wallColor, 0, 0);
    couch = new wallComponent(150,50,couchColor,200,400);
    comp1 = new wallComponent(25,25,tableColor,600,50);
    comp2 = new wallComponent(25,25,tableColor,600,10);
    comp3 = new wallComponent(25,25,tableColor,565,10);
    comp4 = new wallComponent(25,25,tableColor,565,50);

    door1 = new wallComponent(25,100,doorColor,0,150);
    door2 = new wallComponent(25,100,doorColor,0,350);
    door3 = new wallComponent(250,20,doorColor,250,0);
    door4 = new wallComponent(250,20,doorColor,500,580);

}

document.body.style.width = '90vw';
document.body.style.height = '90vh';
document.body.style.margin = 'auto';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';

//Wall Component setup
function wallComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.backgroundColor = color;
    this.x = x;
    this.y = y;
    borders.push(this);
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.isTouching = function (plyr) {
        var leftWall = this.x;
        var rightWall = this.x + (this.width);
        var topWall = this.y;
        var botWall = this.y + (this.height);
        var plyrLeft = plyr.x;
        var plyrRight = plyr.x + (plyr.width);
        var plyrTop = plyr.y;
        var plyrBot = plyr.y + (plyr.height);
        var touching = true;
        if (botWall >= plyrTop && topWall < plyrTop && leftWall < plyrRight && rightWall > plyrLeft) {
            upAllowed = false;
            plyr.speedY = Math.max(plyr.speedY, 0); // Stop only upward movement
        }
        if (topWall <= plyrBot && botWall > plyrBot && leftWall < plyrRight && rightWall > plyrLeft) {
            downAllowed = false;
            plyr.speedY = Math.min(plyr.speedY, 0); // Stop only downward movement
        }
        if (rightWall >= plyrLeft && leftWall < plyrLeft && topWall < plyrBot && botWall > plyrTop) {
            leftAllowed = false;
            plyr.speedX = Math.max(plyr.speedX, 0); // Stop only leftward movement
        }
        if (leftWall <= plyrRight && rightWall > plyrRight && topWall < plyrBot && botWall > plyrTop) {
            rightAllowed = false;
            plyr.speedX = Math.min(plyr.speedX, 0); // Stop only rightward movement
        }
        //add the rest of the logi
        return touching;
    }
}


//Wall Component setup
function interactiveComponent(width, height, color, x, y, items) {
    this.width = width;
    this.height = height;
    this.backgroundColor = color;
    this.x = x;
    this.y = y;
    this.items = items;
    borders.push(this);
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.isTouching = function (plyr) {
        var leftWall = this.x;
        var rightWall = this.x + (this.width);
        var topWall = this.y;
        var botWall = this.y + (this.height);
        var plyrLeft = plyr.x;
        var plyrRight = plyr.x + (plyr.width);
        var plyrTop = plyr.y;
        var plyrBot = plyr.y + (plyr.height);
        var touching = true;
        if (botWall >= plyrTop && topWall < plyrTop && leftWall < plyrRight && rightWall > plyrLeft) {
           available = this.items;
        }
        else if (topWall <= plyrBot && botWall > plyrBot && leftWall < plyrRight && rightWall > plyrLeft) {
            available = this.items;
        }
        else if (rightWall >= plyrLeft && leftWall < plyrLeft && topWall < plyrBot && botWall > plyrTop) {
            available = this.items;
        }
        else if (leftWall <= plyrRight && rightWall > plyrRight && topWall < plyrBot && botWall > plyrTop) {
            available = this.items;
        }
        else {
            available=[];
        }
        //add the rest of the logi
        return touching;
    }
}

function action(){
    for(let v of available){
        console.log(v);
    }

}

//Component setup
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
    this.crashWith = function (otherObject) {
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBot = this.y + (this.height);
        var otherLeft = otherObject.x;
        var otherRight = otherObject.x + (otherObject.width);
        var otherTop = otherObject.y;
        var otherBot = otherObject.y + (otherObject.height);
        var crash = true;
        if ((myBot < otherTop) || (myTop > otherBot) || (myRight < otherLeft) || (myLeft > otherRight)) {
            crash = false;
        }
        return crash;
    }
}

//Motion Functions
function up() {
    if (upAllowed) {
        player.speedY = -5;
    }
}
function down() {
    if (downAllowed) {
        player.speedY = 5;
    }
}
function left() {
    if (leftAllowed) {
        player.speedX = -5;
    }
}
function right() {
    if (rightAllowed) {
        player.speedX = 5;
    }
}

function stop() {
    player.speedX = 0;
    player.speedY = 0;
}

//Key listeners
function handleKeyDown(event) {
    switch (event.key) {
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
            action();
            break;
    }
}
function handleKeyUp(event) {
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
        this.canvas.style.backgroundColor = 'rgb(178, 171, 245)';
        this.canvas.style.margin = 'auto';
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        document.body.style.backgroundColor = 'red';
        clearInterval(this.interval);
    }
}

function updateGameArea() {

    gameArea.clear();
    checkCollisions();

    player.newPos();
    player.update();
}

function checkCollisions() {
    upAllowed = true;
    downAllowed = true;
    leftAllowed = true;
    rightAllowed = true;

    for (let bord of borders) {
        bord.isTouching(player);
    }

    for (let bord of borders) {
        bord.update(player);
    }

}
