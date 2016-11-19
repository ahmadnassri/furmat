import furmat from '../src'
import { inherits } from 'util'
import { test } from 'tap'

const format = furmat()

test('fail if first argument is not a string', (assert) => {
  assert.plan(6)

  assert.throws(format, Error)
  assert.throws(function () { format([]) }, Error)
  assert.throws(function () { format({}) }, Error)
  assert.throws(function () { format(null) }, Error)
  assert.throws(function () { format(true) }, Error)
  assert.throws(function () { format(false) }, Error)
})

test('return simple strings as is', (assert) => {
  assert.plan(2)

  assert.equal(format(''), '')
  assert.equal(format('test'), 'test')
})

test('merge in remainder arguments', (assert) => {
  assert.plan(1)

  assert.equal(format('foo', 'bar', 'baz'), 'foo bar baz')
})

test('process string arguments', (assert) => {
  assert.plan(1)

  assert.equal(format('%s', 'foo'), 'foo')
})

test('be safe from circular serialization', (assert) => {
  assert.plan(1)

  let o = {}
  o.o = o

  assert.equal(format('%j', o), '[Circular]')
})

test('process number arguments', (assert) => {
  assert.plan(8)

  assert.equal(format('%d', 42.0), '42')
  assert.equal(format('%d', 42), '42')
  assert.equal(format('%s', 42), '42')
  assert.equal(format('%j', 42), '42')

  assert.equal(format('%d', '42.0'), '42')
  assert.equal(format('%d', '42'), '42')
  assert.equal(format('%s', '42'), '42')
  assert.equal(format('%j', '42'), '"42"')
})

test('allow for escaping', (assert) => {
  assert.plan(3)

  assert.equal(format('%%s%s', 'foo'), '%sfoo')
  assert.equal(format('%%%s%%', 'hi'), '%hi%')
  assert.equal(format('%%%s%%%%', 'hi'), '%hi%%')
})

test('return as is if no arguments present', (assert) => {
  assert.plan(2)

  assert.equal(format('%s'), '%s')
  assert.equal(format('%s:%s'), '%s:%s')
})

test('process "undefined" values into strings', (assert) => {
  assert.plan(1)

  assert.equal(format('%s', undefined), 'undefined')
})

test('process arguments in sequence', (assert) => {
  assert.plan(4)

  assert.equal(format('%s:%s', undefined), 'undefined:%s')
  assert.equal(format('%s:%s', 'foo'), 'foo:%s')
  assert.equal(format('%s:%s', 'foo', 'bar'), 'foo:bar')
  assert.equal(format('%s:%s', 'foo', 'bar', 'baz'), 'foo:bar baz')
})

test('process errors', (assert) => {
  assert.plan(1)

  assert.equal(format('foo', new Error('foo')), 'foo [Error: foo]')
})

test('process custom errors', (assert) => {
  assert.plan(1)

  function CustomError (msg) {
    Error.call(this)
    Object.defineProperty(this, 'message', { value: msg, enumerable: false })
    Object.defineProperty(this, 'name', { value: 'CustomError', enumerable: false })
  }

  inherits(CustomError, Error)

  assert.equal(format('foo', new CustomError('bar')), 'foo [CustomError: bar]')
})
