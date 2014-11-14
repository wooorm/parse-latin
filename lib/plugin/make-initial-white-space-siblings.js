'use strict';

/**
 * Dependencies.
 */

var plugin;

plugin = require('../plugin');

/**
 * Move white space starting a sentence up, so they are
 * the siblings of sentences.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 * @return {undefined}
 */

function makeInitialWhiteSpaceSiblings(child, index, parent) {
    var children;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[0].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index, 0, children.shift());
    }
}

/**
 * Expose `makeInitialWhiteSpaceSiblings` as a plugin.
 */

module.exports = plugin(makeInitialWhiteSpaceSiblings);
