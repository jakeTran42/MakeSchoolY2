let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

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

draw();