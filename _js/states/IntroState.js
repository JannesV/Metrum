'use strict';

class IntroState extends Phaser.State {
    create() {

      this.bg = this.add.sprite(0, 0, 'bg');

      this.bg.scale.setTo(0.5, 0.5);

      this.fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.fullScreenButton.onDown.add(this.fullscreen, this);

    }

    preload() {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.load.image('bg', 'assets/intro.png');
    }

    fullscreen() {
      console.log('fullscreen');
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      } else {
        this.game.scale.startFullScreen(false);
      }
    }
}

export default IntroState;
