/**!
 * parse-latin
 *
 * Licensed under MIT.
 * Copyright (c) 2014 Titus Wormer <tituswormer@gmail.com>
 */

'use strict';

/**
 * Dependencies.
 */

var parser,
    pluggable,
    expressions;

parser = require('./parser');
pluggable = require('./pluggable');
expressions = require('./expressions');

/**
 * == CLASSIFY ===============================================================
 */

/**
 * Constants.
 */

var EXPRESSION_TOKEN,
    EXPRESSION_WORD,
    EXPRESSION_PUNCTUATION,
    EXPRESSION_WHITE_SPACE;

/**
 * Match all tokens:
 * - One or more number, alphabetic, or
 *   combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same character;
 */

EXPRESSION_TOKEN = expressions.token;

/**
 * Match a word.
 */

EXPRESSION_WORD = expressions.word;

/**
 * Match a string containing ONLY punctuation.
 */

EXPRESSION_PUNCTUATION = expressions.punctuation;

/**
 * Match a string containing ONLY white space.
 */

EXPRESSION_WHITE_SPACE = expressions.whiteSpace;

/**
 * Classify a token.
 *
 * @param {string?} value
 * @return {string} - value's type.
 */

function classify(value) {
    if (EXPRESSION_WHITE_SPACE.test(value)) {
        return 'WhiteSpace';
    }

    if (EXPRESSION_WORD.test(value)) {
        return 'Word';
    }

    if (EXPRESSION_PUNCTUATION.test(value)) {
        return 'Punctuation';
    }

    return 'Symbol';
}

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @param {ParseLatin} parser
 * @param {string?} value
 * @return {Array.<NLCSTNode>}
 */

function tokenize(parser, value) {
    var tokens,
        token,
        start,
        end,
        match;

    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        throw new Error(
            'Illegal invocation: \'' + value + '\'' +
            ' is not a valid argument for \'ParseLatin\''
        );
    }

    tokens = [];

    if (!value) {
        return tokens;
    }

    EXPRESSION_TOKEN.lastIndex = 0;
    start = 0;
    match = EXPRESSION_TOKEN.exec(value);

    while (match) {
        /**
         * Move the pointer over to after its last
         * character.
         */

        end = match.index + match[0].length;

        /**
         * Slice the found content, from (including)
         * start to (not including) end, classify it,
         * and add the result.
         */

        token = value.substring(start, end);

        tokens.push(parser['tokenize' + classify(token)](token));

        match = EXPRESSION_TOKEN.exec(value);

        start = end;
    }

    return tokens;
}

/**
 * Transform Latin-script natural language into
 * an NLCST-tree.
 *
 * @constructor
 */

function ParseLatin() {
    /**
     * TODO: This should later be removed (when this
     * change bubbles through to dependants).
     */

    if (!(this instanceof ParseLatin)) {
        return new ParseLatin();
    }
}

/**
 * Quick access to the prototype.
 */

var parseLatinPrototype;

parseLatinPrototype = ParseLatin.prototype;

/**
 * == TOKENIZE ===============================================================
 */

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @see tokenize
 */

parseLatinPrototype.tokenize = function (value) {
    return tokenize(this, value);
};

/**
 * == TEXT NODES =============================================================
 */

/**
 * Factory to create a `Text`.
 *
 * @param {string?} type
 * @return {function(value): NLCSTText}
 */

function createTextFactory(type) {
    type += 'Node';

    /**
     * Construct a `Text` from a bound `type`
     *
     * @param {value} value
     * @return {NLCSTText}
     */

    return function (value) {
        if (value === null || value === undefined) {
            value = '';
        }

        return {
            'type': type,
            'value': String(value)
        };
    };
}

/**
 * Create a `SymbolNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSymbolNode}
 */

parseLatinPrototype.tokenizeSymbol = createTextFactory('Symbol');

/**
 * Create a `WhiteSpaceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTWhiteSpaceNode}
 */

parseLatinPrototype.tokenizeWhiteSpace = createTextFactory('WhiteSpace');

