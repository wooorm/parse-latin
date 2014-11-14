'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeNonWordSentences(child, index, parent) {
    var children,
        position,
        prev;

    children = child.children;
    position = -1;

    while (children[++position]) {
        if (children[position].type === 'WordNode') {
            return;
        }
    }

    prev = parent.children[index - 1];

    if (prev) {
        prev.children = prev.children.concat(children);

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

    prev = parent.children[index + 1];

    if (prev) {
        prev.children = children.concat(prev.children);

        /**
         * Remove the child.
         */

        parent.children.splice(index, 1);
    }
}

/**
 * Expose `mergeNonWordSentences` as a modifier.
 */

module.exports = modifier(mergeNonWordSentences);
