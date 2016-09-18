/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:tokenizer
 * @fileoverview Tokenize tokens matching an expression as
 *   a given node-type.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');

/* Expose. */
module.exports = tokenizerFactory;

/**
 * Factory to create a tokenizer based on a given
 * `expression`.
 *
 * @param {string} childType - Type of child to tokenize
 *   as.
 * @param {RegExp} expression - Expression to use for
 *   tokenization.
 * @return {Function} - Tokenizer.
 */
function tokenizerFactory(childType, expression) {
  return tokenizer;

  /**
   * A function which splits
   *
   * @param {NLCSTParent} node - Parent node.
   * @return {Array.<NLCSTChild>} - Nodes.
   */
  function tokenizer(node) {
    var children = [];
    var tokens = node.children;
    var type = node.type;
    var length = tokens.length;
    var index = -1;
    var lastIndex = length - 1;
    var start = 0;
    var first;
    var last;
    var parent;

    while (++index < length) {
      if (
        index === lastIndex ||
        (
          tokens[index].type === childType &&
          expression.test(nlcstToString(tokens[index]))
        )
      ) {
        first = tokens[start];
        last = tokens[index];

        parent = {
          type: type,
          children: tokens.slice(start, index + 1)
        };

        if (first.position && last.position) {
          parent.position = {
            start: first.position.start,
            end: last.position.end
          };
        }

        children.push(parent);

        start = index + 1;
      }
    }

    return children;
  }
}
