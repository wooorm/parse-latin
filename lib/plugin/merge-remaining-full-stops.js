'use strict';

/**
 * Dependencies.
 */

var nlcstToString,
    plugin,
    expressions;

nlcstToString = require('nlcst-to-string');
plugin = require('../plugin');
expressions = require('../expressions');

/**
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_TERMINAL_MARKER;

EXPRESSION_TERMINAL_MARKER = expressions.terminalMarker;

/**
 * Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available).
 *
 * @param {NLCSTNode} child
 * @return {undefined}
 */

function mergeRemainingFullStops(child) {
    var children,
        position,
        grandchild,
        prev,
        next,
        nextNext,
        hasFoundDelimiter;

    children = child.children;
    position = children.length;

    hasFoundDelimiter = false;

    while (children[--position]) {
        grandchild = children[position];

        if (
            grandchild.type !== 'SymbolNode' &&
            grandchild.type !== 'PunctuationNode'
        ) {
            /**
             * This is a sentence without terminal marker,
             * so we 'fool' the code to make it think we
             * have found one.
             */

            if (grandchild.type === 'WordNode') {
                hasFoundDelimiter = true;
            }

            continue;
        }

        /**
         * Exit when this token is not a terminal marker.
         */

        if (!EXPRESSION_TERMINAL_MARKER.test(nlcstToString(grandchild))) {
            continue;
        }

        /**
         * Ignore the first terminal marker found
         * (starting at the end), as it should not
         * be merged.
         */

        if (!hasFoundDelimiter) {
            hasFoundDelimiter = true;

            continue;
        }

        /**
         * Only merge a single full stop.
         */

        if (nlcstToString(grandchild) !== '.') {
            continue;
        }

        prev = children[position - 1];
        next = children[position + 1];

        if (prev && prev.type === 'WordNode') {
            nextNext = children[position + 2];

            /**
             * Continue when the full stop is followed by
             * a space and another full stop, such as:
             * `{.} .`
             */

            if (
                next &&
                nextNext &&
                next.type === 'WhiteSpaceNode' &&
                nlcstToString(nextNext) === '.'
            ) {
                continue;
            }

            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(grandchild);

            position--;
        } else if (next && next.type === 'WordNode') {
            /**
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /**
             * Add the punctuation mark at the start of
             * the next node.
             */

            next.children.unshift(grandchild);
        }
    }
}

/**
 * Expose `mergeRemainingFullStops` as a plugin.
 */

module.exports = plugin(mergeRemainingFullStops);
