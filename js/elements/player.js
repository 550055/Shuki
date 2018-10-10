var player = {
  x: 100,
  y: 0,
  width: 30,
  height: 40,
  backgroundColor: '#0C0',
  speed: 3,
  jumpForce: null,
  maxJumpForce: 7,
  score: 0,
  checkCollision: function() {
    var i, collisionSide, hasCollisionBottom = false;
    for (i = 0; i < game.elements.length; i++) {
      collisionSide = collision.boxesSide(player, game.elements[i]);
      if(collisionSide) {
        //game overs when the enemy hits the player from left or right
        if(game.elements[i] === enemys.list["enemy1"]) {
          game.over();
        }
        if(game.elements[i].class === 'fruit') {
          game.elements[i].die();
          this.score += 10;
          if(Object.keys(fruit.list).length) {
            continue;
          } else {
            return setTimeout(function() { game.win(); }, 50);
          }
        }
        if(collisionSide === 'left' && keyboard.left) {
          //revert left action
          this.x += this.speed;
        } else if(collisionSide === 'right' && keyboard.right) {
          //revert right action
          this.x -= this.speed;
        } else if(collisionSide === 'top') {
          //start fall down if needed
          if(this.jumpForce >= 0) {
            this.jumpForce = -0.2;
          }
        } else if(collisionSide === 'bottom') {
          //stop jump
          this.jumpForce = null;
          //fix this.y
          this.y = game.elements[i].y - this.height;
          hasCollisionBottom = true;
        }
      }
    }
    //if no collision bottom, restart falldown
    if(!hasCollisionBottom && this.jumpForce === null) {
      this.jumpForce = -0.2;
    }
  },
  move: function() {
    //move left and right
    if(keyboard.left) {
      this.x -= this.speed;
    } else if(keyboard.right) {
      this.x += this.speed;
    }
    //jump
    if(typeof this.jumpForce === 'number') {
      this.y -= this.jumpForce;
      if(this.jumpForce >= -this.maxJumpForce) {
        this.jumpForce -= 0.2;
      }
    }
  },
  checkJump: function() {
    if(keyboard.up && this.jumpForce === null) {
      this.jumpForce = this.maxJumpForce;
    }
  },
  fixNumbers: function() {
    if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
    if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
    if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
  },
  init: function() {
    this.y = wall.list['bottom'].y - this.height;
  },
  update: function() {
    this.fixNumbers();
    this.checkJump();
    this.move();
    this.checkCollision();
  },
  render: function() {
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
};
