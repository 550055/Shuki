var enemy = {
  x: 100,
  y: 0,
  width: 30,
  height: 40,
  backgroundColor: '#26F',
  speed: 3,
  jumpForce: null,
  maxJumpForce: 7,
  score: 0,
  direction: 'right',
  checkCollision: function() {
    var i, collisionSide, hasCollisionBottom = false;
    for (i = 0; i < game.elements.length; i++) {
      collisionSide = collision.boxesSide(enemy, game.elements[i]);
      if(collisionSide) {
        if(game.elements[i].class === 'fruit') {
          continue;
        }
        if(collisionSide === 'left' && this.direction == 'left') {
          this.direction = 'right';
        } else if(collisionSide === 'right' && this.direction == 'right') {
          this.direction = 'left';
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
    if(this.direction == 'left') {
      this.x -= this.speed;
    } else if(this.direction == 'right') {
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
    if(this.jumpForce === null && Math.random() < 0.01) {
      this.jumpForce = this.maxJumpForce;
    }
  },
  fixNumbers: function() {
    if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
    if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
    if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
  },
  init: function() {
    this.y = wall.list['i1'].y - this.height;
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
