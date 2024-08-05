class win extends Phaser.Scene {

    constructor() {
        super({
            key: 'win'
        });

        // Put global variable here
    }

    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("winIMG", "assets/win.png");
        // Preload any sound and music here
        //  this.load.audio('ping', 'assets/ping.mp3');
         this.load.audio('winbgm', 'assets/game-level-complete-143022.mp3');
    }

    create() {
        this.game.sound.stopAll()
        let win = this.sound.add("winbgm")
        win.play();
        this.scene.bringToTop("win");

        const image = this.add.image(400, 400, 'winIMG');

        console.log("win page - win");


        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            this.scene.start("main");
        }, this);
        //reload 3 hearts 
        window.heart = 3;
        window.cheese = 0
        window.lettuce = 0
        window.apple = 0
        window.carrot = 0
        window.corn = 0
        window.brocolli = 0
        window.beans = 0

    }

}