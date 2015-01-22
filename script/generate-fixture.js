'use strict';

/*
 * Dependencies.
 */

var ParseLatin,
    fs;

ParseLatin = require('../');
fs = require('fs');

/*
 * `ParseLatin`.
 */

var latin;

latin = new ParseLatin();

/*
 * Exit with info on too-few parameters.
 */

var parameters,
    filepath,
    nlcst;

parameters = process.argv.splice(2);

if (parameters.length < 2) {
    console.log('Usage:');
    console.log('  npm run fixture name document [method]');
} else {
    filepath = 'test/fixture/' + parameters[0] + '.json';
    nlcst = latin[parameters[2] || 'parse'](parameters[1]);

    /*
     * Write fixture.
     */

    fs.writeFileSync(filepath, JSON.stringify(nlcst, 0, 2));

    console.log('Wrote file to `' + filepath + '`');
}
