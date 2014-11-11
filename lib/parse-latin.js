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

var nlcstToString,
    expressions;

nlcstToString = require('nlcst-to-string');
expressions = require('./expressions');

/**
 * Expressions.
 */

var EXPRESSION_ABBREVIATION_PREFIX,
    EXPRESSION_NEW_LINE,
    EXPRESSION_MULTI_NEW_LINE,
    EXPRESSION_AFFIX_SYMBOL,
    EXPRESSION_INNER_WORD_SYMBOL,
    EXPRESSION_INITIAL_WORD_SYMBOL,
    EXPRESSION_FINAL_WORD_SYMBOL,
    EXPRESSION_LOWER_INITIAL,
    EXPRESSION_NUMERICAL,
    EXPRESSION_TERMINAL_MARKER;

/**
 * Blacklist of full stop characters that should not be treated as
 * terminal sentence markers: A case-insensitive abbreviation.
 */

EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '^(' +
        '[0-9]+|' +
        '[a-z]|' +

        /**
         * Common Latin Abbreviations:
         * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
         * Where only the abbreviations written without joining full stops,
         * but with a final full stop, were extracted.
         *
         * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
         * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
         * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
         * sic erat scriptum, (et) sequentia, statim, videlicet.
         */

        'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
        'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
);

/**
 * Closing or final punctuation, or terminal markers that should
 * still be included in the previous sentence, even though they follow
 * the sentence's terminal marker.
 */

EXPRESSION_AFFIX_SYMBOL = expressions.affixSymbol;

/**
 * One or more new line characters.
 */

EXPRESSION_NEW_LINE = expressions.newLine;

/**
 * Two or more new line characters.
 */

EXPRESSION_MULTI_NEW_LINE = expressions.newLineMulti;

/**
 * Sentence-ending markers.
 */

EXPRESSION_TERMINAL_MARKER = expressions.terminalMarker;

/**
 * Symbols part of surrounding words.
 */

EXPRESSION_INNER_WORD_SYMBOL = expressions.wordSymbolInner;

/**
 * Symbols part of the following word.
 */

EXPRESSION_INITIAL_WORD_SYMBOL = expressions.wordSymbolInitial;

/**
 * Symbols part of the preceding word.
 */

EXPRESSION_FINAL_WORD_SYMBOL = expressions.wordSymbolFinal;

/**
 * Numbers.
 */

EXPRESSION_NUMERICAL = expressions.numerical;

/**
 * Initial lowercase letter.
 */

EXPRESSION_LOWER_INITIAL = expressions.lowerInitial;

/**
 * Apply modifiers on a token.
 *
 * @param {Array.<Function>} modifiers
 * @param {Object} parent
 */

function modify(modifiers, parent) {
    var length,
        index,
        modifier,
        pointer,
        result,
        children;

    length = modifiers.length;
    index = -1;

    while (++index < length) {
        modifier = modifiers[index];
        pointer = -1;

        children = parent.children;

        while (children[++pointer]) {
            result = modifier(children[pointer], pointer, parent);

            /**
             * If `modifier` returns a `number`, move `pointer` over to
             * `number`.
             */

            if (typeof result === 'number') {
                /**
                 * Make sure that negative numbers do not
                 * break the loop.
                 */

                if (pointer < 0) {
                    pointer = 0;
                }

                pointer = result - 1;
            }
        }
    }
}

/**
 * Create a (modifiable) tokenizer.
 *
 * @param {Object} context - The class to attach to.
 * @param {Object} options - The settings to use.
 * @param {string} options.name - The name of the method.
 * @param {string} options.type - The type of parent node to create.
 * @param {string} options.tokenizer - The property where the child
 *   tokenizer lives.
 * @param {Array.<Function>} options.modifiers - The initial modifiers to
 *   apply on each parse.
 * @param {RegExp} options.delimiter - The delimiter to break children at.
 * @return {Function} - The tokenizer.
 */

