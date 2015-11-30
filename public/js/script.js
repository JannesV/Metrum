/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("__webpack_require__(1);\nmodule.exports = __webpack_require__(7);\n\n\n/*****************\n ** WEBPACK FOOTER\n ** multi main\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar _GameJs = __webpack_require__(2);\n\nvar _GameJs2 = _interopRequireDefault(_GameJs);\n\nvar socket = undefined;\n\n// some features need the be polyfilled..\n// https://babeljs.io/docs/usage/polyfill/\n\n// import 'babel-core/polyfill';\n// or import specific polyfills\n// import {$} from './helpers/util';\n\nvar init = function init() {\n  socket = io('http://localhost:3000');\n  new _GameJs2['default'](socket);\n};\n\ninit();\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/script.js\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/script.js?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _statesGameState = __webpack_require__(3);\n\nvar _statesGameState2 = _interopRequireDefault(_statesGameState);\n\nvar Game = (function (_Phaser$Game) {\n  _inherits(Game, _Phaser$Game);\n\n  function Game(socket) {\n    _classCallCheck(this, Game);\n\n    _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, 1024, 768, Phaser.AUTO, 'content', null);\n    this.state.add('GameState', _statesGameState2['default'], false);\n    this.state.start('GameState');\n    this.socket = socket;\n  }\n\n  return Game;\n})(Phaser.Game);\n\nexports['default'] = Game;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/Game.js\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/Game.js?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _objectsSpotlight = __webpack_require__(4);\n\nvar _objectsSpotlight2 = _interopRequireDefault(_objectsSpotlight);\n\nvar _objectsTarget = __webpack_require__(5);\n\nvar _objectsTarget2 = _interopRequireDefault(_objectsTarget);\n\nvar _objectsLane = __webpack_require__(6);\n\nvar _objectsLane2 = _interopRequireDefault(_objectsLane);\n\nvar GameState = (function (_Phaser$State) {\n  _inherits(GameState, _Phaser$State);\n\n  function GameState() {\n    _classCallCheck(this, GameState);\n\n    _get(Object.getPrototypeOf(GameState.prototype), 'constructor', this).apply(this, arguments);\n  }\n\n  _createClass(GameState, [{\n    key: 'create',\n    value: function create() {\n      var _this = this;\n\n      this.points = {\n        'x': [87, 179.5, 446.5],\n        'y': [78, 367, 173]\n      };\n      this.path = [];\n      this.mode = 1;\n      this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;\n\n      this.bg = this.add.sprite(0, 0, 'bg');\n      this.bg.scale.setTo(0.5, 0.5);\n      this.add.existing(new _objectsSpotlight2['default'](this.game, this.game.width, 530, -30, _objectsSpotlight2['default'].LEFT));\n      this.add.existing(new _objectsSpotlight2['default'](this.game, this.game.width, 530, -10, _objectsSpotlight2['default'].LEFT));\n      this.add.existing(new _objectsSpotlight2['default'](this.game, 0, 530, -30, _objectsSpotlight2['default'].RIGHT));\n      this.add.existing(new _objectsSpotlight2['default'](this.game, 0, 530, -10, _objectsSpotlight2['default'].RIGHT));\n\n      //this.add.existing(lane);\n\n      // let mask = new Phaser.Sprite(0, 0, 'lane-mask');\n      // console.log(mask);\n      // this.add.existing(mask);\n\n      this.graphics = this.add.graphics(0, 0);\n      this.graphics.moveTo(this.points.x[0], this.points.y[0]);\n      this.graphics.lineStyle(15, 0xffd900);\n      //this.graphics.bezierCurveTo(this.points.x[0], this.points.y[0], this.points.x[1], this.points.y[1], this.points.x[2], this.points.y[2]);\n\n      //Metrum Shadow\n      this.metrumShadow = this.add.graphics(this.game.width / 2 - 5, 720);\n      this.metrumShadow.beginFill(0x000000, 0.2);\n      this.metrumShadow.drawEllipse(0, 0, 80, 20);\n\n      var centerVert = this.game.height / 2;\n      var centerHorz = this.game.width / 2;\n\n      this.metrum = this.game.add.group();\n      this.metrum.x = centerHorz;\n      this.metrum.y = centerVert + 150;\n\n      //Metrum, the star himself\n      this.torso = this.add.sprite(0, 0, 'torso');\n      this.torso.anchor.set(0.5);\n      this.torso.scale.setTo(0.4, 0.4);\n      this.metrum.add(this.torso);\n\n      this.leftLeg = this.add.sprite(this.torso.x - 40, this.torso.y + 60, 'left-leg');\n      this.leftLeg.scale.setTo(0.4, 0.4);\n      this.leftLeg.anchor.x = 0.4;\n      this.leftLeg.anchor.y = 0.1;\n      this.metrum.add(this.leftLeg);\n\n      this.rightLeg = this.add.sprite(this.torso.x + 30, this.torso.y + 60, 'right-leg');\n      this.rightLeg.scale.setTo(0.4, 0.4);\n      this.rightLeg.anchor.x = 0.4;\n      this.rightLeg.anchor.y = 0.1;\n      this.metrum.add(this.rightLeg);\n\n      this.leftArm = this.add.sprite(-35, -15, 'left-arm');\n      this.leftArm.scale.setTo(0.4, 0.4);\n      this.leftArmGroup = this.game.add.group(this.metrum);\n      this.leftArmGroup.x = -70;\n      this.leftArmGroup.y = -40;\n      this.leftArmGroup.angle = 0;\n      this.leftArmTarget = new _objectsTarget2['default'](this.game, -14, 108);\n      this.leftArmGroup.add(this.leftArm);\n      this.leftArmGroup.add(this.leftArmTarget);\n      this.metrum.add(this.leftArmGroup);\n      this.metrum.sendToBack(this.leftArmGroup);\n\n      this.rightArm = this.add.sprite(-8, -20, 'right-arm');\n      this.rightArm.scale.setTo(0.4, 0.4);\n      this.rightArmGroup = this.game.add.group(this.metrum);\n      this.rightArmGroup.x = 70;\n      this.rightArmGroup.y = -40;\n      this.rightArmTarget = new _objectsTarget2['default'](this.game, 12, 99);\n      this.rightArmGroup.add(this.rightArm);\n      this.rightArmGroup.add(this.rightArmTarget);\n      this.metrum.add(this.rightArmGroup);\n      this.metrum.sendToBack(this.rightArmGroup);\n\n      this.head = this.add.sprite(this.torso.x, this.torso.y - 75, 'head');\n      this.head.scale.setTo(0.4, 0.4);\n      this.head.anchor.x = 0.5;\n      this.head.anchor.y = 0.95;\n      this.metrum.add(this.head);\n      this.metrum.sendToBack(this.head);\n\n      this.lane = new _objectsLane2['default'](this.game, -600, -100, this.leftArmTarget);\n      this.lane.alpha = 0.3;\n      this.metrum.add(this.lane);\n      this.metrum.sendToBack(this.lane);\n\n      this.metrumtween = this.add.tween(this.leftArmGroup).to({ angle: 30 }, 500, Phaser.Easing.Linear.None, true, -1, false, true);\n\n      // this.input.onDown.add(this.onDown, this);\n      // this.input.onUp.add(this.onUp, this);\n\n      this.fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);\n      this.fullScreenButton.onDown.add(this.fullscreen, this);\n\n      this.game.socket.on('leftHandDown', function () {\n\n        console.log(_this.head.worldPosition);\n        _this.leftArmTarget.down();\n      });\n\n      this.game.socket.on('leftHandUp', function () {\n        _this.metrum.angle = 0;\n        console.log(_this.head.worldPosition);\n        _this.leftArmTarget.up();\n      });\n    }\n  }, {\n    key: 'fullscreen',\n    value: function fullscreen() {\n      console.log('fullscreen');\n      if (this.game.scale.isFullScreen) {\n        this.game.scale.stopFullScreen();\n      } else {\n        this.game.scale.startFullScreen(false);\n      }\n    }\n  }, {\n    key: 'onDown',\n    value: function onDown() {\n      this.game.socket.emit('buttonDown');\n    }\n  }, {\n    key: 'onUp',\n    value: function onUp() {\n      this.game.socket.emit('buttonUp');\n    }\n  }, {\n    key: 'update',\n    value: function update() {}\n  }, {\n    key: 'preload',\n    value: function preload() {\n      this.load.image('left-arm', 'assets/left-arm.png');\n      this.load.image('left-leg', 'assets/left-leg.png');\n      this.load.image('right-leg', 'assets/right-leg.png');\n      this.load.image('right-arm', 'assets/right-arm.png');\n      this.load.image('head', 'assets/head.png');\n      this.load.image('torso', 'assets/torso.png');\n      this.load.image('bg', 'assets/bg.png');\n      this.load.image('lane-mask', 'assets/lane-mask.png');\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      //this.game.debug.spriteCoords(this.leftArm);\n      // this.game.debug.spriteBounds(this.leftLeg);\n\n    }\n  }]);\n\n  return GameState;\n})(Phaser.State);\n\nexports['default'] = GameState;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/states/GameState.js\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/states/GameState.js?");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Spotlight = (function (_Phaser$Graphics) {\n  _inherits(Spotlight, _Phaser$Graphics);\n\n  function Spotlight(game, x, y, angle, direction) {\n    _classCallCheck(this, Spotlight);\n\n    _get(Object.getPrototypeOf(Spotlight.prototype), 'constructor', this).call(this, game, x, y);\n    this.beginFill(0xffffff, 0.1);\n    this.rotationAmount = 0;\n    if (direction === Spotlight.LEFT) {\n      this.angle = -angle;\n      this.rotationAmount = 40;\n      this.drawPolygon([new Phaser.Point(0, 0), new Phaser.Point(-1200, 200), new Phaser.Point(-1200, -200)]);\n    } else {\n      this.angle = angle;\n      this.rotationAmount = -40;\n      this.drawPolygon([new Phaser.Point(0, 0), new Phaser.Point(1200, 200), new Phaser.Point(1200, -200)]);\n    }\n\n    game.add.tween(this).to({ angle: angle + this.rotationAmount }, game.rnd.between(1200, 2000), Phaser.Easing.Linear.None, true, -1, -1, true);\n  }\n\n  return Spotlight;\n})(Phaser.Graphics);\n\nSpotlight.LEFT = 'left';\nSpotlight.RIGHT = 'right';\n\nexports['default'] = Spotlight;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/objects/Spotlight.js\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/objects/Spotlight.js?");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Target = (function (_Phaser$Graphics) {\n  _inherits(Target, _Phaser$Graphics);\n\n  function Target(game, x, y) {\n    _classCallCheck(this, Target);\n\n    _get(Object.getPrototypeOf(Target.prototype), 'constructor', this).call(this, game, x, y);\n    this.radius = 34;\n\n    this.up();\n  }\n\n  _createClass(Target, [{\n    key: 'down',\n    value: function down() {\n      this.clear();\n      this.beginFill(0xffffff, 1);\n      this.lineStyle(5, 0xc17b27, 0.8);\n      this.drawCircle(0, 0, this.radius);\n    }\n  }, {\n    key: 'up',\n    value: function up() {\n      this.clear();\n      this.beginFill(0xffffff, 0.1);\n      this.lineStyle(5, 0xc17b27, 0.8);\n      this.drawCircle(0, 0, this.radius);\n    }\n  }]);\n\n  return Target;\n})(Phaser.Graphics);\n\nexports['default'] = Target;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/objects/Target.js\n ** module id = 5\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/objects/Target.js?");

