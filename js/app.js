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
     this.collision();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function() {
  //if both player and bug in same x,y range
  // then reset

  if( (Math.abs(player.x - this.x) <=20)
    && (Math.abs(player.y - this.y) <= 30) ){
    gameOver = true;
    console.log('Enemny', this.x, this.y)
    console.log('Player', player.x, player.y)

  }
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
    case 'up' : if (this.y == 40){
                    _this = this;
                    this.y -= 90;
                    setTimeout(function(){
                      //to cut out the floating head when reached water
                      ctx.clearRect(0, 0, 505, 100);
                        _this.reset();
                      }, 200);
                    }
                else this.y -= 90; break;
    case 'down': if (this.y == 400) break;
                else this.y += 90; break;
    case 'right' : if (this.x == 400) break;
                  else this.x += 100; break;
    case 'left' : if(this.x == 0) break;
                  else this.x -=100; break;
  }


}
//if player reaches water reset maintain scores
//if player collision reset, scores 0.
Player.prototype.reset = function() {
    console.log('reseting player');
    this.x = 200;
    this.y = 400;

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//set gameover state to false for initially

var gameOver = false;
//start off with 4 bugs
var bug1 = new Enemy(30, 130, 100);
var bug2 = new Enemy(50, 130, 300);
var bug3 = new Enemy(30, 210, 50);
var bug4 = new Enemy(20, 300, 500);

var allEnemies = [bug1, bug2, bug3, bug4];


window.setInterval(function(){
  for (var i=0; i<2; i++) {
    var startx = Math.floor(Math.random()*99) + 1;
    startx *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var starty = Math.floor(Math.random()*90) + 1;
    console.log()
    var speedbug = Math.random();
     speedbug *= Math.floor(Math.random()*2) == 1 ? 500 : 1000;
      allEnemies.push(new Enemy(startx, starty, speedbug));

  }
  //if there are more than 20 bugs then drop first 20.
  if (allEnemies.length > 20) allEnemies.splice(0,20)
  return allEnemies;
}, 3000);

var player = new Player(200, 400);




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
var buttonReset = document.createElement('button');
buttonReset.innerHTML = 'click to reset';
document.body.appendChild(buttonReset);
