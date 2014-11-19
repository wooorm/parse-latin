'use strict';

/**
 * Dependencies.
 */

var ParseLatin,
    assert,
    nlcstTest,
    chalk,
    diff;

ParseLatin = require('..');
assert = require('assert');
nlcstTest = require('nlcst-test');
chalk = require('chalk');
diff = require('diff');

/**
 * `ParseLatin`.
 */

var latin;

latin = new ParseLatin();

/**
 * Constants.
 */

var stringify;

stringify = JSON.stringify;

/**
 * Utility to test if a given document is both a valid
 * node, and matches a fixture.
 *
 * @param {string} name - Filename of fixture.
 * @param {string} document - Source to validate.
 */

function describeFixture(name, document, method) {
    var nlcst,
        fixture,
        difference;

    nlcst = latin[method || 'parse'](document);

    nlcstTest(nlcst);

    fixture = require('./fixture/' + name);

    try {
        assert(stringify(nlcst) === stringify(fixture));
    } catch (exception) {
        difference = diff.diffLines(
            stringify(fixture, 0, 2), stringify(nlcst, 0, 2)
        );

        difference.forEach(function (change) {
            var colour;

            colour = change.added ?
                'green' :
                change.removed ? 'red' : 'dim';

            process.stderr.write(chalk[colour](change.value));
        });

        throw exception;
    }
}

/**
 * Tests.
 */
describe('ParseLatin', function () {
    it('should be a `function`', function () {
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
        assert(typeof latin.parse === 'function');
    });

    it('should have a `tokenizeRoot` method', function () {
        assert(typeof latin.tokenizeRoot === 'function');
    });

    it('should have a `tokenizeParagraph` method', function () {
        assert(typeof latin.tokenizeParagraph === 'function');
    });

    it('should have a `tokenizeSentence` method', function () {
        assert(typeof latin.tokenizeSentence === 'function');
    });

    it('should have a `tokenizeWord` method', function () {
        assert(typeof latin.tokenizeWord === 'function');
    });

    it('should have a `tokenizePunctuation` method', function () {
        assert(typeof latin.tokenizePunctuation === 'function');
    });

    it('should have a `tokenizeWhiteSpace` method', function () {
        assert(typeof latin.tokenizeWhiteSpace === 'function');
    });

    it('should have a `tokenizeSource` method', function () {
        assert(typeof latin.tokenizeSource === 'function');
    });

    it('should have a `tokenizeText` method', function () {
        assert(typeof latin.tokenizeText === 'function');
    });

    it('should have a `tokenize` method', function () {
        assert(typeof latin.tokenize === 'function');
    });
});

describe('ParseLatin#use(key, plugin)', function () {
    it('should throw when a non-pluggable `key` is given', function () {
        assert.throws(function () {
            ParseLatin.prototype.use('alfred');
        }, /Make sure `key` is a supported function/);
    });

    it('should NOT throw when no plugin is given', function () {
        assert.doesNotThrow(function () {
            ParseLatin.prototype.use('tokenizeWord');
        });
    });

    it('should add a plugin on the prototype', function () {
        var parser;

        function thrower() {
            throw new Error('prototypal thrower was invoked');
        }

        ParseLatin.prototype.use('tokenizeWord', thrower);

        parser = new ParseLatin();

        assert(
            ParseLatin.prototype.tokenizeWordPlugins[
                ParseLatin.prototype.tokenizeWordPlugins.length - 1
            ] === thrower
        );

        assert.throws(function () {
            parser.parse('Alfred.');
        }, /thrower was invoked/);

        /**
         * Clean.
         */

        ParseLatin.prototype.tokenizeWordPlugins.pop();
    });

    it('should add a plugin on an instance', function () {
        var parser;

        function thrower() {
            throw new Error('instance thrower was invoked');
        }

        parser = new ParseLatin();

        parser.use('tokenizeWord', thrower);

        assert(
            parser.tokenizeWordPlugins[
                parser.tokenizeWordPlugins.length - 1
            ] === thrower
        );

        assert.throws(function () {
            parser.parse('Alfred.');
        }, /instance thrower was invoked/);
    });

    after(function () {
        /**
         * Internally, `ParseLatin` checks if a
         * `plugins` exists for optimalisation.
         * We remove the prebiously empty list
         * here.
         */

        ParseLatin.prototype.tokenizeWordPlugins = null;
    });
});

