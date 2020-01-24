'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.author = exports.version = exports.name = undefined;
exports.encode = encode;
exports.decode = decode;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gbcHelpers = require('./gbc-helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = exports.name = 'Gamepad Binary Command';
const version = exports.version = '1.0.0';
const author = exports.author = 'Gary Ascuy <gary.ascuy@gmail.com>';

function encode(message) {
  const type = _gbcHelpers.CMD_TYPE[message.cmd] << 14;
  const modifier = message.modifier << 10;
  const code = type | modifier | message.selector;

  return String.fromCharCode(code) + (0, _gbcHelpers.encodeValues)(message.values);
}

function decode(message) {
  const code = message.codePointAt(0);
  const cmd = _gbcHelpers.CMD_TYPE_NAME[`${code >> 14}`];
  const modifier = (code & 0b0011110000000000) >> 10;
  const selector = code & 0b0000001111111111;
  const values = cmd === 'axis' ? (0, _gbcHelpers.decodeValues)(message.substring(1)) : message.substring(1);

  return _lodash2.default.isEmpty(values) ? { cmd, modifier, selector } : { cmd, modifier, selector, values };
}