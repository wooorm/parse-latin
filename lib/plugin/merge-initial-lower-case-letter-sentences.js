/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-initial-lower-case-letter-sentences
 * @fileoverview Merge a sentence into its previous
 *   sentence, when the sentence starts with a lower case
 *   letter.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');
var expressions = require('../expressions');

/* Expose. */
module.exports = modifyChildren(mergeInitialLowerCaseLetterSentences);

/* Initial lowercase letter. */
var EXPRESSION_LOWER_INITIAL = expressions.lowerInitial;

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
  var children = child.children;
  var position;
  var node;
  var siblings;
  var prev;

  if (
    children &&
    children.length &&
    index !== 0
  ) {
    position = -1;

    while (children[++position]) {
      node = children[position];

      if (node.type === 'WordNode') {
        if (!EXPRESSION_LOWER_INITIAL.test(nlcstToString(node))) {
          return;
        }

        siblings = parent.children;

        prev = siblings[index - 1];

        prev.children = prev.children.concat(children);

        siblings.splice(index, 1);

        /* Update position. */
        if (prev.position && child.position) {
          prev.position.end = child.position.end;
        }

        /* Next, iterate over the node *now* at
         * the current position. */
        return index;
      }

      if (
        node.type === 'SymbolNode' ||
        node.type === 'PunctuationNode'
      ) {
        return;
      }
    }
  }
}
