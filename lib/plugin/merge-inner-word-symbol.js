/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-inner-word-symbol
 * @fileoverview Merge words joined by certain punctuation
 *   marks.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');
var expressions = require('../expressions');

/* Expose. */
module.exports = modifyChildren(mergeInnerWordSymbol);

/* Symbols part of surrounding words. */
var EXPRESSION_INNER_WORD_SYMBOL = expressions.wordSymbolInner;

/**
 * Merge words joined by certain punctuation marks.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTSentenceNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergeInnerWordSymbol(child, index, parent) {
  var siblings;
  var sibling;
  var prev;
  var last;
  var position;
  var tokens;
  var queue;

  if (
    index !== 0 &&
    (
      child.type === 'SymbolNode' ||
      child.type === 'PunctuationNode'
    )
  ) {
    siblings = parent.children;

    prev = siblings[index - 1];

    if (prev && prev.type === 'WordNode') {
      position = index - 1;

      tokens = [];
      queue = [];

      /* - If a token which is neither word nor
       *   inner word symbol is found, the loop
       *   is broken.
       * - If an inner word symbol is found,
       *   it's queued.
       * - If a word is found, it's queued (and
       *   the queue stored and emptied). */
      while (siblings[++position]) {
        sibling = siblings[position];

        if (sibling.type === 'WordNode') {
          tokens = tokens.concat(queue, sibling.children);

          queue = [];
        } else if (
          (
            sibling.type === 'SymbolNode' ||
            sibling.type === 'PunctuationNode'
          ) &&
          EXPRESSION_INNER_WORD_SYMBOL.test(nlcstToString(sibling))
        ) {
          queue.push(sibling);
        } else {
          break;
        }
      }

      if (tokens.length) {
        /* If there is a queue, remove its length
         * from `position`. */
        if (queue.length) {
          position -= queue.length;
        }

        /* Remove every (one or more) inner-word punctuation
         * marks and children of words. */
        siblings.splice(index, position - index);

        /* Add all found tokens to `prev`s children. */
        prev.children = prev.children.concat(tokens);

        last = tokens[tokens.length - 1];

        /* Update position. */
        if (prev.position && last.position) {
          prev.position.end = last.position.end;
        }

        /* Next, iterate over the node *now* at the current
         * position. */
        return index;
      }
    }
  }
}
