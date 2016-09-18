/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:make-initial-white-space-siblings
 * @fileoverview Make initial white-space siblings.
 */

'use strict';

/* Dependencies. */
var visitChildren = require('unist-util-visit-children');

/* Expose. */
module.exports = visitChildren(makeInitialWhiteSpaceSiblings);

/**
 * Move white space starting a sentence up, so they are
 * the siblings of sentences.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParent} parent - Parent of `child`.
 */
function makeInitialWhiteSpaceSiblings(child, index, parent) {
  var children = child.children;
  var next;

  if (
    children &&
    children.length !== 0 &&
    children[0].type === 'WhiteSpaceNode'
  ) {
    parent.children.splice(index, 0, children.shift());
    next = children[0];

    if (next && next.position && child.position) {
      child.position.start = next.position.start;
    }
  }
}
