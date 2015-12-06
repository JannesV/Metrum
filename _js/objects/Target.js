'use strict';
let paper = require('paper');

// class Target extends paper.Path {

//   constructor(x, y) {
//     super();

//     Path.Circle(new Point(x, y), 50);
//     this.fillColor = 'black';


//     //this.up();
//   }

//   // down() {
//   //   this.clear();
//   //   this.beginFill(0xffffff, 1);
//   //   this.lineStyle(5, 0xc17b27, 0.8);
//   //   this.drawCircle(0, 0, this.radius);
//   // }

//   // up() {
//   //   this.clear();
//   //   this.beginFill(0xffffff, 0.1);
//   //   this.lineStyle(5, 0xc17b27, 0.8);
//   //   this.drawCircle(0, 0, this.radius);
//   // }

//   // over() {
//   //   this.clear();
//   //   this.beginFill(0xff0000, 1);
//   //   this.lineStyle(5, 0xc17b27, 0.8);
//   //   this.drawCircle(0, 0, this.radius);
//   // }

//   // poof() {
//   //   return new Promise((resolve) => {
//   //     this.game.time.events.add(750, () => {
//   //       this.kill();
//   //       resolve();
//   //     }, this);
//   //   });
//   // }

//   // hit () {
//   //   this.clear();
//   //   this.beginFill(0x00FF00, 1);
//   //   this.lineStyle(5, 0xc17b27, 0.8);
//   //   this.drawCircle(0, 0, this.radius);
//   // }



// }

const TargetFactory = (x, y) => {
  let target = new paper.Path.Circle(new Point(x, y), 20);
  target.fillColor = 'black';

  return target;
}


export default TargetFactory;
