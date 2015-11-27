'use strict';
class Spotlight extends Phaser.Graphics {

  constructor(game, x, y, angle, direction) {
    super(game, x, y);
    this.beginFill(0xffffff, 0.1);
    this.rotationAmount = 0;
    if(direction === Spotlight.LEFT) {
      this.angle = -angle;
      this.rotationAmount = 40;
      this.drawPolygon([new Phaser.Point(0, 0), new Phaser.Point(-1200, 200), new Phaser.Point(-1200, -200)]);
    } else {
      this.angle = angle;
      this.rotationAmount = -40;
      this.drawPolygon([new Phaser.Point(0, 0), new Phaser.Point(1200, 200), new Phaser.Point(1200, -200)]);
    }

    game.add.tween(this).to({angle: angle + this.rotationAmount}, game.rnd.between(1200, 2000), Phaser.Easing.Linear.None, true, -1, -1, true);
  }

}

Spotlight.LEFT = 'left';
Spotlight.RIGHT = 'right';

export default Spotlight;
