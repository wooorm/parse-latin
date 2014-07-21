'use strict';

var ParseLatin, assert, parseLatin;

ParseLatin = require('..');
assert = require('assert');
parseLatin = new ParseLatin();

describe('ParseLatin', function () {
    it('should be a function', function () {
        assert(typeof ParseLatin === 'function');
    });

    it('should return a newly initialized `ParseLatin` object, when invoked',
        function () {
            assert(new ParseLatin() instanceof ParseLatin);
            /*eslint-disable new-cap */
            assert(ParseLatin() instanceof ParseLatin);
            /*eslint-enable new-cap */
        }
    );
});

describe('new ParseLatin()', function () {
    it('should have a `parse` method', function () {
        assert(typeof parseLatin.parse === 'function');
    });

    it('should have a `tokenizeRoot` method', function () {
        assert(typeof parseLatin.tokenizeRoot === 'function');
    });

    it('should have a `tokenizeParagraph` method', function () {
        assert(typeof parseLatin.tokenizeParagraph === 'function');
    });

    it('should have a `tokenizeSentence` method', function () {
        assert(typeof parseLatin.tokenizeSentence === 'function');
    });

    it('should have a `tokenize` method', function () {
        assert(typeof parseLatin.tokenize === 'function');
    });
});

describe('Root: Without a value', function () {
    it('should return an empty RootNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parseLatin.parse()) ===
                JSON.stringify({
                    'type' : 'RootNode',
                    'children' : []
                })
            );
        }
    );
});

describe('Root: Given two paragraphs', function () {
    /*
     * Modified first paragraph, split into two, of:
     *    http://en.wikipedia.org/wiki/Paragraph
    */
    var source = 'A paragraph (from the Greek paragraphos, “to write ' +
        'beside” or “written beside”) is a self-contained unit of a ' +
        'discourse in writing dealing with a particular point or idea. A ' +
        'paragraph has 5 types (Anton Heitman).\n\nA paragraph ' +
        'consists of one or more sentences. Though not required by the ' +
        'syntax of any language, paragraphs are usually an expected part ' +
        'of formal writing, used to organize longer prose.';

    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeRoot(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'A'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '('
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'from'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'the'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Greek'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraphos'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ','
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '“'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'to'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'write'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'beside'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '”'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'or'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '“'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'written'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'beside'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '”'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ')'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'is'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'a'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'self'
                                        },
                                        {
                                            'type' : 'PunctuationNode',
                                            'children' : [
                                                {
                                                    'type' : 'TextNode',
                                                    'value' : '-'
                                                }
                                            ]
                                        },
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'contained'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'unit'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'of'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'a'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'discourse'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'in'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'writing'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'dealing'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'with'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'a'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'particular'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'point'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'or'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'idea'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'A'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'has'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '5'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'types'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '('
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Anton'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Heitman'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ')'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'A'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraph'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'consists'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'of'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'one'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'or'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'more'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'sentences'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Though'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'not'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'required'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'by'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'the'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'syntax'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'of'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'any'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'language'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ','
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'paragraphs'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'are'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'usually'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'an'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'expected'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'part'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'of'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'formal'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'writing'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ','
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'used'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'to'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'organize'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'longer'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'prose'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Root: Given a String object', function () {
    it('should tokenize the toString representation of the given object ' +
        'when the given object is an instance of String', function () {
            var source = 'Test.';
            /*eslint-disable no-new-wrappers */
            assert(
                JSON.stringify(
                    parseLatin.tokenizeRoot(new String(source))
                ) ===
                JSON.stringify(
                    parseLatin.tokenizeRoot(source)
                )
            );
            /*eslint-enable no-new-wrappers */
        }
    );
});

describe('Root: Given any other value', function () {
    it('should throw when the object is neither null, undefined, string, ' +
        'nor String object', function () {
            assert.throws(function () {
                parseLatin.tokenizeRoot({});
            });
        }
    );
});

describe('A whitespace only document', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.parse('\n\n');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n\n'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Paragraph: Without a value', function () {
    it('should return an empty ParagraphNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parseLatin.tokenizeParagraph()) ===
                JSON.stringify({
                    'type' : 'ParagraphNode',
                    'children' : []
                })
            );
        }
    );
});

describe('Sentence: Without a value', function () {
    it('should return an empty SentenceNode when invoked without value',
        function () {
            assert(
                JSON.stringify(parseLatin.tokenizeSentence()) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : []
                })
            );
        }
    );
});

describe('Sentence: Starting with a latin exception', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph(
            'A sentence. Cap. 553, Electronic Transactions Ordinance.'
        );

        assert(
            JSON.stringify(root) ===
            JSON.stringify({
                'type' : 'ParagraphNode',
                'children' : [
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'A'
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ' '
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'sentence'
                                    }
                                ]
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'Cap'
                                    }
                                ]
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ' '
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '553'
                                    }
                                ]
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ','
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ' '
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'Electronic'
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ' '
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'Transactions'
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : ' '
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'Ordinance'
                                    }
                                ]
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        );
    });
});

