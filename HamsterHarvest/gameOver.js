class gameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameOver'
        });

        // Put global variable here
    }

    preload() {
        //load image
        this.load.image("gameOverIMG", "assets/gameover.png");
        //load sound effect
        this.load.audio('losebgm', 'assets/homemadeoof-47509.mp3');

    }

    create() {
        this.game.sound.stopAll()
        let lose = this.sound.add("losebgm")
        lose.play();
       
        this.scene.bringToTop("gameOver");

        console.log('*** gameOver scene');

        // Add image and detect spacebar keypress
        const image = this.add.image(400, 400, 'gameOverIMG');
        //this.loselifeSnd = this.sound.add('loselife').setVolume(0.2);


        // 'T' key
        var keyT = this.input.keyboard.addKey(84);

        keyT.on('down', function () {
            console.log('Try Again');
            this.scene.start("level1");

            //reload 3 hearts 
            window.heart = 3;
            window.cheese = 0
            window.lettuce = 0
            window.apple = 0
            window.carrot = 0
            window.corn = 0
            window.brocolli = 0
            window.beans = 0

        }, this);


    }


} 