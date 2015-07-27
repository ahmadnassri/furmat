/* global describe, it */

'use strict'

var assert = require('assert')
var furmat = require('..')

describe('all together', function () {
  var format = furmat({
    locals: {
      name: 'ahmad'
    },

    modifiers: {
      date: function (date) {
        return date.toDateString()
      },

      upper: function (str) {
        return str.toUpperCase()
      }
    }
  })

  it('should allow for locals, variables and placeholders substitutions', function () {
    var date = new Date()
    assert.equal(format('hello %name:upper, today is %s:date, have a %s day!', date, 'wonderful', '\n', 'bye bye'), 'hello AHMAD, today is ' + date.toDateString() + ', have a wonderful day! \n bye bye')
  })
})