function tokenizerFactory(context, options) {
    var name;

    name = options.name;

    context.prototype[name + 'Modifiers'] = options.modifiers;
    context.prototype[name + 'Delimiter'] = options.delimiter;

    return function (value) {
        var delimiter,
            lastIndex,
            children,
            index,
            length,
            root,
            start,
            stem,
            tokens;

        delimiter = this[name + 'Delimiter'];

        root = {
            'type': options.type,
            'children': []
        };

        children = root.children;

        stem = this[options.tokenizer](value);
        tokens = stem.children;

        length = tokens.length;
        lastIndex = length - 1;
        index = -1;
        start = 0;

        while (++index < length) {
            if (
                index !== lastIndex &&
                !delimiter.test(nlcstToString(tokens[index]))
            ) {
                continue;
            }

            children.push({
                'type': stem.type,
                'children': tokens.slice(start, index + 1)
            });

            start = index + 1;
        }

        modify(this[name + 'Modifiers'], root);

        return root;
    };
}

/**
 * Merge certain punctuation marks into their
 * following words.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeInitialWordSymbol(child, index, parent) {
    var children,
        next;

    if (
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        ) ||
        !EXPRESSION_INITIAL_WORD_SYMBOL.test(nlcstToString(child))
    ) {
        return;
    }

    children = parent.children;
    next = children[index + 1];

    /**
     * If either a previous word, or no following word,
     * exists, exit early.
     */

    if (
        (
            index !== 0 &&
            children[index - 1].type === 'WordNode'
        ) ||
        !(
            next &&
            next.type === 'WordNode'
        )
    ) {
        return;
    }

    /**
     * Remove `child` from parent.
     */

    children.splice(index, 1);

    /**
     * Add the punctuation mark at the start of the
     * next node.
     */

    next.children.unshift(child);

    /**
     * Next, iterate over the node at the previous
     * position, as it's now adjacent to a following
     * word.
     */

    return index - 1;
}

/**
 * Merge certain punctuation marks into their
 * preceding words.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeFinalWordSymbol(child, index, parent) {
    var children,
        prev,
        next;

    if (
        index === 0 ||
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        ) ||
        !EXPRESSION_FINAL_WORD_SYMBOL.test(nlcstToString(child))
    ) {
        return;
    }

    children = parent.children;
    prev = children[index - 1];
    next = children[index + 1];

    if (
        (
            next &&
            next.type === 'WordNode'
        ) ||
        !(
            prev &&
            prev.type === 'WordNode'
        )
    ) {
        return;
    }

    /**
     * Remove `child` from parent.
     */

    children.splice(index, 1);

    /**
     * Add the punctuation mark at the end of the
     * previous node.
     */

    prev.children.push(child);

    /**
     * Next, iterate over the node *now* at the current
     * position (which was the next node).
     */

    return index;
}

/**
 * Merge two words surrounding certain punctuation marks.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeInnerWordSymbol(child, index, parent) {
    var children,
        prev,
        otherChild,
        position,
        tokens,
        queue;

    if (
        index === 0 ||
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        )
    ) {
        return;
    }

    children = parent.children;
    prev = children[index - 1];

    if (!prev || prev.type !== 'WordNode') {
        return;
    }

    position = index - 1;
    tokens = [];
    queue = [];

    /**
     * - If a token which is neither word nor inner word
     *   punctuation is found, the loop is broken.
     * - If an inner word punctuation mark is found, it's
     *   queued.
     * - If a word is found, it's queued (and the queue
     *   stored and emptied).
     */

    while (children[++position]) {
        otherChild = children[position];

        if (otherChild.type === 'WordNode') {
            tokens = tokens.concat(queue, otherChild.children);
            queue = [];

            continue;
        }

        if (
            (
                otherChild.type === 'SymbolNode' ||
                otherChild.type === 'PunctuationNode'
            ) &&
            EXPRESSION_INNER_WORD_SYMBOL.test(nlcstToString(otherChild))
        ) {
            queue.push(otherChild);

            continue;
        }

        break;
    }

    /**
     * If no tokens were found, exit.
     */

    if (!tokens.length) {
        return;
    }

    /**
     * If there is a queue, remove its length
     * from `position`.
     */

    if (queue.length) {
        position -= queue.length;
    }

    /**
     * Remove every (one or more) inner-word punctuation
     * marks and children of words.
     */

    children.splice(index, position - index);

    /**
     * Add all found tokens to `prev`s children.
     */

    prev.children = prev.children.concat(tokens);

    /**
     * Next, iterate over the node *now* at the current
     * position.
     */

    return index;
}

