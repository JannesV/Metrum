'use strict';

var five = require('johnny-five');
var board = new five.Board();



module.exports.register = (server, options, next) => {
  let io = require('socket.io')(server.listener);

  console.log('johnny-five Plugin INIT');

  board.on('ready', () => {

    let leftFootButton = new five.Button({pin: 7, holdtime: 250});
    let leftHandButton = new five.Button({pin: 8, holdtime: 250});
    let startButton = new five.Button({pin: 9, holdtime: 250});
    let headButton = new five.Button({pin: 10, holdtime: 250});
    let stopButton = new five.Button({pin: 11, holdtime: 250});
    let rightHandButton = new five.Button({pin: 12, holdtime: 250});
    let rightFootButton = new five.Button({pin: 13, holdtime: 250});

    let leftHandLed = new five.Led(2);
    let leftFootLed = new five.Led(3);
    let rightFootLed = new five.Led(4);
    let rightHandLed = new five.Led(5);
    let stopLed = new five.Led(6);
    let startLed = new five.Led('A0');
    let headLed = new five.Led('A1');

    let ballOver = false;
    io.on('connection', socket => {


      let buttons = [leftHandButton, leftFootButton, rightFootButton, rightHandButton, startButton, headButton, stopButton];
      let leds = [leftHandLed, leftFootLed, rightFootLed, rightHandLed, startLed, headLed, stopLed];
      let names = ['leftHand', 'leftFoot', 'rightFoot', 'rightHand', 'start', 'head', 'stop'];

      for (var i = 0; i < buttons.length; i++) {
        let led = leds[i];
        let name = names[i];
        led.off();
        buttons[i].on('down', () => {
          console.log(name, 'down');
          socket.emit(`${name}Down`);
          led.on();
        });
        buttons[i].on('up', () => {
          console.log(name, 'up');
          socket.emit(`${name}Up`);
          led.stop();
          led.off();
        });
        buttons[i].on('hold', () => {
          console.log(name, 'hold');
          socket.emit(`${name}Hold`);
          led.on();
        });
      }

      socket.on('miss', () => {
        stopLed.blink(25);
        board.wait(450, () => {
          stopLed.stop();
          stopLed.off();
        });
      });

      socket.on('hit', () => {

        headLed.blink(75);
        startLed.blink(75);
        stopLed.blink(75);
        board.wait(150, () => {
          headLed.stop();
          headLed.off();
          startLed.stop();
          startLed.off();
          stopLed.stop();
          stopLed.off();
          leftHandLed.blink(75);
          rightHandLed.blink(75);
          board.wait(150, () => {
            leftHandLed.stop();
            leftHandLed.off();
            rightHandLed.stop();
            rightHandLed.off();
            leftFootLed.blink(75);
            rightFootLed.blink(75);
            board.wait(150, () => {
              leftFootLed.stop();
              leftFootLed.off();
              rightFootLed.stop();
              rightFootLed.off();
            });
          });
        });
      });

      socket.on('buttonDown', () => {
        console.log('CLICKED');
        leds.forEach((led) => {
          led.blink(50);
        });
      });

      socket.on('buttonUp', () => {
        leds.forEach((led) => {
          led.stop();
          led.off();
        });
      });

      socket.on('leftHandOver', () => {
        ballOverCheck('leftHandOver', leftHandLed);
      });

      socket.on('rightHandOver', () => {
        ballOverCheck('rightHandOver', rightHandLed);
      });

    });


    const ballOverCheck = (emit, target) => {
      if(!ballOver) {
        console.log(emit);
        target.on();
        ballOver = true;
        board.wait(850, () => {
          target.off();
          ballOver = false;
        });
      }
    };

  });



  next();

};

module.exports.register.attributes = {
  name: 'johnny-five-plugin',
  version: '0.1.0'
};
