import assert from 'assert'

import { button, axis, message, custom } from '../src/builder'

describe('builder.js', () => {
  describe('.button()', () => {
    it('should return a button on command from true', () => {
      const result = button(10, true)
      assert.deepStrictEqual(result, {
        cmd: 'button',
        selector: 10,
        modifier: 15,
      })
    })

    it('should return a button off command from false', () => {
      const result = button(10, false)
      assert.deepStrictEqual(result, {
        cmd: 'button',
        selector: 10,
        modifier: 0,
      })
    })

    it('should return a button on command from string', () => {
      const result = button(10, 'on')
      assert.deepStrictEqual(result, {
        cmd: 'button',
        selector: 10,
        modifier: 15,
      })
    })

    it('should return a button off command from string', () => {
      const result = button(10, 'off')
      assert.deepStrictEqual(result, {
        cmd: 'button',
        selector: 10,
        modifier: 0,
      })
    })
  })

  describe('.axis()', () => {
    it('should return a axis command from with one parameters', () => {
      const result = axis(10, 'on', 0.5)
      assert.deepStrictEqual(result, {
        cmd: 'axis',
        selector: 10,
        modifier: 15,
        values: [0.5]
      })
    })

    it('should return a axis command from with two parameters', () => {
      const result = axis(10, 'off', -0.5, 0.5)
      assert.deepStrictEqual(result, {
        cmd: 'axis',
        selector: 10,
        modifier: 0,
        values: [-0.5, 0.5]
      })
    })
  })

  describe('.message()', () => {
    it('should return a message command with single value', () => {
      const result = message('CPU 1.5')
      assert.deepStrictEqual(result, {
        cmd: 'message',
        selector: 1023,
        modifier: 15,
        values: 'CPU 1.5'
      })
    })

    it('should return a message command with values', () => {
      const result = message('CPU 1.5', 10, 'true')
      assert.deepStrictEqual(result, {
        cmd: 'message',
        selector: 10,
        modifier: 15,
        values: 'CPU 1.5'
      })
    })

    it('should return a message command with values and false', () => {
      const result = message('CPU 1.5', 1, 'false')
      assert.deepStrictEqual(result, {
        cmd: 'message',
        selector: 1,
        modifier: 0,
        values: 'CPU 1.5'
      })
    })
  })

  describe('.custom()', () => {
    it('should return a custom command with single value', () => {
      const result = custom('update-software')
      assert.deepStrictEqual(result, {
        cmd: 'custom',
        selector: 1023,
        modifier: 15,
        values: 'update-software'
      })
    })

    it('should return a message command with values', () => {
      const result = custom('update-software', 10, 'on')
      assert.deepStrictEqual(result, {
        cmd: 'custom',
        selector: 10,
        modifier: 15,
        values: 'update-software'
      })
    })
  })
})
