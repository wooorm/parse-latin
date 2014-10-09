'use strict';

/**
 * Dependencies.
 */

var regenerate,
    fs;

regenerate = require('regenerate');
fs = require('fs');

/**
 * Get unicode data.
 */

function unicode(path) {
    return require('unicode-7.0.0/' + path + '/code-points');
}

var N,
    L,
    Ll,
    M,
    Cs,
    Pe,
    Pf,
    whiteSpace,
    combiningDiacriticalMarks;

N = unicode('categories/N');
L = unicode('categories/L');
Ll = unicode('categories/Ll');
M = unicode('categories/M');
Cs = unicode('categories/Cs');
Pe = unicode('categories/Pe');
Pf = unicode('categories/Pf');
whiteSpace = unicode('properties/White_Space');
combiningDiacriticalMarks = unicode('blocks/Combining Diacritical Marks');

/**
 * Character groups.
 */

var ASTRAL,
    COMBINING_DIACRITICAL_MARK,
    COMBINING_NONSPACING_MARK,
    LETTER,
    LETTER_LOWER,
    NUMERICAL,
    PUNCTUATION_CLOSING,
    PUNCTUATION_FINAL,
    WHITE_SPACE,
    WORD,
    TERMINAL_MARKER,
    WORD_PUNCTUATION_INNER,
    WORD_PUNCTUATION_INNER_MULTI,
    WORD_PUNCTUATION_INITIAL,
    WORD_PUNCTUATION_FINAL;

ASTRAL = regenerate()
    .add(Cs);

COMBINING_DIACRITICAL_MARK = regenerate()
    .add(combiningDiacriticalMarks);

COMBINING_NONSPACING_MARK = regenerate()
    .add(M);

LETTER = regenerate()
    .add(L);

LETTER_LOWER = regenerate()
    .add(Ll);

NUMERICAL = regenerate()
    .add(N);

PUNCTUATION_CLOSING = regenerate()
    .add(Pe);

PUNCTUATION_FINAL = regenerate()
    .add(Pf)
    .add('"')
    .add('\'');

WHITE_SPACE = regenerate()
    .add(whiteSpace);

WORD = regenerate()
    .add(COMBINING_DIACRITICAL_MARK)
    .add(COMBINING_NONSPACING_MARK)
    .add(LETTER)
    .add(NUMERICAL);

TERMINAL_MARKER = regenerate()
    .add('.')
    .add(0x203D)
    .add('?')
    .add('!')
    .add(0x2026);

/**
 * Punctuation marks part of surrounding words.
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
 * - Middle dot.
 */

WORD_PUNCTUATION_INNER = regenerate()
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

/**
 * Punctuation marks which can occur multiple times and
 * still be part of surrounding words.
 *
 * Includes:
 *
 * - Slash;
 * - Underscore.
 */

WORD_PUNCTUATION_INNER_MULTI = regenerate()
    .add('_')
    .add('/');

/**
 * Punctuation marks part of the following word.
 *
 * Includes:
 *
 * - Ampersand;
 */

WORD_PUNCTUATION_INITIAL = regenerate()
    .add('&');

/**
 * Punctuation marks part of the preceding word.
 *
 * Includes:
 *
 * - Hyphen-minus.
 */

WORD_PUNCTUATION_FINAL = regenerate()
    .add('-');

var EXPRESSION_AFFIX_PUNCTUATION,
    EXPRESSION_NEW_LINE,
    EXPRESSION_NEW_LINE_MULTI,
    EXPRESSION_TERMINAL_MARKER,
    EXPRESSION_WORD_PUNCTUATION_INNER,
    EXPRESSION_WORD_PUNCTUATION_INITIAL,
    EXPRESSION_WORD_PUNCTUATION_FINAL,
    EXPRESSION_NUMERICAL,
    EXPRESSION_LOWER_INITIAL,
    EXPRESSION_TOKEN,
    EXPRESSION_WORD,
    EXPRESSION_WHITE_SPACE;

/**
 * Match closing or final punctuation, or terminal markers that should
 * still be included in the previous sentence, even though they follow
 * the sentence's terminal marker.
 */

