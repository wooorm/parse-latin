'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var nlcstToString,
    modifyChildren,
    expressions;

nlcstToString = require('nlcst-to-string');
modifyChildren = require('unist-util-modify-children');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Two or more new line characters.
 */

var EXPRESSION_MULTI_NEW_LINE;

EXPRESSION_MULTI_NEW_LINE = expressions.newLineMulti;

/**
 * Break a sentence if a white space with more
 * than one new-line is found.
 *
 * @param {NLCSTNode} child - Node.
 * @param {number} index - Position of `child` in `parent`.
 * @param {NLCSTParagraphNode} parent - Parent of `child`.
 * @return {undefined}
 */
function breakImplicitSentences(child, index, parent) {
    var children,
        position,
        length,
        tail,
        head,
        end,
        insertion,
        node;

    if (child.type !== 'SentenceNode') {
        return;
    }

    children = child.children;

    /*
     * Ignore first and last child.
     */

    length = children.length - 1;
    position = 0;

    while (++position < length) {
        node = children[position];

        if (
            node.type !== 'WhiteSpaceNode' ||
            !EXPRESSION_MULTI_NEW_LINE.test(nlcstToString(node))
        ) {
            continue;
        }

        child.children = children.slice(0, position);

        insertion = {
            'type': 'SentenceNode',
            'children': children.slice(position + 1)
        };

        tail = children[position - 1];
        head = children[position + 1];

        parent.children.splice(index + 1, 0, node, insertion);

        if (child.position && tail.position && head.position) {
            end = child.position.end;

            child.position.end = tail.position.end;

            insertion.position = {
                'start': head.position.start,
                'end': end
            };
        }

        return index + 1;
    }
}

/*
 * Expose `breakImplicitSentences` as a plugin.
 */

module.exports = modifyChildren(breakImplicitSentences);
