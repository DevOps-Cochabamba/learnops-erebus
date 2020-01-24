import assert from 'assert'

import { button, axis, message, custom } from '../src/builder'
import { encode, decode } from '../src/general-json-command'

describe('general-json-command.js', () => {
  describe('.encode()', () => {
    it('should return valid message for button', () => {
      const result = encode(button(11, true))
      assert.equal(result, '{"cmd":"button","selector":11,"modifier":15}')
    })

    it('should return valid message for axis', () => {
      const result = encode(axis(1, true, 1))
      assert.equal(result, '{"cmd":"axis","selector":1,"modifier":15,"values":[1]}')
    })

    it('should return valid message for messasge', () => {
      const result = encode(message('something'))
      assert.equal(result, '{"cmd":"message","selector":1023,"modifier":15,"values":"something"}')
    })

    it('should return valid message for custom', () => {
      const result = encode(custom('update-file'))
      assert.equal(result, '{"cmd":"custom","selector":1023,"modifier":15,"values":"update-file"}')
    })
  })

  describe('.decode()', () => {
    it('should return valid message for button', () => {
      const result = decode('{"cmd":"button","selector":11,"modifier":15}')
      assert.deepStrictEqual(result, button(11, true))
    })

    it('should return valid message for axis', () => {
      const result = decode('{"cmd":"axis","selector":1,"modifier":15,"values":[1]}')
      assert.deepStrictEqual(result, axis(1, true, 1))
    })

    it('should return valid message for message', () => {
      const result = decode('{"cmd":"message","selector":1023,"modifier":15,"values":"something"}')
      assert.deepStrictEqual(result, message('something'))
    })

    it('should return valid message for message', () => {
      const result = decode('{"cmd":"custom","selector":1023,"modifier":15,"values":"update-file"}')
      assert.deepStrictEqual(result, custom('update-file'))
    })
  })
})
