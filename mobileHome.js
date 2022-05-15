let tileL = ["1","2","3","4","5"];
let c = "6";
let tileR = ["11","10","9","8","7"];

let myWidth = 0;
let myHeight = 0;

let cenSize = 0;
let offsetX = 0;
let offsetY = 0;
let tran = 0;

let last = 0;
let curr = 0;

let t = 20;

function setup() {
  pixelDensity(1);

  var myDiv = select('#scriptContainer');
  myWidth = myDiv.width-3;
  myHeight = myDiv.height-3;

  cenSize = myHeight/7;
  offsetX = cenSize/1.3;
  offsetY = cenSize/3;
  tran = cenSize/3;

  var myCanvas = createCanvas(myWidth, myHeight);
  myCanvas.parent("scriptContainer");
  frameRate(2);
  gradient();
  drawFrame(0);
}

function gradient() {
  c1 = color(255);
  c2 = color(63, 191, 191);

  for(let y=0; y < height; y++){
    n = map(y,0,height,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }
}

function drawFrameTime() {
  drawFrame(0);
}

function drawFrame(offsetAnim) {
  background(255);
  gradient();
  stroke(0);
  x1 = (myWidth/2) + cenSize;
  y1 = (myHeight/2) + cenSize;
  x2 = (myWidth/2) - cenSize;
  y2 = (myHeight/2) - cenSize;

  for (i = tileL.length-1; i >= 0; i--) {
    fill(tileL[tileL.length-i]*23);
    if (i == 0 && offsetAnim < 0) {
      quad(x2 + offsetY - (i*tran) - offsetAnim, y1 - offsetY - (offsetAnim),
           x2 + offsetY - (i*tran) - offsetAnim, y2 + offsetY + (offsetAnim),
           x2 - offsetX - (i*tran) - offsetAnim, y2 - offsetY - (offsetAnim),
           x2 - offsetX - (i*tran) - offsetAnim, y1 + offsetY + (offsetAnim))
    }
    else {
      quad(x2 + offsetY - (i*tran) - offsetAnim, y1 - offsetY,
           x2 + offsetY - (i*tran) - offsetAnim, y2 + offsetY,
           x2 - offsetX - (i*tran) - offsetAnim, y2 - offsetY,
           x2 - offsetX - (i*tran) - offsetAnim, y1 + offsetY)
    }
  }

  for (i = tileR.length-1; i >= 0; i--) {
    fill(tileR[tileR.length-i]*23);
    if (i == 0 && offsetAnim > 0) {
      quad(x1 - offsetY + (i*tran) - offsetAnim, y1 - offsetY + (offsetAnim),
           x1 - offsetY + (i*tran) - offsetAnim, y2 + offsetY - (offsetAnim),
           x1 + offsetX + (i*tran) - offsetAnim, y2 - offsetY + (offsetAnim),
           x1 + offsetX + (i*tran) - offsetAnim, y1 + offsetY - (offsetAnim))
    }
    else {
      quad(x1 - offsetY + (i*tran) - offsetAnim, y1 - offsetY,
           x1 - offsetY + (i*tran) - offsetAnim, y2 + offsetY,
           x1 + offsetX + (i*tran) - offsetAnim, y2 - offsetY,
           x1 + offsetX + (i*tran) - offsetAnim, y1 + offsetY)
    }
  }

  fill(23*c)

  quad(x1 - (offsetAnim*3), y1 - (offsetAnim),
       x1 - (offsetAnim*3), y2 + (offsetAnim),
       x2 - (offsetAnim*3), y2 - (offsetAnim),
       x2 - (offsetAnim*3), y1 + (offsetAnim));
}

// function mouseWheel(event) {
//   print(event.delta);
//   t = 20;
//   if (event.delta > 0 && tileR.length > 0) {
//     scrollRight();
//   }
//   else if (event.delta < 0 && tileL.length > 0)  {
//     scrollLeft();
//   }
// }

// function keyPressed() {
//   if (keyCode === RIGHT_ARROW && tileR.length > 0) {
//     t = 120;
//     scrollRight();
//   }
//   else if (keyCode === LEFT_ARROW && tileL.length > 0)  {
//     t = 120;
//     scrollLeft();
//   }
// }


function touchMoved(event) {
  console.log(event.movementX);
  t = 80;
  if (event.movementX < -8 && tileR.length > 0) {
    scrollRight();
  }
  else if (event.movementX > 8 && tileL.length > 0)  {
    scrollLeft();
  }

  if (last != 0 && curr != 0) {
    val = last - curr;

    console.log(val);

    if (val < -20 && tileR.length > 0) {
      scrollRight();
    }
    else if (val > 20 && tileL.length > 0)  {
      scrollLeft();
    }
    curr = last;
    last = touches[0].x;
  }

  else if (last != 0 && curr == 0) {
    curr = last;
    last = touches[0].x;
  }

  else if (last == 0 && curr == 0) {
    last = touches[0].x;
  }
}

function scrollRight() {
    x = tileR.pop();
    tileL.push(c);
    c = x;
    // print(tileL, c, tileR);
    //animate
    drawFrame(tran/2);
    //rest
    setTimeout(drawFrameTime,t);
}

function scrollLeft() {
    x = tileL.pop();
    tileR.push(c);
    c = x;
    // print(tileL, c, tileR);
    //animate
    drawFrame(-(tran/2));
    //rest
    setTimeout(drawFrameTime,t);
}
