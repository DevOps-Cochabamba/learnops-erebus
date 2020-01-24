'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _channel = require('../utils/channel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ControlClient extends _events2.default {
  constructor(mqtt, sessionId, protocol) {
    super();

    this.mqtt = mqtt;
    this.protocol = protocol;

    this.encode = protocol.encode;
    this.decode = protocol.decode;

    this.robotChannel = (0, _channel.buildRobotChannel)(sessionId);
    this.controlChannel = (0, _channel.buildControlChannel)(sessionId);
  }

  start() {
    this.mqtt.subscribe(this.controlChannel).on(data => {
      try {
        const message = this.decode(data.toString());
        this.emit('message', message);
      } catch (error) {
        this.emit('error', error);
      }
    });
  }

  send(message) {
    this.mqtt.publish(this.robotChannel, this.encode(message));
  }
}
exports.default = ControlClient;