const canvas = document.getElementById("canvas");

canvas.width = 600;
canvas.height = 400;
const ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-20;
var vx = 3;
var vy = -3;

var paddleHeight = 12;
var paddleWidth = 65;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;

var brickOffsetTop = 42;
var brickOffsetLeft = 42;
var brickRowCount = 15;
var brickColumnCount = 8;
var brickWidth = 25;
var brickHeight = 12;
var brickPadding = 10;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    vy = -vy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("LINK SAVES HYRULE");
                        document.location.reload();
                    }
                }
            }
        }
    }
}



function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#8b0000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2);
    ctx.fillStyle = "#D4AF37";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#D4AF37";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '22px triforce';
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("Score: "+score, 18, 28);
}

function drawLives() {
    ctx.font = '22px triforce';
    ctx.fillStyle = "#D4AF37";
    ctx.fillText("Lives: "+lives, canvas.width-78, 28);
}

function draw() 
{
    if (x < 10 || x >= (canvas.width - 10) ) {
        vx = -vx;
    }
    if (y <= 10){
        vy = -vy;
    }else if(y > canvas.height - 10){
        if(x > paddleX && x < paddleX + paddleWidth) {
            vy = -vy;
        }else{
            lives--;
            if(!lives) {
                alert("GANON DESTROYS HYRULE");
                document.location.reload()
            }else {
                x = canvas.width/2;
                y = canvas.height-30;
                vx = 3;
                vy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }

    x += vx;
    y += vy;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    collisionDetection();

    requestAnimationFrame(draw);
}
draw();