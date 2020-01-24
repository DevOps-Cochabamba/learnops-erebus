'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RobotClient = exports.ControlClient = undefined;

var _ControlClient = require('./clients/ControlClient');

var _ControlClient2 = _interopRequireDefault(_ControlClient);

var _RobotClient = require('./clients/RobotClient');

var _RobotClient2 = _interopRequireDefault(_RobotClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ControlClient = _ControlClient2.default;
exports.RobotClient = _RobotClient2.default;