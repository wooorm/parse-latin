import fs from 'node:fs'
import path from 'node:path'
import {toString} from 'nlcst-to-string'
import negate from 'negate'
import {isHidden} from 'is-hidden'
import {ParseLatin} from '../index.js'

var root = path.join('test', 'fixture')
var latin = new ParseLatin()

var files = fs.readdirSync(root).filter(negate(isHidden))
var index = -1
var nlcst
var doc
var tree
var fn

while (++index < files.length) {
  doc = fs.readFileSync(path.join(root, files[index]))
  tree = JSON.parse(doc)
  fn = 'tokenize' + tree.type.slice(0, tree.type.indexOf('Node'))

  if (fn === 'tokenizeRoot') fn = 'parse'

  nlcst = latin[fn](toString(tree))

  fs.writeFileSync(
    path.join(root, files[index]),
    JSON.stringify(nlcst, null, 2) + '\n'
  )
}
