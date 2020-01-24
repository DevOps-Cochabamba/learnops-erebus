import _ from 'lodash'

const modifierAliases = {
  'on': 0b1111,
  'off': 0b0000,
  'true': 0b1111,
  'false': 0b0000,
  'on': 0b1111,
  'keydown': 0b1111,
  'keyup': 0b0000,
}

export function getSelector(selector) {
  const value = parseInt(selector, 10)
  if (value > 0b1111111111) return 0b1111111111
  if (value < 0b0000000000) return 0b0000000000
  return value
}

export function getModifier(modifier) {
  if (_.isBoolean(modifier)) {
    return modifier ? 0b1111 : 0b0000
  }

  if (_.isString(modifier)) {
    return modifierAliases[modifier]
  }

  if (_.isNumber(modifier)) {
    const value = parseInt(modifier, 10)
    if (value > 0b1111) return 0b1111
    if (value < 0b0000) return 0b0000
    return value
  }

  throw new Error('Invalid modifier argument')
}

export function button(selector, modifier, ) {
  return {
    cmd: 'button',
    selector: getSelector(selector),    
    modifier: getModifier(modifier),
  }
}

export function axis(selector, modifier, ...values) {
  return {
    cmd: 'axis',
    selector: getSelector(selector),    
    modifier: getModifier(modifier),
    values: values,
  }
}

export function message(message, selector = 0b1111111111, modifier = 0b1111) {
  if (!_.isString(message)) {
    throw new Error('message shold be string')
  }

  return {
    cmd: 'message',
    selector: getSelector(selector),
    modifier: getModifier(modifier),
    values: message,
  }
}

export function custom(command, selector = 0b1111111111, modifier = 0b1111) {
  return {
    cmd: 'custom',
    selector: getSelector(selector),
    modifier: getModifier(modifier),
    values: command,
  }
}
