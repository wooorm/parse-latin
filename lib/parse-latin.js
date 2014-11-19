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
    expressions,
    pluginFactory,
    modifierFactory;

parser = require('./parser');
expressions = require('./expressions');
pluginFactory = require('./plugin');
modifierFactory = require('./modifier');

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
 * == PARSE LATIN ============================================================
 */

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
 * @param {Function} Constructor
 * @param {string} key
 * @param {function(*): undefined} callback
 * @return {undefined}
 */

function pluggable(Constructor, key, callback) {
    var wareKey;

    wareKey = key + 'Plugins';

    Constructor.prototype[key] = function () {
        var self,
            result,
            plugins,
            index;

        self = this;

        result = callback.apply(self, arguments);

        plugins = self[wareKey];

        if (plugins) {
            index = -1;

            while (plugins[++index]) {
                plugins[index](result);
            }
        }

        return result;
    };
}

/**
 * Factory to inject `plugins`. Takes `callback` for
 * the actual inserting.
 *
 * @param {fucntion(Object, string, Array.<Function>)} callback
 * @return {function(string, Array.<Function>)}
 */

function useFactory(callback) {
    /**
     * Validate if `plugins` can be inserted. Invokes
     * the bound `callback` to do the actual inserting.
     *
     * @param {string} key - Method to inject on
     * @param {Array.<Function>|Function} plugins - One
     *   or more plugins.
     */

    return function (key, plugins) {
        var self,
            wareKey;

        self = this;

        /**
         * Throw if the method is not pluggable.
         */

        if (!(key in self)) {
            throw new Error(
                'Illegal Invocation: Unsupported `key` for ' +
                '`use(key, plugins)`. Make sure `key` is a ' +
                'supported function'
            );
        }

        /**
         * Fail silently when no plugins are given.
         */

        if (!plugins) {
            return;
        }

        wareKey = key + 'Plugins';

        /**
         * Make sure `plugins` is a list.
         */

        if (typeof plugins === 'function') {
            plugins = [plugins];
        } else {
            plugins = plugins.concat();
        }

        /**
         * Make sure `wareKey` exists.
         */

        if (!self[wareKey]) {
            self[wareKey] = [];
        }

        /**
         * Invoke callback with the ware key and plugins.
         */

        callback(self, wareKey, plugins);
    };
}

/**
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

parseLatinPrototype.use = useFactory(function (context, key, plugins) {
    context[key] = context[key].concat(plugins);
});

/**
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context, before any other.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

parseLatinPrototype.useFirst = useFactory(function (context, key, plugins) {
    context[key] = plugins.concat(context[key]);
});

/**
 * Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTWordNode}
 */

pluggable(ParseLatin, 'tokenizeWord', function (value) {
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

pluggable(ParseLatin, 'tokenizeSentence', parser({
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

pluggable(ParseLatin, 'tokenizeParagraph', parser({
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

pluggable(ParseLatin, 'tokenizeRoot', parser({
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

parseLatinPrototype.use('tokenizeSentence', [
    require('./plugin/merge-initial-word-symbol'),
    require('./plugin/merge-final-word-symbol'),
    require('./plugin/merge-inner-word-symbol'),
    require('./plugin/merge-initialisms')
]);

parseLatinPrototype.use('tokenizeParagraph', [
    require('./plugin/merge-non-word-sentences'),
    require('./plugin/merge-affix-symbol'),
    require('./plugin/merge-initial-lower-case-letter-sentences'),
    require('./plugin/merge-prefix-exceptions'),
    require('./plugin/merge-affix-exceptions'),
    require('./plugin/merge-remaining-full-stops'),
    require('./plugin/make-initial-white-space-siblings'),
    require('./plugin/make-final-white-space-siblings'),
    require('./plugin/break-implicit-sentences'),
    require('./plugin/remove-empty-nodes')
]);

parseLatinPrototype.use('tokenizeRoot', [
    require('./plugin/make-initial-white-space-siblings'),
    require('./plugin/make-final-white-space-siblings'),
    require('./plugin/remove-empty-nodes')
]);

/**
 * == EXPORT =================================================================
 */

/**
 * Expose `ParseLatin`.
 */

module.exports = ParseLatin;

/**
 * Expose `pluginFactory` on `ParseLatin` as `plugin`.
 */

ParseLatin.plugin = pluginFactory;

/**
 * Expose `modifierFactory` on `ParseLatin` as `modifier`.
 */

ParseLatin.modifier = modifierFactory;
