const chalk = require('chalk')
const ansi = require('ansi-styles')

const { inspect } = require('util')
const locals = require('./locals')
const modifiers = require('./modifiers')
const placeholders = require('./placeholders')
const regexp = require('./regexp')

const defaults = {
  chalk: true,
  modifiers: {}
}

module.exports = function (options = {}) {
  // always reset
  defaults.modifiers = {}

  options = Object.assign({}, defaults, options)

  // add chalk modifiers
  const styles = [].concat(Object.keys(ansi.modifier), Object.keys(ansi.color), Object.keys(ansi.bgColor))

  if (options.chalk === true) {
    for (let style of styles) {
      options.modifiers[style] = chalk[style]
    }
  }

  // clean up modifiers
  if (options.modifiers) {
    options.modifiers = Object.keys(options.modifiers).reduce((modifiers, name) => {
      if (typeof options.modifiers[name] === 'function') {
        modifiers[name] = options.modifiers[name]
      }

      return modifiers
    }, {})
  }

  const regex = regexp(options)

  // format utility function
  return function format (input, ...args) {
    if (typeof input !== 'string') {
      throw Error('first argument must always be a string')
    }

    if (!options.locals && arguments.length === 1) {
      return input
    }

    let output = ''

    // process with modifiers
    output = modifiers(input, regex.modifiers, options.modifiers, options.locals, args)

    // process locals
    output = locals(output, regex.locals, options.locals)

    // process placeholders
    output = placeholders(output, regex.placeholders, args)

    // attach remaining arguments
    args.forEach((arg) => {
      if (arg === null || (typeof arg !== 'object' && typeof arg !== 'symbol')) {
        output += ' ' + arg
      } else {
        output += ' ' + inspect(arg)
      }
    })

    return output
  }
}
