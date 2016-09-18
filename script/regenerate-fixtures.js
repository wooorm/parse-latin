/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:script:regenerate-fixtures
 * @fileoverview Re-generate fixtures.
 */

'use strict';

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var hidden = require('is-hidden');
var negate = require('negate');
var toString = require('nlcst-to-string');
var ParseLatin = require('..');

/* Parser. */
var latin = new ParseLatin();

var root = path.join('test', 'fixture');

/* Find fixtures. */
fs.readdirSync(root)
  .filter(negate(hidden))
  .forEach(function (name) {
    var filePath = path.join(root, name);
    var doc = fs.readFileSync(filePath);
    var json = JSON.parse(doc);
    var fn = 'tokenize' + json.type.slice(0, json.type.indexOf('Node'));
    var nlcst;

    if (fn === 'tokenizeRoot') {
      fn = 'parse';
    }

    nlcst = latin[fn](toString(json));
    nlcst = JSON.stringify(nlcst, 0, 2);

    fs.writeFileSync(filePath, nlcst + '\n');
  });