describe('ParseLatin#useFirst(key, plugin)', function () {
    it('should throw when a non-pluggable `key` is given', function () {
        assert.throws(function () {
            ParseLatin.prototype.useFirst('alfred');
        }, /Make sure `key` is a supported function/);
    });

    it('should NOT throw when no plugin is given', function () {
        assert.doesNotThrow(function () {
            ParseLatin.prototype.useFirst('tokenizeWord');
        });
    });

    it('should add a plugin on the prototype', function () {
        var parser;

        function thrower() {
            throw new Error('prototypal thrower was invoked');
        }

        ParseLatin.prototype.useFirst('tokenizeWord', thrower);

        parser = new ParseLatin();

        assert(
            ParseLatin.prototype.tokenizeWordPlugins[
                ParseLatin.prototype.tokenizeWordPlugins.length - 1
            ] === thrower
        );

        assert.throws(function () {
            parser.parse('Alfred.');
        }, /thrower was invoked/);

        /**
         * Clean.
         */

        ParseLatin.prototype.tokenizeWordPlugins.pop();
    });

    it('should add a plugin on an instance', function () {
        var parser,
            wasInvoked;

        function first() {
            wasInvoked = true;
        }

        function thrower() {
            assert(wasInvoked === true);
            throw new Error('instance thrower was invoked');
        }

        parser = new ParseLatin();

        parser.useFirst('tokenizeWord', thrower);

        assert(
            parser.tokenizeWordPlugins[0] === thrower
        );

        parser.useFirst('tokenizeWord', first);

        assert(
            parser.tokenizeWordPlugins[0] === first
        );

        assert.throws(function () {
            parser.parse('Alfred.');
        }, /instance thrower was invoked/);

        assert(wasInvoked === true);
    });

    after(function () {
        /**
         * Internally, `ParseLatin` checks if a
         * `plugins` exists for optimalisation.
         * We remove the prebiously empty list
         * here.
         */

        ParseLatin.prototype.tokenizeWordPlugins = null;
    });
});

describe('ParseLatin#tokenizeText()', function () {
    it('should return a text node', function () {
        assert(latin.tokenizeText().type === 'TextNode');
    });

    it('should return a node with its value property set to the given value',
        function () {
            assert(latin.tokenizeText('alfred').value === 'alfred');
        }
    );

    it('should return a node with its value property set to an empty ' +
        'string when no value was given', function () {
            assert(latin.tokenizeText().value === '');
            assert(latin.tokenizeText(undefined).value === '');
            assert(latin.tokenizeText(null).value === '');
        }
    );

    it('should return a node without a `children` property', function () {
        assert(!('children' in latin.tokenizeText()));
    });
});

describe('ParseLatin#tokenizeSource()', function () {
    it('should return a source node', function () {
        assert(latin.tokenizeSource().type === 'SourceNode');
    });

    it('should return a node with its value property set to the given value',
        function () {
            assert(latin.tokenizeSource('alfred').value === 'alfred');
        }
    );

    it('should return a node with its value property set to an empty ' +
        'string when no value was given', function () {
            assert(latin.tokenizeSource().value === '');
            assert(latin.tokenizeSource(undefined).value === '');
            assert(latin.tokenizeSource(null).value === '');
        }
    );

    it('should return a node without a `children` property', function () {
        assert(!('children' in latin.tokenizeSource()));
    });
});

describe('ParseLatin#tokenizeWord()', function () {
    it('should return a word node', function () {
        assert(latin.tokenizeWord().type === 'WordNode');
    });

    it('should return a node with a `children` array', function () {
        var children = latin.tokenizeWord('alfred').children;

        assert('length' in children);
        assert(typeof children !== 'string');
    });

    it('should return a node with a text node as only child', function () {
        var children = latin.tokenizeWord('alfred').children;
        assert(children.length === 1);
        assert(children[0].type === 'TextNode');
        assert(children[0].value === 'alfred');
    });

    it('should return a node with its text node\'s value property set to ' +
        'an empty string when no value was given', function () {
            var defaultValue = latin.tokenizeWord(),
                undefinedValue = latin.tokenizeWord(undefined),
                nullValue = latin.tokenizeWord(null);

            assert(defaultValue.children[0].value === '');
            assert(undefinedValue.children[0].value === '');
            assert(nullValue.children[0].value === '');
        }
    );

    it('should return a node without a `value` property', function () {
        assert(!('value' in latin.tokenizeWord()));
    });
});

describe('ParseLatin#tokenizeSymbol()', function () {
    it('should return a symbol node', function () {
        assert(latin.tokenizeSymbol().type === 'SymbolNode');
    });

    it('should return a node with a `value`', function () {
        assert(typeof latin.tokenizeSymbol('alfred').value === 'string');
    });

    it('should return a node with a `value` set to an empty string when ' +
        'no value was given',
        function () {
            var defaultValue = latin.tokenizeSymbol(),
                undefinedValue = latin.tokenizeSymbol(undefined),
                nullValue = latin.tokenizeSymbol(null);

            assert(defaultValue.value === '');
            assert(undefinedValue.value === '');
            assert(nullValue.value === '');
        }
    );

    it('should return a node without a `children` property', function () {
        assert(!('children' in latin.tokenizeSymbol()));
    });
});

describe('ParseLatin#tokenizeWhiteSpace()', function () {
    it('should return a white space node', function () {
        assert(latin.tokenizeWhiteSpace().type === 'WhiteSpaceNode');
    });

    it('should return a node with a `value`', function () {
        assert(typeof latin.tokenizeWhiteSpace('alfred').value === 'string');
    });

    it('should return a node with a `value` set to an empty string when ' +
        'no value was given',
        function () {
            var defaultValue = latin.tokenizeWhiteSpace(),
                undefinedValue = latin.tokenizeWhiteSpace(undefined),
                nullValue = latin.tokenizeWhiteSpace(null);

            assert(defaultValue.value === '');
            assert(undefinedValue.value === '');
            assert(nullValue.value === '');
        }
    );

    it('should return a node without a `children` property', function () {
        assert(!('children' in latin.tokenizeWhiteSpace()));
    });
});

