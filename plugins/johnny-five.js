'use strict';

var five = require('johnny-five');
var board = new five.Board();



module.exports.register = (server, options, next) => {
  let io = require('socket.io')(server.listener);



  console.log('Hello Plugin');

  board.on('ready', () => {
    let button = new five.Button(3);
    board.repl.inject({
      button: button
    });

    button.on('down', () => {
      console.log('down');
    });
    button.on('up', () => {
      console.log('up');
    });
    var led = new five.Led(11);
    io.on('connection', socket => {
      socket.on('buttonDown', () => {
        console.log('CLICKED');
        led.on();
      });
      socket.on('buttonUp', () => {
        console.log('CLICKED');
        led.off();
      });
    });
    // Create a standard `led` component
    // on a valid pwm pin

  });
  next();

};

module.exports.register.attributes = {
  name: 'johnny-five-plugin',
  version: '0.1.0'
};
