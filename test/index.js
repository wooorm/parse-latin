/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin:test
 * @fileoverview Test suite for `parse-latin`.
 */

'use strict';

/* eslint-env node */
/* jscs:disable jsDoc */
/* jscs:disable maximumLineLength */

/* Dependencies. */
var test = require('tape');
var nlcstTest = require('nlcst-test');
var VFile = require('vfile');
var ParseLatin = require('..');

/* `ParseLatin`. */
var latin = new ParseLatin();

var latinNoPosition = new ParseLatin({
    position: false
});

/**
 * Clone `object` but omit positional information.
 *
 * @param {Object|Array} object - Object to clone.
 * @return {Object|Array} - `object`, without positional
 *   information.
 */
function clean(object) {
    var clone = 'length' in object ? [] : {};
    var key;
    var value;

    for (key in object) {
        value = object[key];

        if (key === 'position') {
            continue;
        }

        clone[key] = typeof object[key] === 'object' ? clean(value) : value;
    }

    return clone;
}

/**
 * Utility to test if a given document is both a valid
 * node, and matches a fixture.
 *
 * @param {string} name - Filename of fixture.
 * @param {string} document - Source to validate.
 * @param {string} method - Method to use.
 */
function describeFixture(t, name, doc, method) {
    var nlcstA = latin[method || 'parse'](doc);
    var nlcstB = latinNoPosition[method || 'parse'](doc);
    var fixture = require('./fixture/' + name);

    nlcstTest(nlcstA);
    nlcstTest(nlcstB);

    t.deepEqual(nlcstA, fixture, 'should match w/ position');
    t.deepEqual(nlcstB, clean(fixture), 'should match w/o position');
}

/* Tests. */
test('ParseLatin', function (t) {
    t.equal(typeof ParseLatin, 'function', 'should be a `function`');

    t.ok(new ParseLatin() instanceof ParseLatin, 'should instantiate');

    t.ok(ParseLatin() instanceof ParseLatin, 'should instantiate (#2)');

    t.equal(new ParseLatin().position, true, 'should set `position`');

    t.equal(new ParseLatin({
        position: true
    }).position, true, 'should support `position: true`');

    t.equal(new ParseLatin({
        position: false
    }).position, false, 'should support `position: false`');

    t.deepEqual(
        new ParseLatin(new VFile('Alpha bravo charlie')).parse(),
        latin.parse('Alpha bravo charlie'),
        'should accept a vfile'
    );

    t.end();
});

test('ParseLatin#use(key, plugin)', function (t) {
    t.throws(
        function () {
            ParseLatin.prototype.use('alfred');
        },
        /Make sure `key` is a supported function/,
        'should throw when a non-pluggable `key` is given'
    );

    t.doesNotThrow(
        function () {
            ParseLatin.prototype.use('tokenizeWord');
        },
        'should NOT throw when no plugin is given'
    );

    t.test('should add a plugin on the prototype', function (st) {
        var parser;

        function thrower() {
            throw new Error('prototypal thrower was invoked');
        }

        ParseLatin.prototype.use('tokenizeWord', thrower);

        parser = new ParseLatin();

        st.equal(
            ParseLatin.prototype.tokenizeWordPlugins[
                ParseLatin.prototype.tokenizeWordPlugins.length - 1
            ],
            thrower,
            'should patch the plugin'
        );

        st.throws(
            function () {
                parser.parse('Alfred.');
            },
            /thrower was invoked/,
            'should invoke the plugin'
        );

        /* Clean. */
        ParseLatin.prototype.tokenizeWordPlugins = null;

        st.end();
    });

    t.test('should add a plugin on an instance', function (st) {
        var parser = new ParseLatin();

        function thrower() {
            throw new Error('instance thrower was invoked');
        }

        parser.use('tokenizeWord', thrower);

        st.equal(
            parser.tokenizeWordPlugins[
                parser.tokenizeWordPlugins.length - 1
            ],
            thrower,
            'should add the plugin'
        );

        st.throws(
            function () {
                parser.parse('Alfred.');
            },
            /instance thrower was invoked/,
            'should invoke the plugin'
        );

        /* Clean. */
        ParseLatin.prototype.tokenizeWordPlugins = null;

        st.end();
    });

    t.end();
});