describe('ParseLatin#tokenizePunctuation()', function () {
    it('should return a punctuation node', function () {
        assert(latin.tokenizePunctuation().type === 'PunctuationNode');
    });

    it('should return a node with a `value`', function () {
        assert(typeof latin.tokenizePunctuation('alfred').value === 'string');
    });

    it('should return a node with a `value` set to an empty string when ' +
        'no value was given',
        function () {
            var defaultValue = latin.tokenizePunctuation(),
                undefinedValue = latin.tokenizePunctuation(undefined),
                nullValue = latin.tokenizePunctuation(null);

            assert(defaultValue.value === '');
            assert(undefinedValue.value === '');
            assert(nullValue.value === '');
        }
    );

    it('should return a node without a `children` property', function () {
        assert(!('children' in latin.tokenizePunctuation()));
    });
});

describe('Root: Given two paragraphs', function () {
    it('should work', function () {
        /**
         * Modified first paragraph, split in two, from:
         *    http://en.wikipedia.org/wiki/Paragraph
         */

        describeFixture(
            'two-paragraphs',
            'A paragraph (from the Greek paragraphos, ' +
            '“to write beside” or “written beside”) is ' +
            'a self-contained unit of a discourse in ' +
            'writing dealing with a particular point ' +
            'or idea. ' +
            'A paragraph has 5 types (Anton Heitman).' +
            '\n' +
            '\n' +
            'A paragraph consists of one or more ' +
            'sentences. ' +
            'Though not required by the syntax of ' +
            'any language, paragraphs are usually an ' +
            'expected part of formal writing, used to ' +
            'organize longer prose.'
        );
    });
});

describe('A whitespace only document', function () {
    it('should equal the test AST', function () {
        describeFixture('white-space-only', '\n\n');
    });
});

describe('Root: Without a value', function () {
    it('should return an empty RootNode when invoked without value',
        function () {
            /**
             * No fxiture test because this fails in
             * NLCST-test (which it should though).
             */
            assert(
                stringify(latin.parse()) ===
                stringify({
                    'type': 'RootNode',
                    'children': []
                })
            );
        }
    );
});

describe('Root: Given a String object', function () {
    it('should tokenize the toString representation of the given object ' +
        'when the given object is an instance of String', function () {
            var source = 'Test.';

            /*eslint-disable no-new-wrappers */
            assert(
                stringify(latin.parse(new String(source))) ===
                stringify(latin.parse(source))
            );
            /*eslint-enable no-new-wrappers */
        }
    );
});

describe('Root: Given any other value', function () {
    it('should throw when the object is neither null, undefined, string, ' +
        'nor String object', function () {
            assert.throws(function () {
                latin.parse({});
            });
        }
    );
});

describe('Paragraph: Without a value', function () {
    it('should return an empty ParagraphNode when invoked without value',
        function () {
            assert(
                stringify(latin.tokenizeParagraph()) ===
                stringify({
                    'type': 'ParagraphNode',
                    'children': []
                })
            );
        }
    );
});

describe('Sentence: Without a value', function () {
    it('should return an empty SentenceNode when invoked without value',
        function () {
            assert(
                stringify(latin.tokenizeSentence()) ===
                stringify({
                    'type': 'SentenceNode',
                    'children': []
                })
            );
        }
    );
});

describe('Digit-letter combinations in words', function () {
    it('should treat digit-letter as a word', function () {
        /**
         * Source:
         *   http://en.wikipedia.org/wiki/IPhone_5S
         */

        describeFixture(
            'digit-letter-combination',
            'iPhone 5S is a high-end smartphone ' +
            'developed by Apple.'
        );
    });

    it('should treat letter-digit as a word', function () {
        describeFixture(
            'letter-digit-combination',
            'Galaxy S3 is a high-end smartphone ' +
            'developed by Samsung.'
        );
    });
});

describe('Latin exceptions', function () {
    (
        'Al|Ca|Cap|Cca|Cent|Cf|Cit|Con|Cp|Cwt|Ead|' +
        'Etc|Ff|Fl|Ibid|Id|Nem|Op|Pro|Seq|Sic|Stat|Tem|Viz'
    ).split('|').forEach(function (abbreviation) {
        it('should not treat `' + abbreviation + '.` as a terminal marker',
            function () {
                describeFixture(
                    'latin-exception-' + abbreviation.toLowerCase(),
                    'Gibberish something ' + abbreviation + '. Gobbledygook.'
                );
            }
        );
    });
});

describe('Alphabetic exceptions', function () {
    (
        'A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z'
    ).split('|').forEach(function (letter) {
        it('should not treat `' + letter + '.` as a terminal marker',
            function () {
                describeFixture(
                    'alphabetic-exception-' + letter.toLowerCase(),
                    'Gibberish something ' + letter + '. Gobbledygook.'
                );
            }
        );
    });
});

