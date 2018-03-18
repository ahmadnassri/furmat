const furmat = require('..')
const { test } = require('tap')

const format = furmat({
  locals: {
    foo: 'bar',
    baz: 'foo',
    name: 'ahmad'
  }
})

test('replace simple locals', (assert) => {
  assert.plan(1)

  assert.equal(format('%foo'), 'bar')
})

test('allow for repeated locals', (assert) => {
  assert.plan(1)

  assert.equal(format('%foo:%foo'), 'bar:bar')
})

test('allow for multiple locals', (assert) => {
  assert.plan(1)

  assert.equal(format('%foo:%foo:%baz'), 'bar:bar:foo')
})
