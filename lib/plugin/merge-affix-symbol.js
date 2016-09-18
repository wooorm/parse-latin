/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-affix-symbol
 * @fileoverview Move certain punctuation following a
 *   terminal marker (thus in the next sentence) to the
 *   previous sentence.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');
var expressions = require('../expressions');

/* Expose. */
module.exports = modifyChildren(mergeAffixSymbol);

/* Closing or final punctuation, or terminal markers
 * that should still be included in the previous
 * sentence, even though they follow the sentence's
 * terminal marker. */
var EXPRESSION_AFFIX_SYMBOL = expressions.affixSymbol;

/**
 * Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergeAffixSymbol(child, index, parent) {
  var children = child.children;
  var first;
  var second;
  var prev;

  if (
    children &&
    children.length &&
    index !== 0
  ) {
    first = children[0];
    second = children[1];
    prev = parent.children[index - 1];

    if (
      (
        first.type === 'SymbolNode' ||
        first.type === 'PunctuationNode'
      ) &&
      EXPRESSION_AFFIX_SYMBOL.test(nlcstToString(first))
    ) {
      prev.children.push(children.shift());

      /* Update position. */
      if (first.position && prev.position) {
        prev.position.end = first.position.end;
      }

      if (second && second.position && child.position) {
        child.position.start = second.position.start;
      }

      /* Next, iterate over the previous node again. */
      return index - 1;
    }
  }
}
