/* global describe, it */

'use strict'

var assert = require('assert')
var furmat = require('..')

describe('furmat', function () {
  var format = furmat({
    locals: {
      name: 'ahmad'
    },

    modifiers: {
      upper: function (value) {
        return value.toUpperCase()
      },

      char: function (value) {
        return value.charAt(0)
      },

      invalid: 'bar'
    }
  })

  describe('modifier', function () {
    it('should use modifier', function () {
      assert.equal(format('%s:upper', 'foo'), 'FOO')
    })

    it('should skip unknown modifier', function () {
      assert.equal(format('%s:foo', 'foo'), 'foo:foo')
    })

    it('should skip invalid modifier', function () {
      assert.equal(format('%s:foo', 'foo'), 'foo:foo')
    })

    it('should chain modifiers', function () {
      assert.equal(format('%s:upper:char', 'foo'), 'F')
    })

    it('should apply locals with modifiers', function () {
      assert.equal(format('name: %name, first: %name:char:upper'), 'name: ahmad, first: A')
    })
  })
})
