const regexp = require('../lib/regexp')
const { test } = require('tap')

test('regexp', assert => {
  assert.plan(1)

  // use default options
  const found = regexp()
  const wanted = { locals: /(?:)/,
    placeholders: /(?:%[sdj%])/g,
    modifiers: {
      names: /(?:)/,
      locals: /(?:)(?:)/g,
      placeholders: /(?:%[sdj%])(?:)/g
    }
  }

  assert.same(found, wanted)
})
