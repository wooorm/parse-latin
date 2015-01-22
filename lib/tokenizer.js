'use strict';

var nlcstToString;

nlcstToString = require('nlcst-to-string');

/**
 * Factory to create a tokenizer based on a given
 * `expression`.
 *
 * @param {string} childType
 * @param {RegExp} expression
 * @return {function(NLCSTParent): Array.<NLCSTChild>}
 */
function tokenizerFactory(childType, expression) {
    /**
     * A function which splits
     *
     * @param {NLCSTParent} node
     * @return {Array.<NLCSTChild>}
     */
    return function (node) {
        var children,
            tokens,
            type,
            length,
            index,
            lastIndex,
            start;

        children = [];

        tokens = node.children;
        type = node.type;

        length = tokens.length;

        index = -1;

        lastIndex = length - 1;

        start = 0;

        while (++index < length) {
            if (
                index === lastIndex ||
                (
                    tokens[index].type === childType &&
                    expression.test(nlcstToString(tokens[index]))
                )
            ) {
                children.push({
                    'type': type,
                    'children': tokens.slice(start, index + 1)
                });

                start = index + 1;
            }
        }

        return children;
    };
}

module.exports = tokenizerFactory;
