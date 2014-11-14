'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/**
 * Constants.
 *
 * - Closing or final punctuation, or terminal markers
 *   that should still be included in the previous
 *   sentence, even though they follow the sentence's
 *   terminal marker.
 */

var EXPRESSION_AFFIX_SYMBOL;

EXPRESSION_AFFIX_SYMBOL = expressions.affixSymbol;

/**
 * Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeAffixSymbol(child, index, parent) {
    var children,
        firstChild;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        firstChild = children[0];

        if (
            (
                firstChild.type === 'SymbolNode' ||
                firstChild.type === 'PunctuationNode'
            ) &&
            EXPRESSION_AFFIX_SYMBOL.test(nlcstToString(firstChild))
        ) {
            parent.children[index - 1].children.push(children.shift());

            /**
             * Next, iterate over the previous node again.
             */

            return index - 1;
        }
    }
}

/**
 * Expose `mergeAffixSymbol` as a modifier.
 */

module.exports = modifier(mergeAffixSymbol);
