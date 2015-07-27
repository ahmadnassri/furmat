'use strict'

var debug = require('debug-log')('furmat')

module.exports = function (options) {
  var opts = options || {}

  // setup regex rules
  var names = new RegExp()
  var locals = new RegExp()
  var modifiers = new RegExp()
  var placeholders = new RegExp('(?:%[sdj%])', 'g')

  if (opts.locals) {
    locals = new RegExp('(?:%(' + Object.keys(opts.locals).join('|') + '))', 'g')
  }

  if (opts.modifiers) {
    names = new RegExp('(' + Object.keys(opts.modifiers).join('|') + ')', 'g')
    modifiers = new RegExp(['(?::', names.source, ')+'].join(''), 'g')
  }

  debug('regex:locals', locals.toString())
  debug('regex:modifiers', modifiers.toString())

  return {
    locals: locals,
    placeholders: placeholders,
    modifiers: {
      names: names,
      locals: new RegExp([locals.source, modifiers.source].join(''), 'g'),
      placeholders: new RegExp([placeholders.source, modifiers.source].join(''), 'g')
    }
  }
}
