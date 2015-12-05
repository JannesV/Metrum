'use strict';
import GameState from './states/GameState';
import IntroState from './states/IntroState';

class Game extends Phaser.Game {

  constructor(width, height, socket) {
    super(width, height, Phaser.CANVAS, 'content');

    this.state.add('IntroState', IntroState, false);
    this.state.add('GameState', GameState, false);
    this.state.start('IntroState');
    this.socket = socket;
  }
}


export default Game;
