import _ from 'lodash'

import { CMD_TYPE, CMD_TYPE_NAME, encodeValues, decodeValues } from './gbc-helpers'

export const name = 'Gamepad Binary Command'
export const version = '1.0.0'
export const author = 'Gary Ascuy <gary.ascuy@gmail.com>'

// First Char (2 bytes): TTMM MMSS | SSSS SSSS
export function encode(message) {
  const type = CMD_TYPE[message.cmd] << 14
  const modifier = message.modifier << 10
  const code = type | modifier | message.selector

  return String.fromCharCode(code) + encodeValues(message.values)
}

export function decode(message) {
  const code = message.codePointAt(0)
  const cmd = CMD_TYPE_NAME[`${code >> 14}`]
  const modifier = (code & 0b0011110000000000) >> 10
  const selector = code & 0b0000001111111111
  const values = cmd === 'axis' ? decodeValues(message.substring(1)) : message.substring(1)

  return _.isEmpty(values) ? { cmd, modifier, selector } : { cmd, modifier, selector, values }
}
