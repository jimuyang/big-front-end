'use strict'

var input = {
    red: true
}
var rule = new Function('input', "if (input.red == true) { return 'red';} else {return 'not red';}")
console.log(rule(input))