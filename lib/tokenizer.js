'use strict';

var nlcstToString;

nlcstToString = require('nlcst-to-string');

/**
 * Factory to create a tokenizer based on a given
 * `expression`.
 *
 * @param {RegExp} expression
 */

function tokenizerFactory(childType, expression) {
    /**
     * A function which splits
     *
     * @param {RegExp} expression
     */

    return function (child) {
        var children,
            tokens,
            type,
            length,
            index,
            lastIndex,
            start;

        children = [];

        tokens = child.children;
        type = child.type;

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
