import fs from 'node:fs'
import path from 'node:path'
import {toString} from 'nlcst-to-string'
import negate from 'negate'
import {isHidden} from 'is-hidden'
import {ParseLatin} from '../index.js'

const root = path.join('test', 'fixture')
const latin = new ParseLatin()

const files = fs.readdirSync(root).filter(negate(isHidden))
let index = -1

while (++index < files.length) {
  const doc = fs.readFileSync(path.join(root, files[index]))
  const tree = JSON.parse(doc)
  let fn = 'tokenize' + tree.type.slice(0, tree.type.indexOf('Node'))

  if (fn === 'tokenizeRoot') fn = 'parse'

  const nlcst = latin[fn](toString(tree))

  fs.writeFileSync(
    path.join(root, files[index]),
    JSON.stringify(nlcst, null, 2) + '\n'
  )
}
