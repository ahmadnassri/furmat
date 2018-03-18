function Json (obj) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    return '[Circular]'
  }
}

module.exports = function (input, regex, args) {
  return input.replace(regex, (x) => {
    if (x === '%%') return '%'

    if (args.length) {
      let value = args.shift()

      switch (x) {
        case '%s': return String(value)
        case '%d': return Number(value)
        case '%j': return Json(value)
      }
    }

    return x
  })
}
