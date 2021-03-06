var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60)
  };

var canvas = document.createElement('canvas');
var width = 900;
var height = 500;
var paddleWidth = 8;
var paddleHeight = 80;
var ballRadius = 7;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var ball = new Ball(250, 250);
var paddleOne = new Paddle(0, height/3, paddleWidth, paddleHeight);
var paddleTwo = new Paddle(width - paddleWidth, height/3,paddleWidth, paddleHeight);

var step = function() {
  update();
  draw();
  animate(step);
};

var update = function() {
  ball.update();
  paddleOne.update();
  paddleTwo.update();
};

var draw = function() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#fff";
  context.strokeRect(width/2, 0, 1, height);
  context.strokeRect(paddleWidth, 0, width - 2 * paddleWidth, height);
  paddleOne.draw();
  paddleTwo.draw();
  ball.draw();
};

function Ball(xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.xVel = 3;
  this.yVel = 6;
  this.radius = ballRadius;
};


Ball.prototype.draw = function () {
  context.beginPath();
  context.arc(this.xPos, this.yPos, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#fff";
  context.fill();
};

Ball.prototype.update =function() {
  this.xPos += this.xVel;
  this.yPos += this.yVel;
  if (this.xPos + this.radius>= width - paddleWidth) {
    if (this.yPos > paddleTwo.yPos && this.yPos < paddleTwo.yPos + paddleHeight) {
      this.xVel *= -1;
    } else {
      ball.xPos = 250;
      ball.yPos = 250;
    }
  } else if (this.xPos - this.radius<= paddleWidth) {
      if (this.yPos > paddleOne.yPos && this.yPos < paddleOne.yPos + paddleHeight) {
        this.xVel *= -1;
      } else {
        ball.xPos = 750;
        ball.yPos = 250;
      }
    }
  if (this.yPos + this.radius>= height) {
    this.yVel *= -1;
  } else if (this.yPos - this.radius<= 0) {
    this.yVel *= -1;
  }
};

function Paddle(xPos, yPos, width, height) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.width = width;
  this.height = height;
  this.xVel = 0;
  this.yVel = 0;
};

Paddle.prototype.draw = function () {
  context.fillStyle = "#fff";
  context.fillRect(this.xPos, this.yPos, this.width, this.height);
};

Paddle.prototype.update = function () {
  this.xPos += this.xVel;
  if (this.yPos + this.yVel > 0 && this.yPos + this.yVel < height - paddleHeight) {
    this.yPos += this.yVel;
  }
  // if (ball.yPos < this.yPos) {
  //   this.yVel = -4;
  // } else if (ball.yPos > this.yPos) {
  //   this.yVel = 4;
  // } else {
  //   this.yVel = 0;
  // }
};

// PlayerOne.controls = function() {
//   for (var key in keysDown) {
//     var value = Number(key);
//     if (value == 37) {
//         this.paddle.yVel = -5;
//     } else if (value == 39) {
//         this.paddle.yVel = 5;
//     } else {
//         this.paddle.yVel = 0;
//     }
//   };
// };

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 38) {
    console.log("one");
    paddleTwo.yVel = -6
  } else if (event.keyCode === 40) {
    paddleTwo.yVel = 6
    console.log(event.keyCode);
  }
  if (event.keyCode === 87) {
    console.log("one");
    paddleOne.yVel = -6
  } else if (event.keyCode === 83) {
    paddleOne.yVel = 6
    console.log(event.keyCode);
  }
    keysDown = event.keyCode;
    console.log(keysDown);
});

window.addEventListener("keyup", function (event) {
  if (event.keyCode === 87 || event.keyCode === 83) {
    paddleOne.yVel = 0;
  }
  if (event.keyCode === 38 || event.keyCode === 40) {
    paddleTwo.yVel = 0;
  }
});
