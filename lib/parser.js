/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:parser
 * @fileoverview Construct a parser for a given node.
 */

'use strict';

/* Dependencies. */
var tokenizer = require('./tokenizer');

/* Expose. */
module.exports = parserFactory;

/**
 * Construct a parser based on `options`.
 *
 * @param {Object} options - Configuration.
 * @return {function(string): NLCSTNode} - Parser.
 */
function parserFactory(options) {
  var type = options.type;
  var tokenizerProperty = options.tokenizer;
  var delimiter = options.delimiter;
  var tokenize = delimiter && tokenizer(options.delimiterType, delimiter);

  return parser;

  function parser(value) {
    var children = this[tokenizerProperty](value);

    return {
      type: type,
      children: tokenize ? tokenize(children) : children
    };
  }
}
