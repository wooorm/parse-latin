'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/**
 * Merge certain punctuation marks into their
 * preceding words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */

function mergeFinalWordSymbol(child, index, parent) {
    var children,
        prev,
        next;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        ) &&
        nlcstToString(child) === '-'
    ) {
        children = parent.children;

        prev = children[index - 1];
        next = children[index + 1];

        if (
            (
                !next ||
                next.type !== 'WordNode'
            ) &&
            (
                prev &&
                prev.type === 'WordNode'
            )
        ) {
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
             * Next, iterate over the node *now* at the
             * current position (which was the next node).
             */

            return index;
        }
    }
}

/**
 * Expose `mergeFinalWordSymbol` as a modifier.
 */

module.exports = modifier(mergeFinalWordSymbol);
