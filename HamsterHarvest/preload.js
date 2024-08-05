class preload extends Phaser.Scene {
  constructor() {
    super({
      key: "preload",
    });

    // Put global variable here
  }

  // incoming data from scene below

  preload() {
    this.load.spritesheet("food", "assets/food.png",
      { frameWidth: 32, frameHeight: 32 });
    // preload generated character spritesheets
    this.load.spritesheet('hammy', 'assets/Basic Charakter Spritesheet.png',
      { frameWidth: 96, frameHeight: 96 });

    this.load.spritesheet('cat', 'assets/pipo-nekonin008.png',
      { frameWidth: 64, frameHeight: 64 });

    // preload generated character spritesheets
    this.load.spritesheet('chicken', 'assets/Free Chicken Sprites.png',
      { frameWidth: 32, frameHeight: 32 });

    this.load.image('rectangle', 'assets/rectangle.png')

    this.load.image('menu', 'assets/menu.png')

  }

  create() {
    //let spaceDown = this.input.keyboard.addKey('SPACE');

    //spaceDown.on('down', function () {
    //console.log("spacebar pressed");
      
      this.scene.start("main")
    },
      this
    );

    this.anims.create({
      key: 'hamAnimup',
      frames: this.anims.generateFrameNumbers('hammy',
        { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'hamAnimleft',
      frames: this.anims.generateFrameNumbers('hammy',
        { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'hamAnimright',
      frames: this.anims.generateFrameNumbers('hammy',
        { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'hamAnimdown',
      frames: this.anims.generateFrameNumbers('hammy',
        { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'catAnimup',
      frames: this.anims.generateFrameNumbers('cat',
        { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'catAnimleft',
      frames: this.anims.generateFrameNumbers('cat',
        { start: 4, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'catAnimright',
      frames: this.anims.generateFrameNumbers('cat',
        { start: 7, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'catAnimdown',
      frames: this.anims.generateFrameNumbers('cat',
        { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'chickenMove',
      frames: this.anims.generateFrameNumbers('chicken',
        { start: 0, end: 1 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'cheese',
      frames: this.anims.generateFrameNumbers('food',
        { start: 516, end: 516 }),
      frameRate: 1,
      repeat: -1
    })

    this.anims.create({
      key: 'lettuce',
      frames: this.anims.generateFrameNumbers('food',
        { start: 194, end: 194 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'apple',
      frames: this.anims.generateFrameNumbers('food',
        { start: 356, end: 356 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'carrot',
      frames: this.anims.generateFrameNumbers('food',
        { start: 6, end: 6 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'corn',
      frames: this.anims.generateFrameNumbers('food',
        { start: 350, end: 350 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'brocolli',
      frames: this.anims.generateFrameNumbers('food',
        { start: 236, end: 236 }),
      frameRate: 1,
      repeat: -1
    })
    this.anims.create({
      key: 'beans',
      frames: this.anims.generateFrameNumbers('food',
        { start: 221, end: 221 }),
      frameRate: 1,
      repeat: -1
    })

    //var space = this.input.keyboard.addKey("SPACE");
  
      // On spacebar event, call the world scene
  
      //space.on(
        //"down", function () {
        //  this.scene.start("home", {});
       // },
       // this
     // );
  } /////////////////// end of create //////////////////////////////

  update() {


  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1

  level1(player, tile) {
    console.log("level1 function");

  }
  //function hitcat

} //////////// end of class world ////////////////////////
