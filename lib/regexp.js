module.exports = function (options = {}) {
  // setup regex rules
  let names = new RegExp()
  let locals = new RegExp()
  let modifiers = new RegExp()
  let placeholders = new RegExp('(?:%[sdj%])', 'g')

  if (options.locals) {
    locals = new RegExp('(?:%(' + Object.keys(options.locals).join('|') + '))', 'g')
  }

  if (options.modifiers) {
    names = new RegExp('(' + Object.keys(options.modifiers).join('|') + ')', 'g')
    modifiers = new RegExp(['(?::', names.source, ')+'].join(''), 'g')
  }

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
