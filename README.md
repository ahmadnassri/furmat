# fürmat [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> super powered `printf` & [`util.format`](https://nodejs.org/api/util.html#util_util_format_format) equivalent string formatting, with locals & chainable modifiers.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --save furmat
```

## API

### furmat([options])

- **options** (`Object`, *optional*): configuration object
  - **chalk** (`Boolean`, *optional*): enable/disable [chalk](https://github.com/chalk/chalk) modifiers *Default: true*
  - **locals** (`Object`, *optional*): locals object *(`key => value` pairs)*
  - **modifers** (`Object`, *optional*): modifiers object *(`name => function` pairs)*

Returns: `Function` The string formatting function.

```js
var format = furmat({
  locals: {
    name: 'Ahmad'
  },

  modifiers: {
    capitalize: function (string) { 
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    
    upper: function (string) { 
      return string.toUpperCase()
    },

    first: function (string) {
      return string.charAt(0)
    }
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
var format = furmat({
  modifiers: {
    upper: function (string) { 
      return string.toUpperCase()
    },

    lower: function (string) { 
      return string.toLowerCase()
    }, 

    first: function (string) {
      return string.charAt(0)
    }
  }
})

format('%s:upper | %s:lower', 'this will become upper cased', 'THIS WILL BECOME LOWER CASED')
```

###### output:

```
THIS WILL BECOME UPPER CASED | this will become lower cased
```

you can also chain modifiers:

```js
format('%s:upper:first | %s:lower:first', 'a', 'B')
```

###### output:

```
A | b
```

### [Chalk Styles](https://github.com/chalk/chalk) Modifiers

Fürmat includes Chalk Styles modifiers, which are useful for console logging. *See [`oh-my-log`](https://github.com/ahmadnassri/oh-my-log)*.

###### example

```js
var format = furmat()

format('%s:red', 'this text will be red in the console')
```

you can disable the Chalk modifiers by simply setting the `chalk` option to false:

```js
var format = furmat({
  chalk: false
})

format('%s:red', 'plain text')
```

### Locals

Locals are named variable references that behave in an identical manner to placeholders, but with a pre-defined value set at the time of creating the `furmat` function

###### example

```js
var format = furmat({
  locals: {
    name: 'Slim Shady',
    action: 'please stand up?'
  }
})

format('Will the real %name %action')
```

###### output:

```
Will the real Slim Shady please stand up?
```

you can also attach [`modifiers`](#modifiers) to `locals`:

```js
var format = furmat({
  modifiers: {
    upper: function (value) { 
      return value.toUpperCase()
    },

    lower: function (value) { 
      return value.toLowerCase()
    }
  },

  locals: {
    name: 'Slim Shady',
    action: 'please stand up?'
  }
})

format('Will the real %name:lower %action:upper')
```

###### output:

```
Will the real slim shady PLEASE STAND UP?
```

## License

[ISC License](LICENSE) &copy; [Ahmad Nassri](https://www.ahmadnassri.com/)

[license-url]: https://github.com/ahmadnassri/furmat/blob/master/LICENSE

[travis-url]: https://travis-ci.org/ahmadnassri/furmat
[travis-image]: https://img.shields.io/travis/ahmadnassri/furmat.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/furmat
[npm-license]: https://img.shields.io/npm/l/furmat.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/furmat.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/furmat.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/furmat
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/furmat.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/furmat.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/furmat
[david-image]: https://img.shields.io/david/ahmadnassri/furmat.svg?style=flat-square
