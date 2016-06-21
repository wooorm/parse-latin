/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:script:build-expressions
 * @fileoverview Generate regexes for `parse-latin`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var fs = require('fs');
var path = require('path');
var regenerate = require('regenerate');

/**
 * Get unicode data.
 *
 * @param {string} path - File-path.
 * @return {*} - A unicode category.
 */
function unicode() {
    var args = [].slice.call(arguments);
    args = ['unicode-8.0.0'].concat(args, 'code-points');
    return require(path.join.apply(null, args));
}

var N = unicode('General_Category', 'Number');
var L = unicode('General_Category', 'Letter');
var Ll = unicode('General_Category', 'Lowercase_Letter');
var M = unicode('General_Category', 'Mark');
var Pc = unicode('General_Category', 'Connector_Punctuation');
var Pd = unicode('General_Category', 'Dash_Punctuation');
var Pe = unicode('General_Category', 'Close_Punctuation');
var Pf = unicode('General_Category', 'Final_Punctuation');
var Pi = unicode('General_Category', 'Initial_Punctuation');
var Po = unicode('General_Category', 'Other_Punctuation');
var Ps = unicode('General_Category', 'Open_Punctuation');
var whiteSpace = unicode('Binary_Property', 'White_Space');
var combiningDiacriticalMarks = unicode('Block', 'Combining_Diacritical_Marks');

/* Character groups. */

var COMBINING_DIACRITICAL_MARK = regenerate()
    .add(combiningDiacriticalMarks);

var COMBINING_NONSPACING_MARK = regenerate()
    .add(M);

var LETTER = regenerate()
    .add(L);

var LETTER_LOWER = regenerate()
    .add(Ll);

var NUMERICAL = regenerate()
    .add(N);

var PUNCTUATION = regenerate()
    .add(Pc)
    .add(Pd)
    .add(Pe)
    .add(Pf)
    .add(Pi)
    .add(Po)
    .add(Ps)

    /* Remove few weirdly-classified symbols:
     *
     * Source: http://www.unicode.org/faq/punctuation_symbols.html#4
     */
    .remove('#')
    .remove('&')
    .remove('@')
    .remove('%')
    .remove('‰')
    .remove('‱')
    .remove('*')
    .remove('†')
    .remove('‡')
    .remove('※');

var PUNCTUATION_CLOSING = regenerate()
    .add(Pe);

var PUNCTUATION_FINAL = regenerate()
    .add(Pf)
    .add('"')
    .add('\'');

var WHITE_SPACE = regenerate()
    .add(whiteSpace);

var WORD = regenerate()
    .add(COMBINING_DIACRITICAL_MARK)
    .add(COMBINING_NONSPACING_MARK)
    .add(LETTER)
    .add(NUMERICAL);

var TERMINAL_MARKER = regenerate()
    .add('.')
    .add(0x203D)
    .add('?')
    .add('!')
    .add(0x2026);

/* Symbols part of surrounding words.
 *
 * Includes:
 *
 * - Hyphen-minus;
 * - At sign;
 * - Question mark;
 * - Equals sign;
 * - Full-stop;
 * - Colon;
 * - Dumb single quote;
 * - Ampersand;
 * - Right single quote;
 * - Soft hyphen;
 * - Hyphen;
 * - Non-breaking hyphen;
 * - Hyphenation point;
 * - Middle dot. */
var WORD_SYMBOL_INNER = regenerate()
    .add('-')
    .add('@')
    .add('?')
    .add('=')
    .add('.')
    .add(':')
    .add('\'')
    .add('&')
    .add(0x2019)
    .add(0x00AD)
    .add(0x00B7)
    .add(0x2010)
    .add(0x2011)
    .add(0x2027);

/* Symbols which can occur multiple times and
 * still be part of surrounding words.
 *
 * Includes: Underscore. */
var WORD_SYMBOL_INNER_MULTI = regenerate()
    .add('_');

/* Match closing or final punctuation, or terminal markers that
 * should still be included in the previous sentence, even though
 * they follow the sentence's terminal marker. */
var EXPRESSION_AFFIX_SYMBOL = new RegExp(
    '^(' +
        PUNCTUATION_CLOSING + '|' +
        PUNCTUATION_FINAL + '|' +
        TERMINAL_MARKER +
    ')\\1*$'
);

/* Match one or more new line characters. */
var EXPRESSION_NEW_LINE = /^(\r?\n|\r)+$/;

/* Match two or more new line characters. */
var EXPRESSION_NEW_LINE_MULTI = /^(\r?\n|\r){2,}$/;

/* Match sentence-ending markers.
 *
 * See `GROUP_TERMINAL_MARKER`. */
var EXPRESSION_TERMINAL_MARKER = new RegExp(
    '^((?:' + TERMINAL_MARKER + ')+)$'
);

/* Match punctuation marks part of surrounding words.
 *
 * See:
 *
 * - WORD_SYMBOL_INNER;
 * - WORD_SYMBOL_INNER_MULTI.
 */
var EXPRESSION_WORD_SYMBOL_INNER = new RegExp(
    '^(' +
        '(?:' +
            WORD_SYMBOL_INNER +
        ')' +
        '|' +
        '(?:' +
            WORD_SYMBOL_INNER_MULTI +
        ')+' +
    ')$'
);

/* Match punctuation marks.
 *
 * See: PUNCTUATION. */
var EXPRESSION_PUNCTUATION = new RegExp(
    '^(?:' + PUNCTUATION + ')+$'
);

/* Match numbers. */
var EXPRESSION_NUMERICAL = new RegExp(
    '^(?:' + NUMERICAL + ')+$'
);

/* Match initial lowercase letter. */
var EXPRESSION_LOWER_INITIAL = new RegExp(
    '^(?:' + LETTER_LOWER + ')'
);

/* Match anything, when possible words, white spaces, or astrals. */
var EXPRESSION_TOKEN = new RegExp(
    '(?:' + WORD + ')+|' +
    '(?:' + WHITE_SPACE + ')+|' +
    '(?:[\\uD800-\\uDFFF])+|' +
    '([\\s\\S])\\1*',
    'g'
);

/* Match a word. */
var EXPRESSION_WORD = new RegExp(
    '^(?:' + WORD + ')+$'
);

/* Match white space. */
var EXPRESSION_WHITE_SPACE = new RegExp(
    '^(?:' + WHITE_SPACE + ')+$'
);

/* Build file. */
var file =
    '/* This module is generated by `script/build-expressions.js` */\n' +
    '\'use strict\';\n' +
    '/* eslint-env commonjs */\n' +
    'module.exports = {\n' +
    '    ' + [
        'affixSymbol: ' + EXPRESSION_AFFIX_SYMBOL,
        'newLine: ' + EXPRESSION_NEW_LINE,
        'newLineMulti: ' + EXPRESSION_NEW_LINE_MULTI,
        'terminalMarker: ' + EXPRESSION_TERMINAL_MARKER,
        'wordSymbolInner: ' + EXPRESSION_WORD_SYMBOL_INNER,
        'punctuation: ' + EXPRESSION_PUNCTUATION,
        'numerical: ' + EXPRESSION_NUMERICAL,
        'lowerInitial: ' + EXPRESSION_LOWER_INITIAL,
        'token: ' + EXPRESSION_TOKEN,
        'word: ' + EXPRESSION_WORD,
        'whiteSpace: ' + EXPRESSION_WHITE_SPACE
    ].join(',\n    ') +
    '\n};\n';

/* Write. */
fs.writeFileSync('./lib/expressions.js', file);
