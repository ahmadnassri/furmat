# fürmat [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Downloads][npm-downloads]][npm-url] [![Coverage Status][codeclimate-coverage]][codeclimate-url]

> super powered `printf` & [`util.format`](https://nodejs.org/api/util.html#util_util_format_format) equivalent string formatting, with locals & chainable modifiers.

## Install

```bash
npm install --production --save furmat
```

## API

### furmat([options])

- **options** (`Object`, *optional*): configuration object
  - **chalk** (`Boolean`, *optional*): enable/disable [Chalk](https://github.com/chalk/chalk) modifiers *Default: true*
  - **locals** (`Object`, *optional*): locals object *(`key => value` pairs)*
  - **modifers** (`Object`, *optional*): modifiers object *(`name => function` pairs)*

Returns: `Function` The string formatting function.

```js
const format = furmat({
  locals: {
    name: 'Ahmad'
  },

  modifiers: {
    capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1),
    upper: (string) => string.toUpperCase(),
    first: (string) => string.charAt(0)
  }
})

console.log(format('%s:capitalize %foo:upper:first', 'hello'))
```

the above example should output:

```
Hello A
```

The returned function behaves in an identical manner to [`util.format`](https://nodejs.org/api/util.html#util_util_format_format), with additional abilities to process [`locals`](#locals) & [`modifiers`](#modifiers)

The first argument is a string that contains zero or more *placeholders*. Each placeholder is replaced with the converted value from its corresponding argument. Supported placeholders are:

- `%s` - String.
- `%d` - Number (both integer and float).
- `%j` - JSON. Replaced with the string `'[Circular]'` if the argument contains circular references.
- `%` - single percent sign ('%'). This does not consume an argument.

If the placeholder does not have a corresponding argument, the placeholder is not replaced.

```js
format('%s:%s:bar', 'foo') // 'foo:%s:bar'
```

If there are more arguments than placeholders, the extra arguments are converted to strings with `util.inspect()` and these strings are concatenated, delimited by a space.

```js
format('%s:%s', 'foo', 'bar', 'baz') // 'foo:bar baz'
```

you can add predefined [`locals`](#locals) and modify *placeholders* & *locals* by attaching [`modifiers`](#modifiers):

### Modifiers

Modifiers are references to named functions meant to modify the placeholder,

###### example

```js
const format = furmat({
  modifiers: {
    upper: (string) => string.toUpperCase(),
    lower: (string) => string.toLowerCase(),
    first: (string) => string.charAt(0)
  }
})

format('%s:upper | %s:lower', 'this will become upper cased', 'THIS WILL BECOME LOWER CASED')
```

###### output

```
THIS WILL BECOME UPPER CASED | this will become lower cased
```

you can also chain modifiers:

```js
format('%s:upper:first | %s:lower:first', 'a', 'B')
```

###### output

```
A | b
```

### [Chalk Styles](https://github.com/chalk/chalk) Modifiers

Fürmat includes Chalk Styles modifiers, which are useful for console logging. *See [`oh-my-log`](https://github.com/ahmadnassri/oh-my-log)*.

###### example

```js
const format = furmat()

format('%s:red', 'this text will be red in the console')
```

you can disable the Chalk modifiers by simply setting the `chalk` option to false:

```js
const format = furmat({
  chalk: false
})

format('%s:red', 'plain text')
```

### Locals

Locals are named variable references that behave in an identical manner to placeholders, but with a pre-defined value set at the time of creating the `furmat` function

###### example

```js
const format = furmat({
  locals: {
    name: 'Slim Shady',
    action: 'please stand up?'
  }
})

format('Will the real %name %action')
```

###### output

```
Will the real Slim Shady please stand up?
```

you can also attach [`modifiers`](#modifiers) to `locals`:

```js
const format = furmat({
  modifiers: {
    upper: (value) => value.toUpperCase(),
    lower: (value) => value.toLowerCase()
  },

  locals: {
    name: 'Slim Shady',
    action: 'please stand up?'
  }
})

format('Will the real %name:lower %action:upper')
```

###### output

```
Will the real slim shady PLEASE STAND UP?
```

---
> License: [ISC][license-url] &bull; 
> Copyright: [ahmadnassri.com](https://www.ahmadnassri.com) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/furmat.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/furmat
[travis-image]: https://img.shields.io/travis/ahmadnassri/furmat.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/furmat
[npm-version]: https://img.shields.io/npm/v/furmat.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/furmat.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/furmat
[codeclimate-coverage]: https://api.codeclimate.com/v1/badges/9ed829b3e93e46b50c80/test_coverage?style=flat-square
