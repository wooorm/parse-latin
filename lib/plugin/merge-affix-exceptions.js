/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-affix-exceptions
 * @fileoverview Merge a sentence into its previous
 *   sentence, when the sentence starts with a comma.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');

/* Expose. */
module.exports = modifyChildren(mergeAffixExceptions);

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a comma.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergeAffixExceptions(child, index, parent) {
  var children = child.children;
  var node;
  var position;
  var value;
  var previousChild;

  if (!children || !children.length || index === 0) {
    return;
  }

  position = -1;

  while (children[++position]) {
    node = children[position];

    if (node.type === 'WordNode') {
      return;
    }

    if (
      node.type === 'SymbolNode' ||
      node.type === 'PunctuationNode'
    ) {
      value = nlcstToString(node);

      if (value !== ',' && value !== ';') {
        return;
      }

      previousChild = parent.children[index - 1];

      previousChild.children = previousChild.children.concat(children);

      /* Update position. */
      if (previousChild.position && child.position) {
        previousChild.position.end = child.position.end;
      }

      parent.children.splice(index, 1);

      /* Next, iterate over the node *now* at the current
       * position. */
      return index;
    }
  }
}
