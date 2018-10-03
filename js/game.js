var game = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  backgroundColor: '#333',
  context: null,
  state: null,
  lastStateChange: 30,
  elements: [],
  start: function(canvas) {
    this.x = canvas.x;
    this.y = canvas.y;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.context;
    this.state = gameStatesEnum.playing;
    wall.create('top', 0, -980, this.width, 1000);
    wall.create('bottom', 0, this.height-20, this.width, 1000);
    wall.create('left', -980, 0, 1000, this.height);
    wall.create('right', this.width-20, 0, 1000, this.height);
    wall.create('i1', this.width*0.4, this.height*0.2, this.width*0.2, this.height*0.02);
    wall.create('i2', this.width*0.2, this.height*0.3, this.width*0.2, this.height*0.02);
    wall.create('i3', this.width*0.6, this.height*0.3, this.width*0.2, this.height*0.02);
    wall.create('i4', this.width*0.7, this.height*0.5, this.width*0.3, this.height*0.04);
    wall.create('i5', this.width*0.0, this.height*0.5, this.width*0.3, this.height*0.04);
    wall.create('i6', this.width*0.4, this.height*0.7, this.width*0.2, this.height*0.04);
    wall.create('i7', this.width*0.0, this.height*0.8, this.width*0.3, this.height*0.04);
    wall.create('i8', this.width*0.7, this.height*0.8, this.width*0.3, this.height*0.04);
    for (var key in wall.list) {
        if (wall.list.hasOwnProperty(key)) {
          this.elements.push(wall.list[key]);
        }
      }
      this.elements.push(player);
      this.elements.push(enemy); //sta mierda pa enemigo bv ak tene k agrega
      //hago update de todos los objetos del juego
      for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].init();
      }
      setInterval(this.update.bind(this), 1000/60);
    },
    pause: function() {
      if(this.state === gameStatesEnum.pause) {
        this.state = gameStatesEnum.playing;
      } else if(this.state === gameStatesEnum.playing) {
        this.state = gameStatesEnum.pause;
      }
      this.lastStateChange = 0;
    },
    win: function() {},
    over: function() {
      this.state = gameStatesEnum.over;
    },
    update: function() {
      ++this.lastStateChange;
      if(this.state === gameStatesEnum.playing) {
        //hago update de todos los objetos del juego
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].update();
        }
      }
      if(keyboard.p && this.lastStateChange > 30) {
        this.pause();
      }
      //llamo al render global
      this.render();
    },
    render: function() {
      if(this.state === gameStatesEnum.playing) {
        //limpio la pantalla
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        //llamo a render de todos los objetos del juego
        for (var i = 0; i < this.elements.length; i++) {
          this.elements[i].render();
        }
      } else {
        this.context.fillStyle = 'rgba(50, 50, 50, 0.01)';
        this.context.fillRect(this.x, this.y, this.width, this.height);
        switch(this.state) {
          case gameStatesEnum.pause:
            text.draw('Pausa', '#fff');
            break;
          case gameStatesEnum.over:
            text.draw('Game Over', '#fff');
            break;
        }
      }
    }
  };

  var gameStatesEnum = {
    playing: 'playing',
    pause: 'pause',
    win: 'w',
    over: 'o'
  };
