// Dependencies:
var inspect = require('unist-util-inspect');
var Latin = require('./index.js');

// Parse:
var tree = new Latin().parse('A simple sentence.');

// Which, when inspecting, yields:
console.log('txt', inspect.noColor(tree));
