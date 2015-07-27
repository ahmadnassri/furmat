'use strict'

var debug = require('debug-log')('furmat')

module.exports = function (input, regex, locals) {
  if (!locals || locals.length === 0) {
    return input
  }

  return input.replace(regex, function (x, name) {
    debug('found:locals %s on %s', name, x)

    return locals[name]
  })
}
