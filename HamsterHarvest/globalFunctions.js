////////////////////////////////////////////////////////
//
// access this function using updateInventory.call(this)
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function updateInventory() {
    console.log("*** updateInventory()")
    // Emit events showInventory
    this.inventory = {}
    this.inventory.heart = window.heart
    this.inventory.cheese = window.cheese
    this.inventory.lettuce = window.lettuce
    this.inventory.apple = window.apple
    this.inventory.carrot = window.carrot
    this.inventory.corn = window.corn
    this.inventory.brocolli = window.brocolli
    this.inventory.beans = window.beans

    console.log('*** updateInventory() Emit event', this.inventory)
    this.invEvent = (event, data) => {
        this.scene.get('showInventory').events.emit(event, data);
    }
    this.invEvent("inventory", this.inventory);
}

////////////////////////////////////////////////////////
//
// access this function with globalHitFire
// Uses a JS function to prevent repeated codes
// 
///////////////////////////////////////////////////////
function globalHitFire(player, item) {
    console.log("*** player overlap fire");

    // Shake screen
    this.cameras.main.shake(100);
    //this.hitenemySnd.play();

    // deduct heart
    window.heart--;
    item.disableBody(true, true);

    // Call globalFunctions.js updateInventory
    updateInventory.call(this)

    if (window.heart == 0) {
        console.log("*** player gameOver");
        this.scene.start("gameover");
        //this.loselifeSnd.play();
    }
}

////////////////////////////////////////////////////////
//
// access this function with globalCollectKey
// Uses a JS function to prevent repeated codes
// 
/////////////////////////////////////////////////////// 
function globalCollectKey(player, item) {
    console.log("*** player overlap key");

    // Shake screen
    this.cameras.main.shake(100);

    //this.hitenemySnd.play();

    // increase key count
    window.key++;
    item.disableBody(true, true);
    updateInventory.call(this)
}

function globalCollectLettuce(player, item) {
    console.log("collect lettuce");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.lettuce = 1

    // disable enemy body
    item.disableBody(true, true);

    updateInventory.call(this)
  }

  function globalCollectCheese(player, item) {
    console.log("collect cheese");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.cheese = 1

    // disable enemy body
    item.disableBody(true, true);

    updateInventory.call(this)
  }

  function globalCollectApple(player, item) {
    console.log("collect apple");

    // play a sound
    //this.hitSnd.play();

    // shake screen
    this.cameras.main.shake(300);

    window.apple = 1

    // disable enemy body
    item.disableBody(true, true);

    updateInventory.call(this)
  }
  function globalCollectCarrot(player, item){
    console.log("collect carrot");
    
    // play a sound
    //this.hitSnd.play();
  
    // shake screen
    this.cameras.main.shake(300);    

    window.carrot = 1
  
    // disable enemy body
    item.disableBody (true, true);

    updateInventory.call(this)
  }
  function globalCollectCorn(player, item){
    console.log("collect corn");
    
    // play a sound
    //this.hitSnd.play();
  
    // shake screen
    this.cameras.main.shake(300);    

    window.corn = 1
  
    // disable enemy body
    item.disableBody (true, true);

    updateInventory.call(this)
  }
  function globalCollectBrocolli(player, item){
    console.log("collect brocolli");
    
    // play a sound
    //this.hitSnd.play();
  
    // shake screen
    this.cameras.main.shake(300);    

    window.brocolli = 1
  
    // disable enemy body
    item.disableBody (true, true);

    updateInventory.call(this)
  }
  function globalCollectBeans(player, item){
    console.log("collect beans");
    
    // play a sound
    //this.hitSnd.play();
  
    // shake screen
    this.cameras.main.shake(300);    

    window.beans = 1

    // disable enemy body
    item.disableBody (true, true);

    updateInventory.call(this)
  }
