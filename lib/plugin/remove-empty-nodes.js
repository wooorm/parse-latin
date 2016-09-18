/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:remove-empty-nodes
 * @fileoverview Remove empty child nodes without children.
 */

'use strict';

/* Dependencies. */
var modifyChildren = require('unist-util-modify-children');

/* Expose. */
module.exports = modifyChildren(removeEmptyNodes);

/**
 * Remove empty children.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function removeEmptyNodes(child, index, parent) {
  if ('children' in child && !child.children.length) {
    parent.children.splice(index, 1);

    /* Next, iterate over the node *now* at
     * the current position (which was the
     * next node). */
    return index;
  }
}
