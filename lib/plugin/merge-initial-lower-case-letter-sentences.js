'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Initial lowercase letter.
 */

var EXPRESSION_LOWER_INITIAL;

EXPRESSION_LOWER_INITIAL = expressions.lowerInitial;

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {undefined|number}
 */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
    var siblings,
        children,
        position,
        node,
        prev;

    children = child.children;

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

                /*
                 * Update position.
                 */

                if (prev.position && child.position) {
                    prev.position.end = child.position.end;
                }

                /*
                 * Next, iterate over the node *now* at
                 * the current position.
                 */

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

/*
 * Expose `mergeInitialLowerCaseLetterSentences` as a modifier.
 */

module.exports = modifier(mergeInitialLowerCaseLetterSentences);