/**
 * Merge initialisms.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeInitialisms(child, index, parent) {
    var prev,
        children,
        length,
        position,
        otherChild,
        isAllDigits,
        value;

    if (
        index === 0 ||
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        ) ||
        nlcstToString(child) !== '.'
    ) {
        return;
    }

    prev = parent.children[index - 1];
    children = prev.children;

    /* istanbul ignore else: TOSPEC: Currently not
     * spec-able, but future-friendly. */
    if (children) {
        length = children.length;
    } else {
        length = 0;
    }

    if (prev.type !== 'WordNode' || length < 2 || length % 2 === 0) {
        return;
    }

    position = length;
    isAllDigits = true;

    while (children[--position]) {
        otherChild = children[position];
        value = nlcstToString(otherChild);

        if (position % 2 === 0) {
            /* istanbul ignore if: TOSPEC: Currently not
             * spec-able, but future-friendly. */
            if (otherChild.type !== 'TextNode') {
                return;
            }

            if (value.length > 1) {
                return;
            }

            if (!EXPRESSION_NUMERICAL.test(value)) {
                isAllDigits = false;
            }
        } else if (
            (
                otherChild.type !== 'SymbolNode' &&
                otherChild.type !== 'PunctuationNode'
            ) ||
            value !== '.'
        ) {
            if (position < length - 2) {
                break;
            } else {
                return;
            }
        }
    }

    if (isAllDigits) {
        return;
    }

    /**
     * Remove `child` from parent.
     */

    parent.children.splice(index, 1);

    /**
     * Add child to the previous children.
     */

    children.push(child);

    /**
     * Next, iterate over the node *now* at the current
     * position.
     */

    return index;
}

/**
 * Merge a sentence into its next sentence, when the sentence ends with
 * a certain word.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergePrefixExceptions(child, index, parent) {
    var children,
        node;

    children = child.children;

    if (
        !children ||
        !children.length ||
        index === parent.children.length - 1
    ) {
        return;
    }

    node = children[children.length - 1];

    if (
        !node ||
        (
            node.type !== 'SymbolNode' &&
            node.type !== 'PunctuationNode'
        ) ||
        nlcstToString(node) !== '.'
    ) {
        return;
    }

    node = children[children.length - 2];

    if (!node ||
        node.type !== 'WordNode' ||
        !EXPRESSION_ABBREVIATION_PREFIX.test(
            nlcstToString(node).toLowerCase()
        )
    ) {
        return;
    }

    child.children = children.concat(
        parent.children[index + 1].children
    );

    parent.children.splice(index + 1, 1);

    /**
     * Next, iterate over the current node again.
     */

    return index - 1;
}

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a comma.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeAffixExceptions(child, index, parent) {
    var children,
        node,
        position,
        previousChild;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    position = -1;

    while (children[++position]) {
        node = children[position];

        if (node.type === 'WordNode') {
            return;
        }

        if (
            node.type === 'SymbolNode' ||
            node.type === 'PunctuationNode'
        ) {
            break;
        }
    }

    if (
        !node ||
        (
            node.type !== 'SymbolNode' &&
            node.type !== 'PunctuationNode'
        ) ||
        !(nlcstToString(node) === ',' || nlcstToString(node) === ';')
    ) {
        return;
    }

    previousChild = parent.children[index - 1];

    previousChild.children = previousChild.children.concat(
        children
    );

    parent.children.splice(index, 1);

    /**
     * Next, iterate over the node *now* at the current
     * position.
     */

    return index;
}

/**
 * Move white space starting a sentence up, so they are
 * the siblings of sentences.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function makeInitialWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        !children ||
        !children.length ||
        (
            children[0].type !== 'WhiteSpaceNode' &&
            children[0].type !== 'SourceNode'
        )
    ) {
        return;
    }

    parent.children.splice(index, 0, children.shift());
}

/**
 * Move white space ending a paragraph up, so they are
 * the siblings of paragraphs.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function makeFinalWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        !children ||
        children.length < 1 ||
        (
            children[children.length - 1].type !== 'WhiteSpaceNode' &&
            children[children.length - 1].type !== 'SourceNode'
        )
    ) {
        return;
    }

    parent.children.splice(index + 1, 0, child.children.pop());

    /**
     * Next, iterate over the current node again.
     */

    return index;
}

