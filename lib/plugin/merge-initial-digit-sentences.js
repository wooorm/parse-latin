'use strict';

var toString = require('nlcst-to-string');
var modifyChildren = require('unist-util-modify-children');
var expressions = require('../expressions');

module.exports = modifyChildren(mergeInitialLowerCaseLetterSentences);

/* Initial lowercase letter. */
var DIGIT = expressions.digitStart;

/* Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter. */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
  var children = child.children;
  var head = children[0];
  var siblings;
  var prev;

  if (head && head.type === 'WordNode' && DIGIT.test(toString(head))) {
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
}
