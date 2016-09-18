/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:patch-position
 * @fileoverview Patch `position` on a parent node based
 *   on its first and last child.
 */

'use strict';

/* Dependencies. */
var visitChildren = require('unist-util-visit-children');

/* Expose. */
module.exports = visitChildren(patchPosition);

/**
 * Patch the position on a parent node based on its first
 * and last child.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `node`.
 * @param {NLCSTNode} node - Parent of `child`.
 */
function patchPosition(child, index, node) {
  var siblings = node.children;

  if (!child.position) {
    return;
  }

  if (
    index === 0 &&
    (!node.position || /* istanbul ignore next */ !node.position.start)
  ) {
    patch(node);
    node.position.start = child.position.start;
  }

  if (
    index === siblings.length - 1 &&
    (!node.position || !node.position.end)
  ) {
    patch(node);
    node.position.end = child.position.end;
  }
}

/**
 * Add a `position` object when it does not yet exist
 * on `node`.
 *
 * @param {NLCSTNode} node - Node to patch.
 */
function patch(node) {
  if (!node.position) {
    node.position = {};
  }
}
