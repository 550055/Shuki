var player = {
  x: 100,
  y: 0,
  width: 30,
  height: 40,
  backgroundColor: '#0C0',
  speed: 3,
  jumpForce: null,
  maxJumpForce: 6,
  score: 0,
  checkCollision: function() {
    var i, collisionSide, hasCollisionBottom = false;
    for (i = 0; i < game.elements.length; i++) {
      collisionSide = collision.boxesSide(player, game.elements[i]);
      if(collisionSide) {
        if(collisionSide === 'left' && keyboard.left) {
          this.x += this.speed;
        } else if(collisionSide === 'right' && keyboard.right) {
          this.x -= this.speed;
        } else if(collisionSide === 'top') {
          if(this.jumpForce >= 0) {
            this.jumpForce = -0.2;
          }
        } else if(collisionSide === 'bottom') {
          this.jumpForce = null;
          this.y = game.elements[i].y - this.height;
          hasCollisionBottom = true;
        }
      }
    }
    if(!hasCollisionBottom && this.jumpForce === null) {
      this.jumpForce = -0.2;
    }
  },
  move: function() {
    if(keyboard.left) {
      this.x -= this.speed;
    } else if(keyboard.right) {
      this.x += this.speed;
    }
    if(typeof this.jumpForce === 'number'){
      if(this.jumpForce >= - this.maxJumpForce){
        this.y -= this.jumpForce;
        this.jumpForce -= 0.2;
      } else{
        this.jumpForce = null;
      }
    }
  },
  checkJump: function() {
    if(keyboard.up && this.jumpForce === null){
      this.jumpForce = this.maxJumpForce;
    }
  },
  fixNumbers: function(){
    if(typeof this.x === 'number') this.x = Math.round(this.x * 100) / 100;
    if(typeof this.y === 'number') this.y = Math.round(this.y * 100) / 100;
    if(typeof this.jumpForce === 'number') this.jumpForce = Math.round(this.jumpForce * 100) / 100;
  },
  update: function() {
    this.fixNumbers();
    this.checkJump();
    this.move();
    this.checkCollision();
  },
  init: function() {
    this.y = wall.list['bottom'].y - this.height;
  },
  render: function() {
    game.context.fillStyle = this.backgroundColor;
    game.context.fillRect(this.x, this.y, this.width, this.height);
  }
};
