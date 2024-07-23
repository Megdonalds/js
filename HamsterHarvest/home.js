class home extends Phaser.Scene {

    constructor() {
        super({
            key: 'home'
        });

        // Put global variable here
    }

    preload() {
        //load image
       // this.load.image("homepage", "assets/2.png")
        //this.load.image("gameover", "assets/gameover.jpg");
        //load sound effect
        //this.load.audio('loselife','assets/loselife.mp3');

    }

    create() {

       // console.log('*** home scene');

        // Add image and detect spacebar keypress
       // const image =this.add.image(400,400,'homepage')
       // var spacebar = this.input.keyboard.addKey("SPACEBAR")
        //this.add.image(0,0, 'gameover').setOrigin(0,0);
        //this.loselifeSnd = this.sound.add('loselife').setVolume(0.2)

        // 'T' key
        //var keyT = this.input.keyboard.addKey(84);

        //keyT.on('down', function(){
            //console.log('Try Again');
            //this.scene.start("level01");
        //}, this );
       //enter.on("down",function(){
            //console.log("level1 function");
            //let playerPos = {}
            //playerPos.x = 486
           // playerPos.y = 834
            //this.scene.start("level1", { playerPos: playerPos })
         // },
         // this);
   
    }


} 