/**
 * Builds session channel name for MQTT.
 * @example /session/identifier/robot => /s/identifier/r  => /s/nTJYPFzyiy52wpQaF/r
 * @param {string} sessionId - session identifier.
 * @returns {string} channel name.
 */
export function buildRobotChannel(sessionId) {
  return `/s/${sessionId}/r`
}

/**
 * Builds session channel name for MQTT.
 * @example /session/identifier/control => /s/identifier/c  => /s/nTJYPFzyiy52wpQaF/c
 * @param {string} sessionId - session identifier.
 * @returns {string} channel name.
 */
export function buildControlChannel(sessionId) {
  return `/s/${sessionId}/c`
}
