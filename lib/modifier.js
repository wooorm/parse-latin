'use strict';

/**
 * Dependencies.
 */

var iterate;

iterate = require('array-iterate');

/**
 * Pass the context as the third argument to `callback`.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object, number)}
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
 * @param {function(Object, number, Object): number|undefined} callback
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
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object)}
 */

function modifierFactory(callback) {
    return iteratorFactory(wrapperFactory(callback));
}

/**
 * Expose `modifierFactory`.
 */

module.exports = modifierFactory;
