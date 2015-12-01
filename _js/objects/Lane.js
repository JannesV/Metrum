'use strict';
class Lane extends Phaser.TileSprite {

  constructor(game, x, y, target) {
    super(game, x, y, 600, 40, 'lane-mask');
    this.tileScale.x = 0.5;
    this.tileScale.y = 0.5;
    this.anchor.y = 0.5;
    this.anchor.x = 0;
    this.target = target;
    this.autoScroll(200, 0);

  }

  update() {
    //this.rotation = Phaser.Math.angleBetweenPoints(this.worldPosition, this.target.worldPosition);
    //this.width = Phaser.Math.distance(this.worldPosition.x, this.worldPosition.y, this.target.worldPosition.x, this.target.worldPosition.y);
  }



}


export default Lane;
