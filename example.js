// Dependencies:
var inspect = require('unist-util-inspect');
var ParseLatin = require('./index.js');
var latin = new ParseLatin();

// Invoking `parse`:
var ast = latin.parse('A simple sentence.');

// Yields:
console.log('txt', inspect.noColor(ast));
