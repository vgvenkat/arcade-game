// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //this.location = ;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log(dt);
     this.x = this.x +this.speed* dt ;
     //this.y = this.y * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function() {

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
}
Player.prototype.update = function(dt) {
  // console.log(x,y);
  // this.x += x;
  // this.y += y;
  //if y == -50 then reset
  //  this.x = this.x +this.x* dt ;
  //  this.y = this.y +this.y* dt ;
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
  //setup row and column sizes
  //6 rows
  //5 columns
  //all centered
  // x 1 - 0, 100, 200, 300, 400 change by 100
  //y - -50, 40, 130, 220, 310, 400 change by 90


  switch(direction) {
    case 'up' : if (this.y < 0) break;
                else this.y -= 90; break;
    case 'down': if (this.y == 400) break;
                else this.y += 90; break;
    case 'right' : if (this.x == 400) break;
                  else this.x += 100; break;
    case 'left' : if(this.x == 0) break;
                  else this.x -=100; break;
  }


}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(30, 130, 100);
var bug2 = new Enemy(50, 210, 300);
var bug3 = new Enemy(30, 60, 50);
var bug4 = new Enemy(20, 130, 500);

var player = new Player(200, 400);

var allEnemies = [bug1, bug2, bug3, bug4];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