test('ParseLatin#useFirst(key, plugin)', function (t) {
    t.throws(
        function () {
            ParseLatin.prototype.useFirst('alfred');
        },
        /Make sure `key` is a supported function/,
        'should throw when a non-pluggable `key` is given'
    );

    t.doesNotThrow(
        function () {
            ParseLatin.prototype.useFirst('tokenizeWord');
        },
        'should NOT throw when no plugin is given'
    );

    t.test('should add a plugin on the prototype', function (st) {
        var parser;

        function thrower() {
            throw new Error('prototypal thrower was invoked');
        }

        ParseLatin.prototype.useFirst('tokenizeWord', thrower);

        parser = new ParseLatin();

        st.equal(
            ParseLatin.prototype.tokenizeWordPlugins[
                ParseLatin.prototype.tokenizeWordPlugins.length - 1
            ],
            thrower,
            'should add the plugin'
        );

        st.throws(
            function () {
                parser.parse('Alfred.');
            },
            /thrower was invoked/,
            'should invoke the plugin'
        );

        /* Clean. */
        ParseLatin.prototype.tokenizeWordPlugins = null;

        st.end();
    });

    t.test('should add a plugin on an instance', function (st) {
        var parser = new ParseLatin();
        var wasInvoked;

        function first() {
            wasInvoked = true;
        }

        function thrower() {
            st.equal(wasInvoked, true, 'should invoke the plugin (#1)');

            throw new Error('instance thrower was invoked');
        }

        parser.useFirst('tokenizeWord', thrower);

        st.equal(
            parser.tokenizeWordPlugins[0],
            thrower,
            'should add the plugin (#1)'
        );

        parser.useFirst('tokenizeWord', first);

        st.equal(
            parser.tokenizeWordPlugins[0],
            first,
            'should add the plugin (#2)'
        );

        st.throws(
            function () {
                parser.parse('Alfred.');
            },
            /instance thrower was invoked/,
            'should invoke the plugin (#2)'
        );

        st.equal(wasInvoked, true, 'should invoke the plugin (#3)');

        ParseLatin.prototype.tokenizeWordPlugins = null;

        st.end();
    });

    t.end();
});

test('ParseLatin#tokenizeText()', function (t) {
    t.equal(
        latin.tokenizeText().type,
        'TextNode',
        'should return a text node'
    );

    t.equal(
        latin.tokenizeText('alfred').value,
        'alfred',
        'should return a node with its value property set to ' +
        'the given value'
    );

    t.equal(
        latin.tokenizeText().value,
        '',
        'should support undefined (#1)'
    );

    t.equal(
        latin.tokenizeText(undefined).value,
        '',
        'should support `undefined` (#2)'
    );

    t.equal(
        latin.tokenizeText(null).value,
        '',
        'should support `null`'
    );

    t.notOk(
        'children' in latin.tokenizeText(),
        'should not patch `children`'
    );

    t.end();
});

test('ParseLatin#tokenizeSource()', function (t) {
    t.equal(
        latin.tokenizeSource().type,
        'SourceNode',
        'should return a source node'
    );

    t.equal(
        latin.tokenizeSource('alfred').value,
        'alfred',
        'should return a node with its value property set to ' +
        'the given value'
    );

    t.equal(
        latin.tokenizeSource().value,
        '',
        'should support undefined (#1)'
    );

    t.equal(
        latin.tokenizeSource(undefined).value,
        '',
        'should support `undefined` (#2)'
    );

    t.equal(
        latin.tokenizeSource(null).value,
        '',
        'should support `null`'
    );

    t.notOk(
        'children' in latin.tokenizeSource(),
        'should not patch `children`'
    );

    t.end();
});

test('ParseLatin#tokenizeSymbol()', function (t) {
    t.equal(
        latin.tokenizeSymbol().type,
        'SymbolNode',
        'should return a source node'
    );

    t.equal(
        latin.tokenizeSymbol('alfred').value,
        'alfred',
        'should return a node with its value property set to ' +
        'the given value'
    );

    t.equal(
        latin.tokenizeSymbol().value,
        '',
        'should support undefined (#1)'
    );

    t.equal(
        latin.tokenizeSymbol(undefined).value,
        '',
        'should support `undefined` (#2)'
    );

    t.equal(
        latin.tokenizeSymbol(null).value,
        '',
        'should support `null`'
    );

    t.notOk(
        'children' in latin.tokenizeSymbol(),
        'should not patch `children`'
    );

    t.end();
});

test('ParseLatin#tokenizeWhiteSpace()', function (t) {
    t.equal(
        latin.tokenizeWhiteSpace().type,
        'WhiteSpaceNode',
        'should return a source node'
    );

    t.equal(
        latin.tokenizeWhiteSpace('alfred').value,
        'alfred',
        'should return a node with its value property set to ' +
        'the given value'
    );

    t.equal(
        latin.tokenizeWhiteSpace().value,
        '',
        'should support undefined (#1)'
    );

    t.equal(
        latin.tokenizeWhiteSpace(undefined).value,
        '',
        'should support `undefined` (#2)'
    );

    t.equal(
        latin.tokenizeWhiteSpace(null).value,
        '',
        'should support `null`'
    );

    t.notOk(
        'children' in latin.tokenizeWhiteSpace(),
        'should not patch `children`'
    );

    t.end();
});