/**
 * Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available).
 *
 * @param {Object} child
 * @return {undefined}
 */

function mergeRemainingFullStops(child) {
    var children,
        position,
        grandchild,
        prev,
        next,
        hasFoundDelimiter;

    children = child.children;
    position = children.length;

    hasFoundDelimiter = false;

    while (children[--position]) {
        grandchild = children[position];

        if (
            grandchild.type !== 'SymbolNode' &&
            grandchild.type !== 'PunctuationNode'
        ) {
            /**
             * This is a sentence without terminal marker,
             * so we 'fool' the code to make it think we
             * have found one.
             */

            if (grandchild.type === 'WordNode') {
                hasFoundDelimiter = true;
            }

            continue;
        }

        /**
         * Exit when this token is not a terminal marker.
         */

        if (!EXPRESSION_TERMINAL_MARKER.test(nlcstToString(grandchild))) {
            continue;
        }

        /**
         * Exit when this is the first terminal marker
         * found (starting at the end), so it should not
         * be merged.
         */

        if (!hasFoundDelimiter) {
            hasFoundDelimiter = true;

            continue;
        }

        /**
         * Only merge a single full stop.
         */

        if (nlcstToString(grandchild) !== '.') {
            continue;
        }

        prev = children[position - 1];
        next = children[position + 1];

        if (prev && prev.type === 'WordNode') {
            /**
             * Exit when the full stop is followed by a
             * space and another, full stop, such as:
             * `{.} .`
             */

            if (
                next &&
                next.type === 'WhiteSpaceNode' &&
                children[position + 2] &&
                (
                    children[position + 2].type === 'SymbolNode' ||
                    children[position + 2].type === 'PunctuationNode'
                ) &&
                nlcstToString(children[position + 2]) === '.'
            ) {
                continue;
            }

            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(grandchild);

            position--;
        } else if (next && next.type === 'WordNode') {
            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the start of
             * the next node.
             */

            next.children.unshift(grandchild);
        }
    }
}

/**
 * Break a sentence if a white space with more
 * than one new-line is found.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function breakImplicitSentences(child, index, parent) {
    var children,
        position,
        length,
        node;

    if (child.type !== 'SentenceNode') {
        return;
    }

    children = child.children;
    position = -1;
    length = children.length;

    while (++position < length) {
        node = children[position];

        if (node.type !== 'WhiteSpaceNode') {
            continue;
        }

        if (!EXPRESSION_MULTI_NEW_LINE.test(nlcstToString(node))) {
            continue;
        }

        child.children = children.slice(0, position);

        parent.children.splice(index + 1, 0, node, {
            'type': 'SentenceNode',
            'children': children.slice(position + 1)
        });

        /**
         * Next, iterate over the node newly inserted
         * child.
         */

        return index + 1;
    }
}

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeInitialLowerCaseLetterSentences(child, index, parent) {
    var node,
        children,
        position,
        previousChild;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    position = -1;

    while (children[++position]) {
        node = children[position];

        if (
            node.type === 'SymbolNode' ||
            node.type === 'PunctuationNode'
        ) {
            return;
        } else if (node.type === 'WordNode') {
            if (
                !EXPRESSION_LOWER_INITIAL.test(nlcstToString(node))
            ) {
                return;
            }

            previousChild = parent.children[index - 1];

            previousChild.children = previousChild.children.concat(
                children
            );

            parent.children.splice(index, 1);

            /**
             * Next, iterate over the node *now* at
             * the current position (which was the
             * next node).
             */

            return index;
        }
    }
}

/**
 * Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeNonWordSentences(child, index, parent) {
    var children,
        position,
        otherChild;

    children = child.children;
    position = -1;

    while (children[++position]) {
        if (children[position].type === 'WordNode') {
            return;
        }
    }

    otherChild = parent.children[index - 1];

    if (otherChild) {
        otherChild.children = otherChild.children.concat(children);

        /**
         * Remove the child.
         */

        parent.children.splice(index, 1);

        /**
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }

    otherChild = parent.children[index + 1];

    if (otherChild) {
        otherChild.children = children.concat(otherChild.children);

        /**
         * Remove the child.
         */

        parent.children.splice(index, 1);

        /**
         * Next, iterate over `otherChild`.
         */

        return index + 1;
    }
}

