class gameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameoOver'
        });

        // Put global variable here
    }

    preload() {
        //load image
        //this.load.image("gameover", "assets/gameover.jpg");
        //load sound effect
        //this.load.audio('loselife','assets/loselife.mp3');

    }

    create() {

        console.log('*** gameOver scene');

        // Add image and detect spacebar keypress
        //this.add.image(0,0, 'gameover').setOrigin(0,0);
        //this.loselifeSnd = this.sound.add('loselife').setVolume(0.2);
        
        //reload 3 hearts 
        window.heart = 3;
        window.key = 0;

        // 'T' key
        //var keyT = this.input.keyboard.addKey(84);

        //keyT.on('down', function(){
            //console.log('Try Again');
            //this.scene.start("level01");
        //}, this );

   
    }


} 