test('ParseLatin#tokenizePunctuation()', function (t) {
    t.equal(
        latin.tokenizePunctuation().type,
        'PunctuationNode',
        'should return a source node'
    );

    t.equal(
        latin.tokenizePunctuation('alfred').value,
        'alfred',
        'should return a node with its value property set to ' +
        'the given value'
    );

    t.equal(
        latin.tokenizePunctuation().value,
        '',
        'should support undefined (#1)'
    );

    t.equal(
        latin.tokenizePunctuation(undefined).value,
        '',
        'should support `undefined` (#2)'
    );

    t.equal(
        latin.tokenizePunctuation(null).value,
        '',
        'should support `null`'
    );

    t.notOk(
        'children' in latin.tokenizePunctuation(),
        'should not patch `children`'
    );

    t.end();
});

test('ParseLatin#tokenizeWord()', function (t) {
    t.equal(
        latin.tokenizeWord().type,
        'WordNode',
        'should return a source node'
    );

    t.deepEqual(
        latin.tokenizeWord('foo').children,
        [{ type: 'TextNode', value: 'foo' }],
        'should set `children`'
    );

    t.deepEqual(
        latin.tokenizeWord().children,
        [{ type: 'TextNode', value: '' }],
        'should support undefined (#1)'
    );

    t.deepEqual(
        latin.tokenizeWord(undefined).children,
        [{ type: 'TextNode', value: '' }],
        'should support `undefined` (#2)'
    );

    t.deepEqual(
        latin.tokenizeWord(null).children,
        [{ type: 'TextNode', value: '' }],
        'should support `null`'
    );

    t.notOk(
        'value' in latin.tokenizeWord(),
        'should not patch `value`'
    );

    t.end();
});