describe('Numerical exceptions', function () {
    (
        '0|1|2|3|4|5|6|7|8|9|11|111|1111'
    ).split('|').forEach(function (number) {
        it('should not treat `' + number + '.` as a terminal marker',
            function () {
                describeFixture(
                    'numerical-exception-' + number.toLowerCase(),
                    'Gibberish something ' + number + '. Gobbledygook.'
                );
            }
        );
    });
});

describe('Initialisms', function () {
    it('should not treat full-stops in initialisms as a terminal marker',
        function () {
            /**
             * Source:
             *   http://en.wikipedia.org/wiki/Natural_language#
             *   Constructed_languages_and_international_auxiliary_languages
             */

            describeFixture(
                'initialism-exception',
                'Esperanto was designed by L.L. Zamenhof from languages'
            );
        }
    );
});

describe('Lower-case letters', function () {
    it('should not treat full-stops followed by a lower-case letter ' +
        'as terminal marker',
        function () {
            /**
             * Source:
             *   http://en.wikipedia.org/wiki/Park_Ave.
             */

            describeFixture(
                'lower-case-exception',
                'Park Ave. was an indie pop band which started in ' +
                'January 1996 in Nebraska (Omaha).'
            );
        }
    );
});

describe('Domain names', function () {
    it('should not treat full-stops preceding a word as terminal marker',
        function () {
            /**
             * Source:
             *   http://en.wikipedia.org/wiki/.com
             */

            describeFixture(
                'domain-name-exception',
                'However, eventually the distinction ' +
                'was lost when .com, .org and .net were ' +
                'opened for unrestricted registration.'
            );
        }
    );
});

describe('Inside quotes', function () {
    it('should treat closing quotes after full-stops as part of ' +
        'the previous sentence',
        function () {
            /**
             * Source: the web.
             */

            describeFixture(
                'full-stop-followed-by-closing-quote',
                '“However,” says my Grade 8 ' +
                'teacher, “the period goes inside ' +
                'quotes.” ' +
                'This is another sentence.'
            );
        }
    );
});

describe('Inside parens', function () {
    it('should treat closing parens after full-stops as part of ' +
        'the previous sentence',
        function () {
            /**
             * Source: the web.
             */

            describeFixture(
                'full-stop-followed-by-closing-parenthesis',
                '“However,” says my Grade 8 ' +
                'teacher, (the period goes inside ' +
                'quotes.) ' +
                'This is another sentence.'
            );
        }
    );
});

describe('Before comma', function () {
    it('should not treat full-stops before comma\'s as terminal markers',
        function () {
            /**
             * Source: part of the wikipedia license note.
             */

            describeFixture(
                'full-stop-followed-by-comma',
                'Wikipedia® is a registered trademark ' +
                'of the Wikimedia Foundation, Inc., a ' +
                'non-profit organization.'
            );
        }
    );
});

describe('Ellipsis at sentence-start', function () {
    it('should not treat multiple full-stops at the start of a sentence' +
        'as terminal markers',
        function () {
            describeFixture(
                'ellipsis-sentence-start-spaces-padded',
                '. . . to be continued.'
            );

            /**
             * This, perhaps correctly, doesn't work yet:
             * the last full-stop is classified as part of
             * the first word.
             *
             *   describeFixture(
             *       'ellipsis-sentence-start-spaces',
             *       '. . .to be continued.'
             *   );
             */

            describeFixture(
                'ellipsis-sentence-start',
                '...to be continued.'
            );

            describeFixture(
                'ellipsis-sentence-start-unicode',
                '…to be continued.'
            );
        }
    );
});

describe('Ellipsis at sentence-end', function () {
    it('should not treat multiple full-stops at the end of a sentence ' +
        'as terminal markers',
        function () {
            describeFixture(
                'ellipsis-sentence-end-spaces-padded',
                'To be continued . . .'
            );

            describeFixture(
                'ellipsis-sentence-end-spaces',
                'To be continued. . .'
            );

            describeFixture(
                'ellipsis-sentence-end',
                'To be continued...'
            );

            describeFixture(
                'ellipsis-sentence-end-unicode',
                'To be continued…'
            );
        }
    );
});

describe('Initial trailing white-space', function () {
    it('should move trailing white-space up to the highest possible level',
        function () {
            describeFixture(
                'trailing-white-space-initial-sentence',
                '\nA sentence.',
                'tokenizeSentence'
            );

            describeFixture(
                'trailing-white-space-initial-paragraph',
                '\nA sentence.',
                'tokenizeParagraph'
            );

            describeFixture(
                'trailing-white-space-initial',
                '\nA sentence.'
            );
        }
    );
});

describe('Final trailing white-space', function () {
    it('should move trailing white-space up to the highest possible level',
        function () {
            describeFixture(
                'trailing-white-space-final-sentence',
                'A sentence. ',
                'tokenizeSentence'
            );

            describeFixture(
                'trailing-white-space-final-paragraph',
                'A sentence. ',
                'tokenizeParagraph'
            );

            describeFixture(
                'trailing-white-space-final',
                'A sentence. '
            );
        }
    );
});

