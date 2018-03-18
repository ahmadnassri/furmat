module.exports = function (input, regex, modifiers, locals, args) {
  if (!modifiers || Object.keys(modifiers).length === 0) {
    return input
  }

  return input
    .replace(regex.placeholders, (match, name) => {
      let value = args.shift()

      match.replace(regex.names, (x, name) => (value = modifiers[name].call(null, value)))

      return value
    })

    .replace(regex.locals, (match, local) => {
      let value = locals[local]

      match.replace(regex.names, (x, name) => (value = modifiers[name].call(null, value)))

      return value
    })
}
