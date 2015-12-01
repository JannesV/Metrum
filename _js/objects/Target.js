'use strict';

class Target extends Phaser.Graphics {

  constructor(game, x, y) {
    super(game, x, y);
    this.radius = 34;

    this.up();
  }

  down() {
    this.clear();
    this.beginFill(0xffffff, 1);
    this.lineStyle(5, 0xc17b27, 0.8);
    this.drawCircle(0, 0, this.radius);
  }

  up() {
    this.clear();
    this.beginFill(0xffffff, 0.1);
    this.lineStyle(5, 0xc17b27, 0.8);
    this.drawCircle(0, 0, this.radius);
  }

  over() {
    this.clear();
    this.beginFill(0xff0000, 1);
    this.lineStyle(5, 0xc17b27, 0.8);
    this.drawCircle(0, 0, this.radius);
  }

  poof() {
    return new Promise((resolve, reject) => {
      this.game.time.events.add(250, () => {
        this.kill();
        resolve();
      }, this);
    });
  }

  hit () {
    this.clear();
    this.beginFill(0x00FF00, 1);
    this.lineStyle(5, 0xc17b27, 0.8);
    this.drawCircle(0, 0, this.radius);
  }



}


export default Target;
