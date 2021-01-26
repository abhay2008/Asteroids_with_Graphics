var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var backgroundImg;
var gameOver = false;
var gameStarted = false;
var gameInfo = true;
var gameWon = false;
var explosionS;
let laser1S, laser2S;
let winS;
let loseS;

function preload() {
  backgroundImg = loadImage("background.jpg");
  explosionS = loadSound("explosion.wav");

  winS = loadSound("win.mp3");
  loseS = loadSound("lose.wav");

  laser1S = loadSound("laser.wav");
  laser2S = loadSound("laser2.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
  explosionS.setVolume(0.04);
 
  laser1S.setVolume(0.02);
  laser2S.setVolume(0.02);
  
  loseS.setVolume(0.2);
  winS.setVolume(0.5);
}

function draw() {
  background(backgroundImg);
  push();
  textSize(40);
  fill("cyan");
  text("Score : " + score, windowWidth - 400, windowHeight / 2 - 300);
  pop();

  if (gameInfo) {
    score = 0;
    textAlign(CENTER, CENTER);
    textSize(40);
    fill("yellow");
    text("Press enter to start the game!!", width / 2, height - 150);
    fill("lime");
    textSize(50);
    text("Now you're in the Asteroid's !", width / 2, height / 4 - 50);
    textSize(30);
    fill("orange");
    text("-- Press space to hit the asteroids!", width / 2 - 50, height / 4 + 20);
    text("-- Destroy the asteroids or the Game is Over!!", width / 2, height / 4 + 90);
    text("--Score 175 points to win the game!!", width / 2, height / 4 + 150)
    text("-- ⬅ and ➡ for controlling rotation of the ship", width / 2, height / 4 + 250);
    text("-- ⬆ for moving the ship", width / 2, height / 4 + 320);
    textFont("Algerian");
    textSize(50);
    fill("red");
    text("--Beware of the asteroids coming!!", width / 2, height - 230);
  }

  if (gameStarted) {
    if (score > 175) {
      winS.play();
      gameStarted = false;
      gameOver = false;
      gameInfo = false;
      gameWon = true;
    }
    for (var j = asteroids.length - 1; j >= 0; j--) {
      asteroids[j].render();
      asteroids[j].edges();
      asteroids[j].update();
    }
    for (var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } else {
        for (var j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 30) {
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
              score += 10;
            }
            asteroids[j].explode();
            explosionS.play();
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            break;
          }
        }
      }
    }
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }
  for (var j = asteroids.length - 1; j >= 0; j--) {
    if (ship.hits(asteroids[j])) {
      loseS.play();
      gameStarted = false;
      gameOver = true;
      asteroids.splice(j, 1);
      lasers.splice(i, 1);
    }
  }

  if (gameOver && !gameStarted && !gameWon && !gameInfo) {
    textFont("CopperBold");
    fill("red");
    textAlign(CENTER, CENTER);
    textSize(100);
    stroke("cyan");
    text("GAME OVER!!", width / 2, height / 2);
    fill("lime");
    textSize(60);
    text("Refresh the page to play again!", width / 2, height / 2 + 150);
  }

  if (gameWon && !gameOver && !gameInfo && !gameStarted) {
    textFont("CopperBold");
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    textSize(130);
    stroke(0);
    text("YOU WIN!!!", width / 2, height / 2 - 20);
    fill("orange");
    textSize(60);
    text("Refresh the page to play again!", width / 2, height / 2 + 150);
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (keyCode === ENTER && gameInfo) {
    score = 0;
    gameInfo = false;
    gameOver = false;
    gameWon = false;
    gameStarted = true;
  }

  if (key === ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
    if (random(1) < 0.5) {
      laser1S.play();
    } else {
      laser2S.play();
    }
    for (var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
    }
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
