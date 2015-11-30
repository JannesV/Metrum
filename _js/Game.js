'use strict';
import GameState from './states/GameState';

class Game extends Phaser.Game {

  constructor(socket) {
    super(1024, 768, Phaser.AUTO, 'content', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
    this.socket = socket;
  }



}


export default Game;
