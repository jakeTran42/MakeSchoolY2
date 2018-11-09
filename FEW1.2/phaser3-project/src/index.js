import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.image('logo', 'assets/Rimuru_2.png');
// }

// function create ()
// {
//     var logo = this.add.image(400, 150, 'logo');

//     this.tweens.add({
//         targets: logo,
//         y: 450,
//         duration: 5000,
//         ease: 'Power2',
//         yoyo: true,
//         loop: -1
//     });

// }


function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create () {
    this.add.image(400, 300, 'sky');
}