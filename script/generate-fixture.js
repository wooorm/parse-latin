import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import {ParseLatin} from '../index.js'

const latin = new ParseLatin()

const parameters = process.argv.splice(2)

if (parameters.length < 2) {
  console.log('Usage:')
  console.log('  npm run fixture name document [method]')
} else {
  const fp = path.join('test', 'fixture', parameters[0] + '.json')
  const name = parameters[2] || 'parse'

  if (
    name !== 'parse' &&
    name !== 'tokenizeRoot' &&
    name !== 'tokenizeParagraph' &&
    name !== 'tokenizeSentence'
  ) {
    throw new Error('Expected valid parse name')
  }

  const nlcst = latin[name](parameters[1])

  fs.writeFileSync(fp, JSON.stringify(nlcst, null, 2) + '\n')

  console.log('Wrote file to `' + fp + '`')
}
