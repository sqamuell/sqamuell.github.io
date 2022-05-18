let points = [];
let spacing = 400;
let accel = 0.0001
let maxVel = 5;

function setup() {
  pixelDensity(1);
  frameRate(60);

  var myDiv = select('#viewport');
  myWidth = myDiv.width-3;
  myHeight = myDiv.height-3;

  var myCanvas = createCanvas(myWidth, myHeight);
  myCanvas.parent("viewport");

  background(255);
  for (let i = 50; i < width; i += spacing) {
    for (let j = 50; j < height; j += spacing) {
      rand = random(-600,600)
      points.push(new movePoint(i + rand, j + rand));
    }
  }
}

function draw() {
  for (let i = 0; i < points.length; i++) {
    points[i].acceleration();
    points[i].velocity();
    points[i].move();
    points[i].display();
  }
}

function mousePressed() {
  accel = 0.001;
}

function mouseReleased() {
  accel = 0.0001
  // background(255);
}

function mouseWheel() {
  background(255,255,255,30);
}

class movePoint {
  constructor(sPosX, sPosY) {
    this.x = sPosX;
    this.y = sPosY;
    this.velocityX = random(-1, 1);
    this.velocityY = random(-1, 1);
  }

  acceleration() {
    this.accelerationX = (mouseX - this.x) * accel;
    this.accelerationY = (mouseY - this.y) * accel;
  }

  velocity() {
    this.velocityX += this.accelerationX;
    if (this.velocityX > maxVel) {
      this.velocityX = maxVel;
    }
    if (this.velocityX < -maxVel) {
      this.velocityX = -maxVel;
    }
    this.velocityY += this.accelerationY;
    if (this.velocityY > maxVel) {
      this.velocityY = maxVel;
    }
    if (this.velocityY < -maxVel) {
        this.velocityY = -maxVel;
    }
  }

  move() {
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;
    if (this.x < 0 || this.x > myWidth) {
      this.velocityX = -this.velocityX;
      this.accelerationX = -this.accelerationX;
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x > myWidth) {
        this.x =myWidth;
      }
    }
    if (this.y < 0 || this.y > myHeight) {
      this.velocityY = -this.velocityY;
      this.accelerationY = -this.accelerationY;
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y > myHeight) {
        this.y = myHeight;
      }
    }
  }

  display() {
    strokeWeight(
      max((abs(this.accelerationX) + abs(this.accelerationY) * 30),0.3));
    stroke(0,0,0,200);
    point(this.x, this.y);
    // size = min(1 / abs((this.accelerationX + this.accelerationY) * 100), 20);
    // square(this.x, this.y, 10);
  }
}
