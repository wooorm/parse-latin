/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-final-word-symbol
 * @fileoverview Merge certain symbols into their preceding word.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');

/* Expose. */
module.exports = modifyChildren(mergeFinalWordSymbol);

/**
 * Merge certain punctuation marks into their
 * preceding words.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTSentenceNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergeFinalWordSymbol(child, index, parent) {
  var children;
  var prev;
  var next;

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
      /* Remove `child` from parent. */
      children.splice(index, 1);

      /* Add the punctuation mark at the end of the
       * previous node. */
      prev.children.push(child);

      /* Update position. */
      if (prev.position && child.position) {
        prev.position.end = child.position.end;
      }

      /* Next, iterate over the node *now* at the
       * current position (which was the next node). */
      return index;
    }
  }
}
