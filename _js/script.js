'use strict';

import Game from './Game.js';

let socket;

// some features need the be polyfilled..
// https://babeljs.io/docs/usage/polyfill/

// import 'babel-core/polyfill';
// or import specific polyfills
// import {$} from './helpers/util';

const init = () => {
  socket = io('http://localhost:3000');
  let game = new Game(1024, 768, Phaser.AUTO, socket);

};

init();
