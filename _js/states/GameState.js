'use strict';
import Spotlight from '../objects/Spotlight';
import Target from '../objects/Target';
import Lane from '../objects/Lane';

class GameState extends Phaser.State {

  create() {
    this.points = {
      'x': [87, 179.5, 446.5],
      'y': [78, 367, 173]
    };
    this.path = [];
    this.mode = 1;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.bg = this.add.sprite(0, 0, 'bg');
    this.bg.scale.setTo(0.5, 0.5);
    this.add.existing(new Spotlight(this.game, this.game.width, 530, -30, Spotlight.LEFT));
    this.add.existing(new Spotlight(this.game, this.game.width, 530, -10, Spotlight.LEFT));
    this.add.existing(new Spotlight(this.game, 0, 530, -30, Spotlight.RIGHT));
    this.add.existing(new Spotlight(this.game, 0, 530, -10, Spotlight.RIGHT));



    let lane = new Lane(this.game, 100, 80);
    this.add.existing(lane);

    let target = new Target(this.game, 100, 100);
    this.add.existing(target);

    // let mask = new Phaser.Sprite(0, 0, 'lane-mask');
    // console.log(mask);
    // this.add.existing(mask);





    this.graphics = this.add.graphics(0, 0);
    this.graphics.moveTo(this.points.x[0], this.points.y[0]);
    this.graphics.lineStyle(15, 0xffd900);
    //this.graphics.bezierCurveTo(this.points.x[0], this.points.y[0], this.points.x[1], this.points.y[1], this.points.x[2], this.points.y[2]);


    //Metrum Shadow
    this.metrumShadow = this.add.graphics(this.game.width/2 - 5, 650);
    this.metrumShadow.beginFill(0x000000, 0.2);
    this.metrumShadow.drawEllipse(0, 0, 80, 20);

    //Metrum, the star himself
    this.metrum = this.add.sprite(0, 0, 'metrum');
    this.metrum.x = this.game.width/2;
    this.metrum.y = this.game.height/2;
    this.metrum.anchor.set(0.5);
    this.metrum.scale.setTo(0.4, 0.4);

    //this.metrumtween = this.add.tween(this.metrum).to({x: 446.5, y: 173}, 2000, Phaser.Easing.Linear.None, true, -1, false);

    this.input.onDown.add(this.onDown, this);
    this.input.onUp.add(this.onUp, this);

    this.fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fullScreenButton.onDown.add(this.fullscreen, this);


  }

  fullscreen() {
    console.log('fullscreen');
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen(false);
    }
  }

  onDown() {
    this.game.socket.emit('buttonDown');
  }

  onUp() {
    this.game.socket.emit('buttonUp');
  }




  update() {


  }


  preload() {
    this.load.image('metrum', 'assets/metrum.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('lane-mask', 'assets/lane-mask.png');
  }

  render() {
        //this.game.debug.spriteBounds(this.metrum);
  }



}

export default GameState;
