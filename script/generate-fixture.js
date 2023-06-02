import fs from 'node:fs/promises'
import process from 'node:process'
import {ParseLatin} from '../index.js'

const parser = new ParseLatin()

const parameters = process.argv.splice(2)

if (parameters.length < 2) {
  console.log('Usage:')
  console.log('  npm run fixture name document [method]')
} else {
  const basename = parameters[0]
  const functionName = parameters[2] || 'parse'

  if (
    functionName !== 'parse' &&
    functionName !== 'tokenizeParagraph' &&
    functionName !== 'tokenizeRoot' &&
    functionName !== 'tokenizeSentence'
  ) {
    throw new Error('Expected valid function name')
  }

  const nlcst = parser[functionName](parameters[1])

  await fs.writeFile(
    new URL('../test/fixture/' + basename + '.json', import.meta.url),
    JSON.stringify(nlcst, undefined, 2) + '\n'
  )

  console.log('Wrote `' + basename + '`')
}
