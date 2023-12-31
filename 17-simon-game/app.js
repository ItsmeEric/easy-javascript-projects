let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let computerTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener("click", function (event) {
  if (strictButton.checked) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener("click", function (event) {
  if (onButton.checked) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", function (event) {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;

  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  computerTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash === turn) {
    clearInterval(intervalId);
    computerTurn = false;
    clearColor();
    on = true;
  }

  if (computerTurn) {
    clearColor();
    setTimeout(function () {
      if (order[flash] === 1) one();
      if (order[flash] === 2) two();
      if (order[flash] === 3) three();
      if (order[flash] === 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

function timeOut() {
  if (!win) {
    setTimeout(function () {
      clearColor();
    }, 300);
  }
}

topLeft.addEventListener("click", function (event) {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    timeOut();
  }
});

topRight.addEventListener("click", function (event) {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    timeOut();
  }
});

bottomLeft.addEventListener("click", function (event) {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    timeOut();
  }
});

bottomRight.addEventListener("click", function (event) {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    timeOut();
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 3 && good) winGame();

  if (!good) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(function () {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        gameState();
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }

  if (turn === playerOrder.length && good && !win) {
    turn++;
    gameState();
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function gameState() {
  computerTurn = true;
  flash = 0;
  playerOrder = [];
}
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}
