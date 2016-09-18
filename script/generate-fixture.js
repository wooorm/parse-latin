/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:script:generate-fixture
 * @fileoverview Generate fixtures for `parse-latin`.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var ParseLatin = require('..');

/* `ParseLatin`. */
var latin = new ParseLatin();

/* Exit with info on too-few parameters. */
var parameters = process.argv.splice(2);

if (parameters.length < 2) {
  console.log('Usage:');
  console.log('  npm run fixture name document [method]');
} else {
  var filePath = 'test/fixture/' + parameters[0] + '.json';
  var nlcst = latin[parameters[2] || 'parse'](parameters[1]);

  /* Write fixture. */
  fs.writeFileSync(filePath, JSON.stringify(nlcst, 0, 2) + '\n');

  console.log('Wrote file to `' + filePath + '`');
}
