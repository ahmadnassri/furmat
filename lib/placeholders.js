'use strict'

function Json (obj) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    return '[Circular]'
  }
}

module.exports = function (input, regex, args) {
  return input.replace(regex, function (x) {
    if (x === '%%') return '%'

    if (args.length) {
      switch (x) {
        case '%s': return String(args.shift())
        case '%d': return Number(args.shift())
        case '%j': return Json(args.shift())
      }
    }

    return x
  })
}
