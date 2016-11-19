function Json (obj) {
  try {
    return JSON.stringify(obj)
  } catch (_) {
    return '[Circular]'
  }
}

export default function (input, regex, args) {
  return input.replace(regex, (x) => {
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
