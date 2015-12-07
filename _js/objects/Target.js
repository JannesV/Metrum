'use strict';
let paper = require('paper');

const TargetFactory = (x, y, targetX, targetY, targetName, socket) => {
  let target = new paper.Path.Circle(new Point(x, y), 20);
  target.fillColor = '#fcd381';
  target.targetName = targetName;
  target.over = false;

  target.startMoving = () => {
    createjs.Tween.get(target.position).to({x: targetX, y: targetY}, 2000, createjs.Ease.cubicIn).call(target.handleComplete);
  };

  target.handleComplete = () => {
    target.over = true;
    socket.emit(`${target.targetName}Over`);
    target.fillColor = '#f6a530';
    createjs.Tween.get(target, {override: true}).wait(750).to({opacity: 0}, 150).call(target.kill);
  };

  target.hit = () => {
    createjs.Tween.get(target.scaling).to({x: 3, y: 3}, 200, createjs.Ease.bounceOut).to({x: 0, y: 0}, 200).call(target.kill);
  };

  target.kill = () => {
    target.emit('kill');

    target.remove();
  };

  return target;
};


export default TargetFactory;
