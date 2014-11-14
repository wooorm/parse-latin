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
 * following words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
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
        nlcstToString(child) !== '&'
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
 * Expose `mergeInitialWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInitialWordSymbol);
