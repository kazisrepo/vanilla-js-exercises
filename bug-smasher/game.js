// TO-READ
// html5 canvas object has many built-in function and attributes which will be needed for this project

let canvas = document.createElement("canvas");
let gameCanvas = document.getElementById("gameCanvas");

let scoreLabel = document.getElementById("scoreLabel");
let btnResetSpeed = document.getElementById("resetSpeed");
let btnResetScore = document.getElementById("resetScore");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;
gameCanvas.appendChild(canvas);

let timeoutId;
let score = 0;
let speed = 2000;
// Load the image
let img = new Image();
img.src = "assets/animal.png"; // Update this path to your image's location

// Define the image's drawn location and size
let imgObject = { x: 0, y: 0, width: 50, height: 50 }; // Adjust width and height as needed

btnResetSpeed.addEventListener("click", () => {
  speed = 2000;
});
btnResetScore.addEventListener("click", () => {
  score = 0;
  scoreLabel.innerText = "0";
});

canvas.addEventListener("click", function (event) {
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  // Check if the click is within the bounds of the image
  if (
    x >= imgObject.x &&
    x <= imgObject.x + imgObject.width &&
    y >= imgObject.y &&
    y <= imgObject.y + imgObject.height
  ) {
    // increase speed and score
    speed = speed - 500;
    score++;
    scoreLabel.innerText = score;
    console.log("Speed : ", speed);
  }
});

function drawBackground() {
  ctx.fillStyle = "#eaffd0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

img.onload = function () {
  //setInterval(drawObject, speed); // Start the interval to draw the object after the image has loaded
  timeoutId = setTimeout(drawObject, speed);
};

function drawObject() {
  drawBackground(); // Draw background to clear previous drawings
  imgObject.x = getRandomInt(0, canvas.width - imgObject.width); // Ensure the image is fully visible
  imgObject.y = getRandomInt(0, canvas.height - imgObject.height);
  ctx.drawImage(
    img,
    imgObject.x,
    imgObject.y,
    imgObject.width,
    imgObject.height
  );
  timeoutId = setTimeout(drawObject, speed);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
