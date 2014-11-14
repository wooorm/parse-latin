'use strict';

var tokenizer;

tokenizer = require('./tokenizer');

function parserFactory(options) {
    var type,
        delimiter,
        tokenizerProperty;

    type = options.type;
    tokenizerProperty = options.tokenizer;
    delimiter = options.delimiter;

    if (delimiter) {
        delimiter = tokenizer(options.delimiterType, options.delimiter);
    }

    return function (value) {
        var children;

        children = this[tokenizerProperty](value);

        return {
            'type': type,
            'children': delimiter ? delimiter(children) : children
        };
    };
}

module.exports = parserFactory;
