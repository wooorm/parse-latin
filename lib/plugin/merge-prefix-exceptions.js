/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:plugin:merge-prefix-exceptions
 * @fileoverview Merge a sentence into its next sentence,
 *   when the sentence ends with a certain word.
 */

'use strict';

/* Dependencies. */
var nlcstToString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');

/* Expose. */
module.exports = modifyChildren(mergePrefixExceptions);

/* Blacklist of full stop characters that should not
 * be treated as terminal sentence markers: A case-insensitive
 * abbreviation. */
var EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
  '^(' +
    '[0-9]+|' +
    '[a-z]|' +

    /* Common Latin Abbreviations:
     * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
     * Where only the abbreviations written without joining full stops,
     * but with a final full stop, were extracted.
     *
     * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
     * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
     * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
     * sic erat scriptum, (et) sequentia, statim, videlicet. */
    'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
    'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
  ')$'
);

/**
 * Merge a sentence into its next sentence, when the
 * sentence ends with a certain word.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {number?} - Next position.
 */
function mergePrefixExceptions(child, index, parent) {
  var children = child.children;
  var node;
  var next;

  if (
    children &&
    children.length &&
    index !== parent.children.length - 1
  ) {
    node = children[children.length - 1];

    if (
      node &&
      nlcstToString(node) === '.'
    ) {
      node = children[children.length - 2];

      if (
        node &&
        node.type === 'WordNode' &&
        EXPRESSION_ABBREVIATION_PREFIX.test(
          nlcstToString(node).toLowerCase()
        )
      ) {
        next = parent.children[index + 1];

        child.children = children.concat(next.children);

        parent.children.splice(index + 1, 1);

        /* Update position. */
        if (next.position && child.position) {
          child.position.end = next.position.end;
        }

        /* Next, iterate over the current node again. */
        return index - 1;
      }
    }
  }
}
