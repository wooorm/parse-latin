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
    Pc,
    Pd,
    Pe,
    Pf,
    Pi,
    Po,
    Ps,
    whiteSpace,
    combiningDiacriticalMarks;

N = unicode('categories/N');
L = unicode('categories/L');
Ll = unicode('categories/Ll');
M = unicode('categories/M');
Cs = unicode('categories/Cs');
Pc = unicode('categories/Pc');
Pd = unicode('categories/Pd');
Pe = unicode('categories/Pe');
Pf = unicode('categories/Pf');
Pi = unicode('categories/Pi');
Po = unicode('categories/Po');
Ps = unicode('categories/Ps');
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
    PUNCTUATION,
    WHITE_SPACE,
    WORD,
    TERMINAL_MARKER,
    WORD_SYMBOL_INNER,
    WORD_SYMBOL_INNER_MULTI,
    WORD_SYMBOL_INITIAL,
    WORD_SYMBOL_FINAL;

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

PUNCTUATION = regenerate()
    .add(Pc)
    .add(Pd)
    .add(Pe)
    .add(Pf)
    .add(Pi)
    .add(Po)
    .add(Ps)
    /**
     * Remove few weirdly-classified symbols:
     *
     * Source:
     *   http://www.unicode.org/faq/punctuation_symbols.html#4
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
 * Symbols part of surrounding words.
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

WORD_SYMBOL_INNER = regenerate()
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
 * Symbols which can occur multiple times and
 * still be part of surrounding words.
 *
 * Includes:
 *
 * - Slash;
 * - Underscore.
 */

WORD_SYMBOL_INNER_MULTI = regenerate()
    .add('_')
    .add('/');

/**
 * Symbols part of the following word.
 *
 * Includes:
 *
 * - Ampersand;
 */

WORD_SYMBOL_INITIAL = regenerate()
    .add('&');

/**
 * Symbols part of the preceding word.
 *
 * Includes:
 *
 * - Hyphen-minus.
 */

WORD_SYMBOL_FINAL = regenerate()
    .add('-');

var EXPRESSION_AFFIX_SYMBOL,
    EXPRESSION_NEW_LINE,
    EXPRESSION_NEW_LINE_MULTI,
    EXPRESSION_TERMINAL_MARKER,
    EXPRESSION_WORD_SYMBOL_INNER,
    EXPRESSION_WORD_SYMBOL_INITIAL,
    EXPRESSION_WORD_SYMBOL_FINAL,
    EXPRESSION_PUNCTUATION,
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

EXPRESSION_AFFIX_SYMBOL = new RegExp(
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
 * - WORD_SYMBOL_INNER;
 * - WORD_SYMBOL_INNER_MULTI.
 */

EXPRESSION_WORD_SYMBOL_INNER = new RegExp(
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

/**
 * Match punctuation marks part of the following word.
 *
 * See:
 *
 * - WORD_SYMBOL_INITIAL.
 */

EXPRESSION_WORD_SYMBOL_INITIAL = new RegExp(
    '^(?:' + WORD_SYMBOL_INITIAL + ')$'
);

/**
 * Match punctuation marks part of the preceding word.
 *
 * See:
 *
 * - WORD_SYMBOL_FINAL.
 */

EXPRESSION_WORD_SYMBOL_FINAL = new RegExp(
    '^(?:' + WORD_SYMBOL_FINAL + ')$'
);

/**
 * Match punctuation marks.
 *
 * See:
 *
 * - PUNCTUATION.
 */

EXPRESSION_PUNCTUATION = new RegExp(
    '^(?:' + PUNCTUATION + ')+$'
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
        '\'affixSymbol\': ' + EXPRESSION_AFFIX_SYMBOL,
        '\'newLine\': ' + EXPRESSION_NEW_LINE,
        '\'newLineMulti\': ' + EXPRESSION_NEW_LINE_MULTI,
        '\'terminalMarker\': ' + EXPRESSION_TERMINAL_MARKER,
        '\'wordSymbolInner\': ' + EXPRESSION_WORD_SYMBOL_INNER,
        '\'wordSymbolInitial\': ' + EXPRESSION_WORD_SYMBOL_INITIAL,
        '\'wordSymbolFinal\': ' + EXPRESSION_WORD_SYMBOL_FINAL,
        '\'punctuation\': ' + EXPRESSION_PUNCTUATION,
        '\'numerical\': ' + EXPRESSION_NUMERICAL,
        '\'lowerInitial\': ' + EXPRESSION_LOWER_INITIAL,
        '\'token\': ' + EXPRESSION_TOKEN,
        '\'word\': ' + EXPRESSION_WORD,
        '\'whiteSpace\': ' + EXPRESSION_WHITE_SPACE
    ].join(',\n    ') +
    '\n};\n';

fs.writeFileSync('./lib/expressions.js', file);
