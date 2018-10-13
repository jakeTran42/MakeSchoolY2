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


draw();