test('Root: Given two paragraphs', function (t) {
    /* Modified first paragraph, split in two, from:
     * http://en.wikipedia.org/wiki/Paragraph */
    describeFixture(
        t,
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

    t.end();
});

test('A whitespace only document', function (t) {
    describeFixture(t, 'white-space-only', '\n\n');
    t.end();
});

test('Root: Without a value', function (t) {
    /* No fixture test because this fails in
     * NLCST-test (which it should though). */
    t.deepEqual(
        latin.parse(),
        { type: 'RootNode', children: [] },
        'should return an empty RootNode when invoked without value'
    );

    t.end();
});

test('Root: Given a String object', function (t) {
    var source = 'Test.';

    /*eslint-disable no-new-wrappers */
    t.deepEqual(
        latin.parse(new String(source)),
        latin.parse(source),
        'should tokenize the toString representation of the ' +
        'given object when the given object is an instance of ' +
        'String'
    );
    /*eslint-enable no-new-wrappers */

    t.end();
});

test('Root: Given an array', function (t) {
    t.deepEqual(
        latin.parse([]),
        { type: 'RootNode', children: [] },
        'should work when empty'
    );

    t.deepEqual(
        {
            type: 'RootNode',
            children: [{
                type: 'ParagraphNode',
                children: [{
                    type: 'SentenceNode',
                    children: [{
                        type: 'SymbolNode',
                        value: '&'
                    }]
                }]
            }]
        },
        latin.parse([{
            type: 'SymbolNode',
            value: '&'
        }]),
        'should work when given tokens'
    );

    t.deepEqual(
        {
            type: 'RootNode',
            children: [{
                type: 'ParagraphNode',
                children: [{
                    type: 'SentenceNode',
                    children: [{
                        type: 'WordNode',
                        children: [
                            { type: 'TextNode', value: 'hoot' },
                            { type: 'TextNode', value: 's' }
                        ]}
                    ]}
                ]}
            ]
        },
        latin.parse([
            {
                type: 'WordNode',
                children: [{ type: 'TextNode', value: 'hoot' }]
            },
            {
                type: 'WordNode',
                children: [{ type: 'TextNode', value: 's' }]
            }
        ]),
        'should merge adjacent words'
    );

    t.deepEqual(
        {
            type: 'RootNode',
            children: [{
                type: 'ParagraphNode',
                children: [{
                    type: 'SentenceNode',
                    children: [{
                        type: 'WordNode',
                        children: [
                            {
                                type: 'TextNode',
                                value: 'hoot',
                                position: {
                                    start: { line: 1, column: 5, offset: 4 },
                                    end: { line: 1, column: 9, offset: 8 }
                                }
                            },
                            {
                                type: 'TextNode',
                                value: 's',
                                position: {
                                    start: { line: 1, column: 11, offset: 10 },
                                    end: { line: 1, column: 12, offset: 11 }
                                }
                            }
                        ],
                        position: {
                            start: { line: 1, column: 5, offset: 4 },
                            end: { line: 1, column: 12, offset: 11 }
                        }
                    }],
                    position: {
                        start: { line: 1, column: 5, offset: 4 },
                        end: { line: 1, column: 12, offset: 11 }
                    }
                }],
                position: {
                    start: { line: 1, column: 5, offset: 4 },
                    end: { line: 1, column: 12, offset: 11 }
                }
            }],
            position: {
                start: { line: 1, column: 5, offset: 4 },
                end: { line: 1, column: 12, offset: 11 }
            }
        },
        latin.parse([
            {
                type: 'WordNode',
                children: [{
                    type: 'TextNode',
                    value: 'hoot',
                    position: {
                        start: { line: 1, column: 5, offset: 4 },
                        end: { line: 1, column: 9, offset: 8 }
                    }
                }],
                position: {
                    start: { line: 1, column: 5, offset: 4 },
                    end: { line: 1, column: 9, offset: 8 }
                }
            },
            {
                type: 'WordNode',
                children: [{
                    type: 'TextNode',
                    value: 's',
                    position: {
                        start: { line: 1, column: 11, offset: 10 },
                        end: { line: 1, column: 12, offset: 11 }
                    }
                }],
                position: {
                    start: { line: 1, column: 11, offset: 10 },
                    end: { line: 1, column: 12, offset: 11 }
                }
            }
        ]),
        'should patch positions'
    );

    t.end();
});

test('Root: Given any other value', function (t) {
    t.throws(
        function () {
            latin.parse({});
        },
        'should throw when the object is neither null, undefined, ' +
        'string, nor String object'
    );

    t.end();
});

test('Paragraph: Without a value', function (t) {
    t.deepEqual(
        latin.tokenizeParagraph(),
        { type: 'ParagraphNode', children: [] },
        'should return an empty ParagraphNode when invoked without value'
    );

    t.end();
});

test('Sentence: Without a value', function (t) {
    t.deepEqual(
        latin.tokenizeSentence(),
        { type: 'SentenceNode', children: [] },
        'should return an empty SentenceNode when invoked without value'
    );

    t.end();
});

test('Digit-letter combinations in words', function (t) {
    t.test('should treat digit-letter as a word', function (st) {
        /* Source: http://en.wikipedia.org/wiki/IPhone_5S */
        describeFixture(
            st,
            'digit-letter-combination',
            'iPhone 5S is a high-end smartphone ' +
            'developed by Apple.'
        );

        st.end();
    });

    t.test('should treat letter-digit as a word', function (st) {
        describeFixture(
            st,
            'letter-digit-combination',
            'Galaxy S3 is a high-end smartphone ' +
            'developed by Samsung.'
        );

        st.end();
    });

    t.end()
});

test('Latin exceptions', function (t) {
    (
        'Al|Ca|Cap|Cca|Cent|Cf|Cit|Con|Cp|Cwt|Ead|' +
        'Etc|Ff|Fl|Ibid|Id|Nem|Op|Pro|Seq|Sic|Stat|Tem|Viz'
    ).split('|').forEach(function (abbreviation) {
        t.test('should not treat `' + abbreviation + '.` as a terminal marker',
            function (st) {
                describeFixture(
                    st,
                    'latin-exception-' + abbreviation.toLowerCase(),
                    'Gibberish something ' + abbreviation + '. Gobbledygook.'
                );

                st.end();
            }
        );
    });

    t.end();
});

test('Alphabetic exceptions', function (t) {
    (
        'A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z'
    ).split('|').forEach(function (letter) {
        t.test('should not treat `' + letter + '.` as a terminal marker',
            function (st) {
                describeFixture(
                    st,
                    'alphabetic-exception-' + letter.toLowerCase(),
                    'Gibberish something ' + letter + '. Gobbledygook.'
                );

                st.end();
            }
        );
    });

    t.end();
});

test('Numerical exceptions', function (t) {
    (
        '0|1|2|3|4|5|6|7|8|9|11|111|1111'
    ).split('|').forEach(function (number) {
        t.test('should not treat `' + number + '.` as a terminal marker',
            function (st) {
                describeFixture(
                    st,
                    'numerical-exception-' + number.toLowerCase(),
                    'Gibberish something ' + number + '. Gobbledygook.'
                );

                st.end();
            }
        );
    });

    t.end();
});

test('Initialisms', function (t) {
    t.test('should not treat full-stops in initialisms as a terminal marker',
        function (st) {
            /*
             * Source:
             *   http://en.wikipedia.org/wiki/Natural_language#
             *   Constructed_languages_and_international_auxiliary_languages
             */

            describeFixture(
                st,
                'initialism-exception',
                'Esperanto was designed by L.L. Zamenhof from languages'
            );

            st.end();
        }
    );

    t.end();
});

test('Lower-case letters', function (t) {
    t.test('should not treat full-stops followed by a lower-case letter ' +
        'as terminal marker',
        function (st) {
            /* Source: http://en.wikipedia.org/wiki/Park_Ave. */
            describeFixture(
                st,
                'lower-case-exception',
                'Park Ave. was an indie pop band which started in ' +
                'January 1996 in Nebraska (Omaha).'
            );

            st.end();
        }
    );

    t.end();
});

test('Domain names', function (t) {
    t.test('should not treat full-stops preceding a word as terminal marker',
        function (st) {
            /* Source: http://en.wikipedia.org/wiki/.com */
            describeFixture(
                st,
                'domain-name-exception',
                'However, eventually the distinction ' +
                'was lost when .com, .org and .net were ' +
                'opened for unrestricted registration.'
            );

            st.end();
        }
    );

    t.end();
});

test('Inside quotes', function (t) {
    t.test('should treat closing quotes after full-stops as part of ' +
        'the previous sentence',
        function (st) {
            /* Source: the web. */
            describeFixture(
                st,
                'full-stop-followed-by-closing-quote',
                '“However,” says my Grade 8 ' +
                'teacher, “the period goes inside ' +
                'quotes.” ' +
                'This is another sentence.'
            );

            st.end();
        }
    );

    t.end();
});

test('Inside parens', function (t) {
    t.test('should treat closing parens after full-stops as part of ' +
        'the previous sentence',
        function (st) {
            /* Source: the web. */
            describeFixture(
                st,
                'full-stop-followed-by-closing-parenthesis',
                '“However,” says my Grade 8 ' +
                'teacher, (the period goes inside ' +
                'quotes.) ' +
                'This is another sentence.'
            );

            st.end();
        }
    );

    t.end();
});

test('Before comma', function (t) {
    t.test('should not treat full-stops before comma\'s as terminal markers',
        function (st) {
            /* Source: part of the wikipedia license note. */
            describeFixture(
                st,
                'full-stop-followed-by-comma',
                'Wikipedia® is a registered trademark ' +
                'of the Wikimedia Foundation, Inc., a ' +
                'non-profit organization.'
            );

            st.end();
        }
    );

    t.end();
});

test('Ellipsis at sentence-start', function (t) {
    t.test('should not treat multiple full-stops at the start of a sentence' +
        'as terminal markers',
        function (st) {
            describeFixture(
                st,
                'ellipsis-sentence-start-spaces-padded',
                '. . . to be continued.'
            );

            /*
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
                st,
                'ellipsis-sentence-start',
                '...to be continued.'
            );

            describeFixture(
                st,
                'ellipsis-sentence-start-unicode',
                '…to be continued.'
            );

            st.end();
        }
    );

    t.end();
});

test('Ellipsis at sentence-end', function (t) {
    t.test('should not treat multiple full-stops at the end of a sentence ' +
        'as terminal markers',
        function (st) {
            describeFixture(
                st,
                'ellipsis-sentence-end-spaces-padded',
                'To be continued . . .'
            );

            describeFixture(
                st,
                'ellipsis-sentence-end-spaces',
                'To be continued. . .'
            );

            describeFixture(
                st,
                'ellipsis-sentence-end',
                'To be continued...'
            );

            describeFixture(
                st,
                'ellipsis-sentence-end-unicode',
                'To be continued…'
            );

            st.end();
        }
    );

    t.end();
});

test('Initial trailing white-space', function (t) {
    t.test('should move trailing white-space up to the highest possible level',
        function (st) {
            describeFixture(
                st,
                'trailing-white-space-initial-sentence',
                '\nA sentence.',
                'tokenizeSentence'
            );

            describeFixture(
                st,
                'trailing-white-space-initial-paragraph',
                '\nA sentence.',
                'tokenizeParagraph'
            );

            describeFixture(
                st,
                'trailing-white-space-initial',
                '\nA sentence.'
            );

            st.end();
        }
    );

    t.end();
});










test('Final trailing white-space', function (t) {
    t.test('should move trailing white-space up to the highest possible level',
        function (st) {
            describeFixture(
                st,
                'trailing-white-space-final-sentence',
                'A sentence. ',
                'tokenizeSentence'
            );

            describeFixture(
                st,
                'trailing-white-space-final-paragraph',
                'A sentence. ',
                'tokenizeParagraph'
            );

            describeFixture(
                st,
                'trailing-white-space-final',
                'A sentence. '
            );

            st.end();
        }
    );

    t.end();
});

test('Implicit terminal marker', function (t) {
    t.test('should close a sentence without a terminal marker',
        function (st) {
            describeFixture(
                st,
                'implicit-sentence-end',
                'One sentence. Two sentences'
            );

            st.end();
        }
    );

    t.end();
});

test('Non-alphabetic sentences', function (t) {
    t.test('should accept non-alphabetic sentences',
        function (st) {
            describeFixture(
                st,
                'non-alphabetic-sentence',
                '\uD83D\uDC38.'
            );

            st.end();
        }
    );

    t.end();
});

test('White space characters', function (t) {
    var sentenceStart = 'A';
    var sentenceEnd = 'house.';

    [
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
    ].forEach(function (character) {
        t.test(
            latinNoPosition.parse(
                sentenceStart + character + sentenceEnd
            ).children[0].children[0] ===
            {
                type: 'SentenceNode',
                children: [
                    {
                        type: 'WordNode',
                        children: [{ type: 'TextNode', value: 'A' }]
                    },
                    { type: 'WhiteSpaceNode', value: character },
                    {
                        type: 'WordNode',
                        children: [{ type: 'TextNode', value: 'house' }]
                    },
                    { type: 'PunctuationNode', value: '.' }
                ]
            },
            'should treat `' + character + '` as white-space'
        );
    });

    t.end();
});

test('Astral-plane surrogate pairs', function (t) {
    t.test('should classify \uD83D\uDCA9 as a punctuation',
        function (st) {
            /* Note the pile of poo, in ECMAScript 5
             * written using a surrogate pair. */
            describeFixture(
                st,
                'astral-plane-surrogate-pair',
                'The unicode character \uD83D\uDCA9 ' +
                'is pile of poo.'
            );

            st.end();
        }
    );

    t.end();
});

test('Combining marks and double combining marks', function (t) {
    t.test('should classify `A\u030Angstro\u0308m` as a word', function (st) {
        describeFixture(
            st,
            'combining-marks',
            'A\u030Angstro\u0308m.'
        );

        st.end();
    });

    t.test('should classify 0\uFE0F\u20E3 as a word', function (st) {
        /* Note the DIGIT ZERO, VARIATION
         * SELECTOR-16, and COMBINING
         * ENCLOSING KEYCAP, together,
         * form a :zero: emoji. */
        describeFixture(
            st,
            'combining-marks-double',
            'He scored 0\uFE0F\u20E3 points.'
        );

        st.end();
    });

    t.end();
});

test('Combining diacritical marks', function (t) {
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
        t.deepEqual(
            latinNoPosition.parse(
                'This a' + diacritic + ' house.'
            ).children[0].children[0],
            {
                type: 'SentenceNode',
                children: [
                    {
                        type: 'WordNode',
                        children: [{ type: 'TextNode', value: 'This' }]
                    },
                    { type: 'WhiteSpaceNode', value: ' ' },
                    {
                        type: 'WordNode',
                        children: [{ type: 'TextNode', value: 'a' + diacritic }]
                    },
                    { type: 'WhiteSpaceNode', value: ' ' },
                    {
                        type: 'WordNode',
                        children: [{ type: 'TextNode', value: 'house' }]
                    },
                    { type: 'PunctuationNode', value: '.' }
                ]
            },
            'should treat \u25CC' + diacritic + ' as a word'
        );
    });

    t.end();
});

