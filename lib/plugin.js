'use strict';

/**
 * Turns `callback` into a ``plugin'' accepting a parent.
 *
 * @param {function(Object, number, Object)} callback
 * @return {function(NLCSTParent)}
 */

function pluginFactory(callback) {
    return function (parent) {
        var index,
            children;

        index = -1;
        children = parent.children;

        while (children[++index]) {
            callback(children[index], index, parent);
        }
    };
}

/**
 * Expose `pluginFactory`.
 */

module.exports = pluginFactory;
