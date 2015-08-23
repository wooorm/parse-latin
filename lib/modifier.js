'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var iterate;

iterate = require('array-iterate');

/**
 * Pass the context as the third argument to `callback`.
 *
 * @param {function(Node, number, Node): number?} callback - Wrapped.
 * @return {function(Node, number)}
 */
function wrapperFactory(callback) {
    return function (value, index) {
        return callback(value, index, this);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Node, number, Node): number|undefined} callback - Wrapped.
 * @return {function(NLCSTParent)}
 */
function iteratorFactory(callback) {
    return function (parent) {
        return iterate(parent.children, callback, parent);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Node, number, Node): number?} callback - Wrapped.
 * @return {function(Node)}
 */
function modifierFactory(callback) {
    return iteratorFactory(wrapperFactory(callback));
}

/*
 * Expose `modifierFactory`.
 */

module.exports = modifierFactory;
