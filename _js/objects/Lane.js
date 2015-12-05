'use strict';
class Lane extends Phaser.Group {

  constructor(game, x, y, side, isTween, target) {
    super(game, target);
    let moveAngle;
    if (side === 'left') {
      this.angle = 0;
      moveAngle = -30;
    } else {
      this.angle = 180;
      moveAngle = 30;
    }

    let lane = new Phaser.TileSprite(game, x, y-5, 600, 35, 'lane-mask');
    lane.alpha = 0.3;
    this.add(lane);
    lane.tileScale.x = 0.4;
    lane.tileScale.y = 0.4;
    lane.anchor.y = 0.5;
    lane.anchor.x = 1;
    this.target = target;
    lane.autoScroll(200, 0);
    game.add.tween(this).to({angle: this.angle + moveAngle}, 1500, Phaser.Easing.Bounce.InOut, true, -1, false, true);
    this.pivot.x = x;
    this.pivot.y = y;
    this.x = x;
    this.y = y;

  }

  update() {

    //this.rotation = Phaser.Math.angleBetweenPoints(this.worldPosition, this.target.worldPosition);
    //this.width = Phaser.Math.distance(this.worldPosition.x, this.worldPosition.y, this.target.worldPosition.x, this.target.worldPosition.y);
  }



}


export default Lane;
