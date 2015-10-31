'use strict'

var chalk = require('chalk')
var locals = require('./locals')
var modifiers = require('./modifiers')
var placeholders = require('./placeholders')
var regexp = require('./regexp')
var util = require('util')

var furmat = function (options) {
  var opts = options || {}

  // create object if none exists
  opts.modifiers = opts.modifiers || {}

  // add chalk modifiers
  if (opts.chalk !== false) {
    Object.keys(chalk.styles).forEach(function (style) {
      opts.modifiers[style] = function (string) {
        return chalk[style].call(null, string)
      }
    })
  }

  // clean up modifiers
  if (opts.modifiers) {
    opts.modifiers = Object.keys(opts.modifiers).reduce(function (modifiers, name) {
      if (typeof opts.modifiers[name] === 'function') {
        modifiers[name] = opts.modifiers[name]
      }

      return modifiers
    }, {})
  }

  var regex = regexp(opts)

  // format utility function
  return function format (input) {
    var args = Array.prototype.slice.call(arguments).slice(1)

    if (typeof input !== 'string') {
      throw Error('first argument must always be a string')
    }

    if (!opts.locals && arguments.length === 1) {
      return input
    }

    // process with modifiers
    var output = modifiers(input, regex.modifiers, opts.modifiers, opts.locals, args)

    // process locals
    output = locals(output, regex.locals, opts.locals)

    // process placeholders
    output = placeholders(output, regex.placeholders, args)

    // attach remaining arguments
    args.forEach(function (arg) {
      if (arg === null || (typeof arg !== 'object' && typeof arg !== 'symbol')) {
        output += ' ' + arg
      } else {
        output += ' ' + util.inspect(arg)
      }
    })

    return output
  }
}

module.exports = furmat
