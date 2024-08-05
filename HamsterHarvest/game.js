var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 25,
    height: 32 * 25,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
   // pixelArt: true,
    scene: [preload, game, main, instructions, level1, level2, level3, win, gameOver, showInventory]
};

var game = new Phaser.Game(config);

window.cheese = 0
window.lettuce = 0
window.apple = 0
window.carrot = 0
window.corn = 0
window.brocolli = 0
window.beans = 0

// Add variables here
window.heart = 3
