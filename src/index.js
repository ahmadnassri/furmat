import chalk from 'chalk'
import locals from './locals'
import modifiers from './modifiers'
import placeholders from './placeholders'
import regexp from './regexp'
import util from 'util'

const defaults = {
  chalk: true,
  modifiers: {}
}

export default function (options = {}) {
  // always reset
  defaults.modifiers = {}

  options = Object.assign({}, defaults, options)

  // add chalk modifiers
  if (options.chalk === true) {
    for (let style in chalk.styles) {
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
        output += ' ' + util.inspect(arg)
      }
    })

    return output
  }
}
