class instructions extends Phaser.Scene {
    constructor() {
        super({ key: "instructions" });
    }

    preload() {
        this.load.image("introIMG", "assets/intro.png");

    }

    create() {

        this.scene.bringToTop("instructions");

        const image = this.add.image(400, 400, 'introIMG');

        console.log("instructions");

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function () {
            console.log("spacebar pressed");
            let playerPos = {}
            playerPos.x = 289
            playerPos.y = 187
            this.scene.start("level1", { playerPos: playerPos })
        },
            this
        );


    }

}
