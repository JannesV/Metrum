'use strict';
let paper = require('paper');
let _ = require('lodash');

import Target from './objects/Target.js';
import ProgressBar from './objects/ProgressBar.js';

class Game {

  constructor( socket) {
    this.socket = socket;
    this.metrumY = 500;
    this.holdProgress = 0;
    this.nextBall = 0;
    this.score = 0;
    this.started = false;
    this.gameLength = 90;
    this.balls = [];
    this.LEFT_HAND = 'leftHand';
    this.RIHGT_HAND = 'rightHand';
    this.LEFT_FOOT = 'leftFoot';
    this.RIGHT_FOOT = 'rightFoot';
    this.HEAD = 'head';
    this.bleep = new Audio('./assets/bleep.mp3');
    this.error = new Audio('./assets/error.mp3');
    this.lanes = [this.LEFT_HAND, this.RIHGT_HAND, this.LEFT_FOOT, this.RIGHT_FOOT, this.HEAD];
    this.targets = [
    {x: paper.view.center.x - 177, y: this.metrumY + 34},
    {x: paper.view.center.x + 177, y: this.metrumY + 34},
    {x: paper.view.center.x - 92, y: this.metrumY + 208},
    {x: paper.view.center.x + 92, y: this.metrumY + 208},
    {x: paper.view.center.x, y: this.metrumY - 423}];

    this.starts = [{x: -40, y: 400}, {x: 1064, y: 400}, {x: -40, y: this.metrumY + 208}, {x: 1064, y: this.metrumY + 208}, {x: 1064, y: this.metrumY - 423}];



    // ****************************** Intro Setup *******************************
    this.introSetup();
    this.gameSetup();
    this.finalSetup();
    this.controlsLayer = new Layer();
    this.setupControls();
    this.gameLayer.visible = false;
    this.socketSetup();

    createjs.Ticker.setFPS( 60 );

    createjs.Ticker.addEventListener( 'tick', this.update );

    paper.view.onFrame = (e) => {
      this.onFrame(e);
    };
  }

  onFrame(e) {
    if (this.started === true && this.gameLength - (Math.floor(e.time)-this.timerOffset) <= 0) {
      console.log('DONE');
      this.started = false;
      this.timer.content = `${this.gameLength - (Math.floor(e.time)-this.timerOffset)}s`;

      this.gameLayer.visible = false;
      this.finalLayer.visible = true;
      this.setupControls();

      console.log(this.button);
      paper.view.draw();
    }


    if (this.started === false) {
      this.timerOffset = Math.floor(e.time);
    } else {
      this.timer.content = `${this.gameLength - (Math.floor(e.time)-this.timerOffset)}s`;
    }

    if (e.time > this.nextBall && this.started === true) {
      this.nextBall = e.time + Math.random() * 1.5 + 1;
      this.launchBall();
    }
  }

  setupControls() {
    this.holdProgress = 0;
    this.controlsLayer.activate();
    this.button = new Path.Circle(new Point(850, 200), 70);
    this.button.fillColor = '#26b29a';

    this.buttonText = new PointText(new Point(850, 195));
    this.buttonText.fillColor = 'white';
    this.buttonText.content = 'HOUD INGEDRUKT\nOM TE STARTEN';
    this.buttonText.fontFamily = 'Dense-Regular';
    this.buttonText.fontSize = 25;
    this.buttonText.justification = 'center';

    this.progress = new Path.Circle(new Point(850, 200), 80);
    this.progress.strokeWidth = 0;
    this.progress.strokeColor = '#1a8570';
  }

