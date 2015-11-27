'use strict';
class Lane extends Phaser.Graphics {

  constructor(game, x, y) {
    super(game, x, y);

    this.angle = 50;
    this.beginFill(0xffffff, 0.1);
    this.drawRect(0, 0, 600, 40);



    let mask = new Phaser.Sprite(this.game, 0, 0, 'lane-mask');
    mask.scale.setTo(0.5, 0.5);
    this.addChild(mask);


  }



}


export default Lane;
