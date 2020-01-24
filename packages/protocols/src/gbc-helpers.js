import  _ from 'lodash'

export const MIN = 0
export const MAX = 65535
export const CMD_TYPE = {
  custom: 0b00,
  axis: 0b01,
  button: 0b10,
  message: 0b11,
}
export const CMD_TYPE_NAME = {
  '0': 'custom',
  '1': 'axis',
  '2': 'button',
  '3': 'message',
}

export function encodeAxis(value) {
  if (value > 1) return String.fromCharCode(MAX)
  if (value < -1) return String.fromCharCode(MIN)

  const code = (value + 1.0) / 2.0 * MAX
  return String.fromCharCode(parseInt(code))
}

export function encodeValues(values) {
  if (_.isNil(values)) return ''
  if (_.isString(values)) return values
  if (_.isArray(values)) {
    return _.map(values, value => encodeAxis(value)).join('')
  }
  throw new Error('Invalid values type')
}

export function decodeAxis(value) {
  return (value / 65535.0) * 2 - 1
}

export function decodeValues(values) {
  const codes = []
  for (let i = 0; i < values.length; ++i)
    codes.push(values.codePointAt(i)) 
  return _.map(codes, code => decodeAxis(code))
}
