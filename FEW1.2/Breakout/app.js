let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

let ball = new Ball();
let paddle = new Paddle();
let background = new Background();
let score = new Score();
let lives = new Lives();
let rightPressed = false;
let leftPressed = false;


const brickRowCount = 5;
const brickColumnCount = 6;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let bricks = [];
for (let col = 0; col < brickColumnCount; col++) {
    bricks[col] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[col][row] = new Brick();
    }
}

function getAColor(type) {
    lightness = '50%'
    if (type === 'light') {
        lightness = '80%'
    };
    saturation = '100%'
    if (type === 'dark') {
        saturation = '70%'
    };
    hue = Math.floor(Math.random() * 361);
    color = `hsl(${hue}, ${saturation}, ${lightness})`;
    return color;
}

class Ball {
    constructor(radius = 10, color = getAColor(), dx = 4, dy = -4) {
        this.radius = radius;
        this.color = color;
        this.dx = dx;
        this.dy = dy;
        this.x = canvas.width / 2;
        this.y = canvas.height - 30;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Brick {
    constructor(x = 0, y = 0, status = 1, width = 75, height = 20, color = getAColor('dark')) {
        this.x = x;
        this.y = y;
        this.status = status;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    render(ctx) {
        // Set locations for gradient
        const startX = this.x + this.width / 2;
        const startY = this.y + this.width;
        const endX = this.x + this.width / 2;
        const endY = this.y;
        // Create gradient
        const brkGrd = ctx.createLinearGradient(startX, startY, endX, endY);
        // Places a color at the start
        brkGrd.addColorStop(0, 'black');
        // Places a color at the end
        brkGrd.addColorStop(1, this.color);
        // Paint gradient
        ctx.beginPath();
        ctx.fillStyle = brkGrd;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();

    }
}

class Paddle {
    constructor(x = (canvas.width - 75) / 2, y = 0, width = 75, height = 10, color = getAColor('dark')) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Background {
    constructor(color = getAColor('light')) {
        this.color = color;
    }
    render(ctx) {
        ctx.beginPath();

        for (let rectCount = 0; rectCount < 10; rectCount++) {
            const rectX = canvas.width / 10 * rectCount
            const rectY = 0
            const rectWidth = canvas.width / 10
            const rectHeight = canvas.height
            ctx.fillStyle = `hsl(${360 / 10 * rectCount}, 100%, 50%)`;
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        }
        // Fill with rainbow arch
        for (let rectCount = 10; rectCount > 0; rectCount--) {
            // Begin path is necessary here
            ctx.beginPath();
            // Math to get rainbow color order correct
            const colorCount = 10 - rectCount
            ctx.fillStyle = `hsl(${360 / 10 * colorCount}, 100%, 50%)`;
            ctx.arc(canvas.width / 2, canvas.height, 25 * rectCount, Math.PI, 0);
            ctx.fill();
        }
        ctx.closePath();
    }
}

class Score {
    constructor(x = 8, y = 20, color = '#000000', font = '16px Arial', score = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.font = font;
        this.score = score;
    }
    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText('Score: ' + this.score, this.x, this.y);
    }
}

class Lives {
    constructor(x = canvas.width - 65, y = 20, color = '#000000', font = '16px Arial', lives = 3) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.font = font;
        this.lives = lives;
    }
    render(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText('Lives: ' + this.lives, this.x, this.y)
    }
}

function drawBricks() {
    for (let col = 0; col < brickColumnCount; col++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[col][row].status == 1) {
                const brickX = (col * (bricks[col][row].width + brickPadding)) + brickOffsetLeft
                const brickY = (row * (bricks[col][row].height + brickPadding)) + brickOffsetTop
                bricks[col][row].x = brickX;
                bricks[col][row].y = brickY;
                bricks[col][row].render(ctx);
            }
        }
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (collided(b)) {
                    ball.dy = -ball.dy;
                    b.status = 0;
                    score.score++;
                    if (score.score == brickRowCount * brickColumnCount) {
                        alert('You Won! Congratulations!')
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function collided(brick) {
    xDifference = ball.x - Math.max(brick.x, Math.min(ball.x, brick.x + brick.width));
    yDifference = ball.y - Math.max(brick.y, Math.min(ball.y, brick.y + brick.height));
    return (xDifference ** 2 + yDifference ** 2) < (ball.radius * ball.radius);
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.render(ctx);
    ball.render(ctx);
    paddle.render(ctx);
    drawBricks();
    collisionDetection();
    score.render(ctx);
    lives.render(ctx);
    ball.x += ball.dx;
    ball.y += ball.dy;
    // Collision for right edge and left edge
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    // Collision for top edge and bottom edge
    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            lives.lives--;
            if (!lives.lives) {
                alert("Game Over");
                ball.x = canvas.width / 2;
                ball.y = canvas.height / 2;
                document.location.reload();
            } else {
                ball.x = canvas.width / 2;
                ball.y = canvas.height - 30;
                ball.dx = 4;
                ball.dy = -4;
                paddle.x = (canvas.width - paddle.width) / 2;
            }
        }
    }
    // Move the paddle
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}


draw();