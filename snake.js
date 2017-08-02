(function() {
  window.onload = function() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    document.addEventListener("click", addBoost);
    setInterval(game, 1000/15);
  }

  var velX = velY = 0;
  var playerX = playerY = 10;
  var trail = [];
  var tail = 5;
  var gridSize = tileCount = 20;
  var boostX = randomNumber();
  var boostY = randomNumber();
  var score = 0;

  function game() {
    playerX += velX;
    playerY += velY;

    if (playerX < 0) {
      playerX = tileCount - 1;
    }
    if (playerX > tileCount - 1) {
      playerX = 0;
    }
    if (playerY < 0) {
      playerY = tileCount - 1;
    }
    if (playerY > tileCount - 1) {
      playerY = 0;
    }

    ctx.fillStyle = "#393939";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffeb33";
    for (var i = 0; i < trail.length; i++) {
      ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);

      if (trail[i].x === playerX && trail[i].y === playerY) {
        gameOver();
      }
    }
    trail.push({x: playerX, y: playerY});
    while (trail.length > tail) {
      trail.shift();
    }

    eat();
  }

  function eat() {
    if (boostX === playerX && boostY === playerY) {
      addBoost()
      boostX = randomNumber();
      boostY = randomNumber();
    }

    ctx.fillStyle = "#68d475"
    ctx.fillRect(boostX * gridSize, boostY * gridSize, gridSize - 2, gridSize - 2);
  }

  function gameOver() {
    tail = 5;
    score = 0;
  }

  function keyPush(e) {
    switch (e.keyCode) {
      case 37:
        velX = -1;
        velY = 0;
        break;
      case 38:
        velX = 0;
        velY = -1;
        break;
      case 39:
        velX = 1;
        velY = 0;
        break;
      case 40:
        velX = 0;
        velY = 1;
        break;
    }
  }

  function addBoost() {
    tail++;
    score++;
    document.getElementById("score").innerHTML = `Score: ${score}`;
  }

  function randomNumber() {
    return Math.floor(Math.random()*tileCount);
  }
}());
