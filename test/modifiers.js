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
      }
    }
  })

  describe('modifier', function () {
    it('should use modifier', function () {
      assert.equal(format('%s:upper', 'foo'), 'FOO')
    })

    it('should chain modifiers', function () {
      assert.equal(format('%s:upper:char', 'foo'), 'F')
    })

    it('should apply locals with modifiers', function () {
      assert.equal(format('name: %name, first: %name:char:upper'), 'name: ahmad, first: A')
    })
  })
})
