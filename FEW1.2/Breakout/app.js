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


draw();