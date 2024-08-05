class main extends Phaser.Scene {

    constructor() {
        super({
            key: 'main'
        });

        // Put global variable here
    }

    preload() {

        // Preload all the assets here

        // Preload any images here
        this.load.image("mainIMG", "assets/main.png");
        // Preload any sound and music here
        // this.load.audio('ping', 'assets/ping.mp3');
       
         this.load.audio('bgMusic', 'assets/game-music-loop-7-145285.mp3');
    }

    create() {
        window.mainmusic - this.sound.add("bgMusic").setVolume(0.1).setLoop(true).play()
        
        this.scene.bringToTop("main");
        const image = this.add.image(400, 400, 'mainIMG');
        
        console.log("menu page - main");
    
    
        var spaceDown = this.input.keyboard.addKey('SPACE');
    
            spaceDown.on('down', function(){
                this.scene.start("instructions");
                }, this );
    
    
        }
     
    }