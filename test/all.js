const furmat = require('..')
const { test } = require('tap')

const format = furmat({
  locals: {
    name: 'ahmad'
  },

  modifiers: {
    date: (date) => date.toDateString(),
    upper: (str) => str.toUpperCase()
  }
})

test('allow for locals, variables and placeholders substitutions', (assert) => {
  assert.plan(1)

  let date = new Date()

  let result = format('hello %name:upper, today is %s:date, have a %s day!', date, 'wonderful', '\n', 'bye bye')
  let expected = `hello AHMAD, today is ${date.toDateString()}, have a wonderful day! \n bye bye`

  assert.same(result, expected)
})