test('Tie characters in words', function (t) {
    /* From wikipedia’s list:
     * http://en.wikipedia.org/wiki/Tie_(typography) */
    t.test('Combinding Double Breve: \u25CC\u035D\u25CC', function (st) {
        describeFixture(
            st,
            'combining-double-breve',
            'Such as the o\u035Do.'
        );

        st.end();
    });

    t.test('Combinding Double Inverted Breve: \u25CC\u0361\u25CC', function (st) {
        describeFixture(
            st,
            'combining-double-inverted-breve',
            'Such as the /k\u0361p/.'
        );

        st.end();
    });

    t.test('Combinding Double Breve Below: \u25CC\u035C\u25CC', function (st) {
        describeFixture(
            st,
            'combining-double-breve-below',
            'Such as the /k\u035Cp/.'
        );

        st.end();
    });

    t.test('Undertie: \u203F', function (st) {
        describeFixture(
            st,
            'combining-tie-under',
            'The undertie /vuz\u203Fave/'
        );

        st.end();
    });

    t.test('Character Tie: \u2040', function (st) {
        describeFixture(
            st,
            'combining-tie-character',
            'The character tie: s\u2040t.'
        );

        st.end();
    });

    t.test('Inverted Undertie: \u2040', function (st) {
        describeFixture(
            st,
            'combining-tie-under-inverted',
            'The inverted undertie: o\u2054o.'
        );

        st.end();
    });

    t.end();
});

