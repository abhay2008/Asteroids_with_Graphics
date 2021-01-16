function Asteroid(pos, r) {
  this.visiblity = 255;
  this.image = loadImage("images/rock_explosion.png");

  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height))
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(30, 70);
  }

  this.vel = p5.Vector.random2D();
  this.total = floor(random(5, 15));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function () {
    this.pos.add(this.vel);
  }

  this.render = function () {
    push();
    strokeWeight(6);
    stroke(0);
    fill(70);
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r * 2);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.breakup = function () {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    newA[2] = new Asteroid(this.pos, this.r);
    return newA;
  }

  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
      this.vel.mult(1.25);
    } else if (this.pos.x < -this.r) {
      this.vel.mult(1.25);
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.vel.mult(1.25);
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.vel.mult(1.25);
      this.pos.y = height + this.r;
    }
  }

  this.explode = function() {
    push();
    //this.visiblity = this.visiblity - 5;
    //console.log(this.visiblity);   
    //tint(255, this.visiblity);
    imageMode(CENTER);
    image(this.image, this.pos.x, this.pos.y, width / 8, height / 10);
    console.log("HIT!!");
    pop();
  }

}