describe('Implicit terminal marker', function () {
    it('should close a sentence without a terminal marker',
        function () {
            describeFixture(
                'implicit-sentence-end',
                'One sentence. Two sentences'
            );
        }
    );
});

describe('Non-alphabetic sentences', function () {
    it('should accept non-alphabetic sentences',
        function () {
            describeFixture(
                'non-alphabetic-sentence',
                '\uD83D\uDC38.'
            );
        }
    );
});

describe('White space characters', function () {
    var sentenceStart,
        sentenceEnd,
        whiteSpaceCharacters;

    sentenceStart = 'A';
    sentenceEnd = 'house.';

    whiteSpaceCharacters = [
        '\u0009', /* CHARACTER TABULATION */
        '\u000A', /* LINE FEED (LF) */
        '\u000B', /* LINE TABULATION */
        '\u000C', /* FORM FEED (FF) */
        '\u000D', /* CARRIAGE RETURN (CR) */
        '\u0020', /* SPACE */
        '\u0085', /* NEXT LINE (NEL) */
        '\u00A0', /* NO-BREAK SPACE */
        '\u1680', /* OGHAM SPACE MARK */
        '\u2000', /* EN QUAD */
        '\u2001', /* EM QUAD */
        '\u2002', /* EN SPACE */
        '\u2003', /* EM SPACE */
        '\u2004', /* THREE-PER-EM SPACE */
        '\u2005', /* FOUR-PER-EM SPACE */
        '\u2006', /* SIX-PER-EM SPACE */
        '\u2007', /* FIGURE SPACE */
        '\u2008', /* PUNCTUATION SPACE */
        '\u2009', /* THIN SPACE */
        '\u200A', /* HAIR SPACE */
        '\u2028', /* LINE SEPARATOR */
        '\u2029', /* PARAGRAPH SEPARATOR */
        '\u202F', /* NARROW NO-BREAK SPACE */
        '\u205F', /* MEDIUM MATHEMATICAL SPACE */
        '\u3000'  /* IDEOGRAPHIC SPACE */
    ];

    whiteSpaceCharacters.forEach(function (character) {
        it('should treat `' + character + '` as white-space',
            function () {
                assert(
                    stringify(latin.parse(
                        sentenceStart + character + sentenceEnd
                    ).children[0].children[0]) ===
                    stringify({
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'A'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': character
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'house'
                                    }
                                ]
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    })
                );
            }
        );
    });
});

describe('Astral-plane surrogate pairs', function () {
    it('should classify \uD83D\uDCA9 as a punctuation',
        function () {
            /*
             * Note the pile of poo, in ECMAScript 5
             * written using a surrogate pair.
             */

            describeFixture(
                'astral-plane-surrogate-pair',
                'The unicode character \uD83D\uDCA9 ' +
                'is pile of poo.'
            );
        }
    );
});

describe('Combining marks and double combining marks', function () {
    it('should classify `A\u030Angstro\u0308m` as a word', function () {
        describeFixture(
            'combining-marks',
            'A\u030Angstro\u0308m.'
        );
    });

    it('should classify 0\uFE0F\u20E3 as a word', function () {
        /*
         * Note the DIGIT ZERO, VARIATION
         * SELECTOR-16, and COMBINING
         * ENCLOSING KEYCAP, together,
         * form a :zero: emoji.
         */

        describeFixture(
            'combining-marks-double',
            'He scored 0\uFE0F\u20E3 points.'
        );
    });
});

