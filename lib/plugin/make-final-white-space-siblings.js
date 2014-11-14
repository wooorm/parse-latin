'use strict';

/**
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Move white space ending a paragraph up, so they are
 * the siblings of paragraphs.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 * @return {undefined|number}
 */

function makeFinalWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[children.length - 1].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index + 1, 0, child.children.pop());

        /**
         * Next, iterate over the current node again.
         */

        return index;
    }
}

/**
 * Expose `makeFinalWhiteSpaceSiblings` as a modifier.
 */

module.exports = modifier(makeFinalWhiteSpaceSiblings);
