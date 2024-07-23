class level1 extends Phaser.Scene {
  constructor() {
    super({
      key: "level1",
    });

  }

  init(data) {
    this.playerPos = data.playerPos;
    this.inventory = data.inventory
  }

  preload() {

    // this is the exported JSON map file
    this.load.tilemapTiledJSON("level1", "assets/level1.tmj");
    this.load.image("waterIMG", "assets/Water.png");
    this.load.image("grassIMG", "assets/Grass.png");
    this.load.image("biomeIMG", "assets/Basic_Grass_Biom_things.png");
    this.load.image("houseIMG", "assets/Wooden House.png");
    this.load.image("bridgeIMG", "assets/Wood_Bridge.png");
    this.load.image("eggIMG", "assets/Egg_item.png");
    this.load.image("fenceIMG", "assets/Fences.png");
    this.load.image("furnitureIMG", "assets/Basic_Furniture.png");
    this.load.image("chickenHouseIMG", "assets/Free_Chicken_House.png");
    this.load.image("pathIMG", "assets/Paths.png");

  }

  create() {
    console.log("*** world scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "level1",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let waterTiles = map.addTilesetImage("Water", "waterIMG");
    let grassTiles = map.addTilesetImage("Grass", "grassIMG");
    let biomeTiles = map.addTilesetImage("Basic_Grass_Biom_things", "biomeIMG");
    let houseTiles = map.addTilesetImage("Wooden House", "houseIMG");
    let bridgeTiles = map.addTilesetImage("Wood_Bridge", "bridgeIMG");
    let eggTiles = map.addTilesetImage("Egg_item", "eggIMG");
    let fenceTiles = map.addTilesetImage("Fences", "fenceIMG");
    let furnitureTiles = map.addTilesetImage("Basic_Furniture", "furnitureIMG");
    let chickenHouseTiles = map.addTilesetImage("Free_Chicken_House", "chickenHouseIMG");
    let pathTiles = map.addTilesetImage("Paths", "pathIMG");

    //Load in layers by layers

    this.waterLayer = map.createLayer(
      "water",
      [waterTiles],
      0,
      0
    );

    this.grassLayer = map.createLayer(
      "grass",
      [grassTiles, houseTiles],
      0,
      0
    );

    this.bridgeLayer = map.createLayer(
      "bridge",
      [bridgeTiles],
      0,
      0
    );

    this.decoLayer = map.createLayer(
      "deco",
      [houseTiles, fenceTiles, eggTiles, biomeTiles, bridgeTiles],
      0,
      0
    );

    this.deco1Layer = map.createLayer(
      "deco1",
      [furnitureTiles],
      0,
      0
    );

    this.deco2Layer = map.createLayer(
      "deco2",
      [biomeTiles, furnitureTiles, pathTiles, chickenHouseTiles],
      0,
      0
    );

    this.physics.world.bounds.width = this.waterLayer.width;
    this.physics.world.bounds.height = this.waterLayer.height;

    // Add any text to the game

    this.add.sprite(700, 190, 'chicken').play('chickenMove')

    // hammy is the alias in preload 
    this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, 'hammy');

    this.player.setCollideWorldBounds(true)

    this.cat = this.physics.add.sprite(700, 500, 'cat');

    let cheese = map.findObject("objectLayer", (obj) => obj.name === "cheese");

    this.cheese = this.physics.add.sprite(cheese.x, cheese.y, 'food').play("cheese")

    let lettuce = map.findObject("objectLayer", (obj) => obj.name === "lettuce");
    this.lettuce = this.physics.add.sprite(lettuce.x, lettuce.y, 'food').play("lettuce")

    if (window.cheese > 0) {
      this.cheese.setVisible(false)
    }
    if (window.lettuce > 0) {
      this.lettuce.setVisible(false)
    }

    this.physics.add.overlap(this.player, this.cat, this.hitcat, null, this);

    // debug player
    window.player = this.player

    //adjust the width & height
    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.3)
    this.cat.body.setSize(this.cat.width * 0.4, this.cat.height * 0.6)

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Camera follow player
    this.cameras.main.startFollow(this.player);

    //Enable Layer Collisions
    this.decoLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.decoLayer);
    this.deco1Layer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.deco1Layer);
    this.physics.add.collider(this.cat, this.decoLayer);

    this.physics.overlap(
      this.player,
      this.cat,
      this.catCollision,
      null,
      this
    );

    /////////////////////// collection //////////////////////////////
    this.physics.add.overlap(this.player, this.cheese, globalCollectCheese, null, this);
    this.physics.add.overlap(this.player, this.lettuce, globalCollectLettuce, null, this);

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

    if (window.heart === 3){
      this.heartimg1.setVisible(true);
      this.heartimg2.setVisible(true);
      this.heartimg3.setVisible(true);
    }
    else if (window.heart === 2){
      this.heartimg1.setVisible(true);
      this.heartimg2.setVisible(true);
      this.heartimg3.setVisible(false);
    }
    else if (window.heart === 1){
      this.heartimg1.setVisible(true);
      this.heartimg2.setVisible(false);
      this.heartimg3.setVisible(false);
    }
    else if (window.heart === 0){
      this.heartimg1.setVisible(false);
      this.heartimg2.setVisible(false);
      this.heartimg3.setVisible(false);
    }
  }
  /////////////////// end of update //////////////////////////////

  catCollision(player, enemy) {
    this.camera.main.shake(100);
    window.heart--
  }

  // Function to jump to room1
  level2(player, tile) {
    console.log("level2 function");
    let playerPos = {}
    playerPos.x = 486
    playerPos.y = 103
    this.scene.start("level2", { playerPos: playerPos })
  }
  level1(player, tile) {
    console.log("level1 function");
    let playerPos = {}
    playerPos.x = 486
    playerPos.y = 834
    this.scene.start("level1", { playerPos: playerPos })
  }
  //function hitcat
  hitcat(player, cat) {
  }
  collectCheese(player, cheese) {
    cheese.disableBody(true, true);
    window.cheese++
  }
} //////////// end of class world ////////////////////////