/*
 * Part of the second sentence of:
 * http://en.wikipedia.org/wiki/Natural_language#
 *   Constructed_languages_and_international_auxiliary_languages
*/
describe('Sentence: Abbreviations with dot characters', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('Esperanto was selectively ' +
            'designed by L.L. Zamenhof from natural languages.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Esperanto'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'was'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'selectively'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'designed'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'L'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'TextNode',
                            'value' : 'L'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Zamenhof'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'from'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'natural'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'languages'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/Park_Ave.
*/
describe('Sentence: abbreviations followed by lowercase', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph(
            'Park Ave. was an indie pop band which started in January ' +
            '1996 in Nebraska (Omaha).'
        );

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Park'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Ave'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'was'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'an'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'indie'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'pop'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'band'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'which'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'started'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'in'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'January'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '1996'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'in'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Nebraska'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '('
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Omaha'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ')'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Last sentence of the first paragraph of: http://en.wikipedia.org/wiki/.com
*/
describe('Sentence: common abbreviations preceded by a dot', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('However, eventually the ' +
            'distinction was lost when .com, .org and .net were opened ' +
            'for unrestricted registration.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'However'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'eventually'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'the'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'distinction'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'was'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'lost'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'when'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'com'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'org'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'and'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'net'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'were'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'opened'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'for'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'unrestricted'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'registration'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Example found on the web.
*/
describe('Sentence: A terminal marker before a closing quote or parenthesis',
    function () {
        it('should equal the test AST', function () {
            var source = '“However,” says my Grade 8 teacher, “the ' +
                'period goes inside quotes.” This is another sentence';

            assert(JSON.stringify(parseLatin.tokenizeParagraph(source)) ===
                JSON.stringify({
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '“'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'However'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ','
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '”'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'says'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'my'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Grade'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '8'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'teacher'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ','
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '“'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'the'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'period'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'goes'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'inside'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'quotes'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '”'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'This'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'is'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'another'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'sentence'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            );
        });
    }
);

/*
 * Part of the wikipedia license note.
*/
describe('Sentence: Abbreviations followed by a dot, optional white ' +
    'space, and a comma', function () {
        it('should equal the test AST', function () {
            var root = parseLatin.tokenizeParagraph('Wikipedia® is a ' +
                'registered trademark of the Wikimedia Foundation, Inc., a ' +
                'non-profit organization.');

            assert(JSON.stringify(root.children[0]) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wikipedia'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '®'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'a'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'registered'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'trademark'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'of'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wikimedia'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Foundation'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Inc'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'a'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'non'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '-'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'profit'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'organization'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        });
    }
);

describe('Sentence: Starting with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('. . . to be continued.');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'to'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'be'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'continued'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Ending with ellipsis containing spaces', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('To be continued. . .');

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'To'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'be'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'continued'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Starting with ellipsis without spaces', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('...To be continued.');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '...'
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'To'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'be'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'continued'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: With trailing white space', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('A sentence. ');

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'A'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sentence'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Without terminal marker', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('A sentence');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'A'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'sentence'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Sentence: Without alphabetic content', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeParagraph('\uD83D\uDC38.');
        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\uD83D\uDC38'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('White space characters', function () {
    var sentenceStart = 'A',
        sentenceEnd = 'house.',
        iterator = -1,
        whiteSpaceCharacters = [
            '\u0009', // CHARACTER TABULATION
            '\u000A', // LINE FEED (LF)
            '\u000B', // LINE TABULATION
            '\u000C', // FORM FEED (FF)
            '\u000D', // CARRIAGE RETURN (CR)
            '\u0020', // SPACE
            '\u0085', // NEXT LINE (NEL)
            '\u00A0', // NO-BREAK SPACE
            '\u1680', // OGHAM SPACE MARK
            '\u180E', // MONGOLIAN VOWEL SEPARATOR
            '\u2000', // EN QUAD
            '\u2001', // EM QUAD
            '\u2002', // EN SPACE
            '\u2003', // EM SPACE
            '\u2004', // THREE-PER-EM SPACE
            '\u2005', // FOUR-PER-EM SPACE
            '\u2006', // SIX-PER-EM SPACE
            '\u2007', // FIGURE SPACE
            '\u2008', // PUNCTUATION SPACE
            '\u2009', // THIN SPACE
            '\u200A', // HAIR SPACE
            '\u2028', // LINE SEPARATOR
            '\u2029', // PARAGRAPH SEPARATOR
            '\u202F', // NARROW NO-BREAK SPACE
            '\u205F', // MEDIUM MATHEMATICAL SPACE
            '\u3000'  // IDEOGRAPHIC SPACE
        ],
        character;

    while (whiteSpaceCharacters[++iterator]) {
        character = whiteSpaceCharacters[iterator];

        var source = sentenceStart + character + sentenceEnd;

        it('should equal the test AST when using `' + character + '`',
            function () {
                assert(
                    JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                    JSON.stringify({
                        'type' : 'SentenceNode',
                        'children' : [
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'A'
                                    }
                                ]
                            },
                            {
                                'type' : 'WhiteSpaceNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : character
                                    }
                                ]
                            },
                            {
                                'type' : 'WordNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : 'house'
                                    }
                                ]
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    })
                );
            }
        );
    }
});

/*
 * Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
 */
describe('A simple sentence testing for astral-plane characters',
    function () {
        var source = 'The unicode character \uD83D\uDCA9 is pile of poo.';
        it('should equal the test AST', function () {
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'The'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'unicode'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'character'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\uD83D\uDCA9'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'pile'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'of'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'poo'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        });
    }
);

/*
 * Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING KEYCAP,
 * together forming a :zero: emoji
 */
describe('Double combining marks', function () {
    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeSentence(
            'He scored 0\uFE0F\u20E3 points.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'He'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'scored'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '0\uFE0F\u20E3'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'points'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

var diacritics = [
        '\u0300', // COMBINING GRAVE ACCENT (U+0300)
        '\u0301', // COMBINING ACUTE ACCENT (U+0301)
        '\u0302', // COMBINING CIRCUMFLEX ACCENT (U+0302)
        '\u0303', // COMBINING TILDE (U+0303)
        '\u0304', // COMBINING MACRON (U+0304)
        '\u0305', // COMBINING OVERLINE (U+0305)
        '\u0306', // COMBINING BREVE (U+0306)
        '\u0307', // COMBINING DOT ABOVE (U+0307)
        '\u0308', // COMBINING DIAERESIS (U+0308)
        '\u0309', // COMBINING HOOK ABOVE (U+0309)
        '\u030A', // COMBINING RING ABOVE (U+030A)
        '\u030B', // COMBINING DOUBLE ACUTE ACCENT (U+030B)
        '\u030C', // COMBINING CARON (U+030C)
        '\u030D', // COMBINING VERTICAL LINE ABOVE (U+030D)
        '\u030E', // COMBINING DOUBLE VERTICAL LINE ABOVE (U+030E)
        '\u030F', // COMBINING DOUBLE GRAVE ACCENT (U+030F)
        '\u0310', // COMBINING CANDRABINDU (U+0310)
        '\u0311', // COMBINING INVERTED BREVE (U+0311)
        '\u0312', // COMBINING TURNED COMMA ABOVE (U+0312)
        '\u0313', // COMBINING COMMA ABOVE (U+0313)
        '\u0314', // COMBINING REVERSED COMMA ABOVE (U+0314)
        '\u0315', // COMBINING COMMA ABOVE RIGHT (U+0315)
        '\u0316', // COMBINING GRAVE ACCENT BELOW (U+0316)
        '\u0317', // COMBINING ACUTE ACCENT BELOW (U+0317)
        '\u0318', // COMBINING LEFT TACK BELOW (U+0318)
        '\u0319', // COMBINING RIGHT TACK BELOW (U+0319)
        '\u031A', // COMBINING LEFT ANGLE ABOVE (U+031A)
        '\u031B', // COMBINING HORN (U+031B)
        '\u031C', // COMBINING LEFT HALF RING BELOW (U+031C)
        '\u031D', // COMBINING UP TACK BELOW (U+031D)
        '\u031E', // COMBINING DOWN TACK BELOW (U+031E)
        '\u031F', // COMBINING PLUS SIGN BELOW (U+031F)
        '\u0320', // COMBINING MINUS SIGN BELOW (U+0320)
        '\u0321', // COMBINING PALATALIZED HOOK BELOW (U+0321)
        '\u0322', // COMBINING RETROFLEX HOOK BELOW (U+0322)
        '\u0323', // COMBINING DOT BELOW (U+0323)
        '\u0324', // COMBINING DIAERESIS BELOW (U+0324)
        '\u0325', // COMBINING RING BELOW (U+0325)
        '\u0326', // COMBINING COMMA BELOW (U+0326)
        '\u0327', // COMBINING CEDILLA (U+0327)
        '\u0328', // COMBINING OGONEK (U+0328)
        '\u0329', // COMBINING VERTICAL LINE BELOW (U+0329)
        '\u032A', // COMBINING BRIDGE BELOW (U+032A)
        '\u032B', // COMBINING INVERTED DOUBLE ARCH BELOW (U+032B)
        '\u032C', // COMBINING CARON BELOW (U+032C)
        '\u032D', // COMBINING CIRCUMFLEX ACCENT BELOW (U+032D)
        '\u032E', // COMBINING BREVE BELOW (U+032E)
        '\u032F', // COMBINING INVERTED BREVE BELOW (U+032F)
        '\u0330', // COMBINING TILDE BELOW (U+0330)
        '\u0331', // COMBINING MACRON BELOW (U+0331)
        '\u0332', // COMBINING LOW LINE (U+0332)
        '\u0333', // COMBINING DOUBLE LOW LINE (U+0333)
        '\u0334', // COMBINING TILDE OVERLAY (U+0334)
        '\u0335', // COMBINING SHORT STROKE OVERLAY (U+0335)
        '\u0336', // COMBINING LONG STROKE OVERLAY (U+0336)
        '\u0337', // COMBINING SHORT SOLIDUS OVERLAY (U+0337)
        '\u0338', // COMBINING LONG SOLIDUS OVERLAY (U+0338)
        '\u0339', // COMBINING RIGHT HALF RING BELOW (U+0339)
        '\u033A', // COMBINING INVERTED BRIDGE BELOW (U+033A)
        '\u033B', // COMBINING SQUARE BELOW (U+033B)
        '\u033C', // COMBINING SEAGULL BELOW (U+033C)
        '\u033D', // COMBINING X ABOVE (U+033D)
        '\u033E', // COMBINING VERTICAL TILDE (U+033E)
        '\u033F', // COMBINING DOUBLE OVERLINE (U+033F)
        '\u0340', // COMBINING GRAVE TONE MARK (U+0340)
        '\u0341', // COMBINING ACUTE TONE MARK (U+0341)
        '\u0342', // COMBINING GREEK PERISPOMENI (U+0342)
        '\u0343', // COMBINING GREEK KORONIS (U+0343)
        '\u0344', // COMBINING GREEK DIALYTIKA TONOS (U+0344)
        '\u0345', // COMBINING GREEK YPOGEGRAMMENI (U+0345)
        '\u0346', // COMBINING BRIDGE ABOVE (U+0346)
        '\u0347', // COMBINING EQUALS SIGN BELOW (U+0347)
        '\u0348', // COMBINING DOUBLE VERTICAL LINE BELOW (U+0348)
        '\u0349', // COMBINING LEFT ANGLE BELOW (U+0349)
        '\u034A', // COMBINING NOT TILDE ABOVE (U+034A)
        '\u034B', // COMBINING HOMOTHETIC ABOVE (U+034B)
        '\u034C', // COMBINING ALMOST EQUAL TO ABOVE (U+034C)
        '\u034D', // COMBINING LEFT RIGHT ARROW BELOW (U+034D)
        '\u034E', // COMBINING UPWARDS ARROW BELOW (U+034E)
        '\u034F', // COMBINING GRAPHEME JOINER (U+034F)
        '\u0350', // COMBINING RIGHT ARROWHEAD ABOVE (U+0350)
        '\u0351', // COMBINING LEFT HALF RING ABOVE (U+0351)
        '\u0352', // COMBINING FERMATA (U+0352)
        '\u0353', // COMBINING X BELOW (U+0353)
        '\u0354', // COMBINING LEFT ARROWHEAD BELOW (U+0354)
        '\u0355', // COMBINING RIGHT ARROWHEAD BELOW (U+0355)
        '\u0356', // COMBINING RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356)
        '\u0357', // COMBINING RIGHT HALF RING ABOVE (U+0357)
        '\u0358', // COMBINING DOT ABOVE RIGHT (U+0358)
        '\u0359', // COMBINING ASTERISK BELOW (U+0359)
        '\u035A', // COMBINING DOUBLE RING BELOW (U+035A)
        '\u035B', // COMBINING ZIGZAG ABOVE (U+035B)
        '\u035C', // COMBINING DOUBLE BREVE BELOW (U+035C)
        '\u035D', // COMBINING DOUBLE BREVE (U+035D)
        '\u035E', // COMBINING DOUBLE MACRON (U+035E)
        '\u035F', // COMBINING DOUBLE MACRON BELOW (U+035F)
        '\u0360', // COMBINING DOUBLE TILDE (U+0360)
        '\u0361', // COMBINING DOUBLE INVERTED BREVE (U+0361)
        '\u0362', // COMBINING DOUBLE RIGHTWARDS ARROW BELOW (U+0362)
        '\u0363', // COMBINING LATIN SMALL LETTER A (U+0363)
        '\u0364', // COMBINING LATIN SMALL LETTER E (U+0364)
        '\u0365', // COMBINING LATIN SMALL LETTER I (U+0365)
        '\u0366', // COMBINING LATIN SMALL LETTER O (U+0366)
        '\u0367', // COMBINING LATIN SMALL LETTER U (U+0367)
        '\u0368', // COMBINING LATIN SMALL LETTER C (U+0368)
        '\u0369', // COMBINING LATIN SMALL LETTER D (U+0369)
        '\u036A', // COMBINING LATIN SMALL LETTER H (U+036A)
        '\u036B', // COMBINING LATIN SMALL LETTER M (U+036B)
        '\u036C', // COMBINING LATIN SMALL LETTER R (U+036C)
        '\u036D', // COMBINING LATIN SMALL LETTER T (U+036D)
        '\u036E', // COMBINING LATIN SMALL LETTER V (U+036E)
        '\u036F'  // COMBINING LATIN SMALL LETTER X (U+036F)
    ],
    iterator = -1,
    diacritic;

describe('A simple sentence testing for combining diacritical marks',
    function () {
        while (diacritics[++iterator]) {
            diacritic = diacritics[iterator];

            var source = 'This is a' + diacritic + ' house.';
            it('should equal the test AST when using \u25CC' + diacritic,
                function () {
                    assert(
                        JSON.stringify(
                            parseLatin.tokenizeSentence(source)
                        ) ===
                        JSON.stringify({
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'This'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'is'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'a' + diacritic
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'house'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        })
                    );
                }
            );
        }
    }
);

/*
 * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
*/
describe('Simple sentences testing for tie characters', function () {
    it('should equal the test AST, when using the combinding double ' +
        'breve \u25CC\u035D\u25CC', function () {
            var source = 'e.g. the combining double breve o\u035Do.';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o\u035Do'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the combinding double ' +
        'inverted breve \u25CC\u0361\u25CC', function () {
            var source =
                'e.g. the combining double inverted breve /k\u0361p/';

            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'inverted'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'k\u0361p'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the combinding double breve ' +
        'below \u25CC\u035C\u25CC', function () {
            var source = 'e.g. the combining double breve below /k\u035Cp/';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'combining'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'double'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'breve'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'below'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'k\u035Cp'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the undertie \u203F',
        function () {
            var source = 'e.g. the undertie /vuz\u203Fave/';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'undertie'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'vuz'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u203F'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'ave'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '/'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the character tie \u2040',
        function () {
            var source = 'e.g. the character tie s\u2040t';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'character'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'tie'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 's'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2040'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 't'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the inverted undertie \u2054',
        function () {
            var source = 'e.g. the inverted undertie o\u2054o';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'e'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'g'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'inverted'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'undertie'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2054'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'o'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );
});

describe('Intelectual property marks', function () {
    it('should equal the test AST, when using the copyright symbol \u00A9',
        function () {
            var source = '\u00A9 2011 John Smith';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u00A9'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '2011'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'John'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Smith'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the sound recording ' +
        'copyright symbol \u2117', function () {
            var source = 'Designated by \u2117, the sound recording ' +
                'copyright symbol.';

            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Designated'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'by'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2117'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ','
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sound'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'recording'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'copyright'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'symbol'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the registered trademark ' +
        'symbol \u00AE', function () {
            var source = 'Wikipedia\u00AE is a registered trademark.';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wikipedia'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u00AE'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'a'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'registered'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'trademark'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the service mark symbol \u2120',
        function () {
            var source = 'ABC Law\u2120 legal services.';
            assert(JSON.stringify(parseLatin.tokenizeSentence(source)) ===
                JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'ABC'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Law'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '\u2120'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'legal'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'services'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                })
            );
        }
    );

    it('should equal the test AST, when using the trademark symbol \u2122',
        function () {
            var root = parseLatin.tokenizeSentence(
                'Mytrademark\u2122 is a trademark.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Mytrademark'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\u2122'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'trademark'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );
});

/*
 * Modified first sentence of: http://en.wikipedia.org/wiki/IPhone_5S
*/
describe('A simple sentence testing for digit-letters', function () {
    var source = 'iPhone 5S is a high-end smartphone developed by Apple.';

    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeSentence(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'iPhone'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '5S'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'is'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'a'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'high'
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '-'
                                }
                            ]
                        },
                        {
                            'type' : 'TextNode',
                            'value' : 'end'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'smartphone'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'developed'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Apple'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Modified sentence from: http://mathiasbynens.be/notes/javascript-unicode
 * Note the combining characters.
*/
describe('A simple sentence testing for grapheme clusters', function () {
    var source = 'Grapheme clusters such as \u0BA8\u0BBF and Hangul made ' +
        'of conjoining Jamo such as \u1101\u1161\u11A8, or other similar ' +
        'symbols.';

    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeSentence(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Grapheme'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'clusters'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'such'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'as'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u0BA8\u0BBF'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'and'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Hangul'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'made'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'of'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'conjoining'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Jamo'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'such'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'as'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u1101\u1161\u11A8'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'or'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'other'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'similar'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'symbols'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

/*
 * Modified example from: https://github.com/walling/unorm
 * Note both the hexadecimal and Unicode escape sequences.
*/
describe('Unicode parsing', function () {
    var source = 'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
        '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length ' +
        '10\u207B\xB9\u2070 m.';

    it('should equal the test AST', function () {
        var root = parseLatin.tokenizeSentence(source);

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'SentenceNode',
            'children' : [
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'The'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                // NOT a combining ring! Just the unicode
                // A-ring character.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\xC5'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'symbol'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'invented'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'by'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'A'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'J'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                // A combining ring and a combining diaereses.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'A\u030Angstro\u0308m'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '('
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '1814'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                // Two combining diaereses.
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'Lo\u0308gdo\u0308'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ','
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                // En-dash
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u2013'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '1874'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ')'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'denotes'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'the'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'length'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '10'
                        }
                    ]
                },
                // Superscript minus.
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\u207B'
                        }
                    ]
                },
                // Superscript one and superscript two
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\xB9\u2070'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'WordNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : 'm'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Abbreviations: Decimals (affixed by a full-stop)', function () {
    it('should *not* treat the dot-character succeeding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var root,
                digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];
                root = parseLatin.tokenizeSentence(
                    'See § ' + digit + '. ¶ 2.'
                );

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'See'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '§'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : digit
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '¶'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '2'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Alphabetical', function () {
    it('should *not* treat the dot-character preceded by a latin letter ' +
        'and whitespace, as a terminal marker (e.g., in ' +
        '`Thomas A. Swift`, or in `e.` when abbreviating east)',
        function () {
            var alphabet = 'abcdefghijklmnopqrstuvwxyz',
                iterator = -1,
                root, character;

            alphabet += alphabet.toUpperCase();
            alphabet = alphabet.split('');

            while (alphabet[++iterator]) {
                character = alphabet[iterator];
                root = parseLatin.tokenizeSentence(
                    'Thomas ' + character + '. Swift'
                );

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Thomas'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : character
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Swift'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Abbreviations: Latin', function () {
    it('should *not* treat the dot-character succeeding `ca` (abbreviation ' +
        'for `circa`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'The antique clock is from ca. 1900.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'antique'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'clock'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'from'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ca'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1900'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cap` ' +
        '(abbreviation for `chapter`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'Electronic Transactions Ordinance (Cap. 553)'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Electronic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Transactions'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ordinance'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Cap'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '553'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cf` (abbreviation ' +
        'for `bring together`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992)'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'were'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'similar'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'those'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'obtained'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'using'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'different'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'techniques'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cf'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Wilson'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1999'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ansmann'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1992'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cp` (abbreviation ' +
        'for `compare`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'These results were similar to those obtained using ' +
                'different techniques (cf. Wilson, 1999 and Ansmann, 1992).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'were'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'similar'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'those'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'obtained'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'using'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'different'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'techniques'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cf'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Wilson'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1999'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ansmann'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '1992'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cwt` ' +
        '(abbreviation for `centum weight`), as a terminal marker',
        function () {
            var root = parseLatin.tokenizeSentence(
                'Hundredweight is abbreviated as cwt. because \'C\' is ' +
                'the Roman symbol for 100.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Hundredweight'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'abbreviated'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'as'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cwt'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'because'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\''
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'C'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '\''
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Roman'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'symbol'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '100'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ead` ' +
        '(abbreviation for `eadem`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'When quoting a female author, use the feminine form ' +
                'of idem, ead. (eadem).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'When'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'quoting'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'female'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'author'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'use'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'feminine'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'form'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'idem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ead'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'eadem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `al` ' +
        '(abbreviation for `(et) alii`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'These results agree with the ones published by ' +
                'Pelon et al. (2002).'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'These'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'results'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'agree'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'with'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ones'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'published'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'by'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Pelon'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'al'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2002'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `etc` ' +
        '(abbreviation for `et cetera`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'Et cetera (abbreviated as etc. or &c.) is a Latin ' +
                'expression that means “and other things”, or “and so ' +
                'forth.”'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cetera'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'abbreviated'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'as'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'etc'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '&'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'c'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Latin'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'expression'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'that'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'means'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'other'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'things'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'so'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'forth'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `fl` (abbreviation ' +
        'for `floruit`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'The great author Joseph Someone (fl. 2050-75) was ' +
                'renowned for his erudition.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'great'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'author'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Joseph'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Someone'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'fl'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '2050'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '-'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : '75'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'was'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'renowned'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'his'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'erudition'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ff` ' +
        '(abbreviation for `foliis`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'As such, Hornblower 258f. would refer to pages 258–259 ' +
                'while 258ff. would refer to an undetermined number of ' +
                'pages following page 258.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'As'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'such'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Hornblower'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258f'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'would'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'refer'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '–'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '259'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'while'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258ff'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'would'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'refer'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'an'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'undetermined'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'number'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'following'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'page'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '258'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `ibid` ' +
        '(abbreviation for `ibidem`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'Ibid. (Latin, short for ibidem, meaning “in the same ' +
                'place”) is the term used to provide an endnote or ' +
                'footnote citation or reference for a source that was ' +
                'cited in the preceding endnote or footnote.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Ibid'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Latin'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'short'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'ibidem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'meaning'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'same'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'place'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'term'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'used'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'provide'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'an'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'endnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'footnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'citation'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'reference'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'source'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'that'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'was'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cited'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'preceding'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'endnote'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'footnote'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `id` (abbreviation ' +
        'for `idem`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'Id. is particularly used in legal citations.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Id'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'particularly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'used'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'legal'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'citations'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `nem` and `con` ' +
        '(in `nem. con.`, abbreviation for `nemine contradicente`), as a ' +
        'terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'The meaning of nemine contradicente is distinct from ' +
                '“unanimously”; nem. con. simply means that nobody voted ' +
                'against.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'meaning'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'nemine'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'contradicente'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'distinct'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'from'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'unanimously'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ';'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'nem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'con'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'simply'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'means'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'that'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'nobody'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'voted'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'against'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `op` and `cit` ' +
        '(in `op. cit.`, abbreviation for `opere (citato)`), as a terminal ' +
        'marker', function () {
            var root = parseLatin.tokenizeSentence(
                'As usual with foreign words and phrases, op. cit. is ' +
                'typically given in italics.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'As'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'usual'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'with'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'foreign'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'words'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'phrases'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'op'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cit'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'typically'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'given'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'italics'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `cent` ' +
        '(abbreviation for `(per) cent`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'The form per cent. is still in use as a part of highly ' +
                'formal language.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'form'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'cent'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'still'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'in'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'use'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'as'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'part'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'of'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'highly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'formal'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'language'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `pro` ' +
        '(abbreviation for `(per) procurationem`), as a terminal marker',
        function () {
            var root = parseLatin.tokenizeSentence(
                'Procuration (per procurationem), or shortly per pro., ' +
                'or simply p.p.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Procuration'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '('
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'procurationem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ')'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'shortly'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'per'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pro'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'simply'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'p'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'p'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '.'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `tem` ' +
        '(abbreviation for `(pro) tempore`), as a terminal marker',
        function () {
            var root = parseLatin.tokenizeSentence(
                'Legislative bodies can have one or more pro tem. for ' +
                'the presiding officer.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Legislative'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'bodies'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'can'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'have'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'one'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'more'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pro'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'tem'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'presiding'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'officer'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `sic` ' +
        '(abbreviation for `sic erat scriptum`), as a terminal marker',
        function () {
            var root = parseLatin.tokenizeSentence(
                'Sic., or sic erat scriptum, is Latin for “Thus it ' +
                'was written.”'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Sic'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sic'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'erat'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'scriptum'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Latin'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'for'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '“'
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'Thus'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'it'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'was'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'written'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '”'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `seq` ' +
        '(abbreviation for `(et) sequentia`), as a terminal marker',
        function () {
            var root = parseLatin.tokenizeSentence(
                'The phrase et seq. is used to indicate that ' +
                'the information is continued on the denoted ' +
                'pages or sections.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'phrase'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'et'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'seq'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'used'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'indicate'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'that'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'information'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'is'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'continued'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'on'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'the'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'denoted'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'pages'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'or'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'sections'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `stat` ' +
        '(abbreviation for `statim`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'That patient needs attention, stat.!'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'That'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'patient'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'needs'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'attention'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'stat'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '!'
                            }
                        ]
                    }
                ]
            }));
        }
    );

    it('should *not* treat the dot-character succeeding `viz` ' +
        '(abbreviation for `videlicet`), as a terminal marker', function () {
            var root = parseLatin.tokenizeSentence(
                'The noble gases, viz. helium, neon, argon, xenon, ' +
                'krypton and radon, show a non-expected behaviour when ' +
                'exposed to this new element.'
            );

            assert(JSON.stringify(root) === JSON.stringify({
                'type' : 'SentenceNode',
                'children' : [
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'The'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'noble'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'gases'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'viz'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'helium'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'neon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'argon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'xenon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'krypton'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'and'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'radon'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ','
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'show'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'a'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'non'
                            },
                            {
                                'type' : 'PunctuationNode',
                                'children' : [
                                    {
                                        'type' : 'TextNode',
                                        'value' : '-'
                                    }
                                ]
                            },
                            {
                                'type' : 'TextNode',
                                'value' : 'expected'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'behaviour'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'when'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'exposed'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'to'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'this'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'new'
                            }
                        ]
                    },
                    {
                        'type' : 'WhiteSpaceNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : ' '
                            }
                        ]
                    },
                    {
                        'type' : 'WordNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : 'element'
                            }
                        ]
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    }
                ]
            }));
        }
    );
});

describe('Abbreviations: Decimals (prefixed by a full-stop)', function () {
    it('should *not* treat the dot-character preceding decimals (e.g., ' +
        '`1`, `2`, &c.), as a terminal marker', function () {
            var digits = '0123456789'.split(''),
                iterator = -1,
                digit;

            while (digits[++iterator]) {
                digit = digits[iterator];

                var root = parseLatin.tokenizeSentence(
                    'See § .' + digit + ' ¶ 2.'
                );

                assert(JSON.stringify(root) === JSON.stringify({
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'See'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '§'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : digit
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '¶'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '2'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }));
            }
        }
    );
});

describe('Terminal markers', function () {
    it('should break sentences ending in a full stop/period', function () {
        var root = parseLatin.tokenizeParagraph(
            'A sentence. Another sentence.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'A'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sentence'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Another'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sentence'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in a question mark', function () {
        var root = parseLatin.tokenizeParagraph(
            'Is it good in form? style? meaning? He responded with yes.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'it'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'good'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'in'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'form'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '?'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'style'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '?'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'meaning'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '?'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'He'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'responded'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'with'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'yes'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an exclamation mark', function () {
        var root = parseLatin.tokenizeParagraph(
            '“No!” he yelled. “Buy it now!” They have some really(!) ' +
            'low-priced rugs on sale this week.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '“'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'No'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '”'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'he'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'yelled'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '“'
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Buy'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'it'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'now'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '”'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'They'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'have'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'some'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'really'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '('
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ')'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'low'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '-'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 'priced'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'rugs'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'on'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sale'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'this'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'week'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an interrobang', function () {
        var root = parseLatin.tokenizeParagraph(
            'Say what‽ She\u2019s pregnant?! Realy!? Wow.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Say'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'what'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '‽'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'She'
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '\u2019'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'TextNode',
                                    'value' : 's'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'pregnant'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '?'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Realy'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '!'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '?'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'Wow'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should break sentences ending in an ellipsis', function () {
        var root = parseLatin.parse(
            'This is rather straightforward... most of the time... ' +
            'She said that you should end a sentence with an ellipsis.'
        );

        assert(JSON.stringify(root.children[0]) === JSON.stringify({
            'type' : 'ParagraphNode',
            'children' : [
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'This'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'is'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'rather'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'straightforward'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '...'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'most'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'of'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'the'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'time'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '...'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : ' '
                        }
                    ]
                },
                {
                    'type' : 'SentenceNode',
                    'children' : [
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'She'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'said'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'that'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'you'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'should'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'end'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'a'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'sentence'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'with'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'an'
                                }
                            ]
                        },
                        {
                            'type' : 'WhiteSpaceNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : ' '
                                }
                            ]
                        },
                        {
                            'type' : 'WordNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : 'ellipsis'
                                }
                            ]
                        },
                        {
                            'type' : 'PunctuationNode',
                            'children' : [
                                {
                                    'type' : 'TextNode',
                                    'value' : '.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Abbreviations: Initialisms', function () {
    it('should merge full-stops in initialisms', function () {
        var root = parseLatin.tokenizeSentence(
            'Something C.I.A. something.'
        ).children[2];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'C'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'A'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });

    it('should merge full-stops surrounded by words', function () {
        var root = parseLatin.tokenizeSentence(
            'You will need to arrive by 14.30'
        ).children[12];

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : '14'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : '30'
                }
            ]
        }));
    });

    it('should NOT merge a full-stop following a merged word', function () {
        var root = parseLatin.tokenizeSentence(
            'Self-contained.'
        ).children;

        assert(JSON.stringify(root) === JSON.stringify([
            {
                'type' : 'WordNode',
                'children' : [
                    {
                        'type' : 'TextNode',
                        'value' : 'Self'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '-'
                            }
                        ]
                    },
                    {
                        'type' : 'TextNode',
                        'value' : 'contained'
                    }
                ]
            },
            {
                'type' : 'PunctuationNode',
                'children' : [
                    {
                        'type' : 'TextNode',
                        'value' : '.'
                    }
                ]
            }
        ]));
    });

    it('should merge pluralized single letters', function () {
        var ast = parseLatin.tokenizeParagraph(
            'What about A\'s and Bs?'
        ).children[0];

        assert(JSON.stringify(ast.children[4]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'A'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));

        assert(JSON.stringify(ast.children[8]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'Bs'
                }
            ]
        }));
    });

    it('should merge pluralized initialisms', function () {
        var ast = parseLatin.tokenizeParagraph(
            'What about C.D.\'s, C.D.s, or CDs? SOS\'s or SOSes? ' +
            'G.I.\'s or G.I\'s?'
        ).children;

        assert(JSON.stringify(ast[0].children[4]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'C'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'D'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));

        assert(JSON.stringify(ast[0].children[7]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'C'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'D'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));

        assert(JSON.stringify(ast[0].children[12]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'CDs'
                }
            ]
        }));

        assert(JSON.stringify(ast[2].children[0]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'SOS'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));

        assert(JSON.stringify(ast[2].children[4]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'SOSes'
                }
            ]
        }));

        assert(JSON.stringify(ast[4].children[0]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'G'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));

        assert(JSON.stringify(ast[4].children[4]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'G'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\''
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 's'
                }
            ]
        }));
    });

    it('should not merge initialisms consisting of more than one ' +
        'character each', function () {
            var ast = parseLatin.tokenizeParagraph(
                'Lets meet this Friday at 16.00.'
            ).children[0].children[10];

            assert(JSON.stringify(ast) === JSON.stringify({
                'type' : 'WordNode',
                'children' : [
                    {
                        'type' : 'TextNode',
                        'value' : '16'
                    },
                    {
                        'type' : 'PunctuationNode',
                        'children' : [
                            {
                                'type' : 'TextNode',
                                'value' : '.'
                            }
                        ]
                    },
                    {
                        'type' : 'TextNode',
                        'value' : '00'
                    }
                ]
            }));
        }
    );

    it('should merge initialisms with other merged words', function () {
        var ast = parseLatin.tokenizeParagraph(
            'In the pre-C.I.A. era.'
        ).children[0];

        assert(JSON.stringify(ast.children[4]) === JSON.stringify({
            'type' : 'WordNode',
            'children' : [
                {
                    'type' : 'TextNode',
                    'value' : 'pre'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '-'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'C'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'I'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                },
                {
                    'type' : 'TextNode',
                    'value' : 'A'
                },
                {
                    'type' : 'PunctuationNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '.'
                        }
                    ]
                }
            ]
        }));
    });
});

describe('Source', function () {
    it('should merge a source node when in a document', function () {
        var root = parseLatin.tokenizeRoot(
            '# Some Sentence.\n' +
            '=================\n\n' +
            'Another sentence.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '#'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Some'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Sentence'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SourceNode',
                            'value' : '================='
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Another'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'sentence'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should merge multiple source nodes in a document', function () {
        var root = parseLatin.tokenizeRoot(
            '# Some Sentence.\n' +
            '=================\n' +
            '-----------------\n\n' +
            'Another sentence.'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '#'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Some'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Sentence'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SourceNode',
                            'value' : '================='
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SourceNode',
                            'value' : '-----------------'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'Another'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'sentence'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '.'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should merge a source node when before a document', function () {
        var root = parseLatin.tokenizeRoot(
            '\n|:------:|:-------:|:----:|:---------------:|\n' +
            '| github | unicode | name | escaped unicode |'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SourceNode',
                            'value' : '|:------:|:-------:|:----:' +
                                '|:---------------:|'
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                },
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'github'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'unicode'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'name'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'escaped'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'unicode'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }));
    });

    it('should merge a source node when after a document', function () {
        var root = parseLatin.tokenizeRoot(
            '| github | unicode | name | escaped unicode |\n' +
            '|--------|---------|------|-----------------|\n'
        );

        assert(JSON.stringify(root) === JSON.stringify({
            'type' : 'RootNode',
            'children' : [
                {
                    'type' : 'ParagraphNode',
                    'children' : [
                        {
                            'type' : 'SentenceNode',
                            'children' : [
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'github'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'unicode'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'name'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'escaped'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WordNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : 'unicode'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : ' '
                                        }
                                    ]
                                },
                                {
                                    'type' : 'PunctuationNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '|'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'WhiteSpaceNode',
                                    'children' : [
                                        {
                                            'type' : 'TextNode',
                                            'value' : '\n'
                                        }
                                    ]
                                },
                                {
                                    'type' : 'SourceNode',
                                    'value' : '|--------|---------|------' +
                                        '|-----------------|'
                                }
                            ]
                        }
                    ]
                },
                {
                    'type' : 'WhiteSpaceNode',
                    'children' : [
                        {
                            'type' : 'TextNode',
                            'value' : '\n'
                        }
                    ]
                }
            ]
        }));
    });
});
