class level2 extends Phaser.Scene {
  constructor() {
    super({
      key: "level2",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.playerPos = data.playerPos;
    this.inventory = data.inventory
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("level2", "assets/level2.tmj");
    this.load.image("waterIMG", "assets/Water.png");
    this.load.image("grassIMG", "assets/Grass.png");
    this.load.image("biomeIMG", "assets/Basic_Grass_Biom_things.png");
    this.load.image("houseIMG", "assets/Wooden House.png");
    this.load.image("bridgeIMG", "assets/Wood_Bridge.png");
    this.load.image("fenceIMG", "assets/Fences.png");
    this.load.image("plantsIMG", "assets/Basic_Plants.png");
    this.load.image("dirtIMG", "assets/Tilled_Dirt.png");

    // preload generated character spritesheets
    this.load.spritesheet('hammy', 'assets/Basic Charakter Spritesheet.png',
      { frameWidth: 96, frameHeight: 96 });

    this.load.spritesheet('cat', 'assets/pipo-nekonin008.png',
      { frameWidth: 64, frameHeight: 64 });

    this.load.spritesheet("food", "assets/food.png",
      { frameWidth: 32, frameHeight: 32 });
  }

  create() {
    console.log("*** world scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "level2",
    });


    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let waterTiles = map.addTilesetImage("Water", "waterIMG");
    let grassTiles = map.addTilesetImage("Grass", "grassIMG");
    let biomeTiles = map.addTilesetImage("Basic_Grass_Biom_things", "biomeIMG");
    let houseTiles = map.addTilesetImage("Wooden House", "houseIMG");
    let bridgeTiles = map.addTilesetImage("Wood_Bridge", "bridgeIMG");
    let fenceTiles = map.addTilesetImage("Fences", "fenceIMG");
    let plantsTiles = map.addTilesetImage("Basic_Plants", "plantsIMG");
    let dirtTiles = map.addTilesetImage("Tilled_Dirt", "dirtIMG");



    //Load in layers by layers
    this.waterLayer = map.createLayer(
      "water",
      [waterTiles],
      0,
      0
    );

    this.grassLayer = map.createLayer(
      "grass",
      [grassTiles],
      0,
      0
    );

    this.decofloorLayer = map.createLayer(
      "decofloor",
      [biomeTiles, bridgeTiles, dirtTiles],
      0,
      0
    );

    this.decowallsLayer = map.createLayer(
      "decowalls",
      [houseTiles, fenceTiles, plantsTiles, biomeTiles],
      0,
      0
    );

    this.decowalls2Layer = map.createLayer(
      "decowalls2",
      [houseTiles],
      0,
      0
    );

    this.physics.world.bounds.width = this.waterLayer.width;
    this.physics.world.bounds.height = this.waterLayer.height;

    // Add any text to the game
    this.add.text(10, 10, "hello", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

   

    // hammy is the alias in preload 
    this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, 'hammy');
    this.cat = this.physics.add.sprite(700, 500, 'cat');

    this.player.setCollideWorldBounds(true)

    let apple = map.findObject("objectLayer", (obj) => obj.name === "apple");
    this.apple = this.physics.add.sprite(apple.x, apple.y, 'food').play("apple")

    let carrot = map.findObject("objectLayer", (obj) => obj.name === "carrot");
    this.carrot = this.physics.add.sprite(carrot.x, carrot.y, 'food').play("carrot")

    if (window.apple > 0) {
      this.apple.setVisible(false)
    }
    if (window.carrot > 0) {
      this.carrot.setVisible(false)
    }

    this.physics.add.overlap(this.player, this.cat, this.hitcat, null, this);

    // debug player
    window.player = this.player

    //adjust the width & height
    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.2)
    this.cat.body.setSize(this.cat.width * 0.2, this.cat.height * 0.2)

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    //Enable Layer Collisions
    this.decowallsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decowallsLayer);
    this.decowalls2Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decowalls2Layer);
    this.physics.add.collider(this.cat, this.decowallsLayer);
     //UI
     
    /////////////////// collection //////////////////////////////

    this.physics.add.overlap(this.player, this.apple, globalCollectApple, null, this);
    this.physics.add.overlap(this.player, this.carrot, globalCollectCarrot, null, this);

     // Call to update inventory items
     this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    
    // start another scene in parallel
    this.scene.launch("showInventory");
    
    // Call globalFunction globalHitFire on overlap
    //this.physics.add.overlap(this.player, [this.fire1, this.fire2], globalHitFire, null, this);
    //this.physics.add.overlap(this.player, [this.key1, this.key2], globalCollectKey, null, this);


  } /////////////////// end of create //////////////////////////////

  update() {
    if (
      this.player.x > 463 &&
      this.player.x < 495 &&
      this.player.y > 875
    ) {
      console.log("Go to level3 function");
      this.level3();
    }
    if (
      this.player.x > 470 &&
      this.player.x < 502 &&
      this.player.y < 70
    ) {
      console.log("Go to level1 function");
      this.level1();
    }


    this.physics.moveToObject(this.cat, this.player, 700, 1500);

    let speed = 200;

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("hamAnimleft", true); // walk left
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("hamAnimright", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("hamAnimup", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("hamAnimdown", true);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0, 0);
    }
  } /////////////////// end of update //////////////////////////////
  
  // Function to jump to room1
  level3(player, tile) {
    console.log("level3 function");
    let playerPos = {}
    playerPos.x = 500
    playerPos.y = 100
    this.scene.start("level3",  { playerPos: playerPos })
  }
  level1(player, tile) {
    console.log("level1 function");
    let playerPos = {}
    playerPos.x = 486
    playerPos.y = 834
    this.scene.start("level1",  { playerPos: playerPos })
  }
  //function hitcat
  hitcat(player, cat) {

  }
} //////////// end of class world ////////////////////////
