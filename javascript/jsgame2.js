//Body
document.body.style.margin = 'auto';
document.body.style.display = 'flex';
document.body.style.justifyContent = 'center';

//Colors
var floorColor = 'rgb(30,30,30)';
var borderColor = 'black';

//Player
var player;

//Levels
var level1 = [];
//Structures
//Walls
var wall1;
var wall2;
var wall3;
var wall4;
var wall5;
var wall6;
var wall7;
var wall8;
//Doors
var door1;
//Interactables
var box1;
var box2;
var box3;

//Items
var item1;
var item2;
var item3;

//Screens
//Main Screen
var gameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 700;
        this.canvas.height = 900;
        this.canvas.style.backgroundColor = floorColor;
        this.canvas.style.margin = 'auto';
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    },
    stop: function () {
        clearInterval(this.interval);
    }
}

//Item Screen
//Text Screen

//Inventory

gameArea.start();