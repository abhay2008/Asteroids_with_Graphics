function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 40;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;
  this.color = "lime";
  this.image = loadImage("images/spaceShip.png");

  this.boosting = function (b) {
    this.isBoosting = b;
  }

  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.5);
  }

  this.boost = function () {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.4);
    this.vel.add(force);
  }

  this.hits = function (asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      this.color = "red";
      return true;
    } else {
      this.color = "steelblue";
      return false;
    }
  }

  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(0);
    strokeWeight(6);
    stroke(this.color);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    image(this.image, -this.r * 2 + 10, -this.r / 2, this.image.width / 10, this.image.height / 10);
    //triangle(x1, y1, x2, y2, x3, y3) 
    pop();
  }

  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  this.setRotation = function (a) {
    this.rotation = a;
  }

  this.turn = function () {
    this.heading += this.rotation;
  }

}