EXPRESSION_AFFIX_PUNCTUATION = new RegExp(
    '^(' +
        PUNCTUATION_CLOSING + '|' +
        PUNCTUATION_FINAL + '|' +
        TERMINAL_MARKER +
    ')\\1*$'
);

/**
 * Match one or more new line characters.
 */

EXPRESSION_NEW_LINE = /^(\r?\n|\r)+$/;

/**
 * Match two or more new line characters.
 */

EXPRESSION_NEW_LINE_MULTI = /^(\r?\n|\r){2,}$/;

/**
 * Match sentence-ending markers.
 *
 * See `GROUP_TERMINAL_MARKER`.
 */

EXPRESSION_TERMINAL_MARKER = new RegExp(
    '^((?:' + TERMINAL_MARKER + ')+)$'
);

/**
 * Match punctuation marks part of surrounding words.
 *
 * See:
 *
 * - WORD_PUNCTUATION_INNER;
 * - WORD_PUNCTUATION_INNER_MULTI.
 */

EXPRESSION_WORD_PUNCTUATION_INNER = new RegExp(
    '^(' +
        '(?:' +
            WORD_PUNCTUATION_INNER +
        ')' +
        '|' +
        '(?:' +
            WORD_PUNCTUATION_INNER_MULTI +
        ')+' +
    ')$'
);

/**
 * Match punctuation marks part of the following word.
 *
 * See:
 *
 * - WORD_PUNCTUATION_INITIAL.
 */

EXPRESSION_WORD_PUNCTUATION_INITIAL = new RegExp(
    '^(?:' + WORD_PUNCTUATION_INITIAL + ')$'
);

/**
 * Match punctuation marks part of the preceding word.
 *
 * See:
 *
 * - WORD_PUNCTUATION_FINAL.
 */

EXPRESSION_WORD_PUNCTUATION_FINAL = new RegExp(
    '^(?:' + WORD_PUNCTUATION_FINAL + ')$'
);

/**
 * Match numbers.
 */

EXPRESSION_NUMERICAL = new RegExp(
    '^(?:' + NUMERICAL + ')+$'
);

/**
 * Match initial lowercase letter.
 */

EXPRESSION_LOWER_INITIAL = new RegExp(
    '^(?:' + LETTER_LOWER + ')'
);

/**
 * Match anything, when possible words, white spaces, or astrals.
 */

EXPRESSION_TOKEN = new RegExp(
    '(?:' + WORD + ')+|' +
    '(?:' + WHITE_SPACE + ')+|' +
    '(?:' + ASTRAL + ')+|' +
    '([\\s\\S])\\1*',
    'g'
);

/**
 * Match a word.
 */

EXPRESSION_WORD = new RegExp(
    '^(?:' + WORD + ')+$'
);

/**
 * Match white space.
 */

EXPRESSION_WHITE_SPACE = new RegExp(
    '^(?:' + WHITE_SPACE + ')+$'
);

var file;

file =
    'module.exports = {\n' +
    '    ' + [
        '\'affixPunctuation\' : ' + EXPRESSION_AFFIX_PUNCTUATION,
        '\'newLine\' : ' + EXPRESSION_NEW_LINE,
        '\'newLineMulti\' : ' + EXPRESSION_NEW_LINE_MULTI,
        '\'terminalMarker\' : ' + EXPRESSION_TERMINAL_MARKER,
        '\'wordPunctuationInner\' : ' + EXPRESSION_WORD_PUNCTUATION_INNER,
        '\'wordPunctuationInitial\' : ' + EXPRESSION_WORD_PUNCTUATION_INITIAL,
        '\'wordPunctuationFinal\' : ' + EXPRESSION_WORD_PUNCTUATION_FINAL,
        '\'numerical\' : ' + EXPRESSION_NUMERICAL,
        '\'lowerInitial\' : ' + EXPRESSION_LOWER_INITIAL,
        '\'token\' : ' + EXPRESSION_TOKEN,
        '\'word\' : ' + EXPRESSION_WORD,
        '\'whiteSpace\' : ' + EXPRESSION_WHITE_SPACE
    ].join(',\n    ') +
    '\n};\n';

fs.writeFileSync('./lib/expressions.js', file);
