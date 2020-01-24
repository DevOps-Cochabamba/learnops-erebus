"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRobotChannel = buildRobotChannel;
exports.buildControlChannel = buildControlChannel;
function buildRobotChannel(sessionId) {
  return `/s/${sessionId}/r`;
}

function buildControlChannel(sessionId) {
  return `/s/${sessionId}/c`;
}