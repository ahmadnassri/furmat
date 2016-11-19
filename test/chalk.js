import furmat from '../src'
import { test } from 'tap'

const format = furmat({
  locals: {
    name: 'ahmad'
  }
})

test('use chalk styles', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:blue', 'foo'), '\u001b[34mfoo\u001b[39m')
})

test('chain chalk styles', (assert) => {
  assert.plan(1)

  assert.equal(format('%s:blue:bold', 'foo'), '\u001b[1m\u001b[34mfoo\u001b[39m\u001b[22m')
})

test('apply locals with chalk styles', (assert) => {
  assert.plan(1)

  assert.equal(format('name: %name:blue:bold'), 'name: \u001b[1m\u001b[34mahmad\u001b[39m\u001b[22m')
})

test('skip chalk when disabled', (assert) => {
  assert.plan(1)

  let format2 = furmat({
    chalk: false
  })

  assert.equal(format2('%s:blue', 'foo'), 'foo:blue')
})
