'use strict';
let paper = require('paper');

paper.install(window);
import Game from './Game.js';

let socket;
socket = io('http://localhost:3000');


const init = () => {
  paper.setup('gameContainer');
  new Game(socket);
  document.getElementById('gameContainer').addEventListener('click', fullScreen);
};

const fullScreen = () => {
  var el = document.getElementById('gameContainer');

  if(el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
  else {
    el.mozRequestFullScreen();
  }
}

window.onload = function() {
  init();
}

