export const name = 'General JSON Command'
export const version = '1.0.0'
export const author = 'Gary Ascuy <gary.ascuy@gmail.com>'

export function encode(message) {
  return JSON.stringify(message)
}

export function decode(message) {
  return JSON.parse(message)
}
