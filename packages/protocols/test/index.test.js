import assert from 'assert'

import { button, message, custom, protocols } from '../src'

describe('index.js', () => {
  describe('.protocols.gbc.encode()', () => {
    it('should return valid message for button', () => {
      const result = protocols.gbc.encode(button(11, true))
      assert.equal(result, '밋')
    })

    it('should return valid message for custom', () => {
      const result = protocols.gbc.encode(custom('update-file'))
      assert.equal(result, '㿿update-file')
    })
  })

  describe('.protocols.gbc.decode()', () => {
    it('should return valid message for button', () => {
      const result = protocols.gjc.decode('{"cmd":"button","selector":11,"modifier":15}')
      assert.deepStrictEqual(result, button(11, true))
    })

    it('should return valid message for message', () => {
      const result = protocols.gjc.decode('{"cmd":"message","selector":1023,"modifier":15,"values":"something"}')
      assert.deepStrictEqual(result, message('something'))
    })
  })
})
