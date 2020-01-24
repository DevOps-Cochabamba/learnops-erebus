'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = encode;
exports.decode = decode;
const name = exports.name = 'General JSON Command';
const version = exports.version = '1.0.0';
const author = exports.author = 'Gary Ascuy <gary.ascuy@gmail.com>';

function encode(message) {
  return JSON.stringify(message);
}

function decode(message) {
  return JSON.parse(message);
}