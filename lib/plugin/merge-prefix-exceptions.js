'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/**
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_ABBREVIATION_PREFIX;

EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '^(' +
        '[0-9]+|' +
        '[a-z]|' +

        /**
         * Common Latin Abbreviations:
         * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
         * Where only the abbreviations written without joining full stops,
         * but with a final full stop, were extracted.
         *
         * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
         * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
         * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
         * sic erat scriptum, (et) sequentia, statim, videlicet.
         */

        'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
        'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
);

/**
 * Merge a sentence into its next sentence, when the
 * sentence ends with a certain word.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergePrefixExceptions(child, index, parent) {
    var children,
        node;

    children = child.children;

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
                child.children = children.concat(
                    parent.children[index + 1].children
                );

                parent.children.splice(index + 1, 1);

                /**
                 * Next, iterate over the current node again.
                 */

                return index - 1;
            }
        }
    }
}

/**
 * Expose `mergePrefixExceptions` as a modifier.
 */

module.exports = modifier(mergePrefixExceptions);
