'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSelector = getSelector;
exports.getModifier = getModifier;
exports.button = button;
exports.axis = axis;
exports.message = message;
exports.custom = custom;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modifierAliases = {
  'on': 0b1111,
  'off': 0b0000,
  'true': 0b1111,
  'false': 0b0000,
  'on': 0b1111,
  'keydown': 0b1111,
  'keyup': 0b0000
};

function getSelector(selector) {
  const value = parseInt(selector, 10);
  if (value > 0b1111111111) return 0b1111111111;
  if (value < 0b0000000000) return 0b0000000000;
  return value;
}

function getModifier(modifier) {
  if (_lodash2.default.isBoolean(modifier)) {
    return modifier ? 0b1111 : 0b0000;
  }

  if (_lodash2.default.isString(modifier)) {
    return modifierAliases[modifier];
  }

  if (_lodash2.default.isNumber(modifier)) {
    const value = parseInt(modifier, 10);
    if (value > 0b1111) return 0b1111;
    if (value < 0b0000) return 0b0000;
    return value;
  }

  throw new Error('Invalid modifier argument');
}

function button(selector, modifier) {
  return {
    cmd: 'button',
    selector: getSelector(selector),
    modifier: getModifier(modifier)
  };
}

function axis(selector, modifier, ...values) {
  return {
    cmd: 'axis',
    selector: getSelector(selector),
    modifier: getModifier(modifier),
    values: values
  };
}

function message(message, selector = 0b1111111111, modifier = 0b1111) {
  if (!_lodash2.default.isString(message)) {
    throw new Error('message shold be string');
  }

  return {
    cmd: 'message',
    selector: getSelector(selector),
    modifier: getModifier(modifier),
    values: message
  };
}

function custom(command, selector = 0b1111111111, modifier = 0b1111) {
  return {
    cmd: 'custom',
    selector: getSelector(selector),
    modifier: getModifier(modifier),
    values: command
  };
}