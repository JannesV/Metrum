'use strict';
let paper = require('paper');

import Target from './objects/Target.js';

class Game {

  constructor( socket) {
    this.socket = socket;
    this.holdProgress = 0;

    socket.on('leftHandDown', () => {
      createjs.Tween.get(this.leftArm, {loop: false}).to({rotation: 40}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
    });

    socket.on('rightHandDown', () => {
      createjs.Tween.get(this.rightArm, {loop: false}).to({rotation: -40}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
    });

    socket.on('leftFootDown', () => {
      createjs.Tween.get(this.leftLeg, {loop: false}).to({rotation: 20}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
    });

    socket.on('rightFootDown', () => {
      createjs.Tween.get(this.rightLeg, {loop: false}).to({rotation: -20}, 250, createjs.Ease.elasticOut).to({rotation: 0}, 400, createjs.Ease.elasticOut);
    });

    socket.on('startHold', () => {
      console.log(this.holdProgress);
      this.holdProgress++;
      this.progressUpdate();
    });

    socket.on('startUp', () => {
      this.holdProgress = 0;
      this.progressUpdate();
    });


      // ****************************** Intro Setup *******************************
    this.gameSetup();
    this.button = new Path.Circle(new Point(800, 200), 70);
    this.button.fillColor = '#26b29a';
    this.progress = new Path.Circle(new Point(800, 200), 80);
    this.progress.strokeWidth = 0;
    this.progress.strokeColor = '#1a8570';

  }

  introSetup() {
    this.introLayer = project.activeLayer;

    let bg = new Path();
    bg.importSVG(document.getElementById('intro'));

    let startButton = new Path.Circle({
      center: [860, 250],
      radius: 50
    });
    startButton.fillColor = '#26b29a';
    startButton.strokeColor = '#1a8570';
    startButton.strokeWidth = 6;

    this.socket.on('startDown', () => {
      startButton.fillColor = '#2ec6a8';

      paper.view.draw();
    });

    this.socket.on('startUp', () => {
      startButton.fillColor = '#26b29a';
      this.introLayer.visible = false;
      this.gameSetup();
      paper.view.draw();
    });


  }

  progressUpdate() {
     createjs.Tween.get(this.progress, {loop: false, override: true}).to({strokeWidth: this.holdProgress * 5}, 250, createjs.Ease.easeOut);
  }

  gameSetup() {
    this.gameLayer = new Layer();
    this.bg = project.importSVG(document.getElementById('bg'));

    this.head = project.importSVG(document.getElementById('head'));
    this.rightArm = project.importSVG(document.getElementById('arm'));
    this.leftArm = this.rightArm.clone();
    this.leftArm.scale(-1,1);
    this.torso = project.importSVG(document.getElementById('torso'));

    this.rightLeg = project.importSVG(document.getElementById('leg'));
    this.leftLeg = this.rightLeg.clone();
    this.leftLeg.scale(-1,1);

    this.leftHandLane = project.importSVG(document.getElementById('target-lane'));
    this.rightHandLane = this.leftHandLane.clone();

    let metrumY = 500;
    this.head.position = new Point(paper.view.center.x, metrumY - 260);
    this.torso.position = new Point(paper.view.center.x, metrumY);

    this.leftLeg.position = new Point(paper.view.center.x - 40, metrumY + 150);
    this.leftLeg.pivot = new Point(paper.view.center.x - 40, metrumY + 75);

    this.rightLeg.position = new Point(paper.view.center.x + 40, metrumY + 150);
    this.rightLeg.pivot = new Point(paper.view.center.x + 40, metrumY + 75);

    this.leftArm.position = new Point(paper.view.center.x - 105, metrumY + 30);
    this.leftArm.pivot = new Point(paper.view.center.x - 80, metrumY - 50);

    this.rightArm.position = new Point(paper.view.center.x + 105, metrumY + 30);
    this.rightArm.pivot = new Point(paper.view.center.x + 80, metrumY - 50);

    this.leftHandLane.position = new Point(paper.view.center.x + 214, metrumY + 34);
    this.leftHandLane.pivot = new Point(paper.view.center.x - 177, metrumY + 34);
    this.leftHandLane.rotation = 200;
    this.leftHandLane.opacity = 0.7;
    this.leftHandLane.insertAbove(this.bg);

    this.rightHandLane.position = new Point(paper.view.center.x + 570, metrumY + 34);
    this.rightHandLane.pivot = new Point(paper.view.center.x + 177, metrumY + 34);
    this.rightHandLane.rotation = -20;
    this.rightHandLane.opacity = 0.7;
    this.rightHandLane.insertAbove(this.bg);



   // this.leftHand = new Target(335, 534);


    this.tg = new Target(-40, 400);


    //console.log(leftArmGroup)

    // createjs.Tween.get(this.leftArm, {loop: false}).to({rotation: 40}, 750, createjs.Ease.cubicOut).to({rotation: 40}, 750, createjs.Ease.cubicOut);
    // createjs.Tween.get(this.rightArm, {loop: false}).to({rotation: -40}, 750, createjs.Ease.cubicOut).to({rotation: -40}, 750, createjs.Ease.cubicOut);

    // createjs.Tween.get(this.leftLeg, {loop: false}).to({rotation: 10}, 750, createjs.Ease.cubicOut).to({rotation: 10}, 750, createjs.Ease.cubicOut);
    // createjs.Tween.get(this.rightLeg, {loop: false}).to({rotation: -10}, 750, createjs.Ease.cubicOut).to({rotation: -10}, 750, createjs.Ease.cubicOut);

    createjs.Tween.get(this.tg.position, {loop: false}).to({x: paper.view.center.x - 177, y: metrumY + 34}, 2500, createjs.Ease.cubicOut)




    createjs.Ticker.setFPS( 60 );
    createjs.Ticker.addEventListener( 'tick', this.update );

    paper.view.onFrame = (event) => {
      this.onFrame(event);
    };

  }

  onFrame(e) {

  }

  update() {
    paper.view.draw();
  }


}


export default Game;


