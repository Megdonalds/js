class level3 extends Phaser.Scene {
  constructor() {
    super({
      key: "level3",
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
    this.load.tilemapTiledJSON("level3", "assets/level3.tmj");
    this.load.image("waterIMG", "assets/Water.png");
    this.load.image("grassIMG", "assets/Grass.png");
    this.load.image("biomeIMG", "assets/Basic_Grass_Biom_things.png");
    this.load.image("bridgeIMG", "assets/Wood_Bridge.png");

    this.load.audio('bgMusic', 'assets/game-music-loop-7-145285.mp3ssets/.mp3');

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
      key: "level3",
    });


    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let waterTiles = map.addTilesetImage("Water", "waterIMG");
    let grassTiles = map.addTilesetImage("Grass", "grassIMG");
    let biomeTiles = map.addTilesetImage("Basic_Grass_Biom_things", "biomeIMG");
    let bridgeTiles = map.addTilesetImage("Wood_Bridge", "bridgeIMG");

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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

    this.bridgeLayer = map.createLayer(
      "bridge",
      [bridgeTiles, biomeTiles],
      0,
      0
    );

    this.forestLayer = map.createLayer(
      "forest",
      [biomeTiles],
      0,
      0
    );

    this.forest2Layer = map.createLayer(
      "forest2",
      [biomeTiles],
      0,
      0
    );

    this.physics.world.bounds.width = this.waterLayer.width;
    this.physics.world.bounds.height = this.waterLayer.height;

  


    // hammy is the alias in preload 
    this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, 'hammy');
    this.cat = this.physics.add.sprite(700, 500, 'cat');

    this.player.setCollideWorldBounds(true)

    let corn = map.findObject("objectLayer", (obj) => obj.name === "corn");
    this.corn = this.physics.add.sprite(corn.x, corn.y, 'food').play("corn")

    let brocolli = map.findObject("objectLayer", (obj) => obj.name === "brocolli");
    this.brocolli = this.physics.add.sprite(brocolli.x, brocolli.y, 'food').play("brocolli")

    let beans = map.findObject("objectLayer", (obj) => obj.name === "beans");
    this.beans = this.physics.add.sprite(beans.x, beans.y, 'food').play("beans")

    if (window.corn > 0) {
      this.corn.setVisible(false)
    }
    if (window.brocolli > 0) {
      this.brocolli.setVisible(false)
    }
    if (window.beanst > 0) {
      this.beans.setVisible(false)
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
    this.forestLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.forestLayer);
    this.forest2Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.forest2Layer);
    this.physics.add.collider(this.cat, this.forestLayer);


    //UI

    /////////////////// collection //////////////////////////////

    this.physics.add.overlap(this.player, this.corn, globalCollectCorn, null, this);
    this.physics.add.overlap(this.player, this.brocolli, globalCollectBrocolli, null, this);
    this.physics.add.overlap(this.player, this.beans, globalCollectBeans, null, this);

    this.physics.add.overlap(this.player, this.cat, globalHitCat, null, this);

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

    if (window.heart === 0) {
      this.scene.start("gameOver", {});
  }
    if (
      this.player.x > 470 &&
      this.player.x < 502 &&
      this.player.y < 70
    ) {
      console.log("Go to level2 function");
      this.level2();
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
    if (this.player.x > 463 && this.player.x < 495 && this.player.y > 875) {
      if (window.cheese >= 1 && window.lettuce >= 1) {
        this.level2()
      }
    }

  } /////////////////// end of update //////////////////////////////
  catCollision(player, enemy) {
    this.camera.main.shake(100);
    window.heart--
  }

  collectCorn(player, item) {
    console.log("Player hit enemy");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.corn = 1

    // disable enemy body
    item.disableBody(true, true);
  }
  collectBrocolli(player, item) {
    console.log("Player hit enemy");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.brocolli = 1

    // disable enemy body
    item.disableBody(true, true);
  }
  collectBeans(player, item) {
    console.log("Player hit enemy");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.beans = 1

    // disable enemy body
    item.disableBody(true, true);
  }
  collectLettuce(player, item) {
    console.log("Player hit enemy");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    // disable enemy body
    item.disableBody(true, true);
  }
  // Function to jump to room1

  level2(player, tile) {
    console.log("level2 function");
    let playerPos = {}
    playerPos.x = 486
    playerPos.y = 834
    this.scene.start("level2", { playerPos: playerPos })
  }
  //function hitcat
  hitcat(player, cat) {

  }
} //////////// end of class world ////////////////////////
