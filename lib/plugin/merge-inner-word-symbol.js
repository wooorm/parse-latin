'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/**
 * Constants.
 *
 * - Symbols part of surrounding words.
 */

var EXPRESSION_INNER_WORD_SYMBOL;

EXPRESSION_INNER_WORD_SYMBOL = expressions.wordSymbolInner;

/**
 * Merge two words surrounding certain punctuation marks.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeInnerWordSymbol(child, index, parent) {
    var siblings,
        sibling,
        prev,
        position,
        tokens,
        queue;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        )
    ) {
        siblings = parent.children;

        prev = siblings[index - 1];

        if (prev && prev.type === 'WordNode') {
            position = index - 1;

            tokens = [];
            queue = [];

            /**
             * - If a token which is neither word nor
             *   inner word symbol is found, the loop
             *   is broken.
             * - If an inner word symbol is found,
             *   it's queued.
             * - If a word is found, it's queued (and
             *   the queue stored and emptied).
             */

            while (siblings[++position]) {
                sibling = siblings[position];

                if (sibling.type === 'WordNode') {
                    tokens = tokens.concat(queue, sibling.children);

                    queue = [];
                } else if (
                    (
                        sibling.type === 'SymbolNode' ||
                        sibling.type === 'PunctuationNode'
                    ) &&
                    EXPRESSION_INNER_WORD_SYMBOL.test(nlcstToString(sibling))
                ) {
                    queue.push(sibling);
                } else {
                    break;
                }
            }

            if (tokens.length) {
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

                siblings.splice(index, position - index);

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
        }
    }
}

/**
 * Expose `mergeInnerWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInnerWordSymbol);
