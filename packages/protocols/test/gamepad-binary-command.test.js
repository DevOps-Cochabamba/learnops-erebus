import assert from 'assert'

import { button, axis, message, custom } from '../src/builder'
import { encode, decode } from '../src/gamepad-binary-command'

describe('gamepad-binary-command.js', () => {
  describe('.encode()', () => {
    it('should return valid message for button', () => {
      const result = encode(button(11, true))
      assert.equal(result, '밋')
    })

    it('should return valid message for axis', () => {
      const result = encode(axis(1, true, 1))
      assert.equal(result, '簁￿')
    })

    it('should return valid message for messasge', () => {
      const result = encode(message('something'))
      assert.equal(result, '￿something')
    })

    it('should return valid message for custom', () => {
      const result = encode(custom('update-file'))
      assert.equal(result, '㿿update-file')
    })
  })

  describe('.decode()', () => {
    it('should return valid message for button', () => {
      const result = decode('밋')
      assert.deepStrictEqual(result, button(11, true))
    })

    it('should return valid message for axis', () => {
      const result = decode('簁￿')
      assert.deepStrictEqual(result, axis(1, true, 1))
    })

    it('should return valid message for message', () => {
      const result = decode('￿something')
      assert.deepStrictEqual(result, message('something'))
    })

    it('should return valid message for message', () => {
      const result = decode('㿿update-file')
      assert.deepStrictEqual(result, custom('update-file'))
    })
  })
})
