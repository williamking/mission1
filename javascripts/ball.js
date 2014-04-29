var Balls = [],
    frame = document.getElementById("frame"),
    frameWidth = 1000,
    frameHeight = 500;

var showedBall;


function Ball() {
  var thing = document.createElement("canvas");
  thing.className = "drawing";
  frame.appendChild(thing);
  this.body = frame.lastChild;  
  this.gravity = 9.8;
  this.time = 0;
  this.direction = 1;
  this.speed = 0;
  this.parrelSpeed = 0;
  this.startTime = 0;
  this.loss = 0.9;
  this.onshow = 0;
  this.active = 0;
}

Ball.prototype = {
  constructor : Ball,
  fall : function (timestamp) {
    if (this.active == 0) return;
    var drawstart = timestamp,
    diff = drawstart - this.startTime;
    this.startTime = drawstart;
    if (this.onshow) document.getElementsByTagName("span")[0].innerHTML = Math.floor(this.speed);
    if (this.onshow) document.getElementsByTagName("span")[1].innerHTML = Math.floor(this.parrelSpeed);
    this.speed += 0.05 * this.gravity;
    var top = parseFloat(this.body.style.top);
    top += this.speed * 0.5;
    var left = parseFloat(this.body.style.left);
    left += this.parrelSpeed * 0.5;
    if ((top < 52) || (top > frameHeight)) {
      if ((this.speed > 1)  || (this.speed < -1)) this.speed *= -1 * this.loss;
      else {
        this.speed = 0;
        this.active = 0;
      }
    }
    else {
      if (this.active) this.body.style.top = top + 'px';
    }
    if ((left < 452) || (left > 452 + frameWidth)) {
      this.parrelSpeed *= -1 * this.loss;
    }
    else {
      this.body.style.left = left + 'px';
    }
  },
  start: function() {
    var theBall = this;
    requestAnimationFrame(function pack(timestamp) {
    theBall.fall(timestamp);
      requestAnimationFrame(pack);
    });
  },
  addSpeed: function () {
    var amount = document.getElementById("speedAdd").value,
    currentSpeed = Math.abs(this.speed);
    if (Number(amount) < 0) alert("Invalid!!!");
    else currentSpeed += Number(amount);
    this.speed = currentSpeed;
    if (this.speed > 0) this.active = 1;
    document.getElementById("speedAdd").value = "";
  },
  minusSpeed: function () {
    var amount = document.getElementById("speedMinus").value,
    currentSpeed = Math.abs(this.speed);
    if ((currentSpeed < Number(amount)) || (Number(amount) < 0)) alert("Invalid!!!!");
    else currentSpeed -= Number(amount);
    if (this.speed >= 0) this.speed = currentSpeed;
    else this.speed = -1 * currentSpeed;
    document.getElementById("speedMinus").value = "";
  },
  addParrel: function () {
    var amount = document.getElementById("addParrel").value,
    currentSpeed = Math.abs(this.parrelSpeed);
    if (Number(amount) < 0) alert("Invalid!!!");
    else currentSpeed += Number(amount);
    this.parrelSpeed = currentSpeed;
    document.getElementById("addParrel").value = "";
  },
  minusParrel: function () {
    var amount = document.getElementById("minusParrel").value,
    currentSpeed = Math.abs(this.parrelSpeed);
    if ((currentSpeed < Number(amount)) || (Number(amount) < 0)) alert("Invalid!!!!");
    else currentSpeed -= Number(amount);
    if (this.parrelSpeed >= 0) this.parrelSpeed = currentSpeed;
    else this.parrelSpeed = -1 *currentSpeed;
    document.getElementById("minusParrel").value = "";
  },
  changeGravity: function () {
    var gravity = document.getElementById("gravity").value;
    this.gravity = parseFloat(value);
  }
}

var create = function() {
  Balls[Balls.length] = new Ball();
  setProperties(Balls[Balls.length - 1].body, Balls.length - 1);
  Balls[Balls.length - 1].start();
  document.getElementsByTagName("span")[2].innerHTML = Balls.length;
}

var remove = function() {
  var balls = document.getElementsByClassName("ball");
  frame.removeChild(frame.lastChild);
}


function setProperties(element, number) {
  element.style.position = "absolute";
  element.style.top = Math.random() * frameHeight + 60 + "px";
  element.style.left = Math.random() * frameWidth + 452 + "px";
  element.sdraggable = "true";
  var drawing = element;

  if (drawing.getContext) {
    var context = drawing.getContext("2d");
    context.beginPath();
    context.arc(50, 50, 25, 0, 2 * Math.PI, false);
    context.strokeStyle = "red";
    context.fillStyle = "red";
    context.stroke();
    context.font = "bold 28px Arial"
    context.shadowColor = "black";
    context.fillText(number, 45, 50);
  }
    return element;
}



window.onload = function () {
  frame.style.width = frameWidth;
  frame.style.height = frameHeight;
}

var add = document.getElementById("add");
var minus = document.getElementById("minus");
var num = 0;

add.addEventListener("click", create, false);

minus.addEventListener("click", remove, false);

document.getElementById("speedUp").onclick = function() {
  for (var i in Balls) {
    if (Balls[i].onshow) Balls[i].addSpeed();
  }
};
document.getElementById("speedDown").onclick = function() {
  for (var i in Balls) {
    if (Balls[i].onshow) Balls[i].minusSpeed();
  }
};
document.getElementById("sure").onclick = function() {
  for (var i in Balls) {
    Balls[i].onshow = 0;
  }
  var i = Number(document.getElementById("Number").value);
  Balls[i].onshow = 1;
}
document.getElementById("parrelUp").onclick = function() {
  for (var i in Balls) {
    if (Balls[i].onshow) Balls[i].addParrel();
  }
};
document.getElementById("parrelDown").onclick = function() {
  for (var i in Balls) {
    if (Balls[i].onshow) Balls[i].minusParrel();
  }
};
document.getElementById("OK").onclick = function {
  for (var i in Balls) {
    if (Balls[i].onshow) Balls[i].changeGravity();
  }
}

function check() {
  for (var i in Balls) {
    if (1) {
      Balls[i].body.onclick = function(event) {
        Balls[i].active = 1;
      };
    }
  }
  setTimeout("check()", 500);
}

window.onload = check();

