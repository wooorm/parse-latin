#!/usr/bin/env node
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:script:regenerate-fixtures
 * @fileoverview Re-generate fixtures.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var ParseLatin,
    fs,
    toString;

fs = require('fs');
ParseLatin = require('../');
toString = require('nlcst-to-string');

/*
 * Parser.
 */

var latin;

latin = new ParseLatin({
    'position': true
});

/*
 * Find fixtures.
 */

fs.readdirSync('test/fixture').filter(function (name) {
    return name.charAt(0) !== '.';
}).forEach(function (name) {
    var doc,
        json,
        fn,
        nlcst;

    doc = fs.readFileSync('test/fixture/' + name, 'utf8');

    json = JSON.parse(doc);

    fn = 'tokenize' + json.type.slice(0, json.type.indexOf('Node'));

    if (fn === 'tokenizeRoot') {
        fn = 'parse';
    }

    nlcst = latin[fn](toString(json));

    fs.writeFileSync('test/fixture/' + name, JSON.stringify(nlcst, 0, 2));
});
