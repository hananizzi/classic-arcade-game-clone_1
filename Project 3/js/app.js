'use strict';

var Enemy = function() {
    this.X = [-50, 508];
    this.Y = [60, 140, 220];
    this.EnemySpeed = [900, 3000, 9000];

    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.RandomYAxis = function() {
        return this.Y[Math.floor(Math.random() * this.Y.length)];
    };
    
Enemy.prototype.Speed = function() {
    return Math.floor(Math.random() * (1000));
};

Enemy.prototype.reset = function() {
    var start = this.X[0]; 
    this.x = start; 
    this.y = this.RandomYAxis();
    this.speed = this.Speed();
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Enemy.prototype.update = function(dt) {
        var maxPos = this.X[1];
        this.x += this.speed * dt; 

        if (this.x > maxPos) { 
            this.reset();
        }
    };

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function() {
    this.Images = [
    'images/char-princess-girl.png',
    'images/char-boy.png'
    ];
    this.sprite = this.Images[Math.floor(Math.random() * 2)];
    this.X = [-45, 402];
    this.PlayerYAxis = [-20, 380];
    this.reset();
};


// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 300;
};

Player.prototype.update = function() {
    this.gameOver();
};

//Draws the player onto the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= (this.x - 100 < this.X[0]) ? 0 : 100;
    } else if (key === 'right') {
        this.x += (this.x + 100 > this.X[1]) ? 0 : 100;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.PlayerYAxis[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.PlayerYAxis[1]) ? 0 : 80;
    }
};

Player.prototype.gameOver = function() {
    if (this.y == -20) {
        alert('HOORAY!!');
        this.reset();
    } else if (this.y >= 60 && this.y <= 220) {
        var player = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y == player.y) {
                if (enemy.x >= player.x - 30 && enemy.x <= player.x + 40) {
                    alert('GAME OVER');
                    player.reset();
                }
            }
        });
    }
};


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


//Variables for enemies and player
var one = new Enemy();
var two = new Enemy();
var three = new Enemy();
var allEnemies = [one, two, three];
var player = new Player();