/***/ },
/* 6 */
/***/ function(module, exports) {

	eval("'use strict';\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Lane = (function (_Phaser$TileSprite) {\n  _inherits(Lane, _Phaser$TileSprite);\n\n  function Lane(game, x, y, target) {\n    _classCallCheck(this, Lane);\n\n    _get(Object.getPrototypeOf(Lane.prototype), 'constructor', this).call(this, game, x, y, 800, 40, 'lane-mask');\n    this.tileScale.x = 0.5;\n    this.tileScale.y = 0.5;\n    this.anchor.y = 0.5;\n    this.anchor.x = 0;\n    this.target = target;\n    this.autoScroll(200, 0);\n  }\n\n  _createClass(Lane, [{\n    key: 'update',\n    value: function update() {\n      this.rotation = Phaser.Math.angleBetweenPoints(this.worldPosition, this.target.worldPosition);\n      this.width = Phaser.Math.distance(this.worldPosition.x, this.worldPosition.y, this.target.worldPosition.x, this.target.worldPosition.y);\n    }\n  }]);\n\n  return Lane;\n})(Phaser.TileSprite);\n\nexports['default'] = Lane;\nmodule.exports = exports['default'];\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_js/objects/Lane.js\n ** module id = 6\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_js/objects/Lane.js?");

/***/ },
/* 7 */
/***/ function(module, exports) {

	eval("// removed by extract-text-webpack-plugin\n\n/*****************\n ** WEBPACK FOOTER\n ** ./_scss/style.scss\n ** module id = 7\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./_scss/style.scss?");

/***/ }
/******/ ]);