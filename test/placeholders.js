/* global describe, it */

'use strict'

var assert = require('assert')
var furmat = require('..')
var util = require('util')

describe('placeholders', function () {
  var format = furmat()

  it('should fail if first argument is not a string', function () {
    assert.throws(format, Error)
    assert.throws(function () { format([]) }, Error)
    assert.throws(function () { format({}) }, Error)
    assert.throws(function () { format(null) }, Error)
    assert.throws(function () { format(true) }, Error)
    assert.throws(function () { format(false) }, Error)
  })

  it('should return simple strings as is', function () {
    assert.equal(format(''), '')
    assert.equal(format('test'), 'test')
  })

  it('should merge in remainder arguments', function () {
    assert.equal(format('foo', 'bar', 'baz'), 'foo bar baz')
  })

  it('should process string arguments', function () {
    assert.equal(format('%s', 'foo'), 'foo')
  })

  it('should process number arguments', function () {
    assert.equal(format('%d', 42.0), '42')
    assert.equal(format('%d', 42), '42')
    assert.equal(format('%s', 42), '42')
    assert.equal(format('%j', 42), '42')

    assert.equal(format('%d', '42.0'), '42')
    assert.equal(format('%d', '42'), '42')
    assert.equal(format('%s', '42'), '42')
    assert.equal(format('%j', '42'), '"42"')
  })

  it('should allow for escaping', function () {
    assert.equal(format('%%s%s', 'foo'), '%sfoo')
    assert.equal(format('%%%s%%', 'hi'), '%hi%')
    assert.equal(format('%%%s%%%%', 'hi'), '%hi%%')
  })

  it('should return as is if no arguments present', function () {
    assert.equal(format('%s'), '%s')
    assert.equal(format('%s:%s'), '%s:%s')
  })

  it('should process "undefined" values into strings', function () {
    assert.equal(format('%s', undefined), 'undefined')
  })

  it('should process arguments in sequence', function () {
    assert.equal(format('%s:%s', undefined), 'undefined:%s')
    assert.equal(format('%s:%s', 'foo'), 'foo:%s')
    assert.equal(format('%s:%s', 'foo', 'bar'), 'foo:bar')
    assert.equal(format('%s:%s', 'foo', 'bar', 'baz'), 'foo:bar baz')
  })

  it('should process errors', function () {
    assert.equal(format('foo', new Error('foo')), 'foo [Error: foo]')
  })

  it('should process custom errors', function () {
    function CustomError (msg) {
      Error.call(this)
      Object.defineProperty(this, 'message', { value: msg, enumerable: false })
      Object.defineProperty(this, 'name', { value: 'CustomError', enumerable: false })
    }

    util.inherits(CustomError, Error)

    assert.equal(format('foo', new CustomError('bar')), 'foo [CustomError: bar]')
  })
})
