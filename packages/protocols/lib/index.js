'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protocols = exports.custom = exports.message = exports.axis = exports.button = undefined;

var _builder = require('./builder');

var _generalJsonCommand = require('./general-json-command');

var gjc = _interopRequireWildcard(_generalJsonCommand);

var _gamepadBinaryCommand = require('./gamepad-binary-command');

var gbc = _interopRequireWildcard(_gamepadBinaryCommand);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const protocols = { gjc, gbc };
exports.button = _builder.button;
exports.axis = _builder.axis;
exports.message = _builder.message;
exports.custom = _builder.custom;
exports.protocols = protocols;