test('Intelectual property marks', function (t) {
    t.test('Copyright symbol: \u00A9', function (st) {
        describeFixture(
            st,
            'intelectual-copyright-symbol',
            '\u00A9 John Smith.'
        );

        st.end();
    });

    t.test('Sound Recording Copyright symbol: \u00A9', function (st) {
        describeFixture(
            st,
            'intelectual-sound-recording-copyright-symbol',
            'Designated by \u2117, the sound recording ' +
            'copyright symbol'
        );

        st.end();
    });

    t.test('Registered Trademark symbol: \u00AE', function (st) {
        describeFixture(
            st,
            'intelectual-registered-trademark-symbol',
            'Wikipedia\u00AE is a registered trademark.'
        );

        st.end();
    });

    t.test('Service Mark: \u00AE', function (st) {
        describeFixture(
            st,
            'intelectual-service-mark',
            'ABC Law\u2120 legal services.'
        );

        st.end();
    });

    t.test('Trademark: \u00AE', function (st) {
        describeFixture(
            st,
            'intelectual-trademark',
            'Mytrademark\u2122 is a trademark.'
        );

        st.end();
    });

    t.end();
});

test('Single and double Grapheme Clusters', function (t) {
    /* Modified from: http://mathiasbynens.be/notes/javascript-unicode */
    t.test('should classify `\u0BA8\u0BBF` as a word', function (st) {
        describeFixture(
            st,
            'grapheme-clusters',
            'Grapheme clusters such as \u0BA8\u0BBF and such.'
        );

        st.end();
    });

    t.test('should classify `\u1101\u1161\u11A8` as a word', function (st) {
        describeFixture(
            st,
            'grapheme-clusters-double',
            'Hangul made of conjoining Jamo such ' +
            'as \u1101\u1161\u11A8 and such.'
        );

        st.end();
    });

    t.end();
});

