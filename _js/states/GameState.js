'use strict';
import Spotlight from '../objects/Spotlight';
import Target from '../objects/Target';
import Lane from '../objects/Lane';

let _ = require('lodash');

class GameState extends Phaser.State {

  create() {
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // ***************************** Scene setup ******************************

    this.bg = this.add.sprite(0, 0, 'bg');
    this.bg.scale.setTo(0.5, 0.5);
    this.add.existing(new Spotlight(this.game, this.game.width, 530, -30, Spotlight.LEFT));
    this.add.existing(new Spotlight(this.game, this.game.width, 530, -10, Spotlight.LEFT));
    this.add.existing(new Spotlight(this.game, 0, 530, -30, Spotlight.RIGHT));
    this.add.existing(new Spotlight(this.game, 0, 530, -10, Spotlight.RIGHT));

    this.leftArmTargets = [];
    this.rightArmTargets = [];
    this.targets = [this.leftArmTargets, this.rightArmTargets];
    this.ballTimeMin = 1500;
    this.ballTimeMax = 2500;
    this.nextEvent = 2000;

    // **************************** Metrum Shadow *****************************

    this.metrumShadow = this.add.graphics(this.game.width/2 - 5, 720);
    this.metrumShadow.beginFill(0x000000, 0.2);
    this.metrumShadow.drawEllipse(0, 0, 80, 20);

    // ************************** Main Metrum Group ***************************

    this.metrum = this.game.add.group();
    this.metrum.x = this.game.width/2;
    this.metrum.y = this.game.height/2 + 150;

    // ******************************** Torso *********************************

    this.torso = this.add.sprite(0, 0, 'torso');
    this.torso.anchor.set(0.5);
    this.torso.scale.setTo(0.4, 0.4);
    this.metrum.add(this.torso);

    // ******************************* Left Leg *******************************

    this.leftLeg = this.add.sprite(this.torso.x - 40, this.torso.y + 60, 'left-leg');
    this.leftLeg.scale.setTo(0.4, 0.4);
    this.leftLeg.anchor.x = 0.4;
    this.leftLeg.anchor.y = 0.1;
    this.metrum.add(this.leftLeg);

    // ****************************** Right Leg *******************************

    this.rightLeg = this.add.sprite(this.torso.x + 30, this.torso.y + 60, 'right-leg');
    this.rightLeg.scale.setTo(0.4, 0.4);
    this.rightLeg.anchor.x = 0.4;
    this.rightLeg.anchor.y = 0.1;
    this.metrum.add(this.rightLeg);

    // ******************************* Left Arm *******************************

    this.leftArm = this.add.sprite(-35, -15, 'left-arm');
    this.leftArm.scale.setTo(0.4, 0.4);
    this.leftArmGroup = this.game.add.group(this.metrum);
    this.leftArmGroup.x = -70;
    this.leftArmGroup.y = -40;
    this.leftArmGroup.angle = 0;
    this.leftArmTarget = new Target(this.game, -14, 108);
    this.leftArmGroup.add(this.leftArm);
    this.leftArmGroup.add(this.leftArmTarget);
    this.metrum.add(this.leftArmGroup);
    this.metrum.sendToBack(this.leftArmGroup);

    // ******************************* Left Arm *******************************

    this.rightArm = this.add.sprite(-8, -20, 'right-arm');
    this.rightArm.scale.setTo(0.4, 0.4);
    this.rightArmGroup = this.game.add.group(this.metrum);
    this.rightArmGroup.x = 70;
    this.rightArmGroup.y = -40;
    this.rightArmTarget = new Target(this.game, 12, 99);
    this.rightArmGroup.add(this.rightArm);
    this.rightArmGroup.add(this.rightArmTarget);
    this.metrum.add(this.rightArmGroup);
    this.metrum.sendToBack(this.rightArmGroup);

    // ********************************* Head *********************************

    this.head = this.add.sprite(this.torso.x, this.torso.y - 75, 'head');
    this.head.scale.setTo(0.4, 0.4);
    this.head.anchor.x = 0.5;
    this.head.anchor.y = 0.95;
    this.metrum.add(this.head);
    this.metrum.sendToBack(this.head);

    // ******************************** Lanes *********************************

    this.leftArmLane = new Lane(this.game, -13, 112, 'left', true, this.leftArmGroup);
    this.leftArmGroup.add(this.leftArmLane);

    this.rightArmLane = new Lane(this.game, 13, 95, 'right', true, this.leftArmGroup);
    this.rightArmGroup.add(this.rightArmLane);


    // let leftArmTimer = this.game.time.create(false);
    // leftArmTimer.loop(2000, this.addBall, this);
    // leftArmTimer.start();

    this.lanes = [this.leftArmLane, this.rightArmLane];


    // ******************************** Tweens ********************************

    this.leftArmTween = this.add.tween(this.leftArmGroup).to({angle: 30}, 1500, Phaser.Easing.Bounce.InOut, true, -1, false, true);
    this.rightArmTween = this.add.tween(this.rightArmGroup).to({angle: -30}, 1500, Phaser.Easing.Bounce.InOut, true, -1, false, true);

    // *************************** Input listeners ****************************

    this.input.onDown.add(this.onDown, this);
    this.input.onUp.add(this.onUp, this);



    // ************************* Socket.io Listeners **************************

    this.game.socket.on('leftHandDown', () => {
      this.checkHit(this.leftArmTarget, this.leftArmTargets);
    });

    this.game.socket.on('leftHandUp', () => {
      this.leftArmTarget.up();
    });

    this.game.socket.on('rightHandDown', () => {
      this.checkHit(this.rightArmTarget, this.rightArmTargets);
    });

    this.game.socket.on('rightHandUp', () => {
      this.rightArmTarget.up();
    });

  }

