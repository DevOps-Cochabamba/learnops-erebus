import assert from 'assert'

import { encodeAxis, encodeValues, decodeAxis, decodeValues } from '../src/gbc-helpers'

describe('gbc-helpers.js', () => {
  describe('.encodeAxis()', () => {
    it('should return axis from 1', () => {
      const result = encodeAxis(1)
      assert.equal(result, '￿')
    })

    it('should return axis from -1', () => {
      const result = encodeAxis(-1)
      assert.equal(result, '\u0000')
    })

    it('should return axis from 0', () => {
      const result = encodeAxis(0)
      assert.equal(result, '翿')
    })

    it('should return axis from 0.85', () => {
      const result = encodeAxis(0.85)
      assert.equal(result, '')
    })

    it('should return axis from -0.85', () => {
      const result = encodeAxis(-0.85)
      assert.equal(result, 'ጳ')
    })
  })

  describe('.encodeAxis()', () => {
    it('should return axis from 1', () => {
      const result = decodeAxis('￿'.codePointAt(0)) * 100
      assert.equal(Math.round(result), 100)
    })

    it('should return axis from -1', () => {
      const result = decodeAxis('\u0000'.codePointAt(0)) * 100
      assert.equal(Math.round(result), -100)
    })

    it('should return axis from 0', () => {
      const result = decodeAxis('翿'.codePointAt(0)) * 100
      assert.equal(Math.round(result), 0)
    })

    it('should return axis from 0.85', () => {
      const result = decodeAxis(''.codePointAt(0)) * 100
      assert.equal(Math.round(result), 85)
    })

    it('should return axis from -0.85', () => {
      const result = decodeAxis('ጳ'.codePointAt(0)) * 100
      assert.equal(Math.round(result), -85)
    })
  })

  describe('.encodeValues()', () => {
    it('should return axis from single string', () => {
      const result = encodeValues('gary')
      assert.equal(result, 'gary')
    })

    it('should return axis from array numbers', () => {
      const result = encodeValues([-0.85, 0])
      assert.equal(result, 'ጳ翿')
    })
  })

  describe('.decodeValues()', () => {
    it('should return axis from single string', () => {
      const [a, b] = decodeValues('ጳ翿')
      assert.equal(parseInt(a * 100), -85)
      assert.equal(parseInt(b * 100), 0)
    })
  })
})