test('Initial word punctuation', function (t) {
    t.test('should merge an ampersand preceding a word', function (st) {
        describeFixture(
            st,
            'word-initial-ampersand',
            'This, that, &c.'
        );

        st.end();
    });

    t.end();
});

test('Final word punctuation', function (t) {
    t.test('should merge a non-terminal full stop following a word', function (st) {
        describeFixture(
            st,
            'word-final-full-stop',
            'Burnside St. in April of 1959.'
        );

        st.end();
    });

    t.test('should merge a dash following a word', function (st) {
        describeFixture(
            st,
            'word-final-dash',
            'Nineteenth- and twentieth-century writers.'
        );

        st.end();
    });

    t.end();
});

test('Inner-word punctuation', function (t) {
    t.test('should merge a slash in a word', function (st) {
        describeFixture(
            st,
            'word-inner-slash',
            'N/A or n/a is a common abbreviation.'
        );

        st.end();
    });

    t.test('should merge a slash trailing to a word', function (st) {
        describeFixture(
            st,
            'word-inner-slash-no-next',
            'W/ or w/o are common abbreviations.'
        );

        st.end();
    });

    t.test('should merge small words around slashes', function (st) {
        describeFixture(
            st,
            'word-inner-slash-short',
            'km/h is a dutch abbreviation, just like t/m.'
        );

        st.end();
    });

    t.test('should not merge larger words around slashes', function (st) {
        describeFixture(
            st,
            'word-inner-slash-long',
            'This and/or that are not abbreviations.'
        );

        st.end();
    });

    t.test('should merge an ampersand in a word', function (st) {
        describeFixture(
            st,
            'word-inner-ampersand',
            'AT&Ts R&D and such.'
        );

        st.end();
    });

    t.test('should merge an underscore in a word', function (st) {
        describeFixture(
            st,
            'word-inner-underscore',
            'Some file_name.json. Another sentence.'
        );

        st.end();
    });

    t.test('should merge an at-sign in a word', function (st) {
        describeFixture(
            st,
            'word-inner-at',
            'Some name@example.com. Another sentence.'
        );

        st.end();
    });

    t.test('should merge a full-stop in a word', function (st) {
        describeFixture(
            st,
            'word-inner-full-stop',
            'You will need to arrive by 14.30.'
        );

        st.end();
    });

    t.test('should merge a colon in a word', function (st) {
        describeFixture(
            st,
            'word-inner-colon',
            'You will need to arrive by 14:30.'
        );

        st.end();
    });

    t.test('should merge URL-symbols, like `?` and `=`', function (st) {
        describeFixture(
            st,
            'word-inner-url',
            'Like http://example.com/?foo=1&bar=2. Another sentence.'
        );

        st.end();
    });

    t.end();
});