describe('Combining diacritical marks', function () {
    [
        '\u0300', /* GRAVE ACCENT (U+0300) */
        '\u0301', /* ACUTE ACCENT (U+0301) */
        '\u0302', /* CIRCUMFLEX ACCENT (U+0302) */
        '\u0303', /* TILDE (U+0303) */
        '\u0304', /* MACRON (U+0304) */
        '\u0305', /* OVERLINE (U+0305) */
        '\u0306', /* BREVE (U+0306) */
        '\u0307', /* DOT ABOVE (U+0307) */
        '\u0308', /* DIAERESIS (U+0308) */
        '\u0309', /* HOOK ABOVE (U+0309) */
        '\u030A', /* RING ABOVE (U+030A) */
        '\u030B', /* DOUBLE ACUTE ACCENT (U+030B) */
        '\u030C', /* CARON (U+030C) */
        '\u030D', /* VERTICAL LINE ABOVE (U+030D) */
        '\u030E', /* DOUBLE VERTICAL LINE ABOVE (U+030E) */
        '\u030F', /* DOUBLE GRAVE ACCENT (U+030F) */
        '\u0310', /* CANDRABINDU (U+0310) */
        '\u0311', /* INVERTED BREVE (U+0311) */
        '\u0312', /* TURNED COMMA ABOVE (U+0312) */
        '\u0313', /* COMMA ABOVE (U+0313) */
        '\u0314', /* REVERSED COMMA ABOVE (U+0314) */
        '\u0315', /* COMMA ABOVE RIGHT (U+0315) */
        '\u0316', /* GRAVE ACCENT BELOW (U+0316) */
        '\u0317', /* ACUTE ACCENT BELOW (U+0317) */
        '\u0318', /* LEFT TACK BELOW (U+0318) */
        '\u0319', /* RIGHT TACK BELOW (U+0319) */
        '\u031A', /* LEFT ANGLE ABOVE (U+031A) */
        '\u031B', /* HORN (U+031B) */
        '\u031C', /* LEFT HALF RING BELOW (U+031C) */
        '\u031D', /* UP TACK BELOW (U+031D) */
        '\u031E', /* DOWN TACK BELOW (U+031E) */
        '\u031F', /* PLUS SIGN BELOW (U+031F) */
        '\u0320', /* MINUS SIGN BELOW (U+0320) */
        '\u0321', /* PALATALIZED HOOK BELOW (U+0321) */
        '\u0322', /* RETROFLEX HOOK BELOW (U+0322) */
        '\u0323', /* DOT BELOW (U+0323) */
        '\u0324', /* DIAERESIS BELOW (U+0324) */
        '\u0325', /* RING BELOW (U+0325) */
        '\u0326', /* COMMA BELOW (U+0326) */
        '\u0327', /* CEDILLA (U+0327) */
        '\u0328', /* OGONEK (U+0328) */
        '\u0329', /* VERTICAL LINE BELOW (U+0329) */
        '\u032A', /* BRIDGE BELOW (U+032A) */
        '\u032B', /* INVERTED DOUBLE ARCH BELOW (U+032B) */
        '\u032C', /* CARON BELOW (U+032C) */
        '\u032D', /* CIRCUMFLEX ACCENT BELOW (U+032D) */
        '\u032E', /* BREVE BELOW (U+032E) */
        '\u032F', /* INVERTED BREVE BELOW (U+032F) */
        '\u0330', /* TILDE BELOW (U+0330) */
        '\u0331', /* MACRON BELOW (U+0331) */
        '\u0332', /* LOW LINE (U+0332) */
        '\u0333', /* DOUBLE LOW LINE (U+0333) */
        '\u0334', /* TILDE OVERLAY (U+0334) */
        '\u0335', /* SHORT STROKE OVERLAY (U+0335) */
        '\u0336', /* LONG STROKE OVERLAY (U+0336) */
        '\u0337', /* SHORT SOLIDUS OVERLAY (U+0337) */
        '\u0338', /* LONG SOLIDUS OVERLAY (U+0338) */
        '\u0339', /* RIGHT HALF RING BELOW (U+0339) */
        '\u033A', /* INVERTED BRIDGE BELOW (U+033A) */
        '\u033B', /* SQUARE BELOW (U+033B) */
        '\u033C', /* SEAGULL BELOW (U+033C) */
        '\u033D', /* X ABOVE (U+033D) */
        '\u033E', /* VERTICAL TILDE (U+033E) */
        '\u033F', /* DOUBLE OVERLINE (U+033F) */
        '\u0340', /* GRAVE TONE MARK (U+0340) */
        '\u0341', /* ACUTE TONE MARK (U+0341) */
        '\u0342', /* GREEK PERISPOMENI (U+0342) */
        '\u0343', /* GREEK KORONIS (U+0343) */
        '\u0344', /* GREEK DIALYTIKA TONOS (U+0344) */
        '\u0345', /* GREEK YPOGEGRAMMENI (U+0345) */
        '\u0346', /* BRIDGE ABOVE (U+0346) */
        '\u0347', /* EQUALS SIGN BELOW (U+0347) */
        '\u0348', /* DOUBLE VERTICAL LINE BELOW (U+0348) */
        '\u0349', /* LEFT ANGLE BELOW (U+0349) */
        '\u034A', /* NOT TILDE ABOVE (U+034A) */
        '\u034B', /* HOMOTHETIC ABOVE (U+034B) */
        '\u034C', /* ALMOST EQUAL TO ABOVE (U+034C) */
        '\u034D', /* LEFT RIGHT ARROW BELOW (U+034D) */
        '\u034E', /* UPWARDS ARROW BELOW (U+034E) */
        '\u034F', /* GRAPHEME JOINER (U+034F) */
        '\u0350', /* RIGHT ARROWHEAD ABOVE (U+0350) */
        '\u0351', /* LEFT HALF RING ABOVE (U+0351) */
        '\u0352', /* FERMATA (U+0352) */
        '\u0353', /* X BELOW (U+0353) */
        '\u0354', /* LEFT ARROWHEAD BELOW (U+0354) */
        '\u0355', /* RIGHT ARROWHEAD BELOW (U+0355) */
        '\u0356', /* RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356) */
        '\u0357', /* RIGHT HALF RING ABOVE (U+0357) */
        '\u0358', /* DOT ABOVE RIGHT (U+0358) */
        '\u0359', /* ASTERISK BELOW (U+0359) */
        '\u035A', /* DOUBLE RING BELOW (U+035A) */
        '\u035B', /* ZIGZAG ABOVE (U+035B) */
        '\u035C', /* DOUBLE BREVE BELOW (U+035C) */
        '\u035D', /* DOUBLE BREVE (U+035D) */
        '\u035E', /* DOUBLE MACRON (U+035E) */
        '\u035F', /* DOUBLE MACRON BELOW (U+035F) */
        '\u0360', /* DOUBLE TILDE (U+0360) */
        '\u0361', /* DOUBLE INVERTED BREVE (U+0361) */
        '\u0362', /* DOUBLE RIGHTWARDS ARROW BELOW (U+0362) */
        '\u0363', /* LATIN SMALL LETTER A (U+0363) */
        '\u0364', /* LATIN SMALL LETTER E (U+0364) */
        '\u0365', /* LATIN SMALL LETTER I (U+0365) */
        '\u0366', /* LATIN SMALL LETTER O (U+0366) */
        '\u0367', /* LATIN SMALL LETTER U (U+0367) */
        '\u0368', /* LATIN SMALL LETTER C (U+0368) */
        '\u0369', /* LATIN SMALL LETTER D (U+0369) */
        '\u036A', /* LATIN SMALL LETTER H (U+036A) */
        '\u036B', /* LATIN SMALL LETTER M (U+036B) */
        '\u036C', /* LATIN SMALL LETTER R (U+036C) */
        '\u036D', /* LATIN SMALL LETTER T (U+036D) */
        '\u036E', /* LATIN SMALL LETTER V (U+036E) */
        '\u036F'  /* LATIN SMALL LETTER X (U+036F) */
    ].forEach(function (diacritic) {
        it('should treat \u25CC' + diacritic + ' as a word', function () {
            assert(
                stringify(latin.parse(
                    'This a' + diacritic + ' house.'
                ).children[0].children[0]) ===
                stringify({
                    'type': 'SentenceNode',
                    'children': [
                        {
                            'type': 'WordNode',
                            'children': [
                                {
                                    'type': 'TextNode',
                                    'value': 'This'
                                }
                            ]
                        },
                        {
                            'type': 'WhiteSpaceNode',
                            'value': ' '
                        },
                        {
                            'type': 'WordNode',
                            'children': [
                                {
                                    'type': 'TextNode',
                                    'value': 'a' + diacritic
                                }
                            ]
                        },
                        {
                            'type': 'WhiteSpaceNode',
                            'value': ' '
                        },
                        {
                            'type': 'WordNode',
                            'children': [
                                {
                                    'type': 'TextNode',
                                    'value': 'house'
                                }
                            ]
                        },
                        {
                            'type': 'PunctuationNode',
                            'value': '.'
                        }
                    ]
                })
            );
        });
    });
});

