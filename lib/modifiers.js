'use strict'

var debug = require('debug-log')('furmat')

module.exports = function (input, regex, modifiers, locals, args) {
  if (!modifiers || Object.keys(modifiers).length === 0) {
    return input
  }

  return input
    .replace(regex.placeholders, function (match, name) {
      var value = args.shift()

      match.replace(regex.names, function (x, name) {
        debug('found:modifier %s on %s', name, x)

        value = modifiers[name](value)
      })

      return value
    })

    .replace(regex.locals, function (match, local) {
      var value = locals[local]

      match.replace(regex.names, function (x, name) {
        debug('found:modifier %s on %s', name, x)

        value = modifiers[name](value)
      })

      return value
    })
}
