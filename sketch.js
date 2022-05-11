let points = [];

let spacing = 400;

function setup() {
  frameRate(60);
  createCanvas(windowWidth/2, windowHeight/2);
  background(255);
  for (let i = 50; i < width; i += spacing) {
    for (let j = 50; j < height; j += spacing) {
      points.push(new movePoint(i, j));
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
  background(255);
}

class movePoint {
  constructor(sPosX, sPosY) {
    this.x = sPosX;
    this.y = sPosY;
    this.velocityX = random(-1, 1);
    this.velocityY = random(-1, 1);
  }

  acceleration() {
    this.accelerationX = (mouseX - this.x) * 0.0001;
    this.accelerationY = (mouseY - this.y) * 0.0001;
  }

  velocity() {
    this.velocityX += this.accelerationX;
    this.velocityY += this.accelerationY;
  }

  move() {
    this.x = this.x + this.velocityX;
    this.y = this.y + this.velocityY;
    if (this.x < 0 || this.x > windowWidth/2) {
      this.velocityX = -this.velocityX;
      this.accelerationX = -this.accelerationX;
    }
    if (this.y < 0 || this.y > windowHeight/2) {
      this.velocityY = -this.velocityY;
      this.accelerationY = -this.accelerationY;
    }
  }

  display() {
    strokeWeight(
      min(1 / abs((this.accelerationX + this.accelerationY) * 100), 20)
    );
    point(this.x, this.y);
  }
}
