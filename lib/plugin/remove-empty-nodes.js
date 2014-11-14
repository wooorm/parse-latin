'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Remove empty children.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
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
 * Expose `removeEmptyNodes` as a modifier.
 */

module.exports = modifier(removeEmptyNodes);
