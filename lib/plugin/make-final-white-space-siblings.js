/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:make-final-white-space-siblings
 * @fileoverview Make final white-space siblings.
 */

'use strict';

/* Dependencies. */
var modifyChildren = require('unist-util-modify-children');

/* Expose. */
module.exports = modifyChildren(makeFinalWhiteSpaceSiblings);

/**
 * Move white space ending a paragraph up, so they are
 * the siblings of paragraphs.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParent} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function makeFinalWhiteSpaceSiblings(child, index, parent) {
  var children = child.children;
  var prev;

  if (
    children &&
    children.length !== 0 &&
    children[children.length - 1].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index + 1, 0, child.children.pop());
    prev = children[children.length - 1];

    if (prev && prev.position && child.position) {
      child.position.end = prev.position.end;
    }

    /* Next, iterate over the current node again. */
    return index;
  }
}