test('Terminal markers', function (t) {
    t.test('should break sentences at a full-stop', function (st) {
        describeFixture(
            st,
            'terminal-marker-full-stop',
            'A sentence. Another sentence.'
        );

        st.end();
    });

    t.test('should break sentences at a question mark', function (st) {
        describeFixture(
            st,
            'terminal-marker-question-mark',
            'Is it good in form? style? meaning? Yes.'
        );

        st.end();
    });

    t.test('should break sentences at an exclamation mark', function (st) {
        describeFixture(
            st,
            'terminal-marker-exclamation-mark',
            '“No!” he yelled. “Buy it now!” ' +
            'They have some really(!) low-priced ' +
            'rugs on sale this week.'
        );

        st.end();
    });

    t.test('should break sentences at an interrobang', function (st) {
        describeFixture(
            st,
            'terminal-marker-interrobang',
            'Say what\u203D She\u2019s pregnant?! ' +
            'Realy!? Wow.'
        );

        st.end();
    });

    t.test('should break sentences at an ellipsis', function (st) {
        describeFixture(
            st,
            'terminal-marker-ellipsis',
            'This is rather straightforward... ' +
            'Most of the time\u2026 She said that ' +
            'you should end a sentence with an ' +
            'ellipsis.'
        );

        st.end();
    });

    t.test('should NOT break terminal markers followed by a comma', function (st) {
        describeFixture(
            st,
            'terminal-marker-comma',
            '"Oh no!", she screamed, "\u2026don\'t ' +
            'do it!" Another sentence.'
        );

        st.end();
    });

    t.test('should NOT break terminal markers followed by a semicolon',
        function (st) {
            describeFixture(
                st,
                'terminal-marker-semicolon',
                '"Oh no!"; she screamed; "\u2026don\'t ' +
                'do it!" Another sentence.'
            );

            st.end();
        }
    );

    t.test('should break sentences at two or more new lines', function (st) {
        describeFixture(
            st,
            'terminal-marker-new-line',
            'A sentence.\n' +
            '\n' +
            'This is an implicit sentence\n' +
            '\n' +
            'Another sentence.\n'
        );

        describeFixture(
            st,
            'terminal-marker-new-line-multiple',
            'Aha\n' +
            '\n' +
            'oho\n' +
            '\n' +
            'uhu.\n'
        );

        st.end();
    });

    t.end();
});

test('Abbreviations: Initialisms', function (t) {
    t.test('should merge full-stops in preceding initialisms', function (st) {
        describeFixture(
            st,
            'initialism',
            'Something C.I.A. something.'
        );

        st.end();
    });

    t.test('should NOT merge full-stops in preceding normal words', function (st) {
        describeFixture(
            st,
            'initialism-like',
            'Self-contained.'
        );

        st.end();
    });

    t.test('should merge pluralized single letters', function (st) {
        describeFixture(
            st,
            'initialism-letter-plural',
            'What about A\'s and B\u2019s?'
        );

        st.end();
    });

    t.test('should merge pluralized initialisms', function (st) {
        describeFixture(
            st,
            'initialism-plural',
            'What about C.D.\'s, C.D.s, or CDs? ' +
            'SOS\u2019s or SOSes? ' +
            'G.I.\u2019s or G.I\'s?'
        );

        st.end();
    });

    t.test('should NOT merge multi-character ``initialisms\'\'', function (st) {
        describeFixture(
            st,
            'initialism-like-multi-character',
            'Lets meet this Friday at 16.00.'
        );

        st.end();
    });

    t.test('should NOT merge digits-only ``initialisms\'\'', function (st) {
        describeFixture(
            st,
            'initialism-like-digits',
            'Version 0.1.2. Another sentence.'
        );

        st.end();
    });

    t.test('should merge initialisms with other words', function (st) {
        describeFixture(
            st,
            'initialism-in-words',
            'In the pre-C.I.A. era.'
        );

        st.end();
    });

    t.end();
});