  addBall() {
    this.nextEvent = this.game.time.now + (this.game.rnd.realInRange(this.ballTimeMin, this.ballTimeMax));

    let rnd = this.game.rnd.integerInRange(0, 1);
    let lane = this.lanes[rnd];
    let targets = this.targets[rnd];

    let ball = new Target(this.game, -500, lane.y - 5);
    ball.down();
    let tween = this.add.tween(ball).to({x: lane.x}, 2500, Phaser.Easing.Linear.None, true, 1);
    tween.onComplete.add((target) => {
      target.poof().then(() => {
        _.pull(targets, target);
      });

    }, this);
    lane.add(ball);
    targets.push(ball);

    console.log(this.targets);

  }



  onDown() {
    this.game.socket.emit('buttonDown');
  }

  onUp() {
    this.game.socket.emit('buttonUp');
  }

  update() {
    this.checkOver(this.leftArmTarget, this.leftArmTargets, 'leftHandOver');
    this.checkOver(this.rightArmTarget, this.rightArmTargets, 'rightHandOver');

    if (this.game.time.now > this.nextEvent) {
      console.log('addball');
      this.addBall();
    }
  }

  checkOver(target, balls, emit) {
    let over = false;
    balls.forEach((ball) => {
      if (Phaser.Math.distance(target.worldPosition.x, target.worldPosition.y, ball.worldPosition.x, ball.worldPosition.y) <= 20) {
        over = true;
      }
    });

    if (over) {
      this.game.socket.emit(emit);
    }
  }

  checkHit(target, balls) {
    let hit = false;
    balls.forEach((ball) => {
      if (Phaser.Math.distance(target.worldPosition.x, target.worldPosition.y, ball.worldPosition.x, ball.worldPosition.y) <= 20) {
        hit = true;
        ball.hit();
      }
    });

    if (hit) {
      this.game.socket.emit('hit');
    } else {
      this.game.socket.emit('miss');
    }
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

    this.load.audio('audio', 'assets/audio.mp3');
  }

  render() {
        //this.game.debug.spriteCoords(this.leftArm);
        // this.game.debug.spriteBounds(this.leftLeg);

  }

}

export default GameState;
