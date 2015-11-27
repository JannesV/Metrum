'use strict';

class Target extends Phaser.Graphics {

  constructor(game, x, y) {
    super(game, x, y);
    this.radius = 40;

    this.beginFill(0xffffff, 0.1);
    this.lineStyle(8, 0x000000, 0.8);
    this.drawCircle(0, 0, this.radius);
  }



}


export default Target;