  socketSetup() {
    this.socket.on('leftHandDown', () => {
      createjs.Tween.get(this.leftArm, {override: true}).to({rotation: 40}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
      this.checkHandHit(this.LEFT_HAND);
    });

    this.socket.on('rightHandDown', () => {
      createjs.Tween.get(this.rightArm, {override: true}).to({rotation: -40}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
      this.checkHandHit(this.RIHGT_HAND);
    });

    this.socket.on('leftFootDown', () => {
      createjs.Tween.get(this.leftLeg, {override: true}).to({rotation: 20}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
      this.checkHandHit(this.LEFT_FOOT);
    });

    this.socket.on('rightFootDown', () => {
      createjs.Tween.get(this.rightLeg, {override: true}).to({rotation: -20}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
      this.checkHandHit(this.RIGHT_FOOT);
    });

    this.socket.on('headDown', () => {
      this.checkHandHit(this.HEAD);
    });

    this.socket.on('startHold', () => {
      if (this.holdProgress === 4 && this.started === false) {
        console.log('derp');
        this.started = true;
        this.introLayer.visible = false;
        this.finalLayer.visible = false;
        this.gameLayer.visible = true;
        createjs.Tween.get(this.progress, {override: true}).to({strokeWidth: 0}, 250, createjs.Ease.easeOut);
        createjs.Tween.get(this.button.scaling, {override: true}).to({x: 0, y: 0}, 250, createjs.Ease.easeOut);
        createjs.Tween.get(this.buttonText, {override: true}).to({opacity: 0}, 150, createjs.Ease.easeOut);

      } else if (this.holdProgress < 4) {
        this.holdProgress++;
        this.progressUpdate();
      }
    });

    this.socket.on('startUp', () => {
      if (this.holdProgress !== 4) {
        this.holdProgress = 0;
        this.progressUpdate();
      }
    });
  }

  progressUpdate() {
    createjs.Tween.get(this.progress, {override: true}).to({strokeWidth: this.holdProgress * 5}, 250, createjs.Ease.easeOut);
  }

  checkHandHit(targetName) {
    console.log('checkhit');
    let hit = false;

    this.balls.forEach((ball) => {
      if (ball.over === true && ball.targetName === targetName) {
        hit = true;
        ball.hit();
        this.socket.emit('hit');
        this.bleep.currentTime = 0;
        this.bleep.play();
        this.score += 1;
        this.progressBar.setProgress(this.score * 2);
      }
    });

    if (hit === false) {
      this.socket.emit('miss');
      this.error.currentTime = 0;
      this.error.play();
    }

  }

  launchBall() {
    console.log('launchball');
    let rnd = Math.floor(Math.random() * 5);
    let pos = this.targets[rnd];
    let start = this.starts[rnd];

    console.log(pos, start);


    let ball = new Target(start.x, start.y, pos.x, pos.y, this.lanes[rnd], this.socket);
    ball.on('kill', () => {
      _.pull(this.balls, ball);
      ball = null;

    });
    this.balls.push(ball);
    ball.insertAbove(this.leftHandLane);
    ball.startMoving();
  }

  update() {
    paper.view.draw();
  }

  introSetup() {
    console.log('introSetup');
    this.introLayer = project.activeLayer;

    let bg = new Path();
    bg.importSVG(document.getElementById('intro'));

  }

  finalSetup() {
    console.log('finalSetup');
    this.finalLayer = new Layer();

    let bg = new Path();
    bg.importSVG(document.getElementById('final'));
    this.finalLayer.visible = false;
  }

  gameSetup() {
    console.log('gameSetup');
    this.gameLayer = new Layer();
    this.bg = project.importSVG(document.getElementById('bg'));

    this.head = project.importSVG(document.getElementById('head'));
    this.rightArm = project.importSVG(document.getElementById('arm'));
    this.leftArm = this.rightArm.clone();
    this.leftArm.scale(-1, 1);
    this.torso = project.importSVG(document.getElementById('torso'));

    this.rightLeg = project.importSVG(document.getElementById('leg'));
    this.leftLeg = this.rightLeg.clone();
    this.leftLeg.scale(-1, 1);

    this.leftHandLane = project.importSVG(document.getElementById('target-lane'));
    this.rightHandLane = this.leftHandLane.clone();
    this.leftFootLane = this.leftHandLane.clone();
    this.rightFootLane = this.leftHandLane.clone();
    this.headLane = this.leftHandLane.clone();

    this.head.position = new Point(paper.view.center.x, this.metrumY - 260);
    this.torso.position = new Point(paper.view.center.x, this.metrumY);

    this.leftLeg.position = new Point(paper.view.center.x - 40, this.metrumY + 150);
    this.leftLeg.pivot = new Point(paper.view.center.x - 40, this.metrumY + 75);

    this.rightLeg.position = new Point(paper.view.center.x + 40, this.metrumY + 150);
    this.rightLeg.pivot = new Point(paper.view.center.x + 40, this.metrumY + 75);

    this.leftArm.position = new Point(paper.view.center.x - 105, this.metrumY + 30);
    this.leftArm.pivot = new Point(paper.view.center.x - 80, this.metrumY - 50);

    this.rightArm.position = new Point(paper.view.center.x + 105, this.metrumY + 30);
    this.rightArm.pivot = new Point(paper.view.center.x + 80, this.metrumY - 50);

    this.leftHandLane.position = new Point(paper.view.center.x + 214, this.metrumY + 34);
    this.leftHandLane.pivot = new Point(paper.view.center.x - 177, this.metrumY + 34);
    this.leftHandLane.rotation = 200;
    this.leftHandLane.opacity = 0.7;
    this.leftHandLane.insertAbove(this.bg);

    this.rightHandLane.position = new Point(paper.view.center.x + 570, this.metrumY + 34);
    this.rightHandLane.pivot = new Point(paper.view.center.x + 177, this.metrumY + 34);
    this.rightHandLane.rotation = -20;
    this.rightHandLane.opacity = 0.7;
    this.rightHandLane.insertAbove(this.bg);

    this.leftFootLane.position = new Point(paper.view.center.x + 300, this.metrumY + 208);
    this.leftFootLane.pivot = new Point(paper.view.center.x -92, this.metrumY + 208);
    this.leftFootLane.rotation = 180;
    this.leftFootLane.opacity = 0.7;
    this.leftFootLane.insertAbove(this.bg);

    this.rightFootLane.position = new Point(paper.view.center.x + 485, this.metrumY + 208);
    this.rightFootLane.pivot = new Point(paper.view.center.x + 92, this.metrumY + 208);
    this.rightFootLane.rotation = 0;
    this.rightFootLane.opacity = 0.7;
    this.rightFootLane.insertAbove(this.bg);

    this.headLane.position = new Point(paper.view.center.x + 394, this.metrumY - 423);
    this.headLane.pivot = new Point(paper.view.center.x, this.metrumY - 423);
    this.headLane.rotation = 0;
    this.headLane.opacity = 0.7;
    this.headLane.insertAbove(this.bg);

    this.timer = new PointText(new Point(120, 80));
    this.timer.fillColor = '#fcd381';
    this.timer.content = '60s';
    this.timer.fontFamily = 'Dense-Regular';
    this.timer.fontSize = 60;

    this.progressBar = new ProgressBar(40, 40);
  }
}

export default Game;


