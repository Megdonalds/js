class showInventory extends Phaser.Scene {

    constructor() {
        super({
            key: 'showInventory',
            active: false
        });
    }

    init(data) {
        this.player = data.player;
        this.inventory = data.inventory;
    }

    preload() {
        //Load heart image
        this.load.image('heart', 'assets/heart.png');

    }

    create() {

        //Place hearts at the top screen
        console.log("***showInventory");
        this.scene.bringToTop("showInventory");

        //black bar
        //var rect = new Phaser.Geom.Rectangle(29, 10, 300, 80);
        //var graphics = this.add.graphics({ fillStyle: { color: '0x555555' } });
        //graphics.fillRectShape(rect).setScrollFactor(0)
        this.add.image(167, 50, 'rectangle').setScale(3)
        this.add.image(690, 100, 'menu').setScale(1.5)
        //level1
        this.cheesecollection = this.add.sprite(650, 40, 'food').setScrollFactor(0).play("cheese").setScale(1.3);
        this.lettucecollection = this.add.sprite(715, 40, 'food').setScrollFactor(0).play("lettuce").setScale(1.3);
        this.cheeseNum = this.add.text(675, 35, window.cheese, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        this.lettuceNum = this.add.text(745, 35, window.lettuce, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        //level2
        this.applecollection = this.add.sprite(650, 80, 'food').setScrollFactor(0).play("apple").setScale(1.3);
        this.carrotcollection = this.add.sprite(715, 80, 'food').setScrollFactor(0).play("carrot").setScale(1.3);
        this.appleNum = this.add.text(675, 75, window.cheese, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        this.carrotNum = this.add.text(745, 75, window.lettuce, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        //level3
        this.corncollection = this.add.sprite(653, 115, 'food').setScrollFactor(0).play("corn").setScale(1.3);
        this.brocollicollection = this.add.sprite(715, 119, 'food').setScrollFactor(0).play("brocolli").setScale(1.2);
        this.beanscollection = this.add.sprite(653, 165, 'food').setScrollFactor(0).play("beans").setScale(1.2);
        this.cornNum = this.add.text(675, 115, window.cheese, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        this.brocolliNum = this.add.text(745, 115, window.lettuce, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);
        this.beansNum = this.add.text(675, 155, window.lettuce, { font: '15px Futura PT Medium', fill: '#ffffff' }).setScrollFactor(0);

        // Setup heart but visible to false
        this.heartimg1 = this.add.image(100, 43, 'heart').setScrollFactor(0).setVisible(false).setScale(0.3);
        this.heartimg2 = this.add.image(170, 43, 'heart').setScrollFactor(0).setVisible(false).setScale(0.3);
        this.heartimg3 = this.add.image(240, 43, 'heart').setScrollFactor(0).setVisible(false).setScale(0.3);

        //this.key = this.add.image (370, 50, 'key').setScrollFactor(0).setVisible(true);



        // Recv an event, call the method
        this.events.on('inventory', this.updateScreen, this)

        //Setup key

        this.keyNum = this.add.text(450, 23, window.key, { font: '50px Futura PT Medium', fill: '#272e66' }).setScrollFactor(0);

    } //end of create

    updateScreen(data) {
        console.log('Received event inventory', data);

        this.cheeseNum.setText(data.cheese);
        this.lettuceNum.setText(window.lettuce);
        this.appleNum.setText(window.apple);
        this.carrotNum.setText(window.carrot);
        this.cornNum.setText(window.corn);
        this.brocolliNum.setText(window.brocolli);
        this.beansNum.setText(window.beans);

        switch (data.heart) {

            case 3:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(true)
                break;

            case 2:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(true)
                this.heartimg3.setVisible(false)
                break;

            case 1:
                this.heartimg1.setVisible(true)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;

            case 0:
                this.heartimg1.setVisible(false)
                this.heartimg2.setVisible(false)
                this.heartimg3.setVisible(false)
                break;

            default:
                break;
        }

    }

} // end of class