/**
 * Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function mergeAffixSymbol(child, index, parent) {
    var children;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    if (
        (
            children[0].type !== 'SymbolNode' &&
            children[0].type !== 'PunctuationNode'
        ) ||
        !EXPRESSION_AFFIX_SYMBOL.test(nlcstToString(children[0]))
    ) {
        return;
    }

    parent.children[index - 1].children.push(children.shift());

    /**
     * Next, iterate over the previous node again.
     */

    return index - 1;
}

/**
 * Remove empty children.
 *
 * @param {Object} child
 * @param {number} index
 * @param {Object} parent
 * @return {undefined|number}
 */

function removeEmptyNodes(child, index, parent) {
    if ('children' in child && !child.children.length) {
        parent.children.splice(index, 1);

        /**
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }
}

/**
 * Return a function which in turn returns nodes of the given type.
 *
 * @param {string} type
 * @return {Function} - A function which creates nodes of the given type.
 */

function createNodeFactory(type) {
    return function (value) {
        return {
            'type': type,
            'children': [
                this.tokenizeText(value)
            ]
        };
    };
}

/**
 * Return a function which in turn returns text nodes of the given type.
 *
 * @param {string} type
 * @return {Function} - A function which creates text nodes of the given type.
 */

function createTextNodeFactory(type) {
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
 * `ParseLatin` contains the functions needed to tokenize natural Latin-script
 * language into a syntax tree.
 *
 * @constructor
 */

function ParseLatin() {
    /**
     * TODO: This should later be removed (when this change bubbles
     * through to dependants)
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
 * Match all tokens:
 * - One or more number, alphabetic, or combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same character;
 */

parseLatinPrototype.EXPRESSION_TOKEN = expressions.token;

/**
 * Match a word.
 */

parseLatinPrototype.EXPRESSION_WORD = expressions.word;

/**
 * Match a string containing ONLY punctuation.
 */

parseLatinPrototype.EXPRESSION_PUNCTUATION = expressions.punctuation;

/**
 * Match a string containing ONLY white space.
 */

parseLatinPrototype.EXPRESSION_WHITE_SPACE = expressions.whiteSpace;

/**
 * Tokenize natural Latin-script language into letter and numbers (words),
 * white space, and everything else (punctuation).
 *
 * @param {string?} value
 * @return {Array.<Object>} - An array of tokens.
 */

parseLatinPrototype.tokenize = function (value) {
    var self,
        tokens,
        delimiter,
        start,
        end,
        match;

    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        throw new TypeError('Illegal invocation: \'' + value +
            '\' is not a valid argument for \'ParseLatin\'');
    }

    self = this;

    tokens = [];

    if (!value) {
        return tokens;
    }

    delimiter = self.EXPRESSION_TOKEN;

    delimiter.lastIndex = 0;
    start = 0;
    match = delimiter.exec(value);

    /**
     * for every match of the token delimiter expression...
     */

    while (match) {
        /**
         * Move the pointer over to after its last character.
         */

        end = match.index + match[0].length;

        /**
         * Slice the found content, from (including) start to (not including)
         * end, classify it, and add the result to tokens.
         */

        tokens.push(self.classifier(value.substring(start, end)));

        match = delimiter.exec(value);
        start = end;
    }

    return tokens;
};

/*eslint-enable no-cond-assign */

/**
 * Classify a token.
 *
 * @param {string?} value
 * @return {Object} - A classified token.
 */

parseLatinPrototype.classifier = function (value) {
    var type;

    /**
     * If the token consists solely of white space, classify it as white
     * space.
     * Otherwise, if the token contains just word characters, classify it as
     * a word.
     * Otherwise, classify it as punctuation.
     */

    if (this.EXPRESSION_WHITE_SPACE.test(value)) {
        type = 'WhiteSpace';
    } else if (this.EXPRESSION_WORD.test(value)) {
        type = 'Word';
    } else if (this.EXPRESSION_PUNCTUATION.test(value)) {
        type = 'Punctuation';
    } else {
        type = 'Symbol';
    }

    return this['tokenize' + type](value);
};

/**
 * Return a source node, with its value set to the given value.
 *
 * @param {string} value
 * @return {Object} - The SourceNode.
 */

parseLatinPrototype.tokenizeSource = createTextNodeFactory('SourceNode');

/**
 * Return a text node, with its value set to the given value.
 *
 * @param {string} value
 * @return {Object} - The TextNode.
 */

parseLatinPrototype.tokenizeText = createTextNodeFactory('TextNode');

/**
 * Return a word node, with its children set to a single text node, its
 * value set to the given value.
 *
 * @param {string} value
 * @return {Object} - The WordNode.
 */

parseLatinPrototype.tokenizeWord = createNodeFactory('WordNode');

/**
 * Return a symbol node, with its children set to a single text node,
 * its value set to the given value.
 *
 * @param {string} value
 * @return {Object}
 */

parseLatinPrototype.tokenizeSymbol = createTextNodeFactory('SymbolNode');

/**
 * Return a white space node, with its children set to a single text node,
 * its value set to the given value.
 *
 * @param {string} value
 * @return {Object} - The whiteSpaceNode.
 */

parseLatinPrototype.tokenizeWhiteSpace =
    createTextNodeFactory('WhiteSpaceNode');

/**
 * Return a punctuation node, with its children set to a single text node,
 * its value set to the given value.
 *
 * @param {string} value
 * @return {Object}
 */

parseLatinPrototype.tokenizePunctuation =
    createTextNodeFactory('PunctuationNode');

/**
 * Tokenize natural Latin-script language into a sentence token.
 *
 * @param {string?} value
 * @return {Object} - A sentence token.
 *
 */

parseLatinPrototype.tokenizeSentence = function (value) {
    var root;

    root = {
        'type': 'SentenceNode',
        'children': this.tokenize(value)
    };

    modify(this.tokenizeSentenceModifiers, root);

    /**
     * Return a sentence token, with its children set to the result of
     * tokenizing the given value.
     */

    return root;
};

parseLatinPrototype.tokenizeSentenceModifiers = [
    mergeInitialWordSymbol,
    mergeFinalWordSymbol,
    mergeInnerWordSymbol,
    mergeInitialisms
];

/**
 * Tokenize natural Latin-script language into a paragraph token.
 *
 * @param {string?} value
 * @return {Object} - A paragraph token.
 */

parseLatinPrototype.tokenizeParagraph = tokenizerFactory(ParseLatin, {
    'name': 'tokenizeParagraph',
    'tokenizer': 'tokenizeSentence',
    'type': 'ParagraphNode',
    'delimiter': EXPRESSION_TERMINAL_MARKER,
    'modifiers': [
        mergeNonWordSentences,
        mergeAffixSymbol,
        mergeInitialLowerCaseLetterSentences,
        mergePrefixExceptions,
        mergeAffixExceptions,
        mergeRemainingFullStops,
        makeInitialWhiteSpaceSiblings,
        makeFinalWhiteSpaceSiblings,
        breakImplicitSentences,
        removeEmptyNodes
    ]
});

/**
 * Tokenize natural Latin-script language into a root token.
 *
 * @param {string?} value
 * @return {Object} - A root token.
 */

parseLatinPrototype.tokenizeRoot = tokenizerFactory(ParseLatin, {
    'name': 'tokenizeRoot',
    'tokenizer': 'tokenizeParagraph',
    'type': 'RootNode',
    'delimiter': EXPRESSION_NEW_LINE,
    'modifiers': [
        makeInitialWhiteSpaceSiblings,
        makeFinalWhiteSpaceSiblings,
        removeEmptyNodes
    ]
});

/**
 * Tokenize natural Latin-script language into a syntax tree.
 *
 * @param {string?} value
 * @return {Object} - The tokenized document.
 */

parseLatinPrototype.parse = function (value) {
    return this.tokenizeRoot(value);
};

/**
 * Export ParseLatin.
 */

module.exports = ParseLatin;
