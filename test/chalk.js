/* global describe, it */

'use strict'

var assert = require('assert')
var furmat = require('..')

describe('furmat', function () {
  describe('chalk', function () {
    var format = furmat({
      locals: {
        name: 'ahmad'
      }
    })

    it('should use chalk styles', function () {
      assert.equal(format('%s:blue', 'foo'), '\u001b[34mfoo\u001b[39m')
    })

    it('should chain chalk styles', function () {
      assert.equal(format('%s:blue:bold', 'foo'), '\u001b[1m\u001b[34mfoo\u001b[39m\u001b[22m')
    })

    it('should apply locals with chalk styles', function () {
      assert.equal(format('name: %name:blue:bold'), 'name: \u001b[1m\u001b[34mahmad\u001b[39m\u001b[22m')
    })

    it('should skip chalk when disabled', function () {
      var format = furmat({
        chalk: false
      })

      assert.equal(format('%s:blue', 'foo'), 'foo:blue')
    })
  })
})