describe('Tie characters in words', function () {
    /**
     * From wikipedias list: http://en.wikipedia.org/wiki/Tie_(typography)
     */

    it('Combinding Double Breve: \u25CC\u035D\u25CC', function () {
        describeFixture(
            'combining-double-breve',
            'Such as the o\u035Do.'
        );
    });

    it('Combinding Double Inverted Breve: \u25CC\u0361\u25CC', function () {
        describeFixture(
            'combining-double-inverted-breve',
            'Such as the /k\u0361p/.'
        );
    });

    it('Combinding Double Breve Below: \u25CC\u035C\u25CC', function () {
        describeFixture(
            'combining-double-breve-below',
            'Such as the /k\u035Cp/.'
        );
    });

    it('Undertie: \u203F', function () {
        describeFixture(
            'combining-tie-under',
            'The undertie /vuz\u203Fave/'
        );
    });

    it('Character Tie: \u2040', function () {
        describeFixture(
            'combining-tie-character',
            'The character tie: s\u2040t.'
        );
    });

    it('Inverted Undertie: \u2040', function () {
        describeFixture(
            'combining-tie-under-inverted',
            'The inverted undertie: o\u2054o.'
        );
    });
});

describe('Intelectual property marks', function () {
    it('Copyright symbol: \u00A9', function () {
        describeFixture(
            'intelectual-copyright-symbol',
            '\u00A9 John Smith.'
        );
    });

    it('Sound Recording Copyright symbol: \u00A9', function () {
        describeFixture(
            'intelectual-sound-recording-copyright-symbol',
            'Designated by \u2117, the sound recording ' +
            'copyright symbol'
        );
    });

    it('Registered Trademark symbol: \u00AE', function () {
        describeFixture(
            'intelectual-registered-trademark-symbol',
            'Wikipedia\u00AE is a registered trademark.'
        );
    });

    it('Service Mark: \u00AE', function () {
        describeFixture(
            'intelectual-service-mark',
            'ABC Law\u2120 legal services.'
        );
    });

    it('Trademark: \u00AE', function () {
        describeFixture(
            'intelectual-trademark',
            'Mytrademark\u2122 is a trademark.'
        );
    });
});

