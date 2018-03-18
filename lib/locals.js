module.exports = function (input, regex, locals) {
  if (!locals || locals.length === 0) {
    return input
  }

  return input.replace(regex, (x, name) => locals[name])
}
