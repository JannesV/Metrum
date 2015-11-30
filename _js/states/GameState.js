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




    //this.add.existing(lane);

    // let mask = new Phaser.Sprite(0, 0, 'lane-mask');
    // console.log(mask);
    // this.add.existing(mask);


    this.graphics = this.add.graphics(0, 0);
    this.graphics.moveTo(this.points.x[0], this.points.y[0]);
    this.graphics.lineStyle(15, 0xffd900);
    //this.graphics.bezierCurveTo(this.points.x[0], this.points.y[0], this.points.x[1], this.points.y[1], this.points.x[2], this.points.y[2]);

    //Metrum Shadow
    this.metrumShadow = this.add.graphics(this.game.width/2 - 5, 720);
    this.metrumShadow.beginFill(0x000000, 0.2);
    this.metrumShadow.drawEllipse(0, 0, 80, 20);

    let centerVert = this.game.height/2;
    let centerHorz = this.game.width/2;

    this.metrum = this.game.add.group();
    this.metrum.x = centerHorz;
    this.metrum.y = centerVert + 150;

    //Metrum, the star himself
    this.torso = this.add.sprite(0, 0, 'torso');
    this.torso.anchor.set(0.5);
    this.torso.scale.setTo(0.4, 0.4);
    this.metrum.add(this.torso);

    this.leftLeg = this.add.sprite(this.torso.x - 40, this.torso.y + 60, 'left-leg');
    this.leftLeg.scale.setTo(0.4,0.4);
    this.leftLeg.anchor.x = 0.4;
    this.leftLeg.anchor.y = 0.1;
    this.metrum.add(this.leftLeg);

    this.rightLeg = this.add.sprite(this.torso.x + 30, this.torso.y + 60, 'right-leg');
    this.rightLeg.scale.setTo(0.4,0.4);
    this.rightLeg.anchor.x = 0.4;
    this.rightLeg.anchor.y = 0.1;
    this.metrum.add(this.rightLeg);

    this.leftArm = this.add.sprite(-35, -15, 'left-arm');
    this.leftArm.scale.setTo(0.4,0.4);
    this.leftArmGroup = this.game.add.group(this.metrum);
    this.leftArmGroup.x = -70;
    this.leftArmGroup.y = -40;
    this.leftArmGroup.angle = 0;
    this.leftArmTarget = new Target(this.game, -14, 108);
    this.leftArmGroup.add(this.leftArm);
    this.leftArmGroup.add(this.leftArmTarget);
    this.metrum.add(this.leftArmGroup);
    this.metrum.sendToBack(this.leftArmGroup);

    this.rightArm = this.add.sprite(-8, -20, 'right-arm');
    this.rightArm.scale.setTo(0.4,0.4);
    this.rightArmGroup = this.game.add.group(this.metrum);
    this.rightArmGroup.x = 70;
    this.rightArmGroup.y = -40;
    this.rightArmTarget = new Target(this.game, 12, 99);
    this.rightArmGroup.add(this.rightArm);
    this.rightArmGroup.add(this.rightArmTarget);
    this.metrum.add(this.rightArmGroup);
    this.metrum.sendToBack(this.rightArmGroup);

    this.head = this.add.sprite(this.torso.x, this.torso.y - 75, 'head');
    this.head.scale.setTo(0.4,0.4);
    this.head.anchor.x = 0.5;
    this.head.anchor.y = 0.95;
    this.metrum.add(this.head);
    this.metrum.sendToBack(this.head);


    this.lane = new Lane(this.game, -600, -100, this.leftArmTarget);
    this.lane.alpha = 0.3;
    this.metrum.add(this.lane);
    this.metrum.sendToBack(this.lane);



    this.metrumtween = this.add.tween(this.leftArmGroup).to({angle: 30}, 500, Phaser.Easing.Linear.None, true, -1, false, true);

    // this.input.onDown.add(this.onDown, this);
    // this.input.onUp.add(this.onUp, this);


    this.fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.fullScreenButton.onDown.add(this.fullscreen, this);


    this.game.socket.on('leftHandDown', () => {

      console.log(this.head.worldPosition);
      this.leftArmTarget.down()
    });

    this.game.socket.on('leftHandUp', () => {
      this.metrum.angle = 0;
      console.log(this.head.worldPosition);
      this.leftArmTarget.up();
    });


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
    this.load.image('left-arm', 'assets/left-arm.png');
    this.load.image('left-leg', 'assets/left-leg.png');
    this.load.image('right-leg', 'assets/right-leg.png');
    this.load.image('right-arm', 'assets/right-arm.png');
    this.load.image('head', 'assets/head.png');
    this.load.image('torso', 'assets/torso.png');
    this.load.image('bg', 'assets/bg.png');
    this.load.image('lane-mask', 'assets/lane-mask.png');
  }

  render() {
        //this.game.debug.spriteCoords(this.leftArm);
        // this.game.debug.spriteBounds(this.leftLeg);

  }



}

export default GameState;
