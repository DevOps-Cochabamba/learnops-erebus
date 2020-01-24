'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CMD_TYPE_NAME = exports.CMD_TYPE = exports.MAX = exports.MIN = undefined;
exports.encodeAxis = encodeAxis;
exports.encodeValues = encodeValues;
exports.decodeAxis = decodeAxis;
exports.decodeValues = decodeValues;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MIN = exports.MIN = 0;
const MAX = exports.MAX = 65535;
const CMD_TYPE = exports.CMD_TYPE = {
  custom: 0b00,
  axis: 0b01,
  button: 0b10,
  message: 0b11
};
const CMD_TYPE_NAME = exports.CMD_TYPE_NAME = {
  '0': 'custom',
  '1': 'axis',
  '2': 'button',
  '3': 'message'
};

function encodeAxis(value) {
  if (value > 1) return String.fromCharCode(MAX);
  if (value < -1) return String.fromCharCode(MIN);

  const code = (value + 1.0) / 2.0 * MAX;
  return String.fromCharCode(parseInt(code));
}

function encodeValues(values) {
  if (_lodash2.default.isNil(values)) return '';
  if (_lodash2.default.isString(values)) return values;
  if (_lodash2.default.isArray(values)) {
    return _lodash2.default.map(values, value => encodeAxis(value)).join('');
  }
  throw new Error('Invalid values type');
}

function decodeAxis(value) {
  return value / 65535.0 * 2 - 1;
}

function decodeValues(values) {
  const codes = [];
  for (let i = 0; i < values.length; ++i) codes.push(values.codePointAt(i));
  return _lodash2.default.map(codes, code => decodeAxis(code));
}