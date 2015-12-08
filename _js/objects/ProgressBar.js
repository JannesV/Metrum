'use strict';


class ProgressBar {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.progress = 40;
    this.draw();
  }

  setProgress(progress) {
    let newProgress = progress * 2.5 + 40;
    if (newProgress <= 300) {
      this.progress = newProgress;
      this.draw();
    }

  }

  draw() {
    if(this.bar) this.bar.remove();
    this.bar = new Path.Rectangle(new Point(this.x, this.y), new Size(50, 305), 25);
    this.bar.fillColor = '#f6a530';
    this.bar.strokeColor = '#cc882f';
    this.bar.strokeWidth = 5;

    if (this.progressFill) this.progressFill.remove();
    this.progressFill = new Path.Rectangle(new Point(this.x + 5, this.y + 300 - this.progress), new Size(40, this.progress), 20);
    this.progressFill.fillColor = 'white';
  }

}



export default ProgressBar;
