'use strict'

var fs = require('fs')
var path = require('path')
var toString = require('nlcst-to-string')
var negate = require('negate')
var hidden = require('is-hidden')
var Latin = require('..')

var root = path.join('test', 'fixture')
var latin = new Latin()

fs
  .readdirSync(root)
  .filter(negate(hidden))
  .forEach(function(name) {
    var doc = fs.readFileSync(path.join(root, name))
    var tree = JSON.parse(doc)
    var fn = 'tokenize' + tree.type.slice(0, tree.type.indexOf('Node'))
    var nlcst

    if (fn === 'tokenizeRoot') {
      fn = 'parse'
    }

    nlcst = latin[fn](toString(tree))
    nlcst = JSON.stringify(nlcst, 0, 2) + '\n'

    fs.writeFileSync(path.join(root, name), nlcst)
  })