describe('Single and double Grapheme Clusters', function () {
    /**
     * Modified from: http://mathiasbynens.be/notes/javascript-unicode
     */

    it('should classify `\u0BA8\u0BBF` as a word', function () {
        describeFixture(
            'grapheme-clusters',
            'Grapheme clusters such as \u0BA8\u0BBF and such.'
        );
    });

    it('should classify `\u1101\u1161\u11A8` as a word', function () {
        describeFixture(
            'grapheme-clusters-double',
            'Hangul made of conjoining Jamo such ' +
            'as \u1101\u1161\u11A8 and such.'
        );
    });
});

describe('Initial word punctuation', function () {
    it('should merge an ampersand preceding a word', function () {
        describeFixture(
            'word-initial-ampersand',
            'This, that, &c.'
        );
    });
});

describe('Final word punctuation', function () {
    it('should merge a non-terminal full stop following a word', function () {
        describeFixture(
            'word-final-full-stop',
            'Burnside St. in April of 1959.'
        );
    });

    it('should merge a dash following a word', function () {
        describeFixture(
            'word-final-dash',
            'Nineteenth- and twentieth-century writers.'
        );
    });
});

describe('Inner-word punctuation', function () {
    it('should merge a slash in a word', function () {
        describeFixture(
            'word-inner-slash',
            'N/A or n/a is a common abbreviation.'
        );
    });

    it('should merge an ampersand in a word', function () {
        describeFixture(
            'word-inner-ampersand',
            'AT&Ts R&D and such.'
        );
    });

    it('should merge an underscore in a word', function () {
        describeFixture(
            'word-inner-underscore',
            'Some file_name.json. Another sentence.'
        );
    });

    it('should merge an at-sign in a word', function () {
        describeFixture(
            'word-inner-at',
            'Some name@example.com. Another sentence.'
        );
    });

    it('should merge a full-stop in a word', function () {
        describeFixture(
            'word-inner-full-stop',
            'You will need to arrive by 14.30.'
        );
    });

    it('should merge URL-symbols, like `?` and `=`', function () {
        describeFixture(
            'word-inner-url',
            'Like http://example.com/?foo=1&bar=2. Another sentence.'
        );
    });
});

describe('Terminal markers', function () {
    it('should break sentences at a full-stop', function () {
        describeFixture(
            'terminal-marker-full-stop',
            'A sentence. Another sentence.'
        );
    });

    it('should break sentences at a question mark', function () {
        describeFixture(
            'terminal-marker-question-mark',
            'Is it good in form? style? meaning? Yes.'
        );
    });

    it('should break sentences at an exclamation mark', function () {
        describeFixture(
            'terminal-marker-exclamation-mark',
            '“No!” he yelled. “Buy it now!” ' +
            'They have some really(!) low-priced ' +
            'rugs on sale this week.'
        );
    });

    it('should break sentences at an interrobang', function () {
        describeFixture(
            'terminal-marker-interrobang',
            'Say what\u203D She\u2019s pregnant?! ' +
            'Realy!? Wow.'
        );
    });

    it('should break sentences at an ellipsis', function () {
        describeFixture(
            'terminal-marker-ellipsis',
            'This is rather straightforward... ' +
            'Most of the time\u2026 She said that ' +
            'you should end a sentence with an ' +
            'ellipsis.'
        );
    });

    it('should NOT break terminal markers followed by a comma', function () {
        describeFixture(
            'terminal-marker-comma',
            '"Oh no!", she screamed, "\u2026don\'t ' +
            'do it!" Another sentence.'
        );
    });

    it('should NOT break terminal markers followed by a semicolon',
        function () {
            describeFixture(
                'terminal-marker-semicolon',
                '"Oh no!"; she screamed; "\u2026don\'t ' +
                'do it!" Another sentence.'
            );
        }
    );

    it('should break sentences at two or more new lines', function () {
        describeFixture(
            'terminal-marker-new-line',
            'A sentence.\n' +
            '\n' +
            'This is an implicit sentence\n' +
            '\n' +
            'Another sentence.\n'
        );
    });
});

describe('Abbreviations: Initialisms', function () {
    it('should merge full-stops in preceding initialisms', function () {
        describeFixture(
            'initialism',
            'Something C.I.A. something.'
        );
    });

    it('should NOT merge full-stops in preceding normal words', function () {
        describeFixture(
            'initialism-like',
            'Self-contained.'
        );
    });

    it('should merge pluralized single letters', function () {
        describeFixture(
            'initialism-letter-plural',
            'What about A\'s and B\u2019s?'
        );
    });

    it('should merge pluralized initialisms', function () {
        describeFixture(
            'initialism-plural',
            'What about C.D.\'s, C.D.s, or CDs? ' +
            'SOS\u2019s or SOSes? ' +
            'G.I.\u2019s or G.I\'s?'
        );
    });

    it('should NOT merge multi-character ``initialisms\'\'', function () {
        describeFixture(
            'initialism-like-multi-character',
            'Lets meet this Friday at 16.00.'
        );
    });

    it('should NOT merge digits-only ``initialisms\'\'', function () {
        describeFixture(
            'initialism-like-digits',
            'Version 0.1.2. Another sentence.'
        );
    });

    it('should merge initialisms with other words', function () {
        describeFixture(
            'initialism-in-words',
            'In the pre-C.I.A. era.'
        );
    });
});
