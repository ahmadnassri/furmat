/* global describe, it */

'use strict'

var assert = require('assert')
var furmat = require('..')

describe('locals', function () {
  var format = furmat({
    locals: {
      foo: 'bar',
      baz: 'foo',
      name: 'ahmad'
    }
  })

  it('should replace simple locals', function () {
    assert.equal(format('%foo'), 'bar')
  })

  it('should allow for repeated locals', function () {
    assert.equal(format('%foo:%foo'), 'bar:bar')
  })

  it('should allow for multiple locals', function () {
    assert.equal(format('%foo:%foo:%baz'), 'bar:bar:foo')
  })
})
