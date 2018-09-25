var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height / 2;


var paddleHeight = 75;
var paddleWidth = 10;

var leftUpPressed = false;
var leftDownPressed = false;

var rightUpPressed = false;
var rightDownPressed = false;

var paddleLeftY = canvas.height / 2;
var paddleRightY = canvas.height / 2;

var dx = 4;
var dy = -4;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var rightScore = 0;
var leftScore = 0;

function keyDownHandler(e) {

    if (e.keyCode == 87) {
        leftUpPressed = true;
    } else if (e.keyCode == 83) {
        leftDownPressed = true;
    } else if (e.keyCode == 38) {
        rightUpPressed = true;
    } else if (e.keyCode == 40) {
        rightDownPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 87) {
        leftUpPressed = false;
    } else if (e.keyCode == 83) {
        leftDownPressed = false;
    } else if (e.keyCode == 38) {
        rightUpPressed = false;
    } else if (e.keyCode == 40) {
        rightDownPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFC43D";
    ctx.fill();
    ctx.closePath();
}

function drawLeftPaddle() {
    ctx.beginPath();
    ctx.rect(0, paddleLeftY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#06D6A0";
    ctx.fill();
    ctx.closePath();
}

function drawRightPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#EF476F";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "85px Arial";
    ctx.fillStyle = "rgba(0,149,221,0.5)";
    ctx.fillText(rightScore, canvas.width -200 , canvas.height/2);

    ctx.font = "85px Arial";
    ctx.fillStyle = "rgba(0,149,221,0.5)";
    ctx.fillText(leftScore, 200 , canvas.height/2);
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawLeftPaddle();
    drawRightPaddle();
    drawScore();

    if (rightUpPressed && paddleRightY > 0) {
        paddleRightY -= 7;
    } else if (rightDownPressed && paddleRightY < canvas.height - paddleHeight) {
        paddleRightY += 7;
    }

    if (y < ballRadius || y > canvas.height - ballRadius) {
        dy = -dy;
    }


    if (x > canvas.width - ballRadius || x < ballRadius) {

        if (x < canvas.width / 2) {
            if (y > paddleLeftY && y < paddleLeftY + paddleHeight) {
                dx = -dx;
            } else {
                x = canvas.width / 2;
                y = canvas.height / 2;
                rightScore++;
            }
        }else{
            if (y > paddleRightY && y < paddleRightY + paddleHeight) {
                dx = -dx;
            } else {
                x = canvas.width / 2;
                y = canvas.height / 2;
                leftScore++;
            }
        }
    }

    if (leftUpPressed && paddleLeftY > 0) {
        paddleLeftY -= 7;
    } else if (leftDownPressed && paddleLeftY < canvas.height - paddleHeight) {
        paddleLeftY += 7;
    }


    x += dx;
    y += dy;


    ctx.beginPath();
ctx.setLineDash([5, 15]);
ctx.moveTo(canvas.width/2, 0);
ctx.lineTo(canvas.width/2, canvas.height);
ctx.stroke();
}

setInterval(draw, 10);