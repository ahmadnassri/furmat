import furmat from '../src'
import { test } from 'tap'

const format = furmat({
  locals: {
    name: 'ahmad'
  },

  modifiers: {
    upper: (value) => value.toUpperCase(),
    char: (value) => value.charAt(0),
    invalid: 'bar'
  }
})

test('use modifier', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:upper', 'foo'), 'FOO')
})

test('skip unknown modifier', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:foo', 'foo'), 'foo:foo')
})

test('skip invalid modifier', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:foo', 'foo'), 'foo:foo')
})

test('chain modifiers', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:upper:char', 'foo'), 'F')
})

test('apply locals with modifiers', (assert) => {
  assert.plan(1)

  assert.equal(format('name: %name, first: %name:char:upper'), 'name: ahmad, first: A')
})
