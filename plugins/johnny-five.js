'use strict';

var five = require('johnny-five');
var board = new five.Board();



module.exports.register = (server, options, next) => {
  let io = require('socket.io')(server.listener);
  let init = false;

  console.log('johnny-five Plugin INIT');

  board.on('ready', () => {

    let leftFootButton = new five.Button(7);
    let leftHandButton = new five.Button(8);
    let startButton = new five.Button(9);
    let headButton = new five.Button(10);
    let stopButton = new five.Button(11);
    let rightHandButton = new five.Button(12);
    let rightFootButton = new five.Button(13);

    let leftHandLed = new five.Led(2);
    let leftFootLed = new five.Led(3);
    let rightFootLed = new five.Led(4);
    let rightHandLed = new five.Led(5);
    let stopLed = new five.Led(6);
    let startLed = new five.Led('A0');
    let headLed = new five.Led('A1');
    io.on('connection', socket => {


      let buttons = [leftHandButton, leftFootButton, rightFootButton, rightHandButton, startButton, headButton, stopButton];
      let leds = [leftHandLed, leftFootLed, rightFootLed, rightHandLed, startLed, headLed, stopLed];
      let names = ['leftHand', 'leftFoot', 'rightFoot', 'rightHand', 'start', 'head', 'stop'];

      for (var i = 0; i < buttons.length; i++) {
        let led = leds[i];
        let name = names[i];
        buttons[i].on('down', () => {
          console.log(name, 'down');
          socket.emit(`${name}Down`);
          led.on();

        });
        buttons[i].on('up', () => {
          console.log(name, 'up');
          socket.emit(`${name}Up`);
          led.off();
        });
      }

      socket.on('buttonDown', () => {
        console.log('CLICKED');
        leftHandLed.blink(50);
        leftFootLed.blink(50);
        rightFootLed.blink(50);
        rightHandLed.blink(50);
        stopLed.blink(50);
        startLed.blink(50);
        headLed.blink(50);
      });

      socket.on('buttonUp', () => {
        console.log('CLICKED');
        leftHandLed.stop();
        leftFootLed.stop();
        rightFootLed.stop();
        rightHandLed.stop();
        stopLed.stop();
        startLed.stop();
        headLed.stop();

        leftHandLed.off();
        leftFootLed.off();
        rightFootLed.off();
        rightHandLed.off();
        stopLed.off();
        startLed.off();
        headLed.off();

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
