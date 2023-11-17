
// THIS ENTIRE FUNCTION MAKES WINDOW RESIZING NOT BROKEN IN SOME WAY
$(document).ready(function () {
  var width2match = $('#snakeGame').width();
  $('#snakeGame').css("height", width2match + "px");

  $(window).resize(function () {
    if ($(window).width() < 650) {
      $('#snakeGame').css("width", "100%");
      console.log("small");
    }
    else {
      $('#snakeGame').css("width", "400px");
      console.log("large");
    }

    var width2match = $('#snakeGame').width();
    console.log(width2match);
    $('#snakeGame').css("height", width2match + "px");

    var myDiv = select('#snakeGame');
    boardDim = myDiv.width;
    tileSize = boardDim / numTile;
    console.log(boardDim);
    resizeCanvas(boardDim, boardDim);
  })
});

function preload() {
  fontRegular = loadFont("../fonts/Prompt/Prompt-Light.ttf");
}

phaseStart = true;
phaseCountdown = false;
phaseGame = false;
phaseGameover = false;


let boardDim;

let gameover = false;

//COUNTDOWN VARIABLES
let countdown;

//GAME VARIABLES
let score = 0;
let numTile = 15;
let tileSize;
let tileBorder = 0;
let boardState = [];
let dir = [1, 0];
let newDir;
let hasNewDir = false;
let start;
let startLength = 3;
let snakeHead;
let snakeBody = [];
let ate = false;
let food;

function setup() {
  textFont(fontRegular);
  textSize(14);

  var myDiv = select('#snakeGame');
  boardDim = myDiv.width;
  var myCanvas = createCanvas(boardDim, boardDim);
  tileSize = boardDim / numTile;
  myCanvas.parent("#snakeGame");

  frameRate(11);
  newFood();
  start = 0;
  for (let i = startLength; i >= 0; i--) {
    snakeBody.push([start - i * dir[0], start - i * dir[1]]);
  }

  noStroke();
  //CREATES TILES TO DRAW AND COLOR
  for (let i = 0; i < numTile; i++) {
    append(boardState, []);
    for (let j = 0; j < numTile; j++) {
      append(boardState[i], 255);
    }
  }
}

function draw() {
  if (phaseStart) {
    drawStart();
  }
  else if (phaseCountdown) {
    drawCountdown();
  }
  else if (phaseGame) {
    drawBoardState();
    updateBoard();
  }
  else if (phaseGameover) {
    drawBoardState();
    drawGameover();
  }
}

// START

function drawStart() {
  background(255);
  fill(255);
  circle(boardDim / 2, boardDim / 2, boardDim / 2);
  fill(0);
  textAlign(CENTER, CENTER);
  text('Click here to begin', boardDim / 2, boardDim / 2);
}


function mousePressed() {
  if (phaseStart) {
    var disX = abs(boardDim / 2 - mouseX);
    var disY = abs(boardDim / 2 - mouseY);
    if (sqrt((disX * disX) + (disY * disY)) < boardDim / 2) {
      phaseStart = false;
      phaseCountdown = true;
      countdown = millis();
    }
  }
}

// COUNTDOWN

function drawCountdown() {
  background(255);
  fill(255);
  circle(boardDim / 2, boardDim / 2, boardDim / 2);
  fill(0);
  textAlign(CENTER, CENTER);
  var timeFrom = int((millis() - countdown) / 1000);
  var timeWait = 3 - timeFrom;
  text(timeWait, boardDim / 2, boardDim / 2);
  if (timeWait <= 0) {
    phaseCountdown = false;
    phaseGame = true;
  }
}

//GAME

function newFood() {
  var randX = int(random(0, numTile));
  var randY = int(random(0, numTile));
  food = [randX, randY];
  var f = JSON.stringify(food);
  var b = JSON.stringify(snakeBody);
  if (-1 != b.indexOf(f)) newFood();
}

function updateBoard() {
  if (hasNewDir && !gameover) {
    dir[0] = newDir[0];
    dir[1] = newDir[1];
    hasNewDir = false;
  }
  var locX = snakeBody[snakeBody.length - 1][0];
  var locY = snakeBody[snakeBody.length - 1][1];
  var x = locX + dir[0];
  var y = locY + dir[1];

  if (x >= 0 && x < numTile && y >= 0 && y < numTile) {
    var f = JSON.stringify(food);
    var t = JSON.stringify([x, y]);
    if (-1 != f.indexOf(t)) ate = true;

    if (ate == false) snakeBody.shift();

    var b = JSON.stringify(snakeBody);
    if (-1 != b.indexOf(t)) gameover = true;;

    snakeBody.push([x, y]);
  }
  else {
    gameover = true;
  }
  if (ate == true) {
    newFood();
    ate = false;
    score += 10;
  }
}

function drawBoardState() {
  if (gameover) {
    phaseGame = false;
    phaseGameover = true;
  }
  background(255);
  var b = JSON.stringify(snakeBody);
  var f = JSON.stringify(food);

  for (let i = 0; i < boardState.length; i++) {
    for (let j = 0; j < boardState[0].length; j++) {
      var t = JSON.stringify([i, j]);

      if (-1 != b.indexOf(t)) fill(200);
      else if (-1 != f.indexOf(t)) fill(0);
      else fill(boardState[i][j]);

      square(
        i * tileSize + tileBorder,
        j * tileSize + tileBorder,
        tileSize - tileBorder * 2
      );
    }
  }
}

function keyPressed() {
  if (hasNewDir == false && phaseGame === true) {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
      if (dir[0] != 0) return;
      hasNewDir = true;
      newDir = [-1, 0];
    } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
      if (dir[0] != 0) return;
      hasNewDir = true;
      newDir = [1, 0];
    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      if (dir[1] != 0) return;
      hasNewDir = true;
      newDir = [0, 1];
    } else if (keyCode === UP_ARROW || keyCode === 87) {
      if (dir[1] != 0) return;
      hasNewDir = true;
      newDir = [0, -1];
    }
  }
  if (keyCode === 82) restart();
}

//GAMEOVER

// COUNTDOWN

function drawGameover() {
  fill(255);
  circle(boardDim / 2, boardDim / 2, boardDim / 2);
  fill(0);
  textAlign(CENTER, CENTER);
  text("GAMEOVER\nScore: " + score, boardDim / 2, boardDim / 2);
}


function restart() {
  phaseCountdown = true;
  phaseGame = false;
  phaseGameover = false;


  countdown = millis();

  boardDim = 400;

  gameover = false;

  //GAME VARIABLES
  score = 0;
  numTile = 15;
  tileSize = boardDim / numTile;
  tileBorder = 0;
  boardState = [];
  dir = [1, 0];
  hasNewDir = false;
  startLength = 3;
  snakeBody = [];
  ate = false;

  setup();
}