/**
 * Create a `PunctuationNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTPunctuationNode}
 */

parseLatinPrototype.tokenizePunctuation = createTextFactory('Punctuation');

/**
 * Create a `SourceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSourceNode}
 */

parseLatinPrototype.tokenizeSource = createTextFactory('Source');

/**
 * Create a `TextNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTTextNode}
 */

parseLatinPrototype.tokenizeText = createTextFactory('Text');

/**
 * == PARENT NODES ===========================================================
 *
 * All these nodes are `pluggable`: they come with a
 * `use` method which accepts a plugin
 * (`function(NLCSTNode)`). Every time one of these
 * methods are called, the plugin is invoked with the
 * node, allowing for easy modification.
 *
 * In fact, the internal transformation from `tokenize`
 * (a list of words, white space, punctuation, and
 * symbols) to `tokenizeRoot` (an NLCST tree), is also
 * implemented through this mechanism.
 */

/**
 * Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTWordNode}
 */

parseLatinPrototype.tokenizeWord = pluggable(function (value) {
    return {
        'type': 'WordNode',
        'children': [
            this.tokenizeText(value)
        ]
    };
});

/**
 * Create a `SentenceNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the sentence is
 * populated by `WordNode`s, `SymbolNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTSentenceNode}
 */

parseLatinPrototype.tokenizeSentence = pluggable(parser({
    'type': 'SentenceNode',
    'tokenizer': 'tokenize'
}));

/**
 * Create a `ParagraphNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the paragraph is
 * populated by `SentenceNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTParagraphNode}
 */

parseLatinPrototype.tokenizeParagraph = pluggable(parser({
    'type': 'ParagraphNode',
    'delimiter': expressions.terminalMarker,
    'delimiterType': 'PunctuationNode',
    'tokenizer': 'tokenizeSentence'
}));

/**
 * Create a `RootNode` with its children set to `Node`s,
 * their values set to the tokenized given `value`.
 *
 * Unless plugins add new nodes, the root is populated by
 * `ParagraphNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTRootNode}
 */

parseLatinPrototype.tokenizeRoot = pluggable(parser({
    'type': 'RootNode',
    'delimiter': expressions.newLine,
    'delimiterType': 'WhiteSpaceNode',
    'tokenizer': 'tokenizeParagraph'
}));

/**
 * Easy access to the document parser.
 *
 * @see ParseLatin#tokenizeRoot
 */

parseLatinPrototype.parse = function (value) {
    return this.tokenizeRoot(value);
};

/**
 * == PLUGINS ================================================================
 */

/**
 * Add default `sentence` plugins.
 */

parseLatinPrototype.tokenizeSentence
    .use(require('./plugin/merge-initial-word-symbol'))
    .use(require('./plugin/merge-final-word-symbol'))
    .use(require('./plugin/merge-inner-word-symbol'))
    .use(require('./plugin/merge-initialisms'));

/**
 * Add default `paragraph` plugins.
 */

parseLatinPrototype.tokenizeParagraph
    .use(require('./plugin/merge-non-word-sentences'))
    .use(require('./plugin/merge-affix-symbol'))
    .use(require('./plugin/merge-initial-lower-case-letter-sentences'))
    .use(require('./plugin/merge-prefix-exceptions'))
    .use(require('./plugin/merge-affix-exceptions'))
    .use(require('./plugin/merge-remaining-full-stops'))
    .use(require('./plugin/make-initial-white-space-siblings'))
    .use(require('./plugin/make-final-white-space-siblings'))
    .use(require('./plugin/break-implicit-sentences'))
    .use(require('./plugin/remove-empty-nodes'));

/**
 * Add default `root` plugins.
 */

parseLatinPrototype.tokenizeRoot
    .use(require('./plugin/make-initial-white-space-siblings'))
    .use(require('./plugin/make-final-white-space-siblings'))
    .use(require('./plugin/remove-empty-nodes'));

/**
 * == EXPORT =================================================================
 */

/**
 * Expose `ParseLatin`.
 */

module.exports = ParseLatin;
