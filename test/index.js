/**
 * @typedef {import('nlcst').Content} Content
 * @typedef {import('nlcst').Root} Root
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import {assert as nlcstTest} from 'nlcst-test'
import {removePosition} from 'unist-util-remove-position'
import {VFile} from 'vfile'
import {ParseLatin} from '../index.js'

const latin = new ParseLatin()

test('ParseLatin', async function () {
  assert.deepEqual(
    Object.keys(await import('../index.js')).sort(),
    ['ParseLatin'],
    'should expose the public api'
  )

  assert.deepEqual(
    new ParseLatin('Alpha bravo charlie').parse(),
    latin.parse('Alpha bravo charlie'),
    'should accept a string'
  )

  assert.deepEqual(
    new ParseLatin(
      'Alpha bravo charlie',
      new VFile('Alpha bravo charlie')
    ).parse(),
    latin.parse('Alpha bravo charlie'),
    'should accept a vfile'
  )
})

test('Root: Given two paragraphs', async function () {
  // Modified first paragraph, split in two, from:
  // <https://en.wikipedia.org/wiki/Paragraph>
  await describeFixture(
    'two-paragraphs',
    [
      'A paragraph (from the Greek paragraphos, “to write beside” or ',
      '“written beside”) is a self-contained unit of a discourse in ',
      'writing dealing with a particular point or idea. A paragraph has ',
      '5 types (Anton Heitman).\n\nA paragraph consists of one or more ',
      'sentences. Though not required by the syntax of any language, ',
      'paragraphs are usually an expected part of formal writing, used ',
      'to organize longer prose.'
    ].join('')
  )
})

test('Root: Given two paragraphs - extra whitespace', function () {
  // Modified first paragraph, split in two, from:
  // <https://en.wikipedia.org/wiki/Paragraph>
  const tree = latin.parse(
    [
      'A paragraph (from the Greek paragraphos, “to write beside” or ',
      '“written beside”) is a self-contained unit of a discourse in ',
      'writing dealing with a particular point or idea. A paragraph has ',
      '5 types (Anton Heitman).  \n \n  A paragraph consists of one or more ',
      'sentences. Though not required by the syntax of any language, ',
      'paragraphs are usually an expected part of formal writing, used ',
      'to organize longer prose.'
    ].join('')
  )
  assert.equal(
    tree.children.length,
    3,
    'should be resilient to whitespace before or after a newline'
  ) // Two paragraphs and one whitespace node.
})

test('A whitespace only document', async function () {
  await describeFixture('white-space-only', '\n\n')
})

test('Root: Without a value', function () {
  // No fixture test because this fails in `nlcst-test` (which it should though).
  assert.deepEqual(
    latin.parse(),
    {type: 'RootNode', children: []},
    'should return an empty RootNode when called without value'
  )
})

test('Paragraph: Without a value', function () {
  assert.deepEqual(
    latin.tokenizeParagraph(),
    {type: 'ParagraphNode', children: []},
    'should return an empty ParagraphNode when called without value'
  )
})

test('Sentence: Without a value', function () {
  assert.deepEqual(
    latin.tokenizeSentence(),
    {type: 'SentenceNode', children: []},
    'should return an empty SentenceNode when called without value'
  )
})

test('Digit-letter combinations in words', async function (t) {
  await t.test('should treat digit-letter as a word', async function () {
    // Source: <https://en.wikipedia.org/wiki/IPhone_5S>
    await describeFixture(
      'digit-letter-combination',
      'iPhone 5S is a high-end smartphone developed by Apple.'
    )
  })

  await t.test('should treat letter-digit as a word', async function () {
    await describeFixture(
      'letter-digit-combination',
      'Galaxy S3 is a high-end smartphone developed by Samsung.'
    )
  })
})

test('Latin exceptions', async function (t) {
  for (const abbreviation of (
    'Al|Ca|Cap|Cca|Cent|Cf|Cit|Con|Cp|Cwt|Ead|' +
    'Etc|Ff|Fl|Ibid|Id|Nem|Op|Pro|Seq|Sic|Stat|Tem|Viz'
  ).split('|')) {
    await t.test(
      'should not treat `' + abbreviation + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'latin-exception-' + abbreviation.toLowerCase(),
          'Gibberish something ' + abbreviation + '. Gobbledygook.'
        )
      }
    )
  }
})

test('Alphabetic exceptions', async function (t) {
  for (const letter of 'A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z'.split(
    '|'
  )) {
    await t.test(
      'should not treat `' + letter + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'alphabetic-exception-' + letter.toLowerCase(),
          'Gibberish something ' + letter + '. Gobbledygook.'
        )
      }
    )
  }
})

test('Numerical exceptions', async function (t) {
  for (const number of '0|1|2|3|4|5|6|7|8|9|11|111'.split('|')) {
    await t.test(
      'should not treat `' + number + '.` as a terminal marker',
      async function () {
        await describeFixture(
          'numerical-exception-' + number.toLowerCase(),
          'Gibberish something ' + number + '. Gobbledygook.'
        )
      }
    )
  }
})

test('Initialisms', async function (t) {
  await t.test(
    'should not treat full-stops in initialisms as a terminal marker',
    async function () {
      // Source:
      // <https://en.wikipedia.org/wiki/Natural_language#Constructed_languages_and_international_auxiliary_languages>
      await describeFixture(
        'initialism-exception',
        'Esperanto was designed by L.L. Zamenhof from languages'
      )
    }
  )
})

test('Lower-case letters', async function (t) {
  await t.test(
    'should not treat full-stops followed by a lower-case letter ' +
      'as terminal marker',
    async function () {
      // Source: <https://en.wikipedia.org/wiki/Park_Ave.>
      await describeFixture(
        'lower-case-exception',
        'Park Ave. was an indie pop band which started in ' +
          'January 1996 in Nebraska (Omaha).'
      )
    }
  )
})

test('Domain names', async function (t) {
  await t.test(
    'should not treat full-stops preceding a word as terminal marker',
    async function () {
      // Source: <https://en.wikipedia.org/wiki/.com>
      await describeFixture(
        'domain-name-exception',
        'However, eventually the distinction ' +
          'was lost when .com, .org and .net were ' +
          'opened for unrestricted registration.'
      )
    }
  )
})

test('Inside quotes', async function (t) {
  await t.test(
    'should treat closing quotes after full-stops as part of ' +
      'the previous sentence',
    async function () {
      // Source: the web.
      await describeFixture(
        'full-stop-followed-by-closing-quote',
        '“However,” says my Grade 8 ' +
          'teacher, “the period goes inside ' +
          'quotes.” ' +
          'This is another sentence.'
      )
    }
  )
})

test('Inside parens', async function (t) {
  await t.test(
    'should treat closing parens after full-stops as part of ' +
      'the previous sentence',
    async function () {
      // Source: the web.
      await describeFixture(
        'full-stop-followed-by-closing-parenthesis',
        '“However,” says my Grade 8 ' +
          'teacher, (the period goes inside ' +
          'quotes.) ' +
          'This is another sentence.'
      )
    }
  )
})

test('Before comma', async function (t) {
  await t.test(
    "should not treat full-stops before comma's as terminal markers",
    async function () {
      // Source: part of the wikipedia license note.
      await describeFixture(
        'full-stop-followed-by-comma',
        'Wikipedia® is a registered trademark ' +
          'of the Wikimedia Foundation, Inc., a ' +
          'non-profit organization.'
      )
    }
  )
})

test('Before digit', async function (t) {
  await t.test(
    'should not treat full-stops before digits as terminal markers',
    async function () {
      // Source: part of the wikipedia license note.
      await describeFixture('full-stop-followed-by-digit', 'Of .5 percent.')
    }
  )

  await t.test('should not fail on digit only sentences', async function () {
    await describeFixture('digit-only-sentence', '123456')
  })
})

test('Ellipsis at sentence-start', async function (t) {
  await t.test(
    'should not treat multiple full-stops at the start of a sentence' +
      'as terminal markers',
    async function () {
      await describeFixture(
        'ellipsis-sentence-start-spaces-padded',
        '. . . to be continued.'
      )

      // This, perhaps correctly, doesn’t work yet: the last full-stop is
      // classified as part of the first word.
      // await describeFixture('ellipsis-sentence-start-spaces', '. . .to be continued.')

      await describeFixture('ellipsis-sentence-start', '...to be continued.')

      await describeFixture(
        'ellipsis-sentence-start-unicode',
        '…to be continued.'
      )
    }
  )
})

test('Ellipsis at sentence-end', async function (t) {
  await t.test(
    'should not treat multiple full-stops at the end of a sentence ' +
      'as terminal markers',
    async function () {
      await describeFixture(
        'ellipsis-sentence-end-spaces-padded',
        'To be continued . . .'
      )

      await describeFixture(
        'ellipsis-sentence-end-spaces',
        'To be continued. . .'
      )

      await describeFixture('ellipsis-sentence-end', 'To be continued...')

      await describeFixture('ellipsis-sentence-end-unicode', 'To be continued…')
    }
  )
})

test('Line endings', function () {
  assert.deepEqual(
    removePosition(latin.parse('alpha\rbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                },
                {type: 'WhiteSpaceNode', value: '\r'},
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support a CR line ending as whitespace'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha\nbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                },
                {type: 'WhiteSpaceNode', value: '\n'},
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support an LF line ending as whitespace'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha\r\nbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                },
                {type: 'WhiteSpaceNode', value: '\r\n'},
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support a CR+LF line ending as whitespace'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha \r\n\tbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                },
                {type: 'WhiteSpaceNode', value: ' \r\n\t'},
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support a padded CR+LF line ending as whitespace'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha\r \t\nbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                }
              ]
            }
          ]
        },
        {type: 'WhiteSpaceNode', value: '\r \t\n'},
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support CR, whitespace, and then an LF, as a break between paragraphs'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha \r \t\rbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                }
              ]
            }
          ]
        },
        {type: 'WhiteSpaceNode', value: ' \r \t\r'},
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support two CRs with whitespace as a break between paragraphs'
  )

  assert.deepEqual(
    removePosition(latin.parse('alpha\r\rbravo'), true),
    {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'alpha'}]
                }
              ]
            }
          ]
        },
        {type: 'WhiteSpaceNode', value: '\r\r'},
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'bravo'}]
                }
              ]
            }
          ]
        }
      ]
    },
    'should support two CRs as a break between paragraphs'
  )
})

test('Initial trailing white-space', async function (t) {
  await t.test(
    'should move trailing white-space up to the highest possible level',
    async function () {
      await describeFixture(
        'trailing-white-space-initial-sentence',
        '\nA sentence.',
        'tokenizeSentence'
      )

      await describeFixture(
        'trailing-white-space-initial-paragraph',
        '\nA sentence.',
        'tokenizeParagraph'
      )

      await describeFixture('trailing-white-space-initial', '\nA sentence.')
    }
  )
})

test('Final trailing white-space', async function (t) {
  await t.test(
    'should move trailing white-space up to the highest possible level',
    async function () {
      await describeFixture(
        'trailing-white-space-final-sentence',
        'A sentence. ',
        'tokenizeSentence'
      )

      await describeFixture(
        'trailing-white-space-final-paragraph',
        'A sentence. ',
        'tokenizeParagraph'
      )

      await describeFixture('trailing-white-space-final', 'A sentence. ')
    }
  )
})

test('Implicit terminal marker', async function (t) {
  await t.test(
    'should close a sentence without a terminal marker',
    async function () {
      await describeFixture(
        'implicit-sentence-end',
        'One sentence. Two sentences'
      )
    }
  )
})

test('Non-alphabetic sentences', async function (t) {
  await t.test('should accept non-alphabetic sentences', async function () {
    await describeFixture('non-alphabetic-sentence', '\uD83D\uDC38.')
  })
})

test('White space characters', async function () {
  const sentenceStart = 'A'
  const sentenceEnd = 'house.'
  for (const character of [
    '\u0009', // CHARACTER TABULATION
    '\u000A', // LINE FEED (LF)
    '\u000B', // LINE TABULATION
    '\u000C', // FORM FEED (FF)
    '\u000D', // CARRIAGE RETURN (CR)
    '\u0020', // SPACE
    '\u0085', // NEXT LINE (NEL)
    '\u00A0', // NO-BREAK SPACE
    '\u1680', // OGHAM SPACE MARK
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
    '\u3000' // IDEOGRAPHIC SPACE
  ]) {
    assert.deepEqual(
      removePosition(
        latin.parse(sentenceStart + character + sentenceEnd),
        true
      ),
      {
        type: 'RootNode',
        children: [
          {
            type: 'ParagraphNode',
            children: [
              {
                type: 'SentenceNode',
                children: [
                  {
                    type: 'WordNode',
                    children: [{type: 'TextNode', value: 'A'}]
                  },
                  {type: 'WhiteSpaceNode', value: character},
                  {
                    type: 'WordNode',
                    children: [{type: 'TextNode', value: 'house'}]
                  },
                  {type: 'PunctuationNode', value: '.'}
                ]
              }
            ]
          }
        ]
      },
      'should treat `' + character + '` as white-space'
    )
  }
})

test('Astral-plane surrogate pairs', async function (t) {
  await t.test(
    'should classify \uD83D\uDCA9 as a punctuation',
    async function () {
      // Note the pile of poo, in ECMAScript 5 written using a surrogate pair.
      await describeFixture(
        'astral-plane-surrogate-pair',
        'The unicode character \uD83D\uDCA9 is pile of poo.'
      )
    }
  )
})

test('Combining marks and double combining marks', async function (t) {
  await t.test(
    'should classify `A\u030Angstro\u0308m` as a word',
    async function () {
      await describeFixture('combining-marks', 'A\u030Angstro\u0308m.')
    }
  )

  await t.test('should classify 0\uFE0F\u20E3 as a word', async function () {
    // Note the DIGIT ZERO, VARIATION SELECTOR-16, and COMBINING ENCLOSING
    // KEYCAP, together, form a :zero: emoji.
    await describeFixture(
      'combining-marks-double',
      'He scored 0\uFE0F\u20E3 points.'
    )
  })
})

test('Combining diacritical marks', function () {
  for (const diacritic of [
    '\u0300', // GRAVE ACCENT (U+0300)
    '\u0301', // ACUTE ACCENT (U+0301)
    '\u0302', // CIRCUMFLEX ACCENT (U+0302)
    '\u0303', // TILDE (U+0303)
    '\u0304', // MACRON (U+0304)
    '\u0305', // OVERLINE (U+0305)
    '\u0306', // BREVE (U+0306)
    '\u0307', // DOT ABOVE (U+0307)
    '\u0308', // DIAERESIS (U+0308)
    '\u0309', // HOOK ABOVE (U+0309)
    '\u030A', // RING ABOVE (U+030A)
    '\u030B', // DOUBLE ACUTE ACCENT (U+030B)
    '\u030C', // CARON (U+030C)
    '\u030D', // VERTICAL LINE ABOVE (U+030D)
    '\u030E', // DOUBLE VERTICAL LINE ABOVE (U+030E)
    '\u030F', // DOUBLE GRAVE ACCENT (U+030F)
    '\u0310', // CANDRABINDU (U+0310)
    '\u0311', // INVERTED BREVE (U+0311)
    '\u0312', // TURNED COMMA ABOVE (U+0312)
    '\u0313', // COMMA ABOVE (U+0313)
    '\u0314', // REVERSED COMMA ABOVE (U+0314)
    '\u0315', // COMMA ABOVE RIGHT (U+0315)
    '\u0316', // GRAVE ACCENT BELOW (U+0316)
    '\u0317', // ACUTE ACCENT BELOW (U+0317)
    '\u0318', // LEFT TACK BELOW (U+0318)
    '\u0319', // RIGHT TACK BELOW (U+0319)
    '\u031A', // LEFT ANGLE ABOVE (U+031A)
    '\u031B', // HORN (U+031B)
    '\u031C', // LEFT HALF RING BELOW (U+031C)
    '\u031D', // UP TACK BELOW (U+031D)
    '\u031E', // DOWN TACK BELOW (U+031E)
    '\u031F', // PLUS SIGN BELOW (U+031F)
    '\u0320', // MINUS SIGN BELOW (U+0320)
    '\u0321', // PALATALIZED HOOK BELOW (U+0321)
    '\u0322', // RETROFLEX HOOK BELOW (U+0322)
    '\u0323', // DOT BELOW (U+0323)
    '\u0324', // DIAERESIS BELOW (U+0324)
    '\u0325', // RING BELOW (U+0325)
    '\u0326', // COMMA BELOW (U+0326)
    '\u0327', // CEDILLA (U+0327)
    '\u0328', // OGONEK (U+0328)
    '\u0329', // VERTICAL LINE BELOW (U+0329)
    '\u032A', // BRIDGE BELOW (U+032A)
    '\u032B', // INVERTED DOUBLE ARCH BELOW (U+032B)
    '\u032C', // CARON BELOW (U+032C)
    '\u032D', // CIRCUMFLEX ACCENT BELOW (U+032D)
    '\u032E', // BREVE BELOW (U+032E)
    '\u032F', // INVERTED BREVE BELOW (U+032F)
    '\u0330', // TILDE BELOW (U+0330)
    '\u0331', // MACRON BELOW (U+0331)
    '\u0332', // LOW LINE (U+0332)
    '\u0333', // DOUBLE LOW LINE (U+0333)
    '\u0334', // TILDE OVERLAY (U+0334)
    '\u0335', // SHORT STROKE OVERLAY (U+0335)
    '\u0336', // LONG STROKE OVERLAY (U+0336)
    '\u0337', // SHORT SOLIDUS OVERLAY (U+0337)
    '\u0338', // LONG SOLIDUS OVERLAY (U+0338)
    '\u0339', // RIGHT HALF RING BELOW (U+0339)
    '\u033A', // INVERTED BRIDGE BELOW (U+033A)
    '\u033B', // SQUARE BELOW (U+033B)
    '\u033C', // SEAGULL BELOW (U+033C)
    '\u033D', // X ABOVE (U+033D)
    '\u033E', // VERTICAL TILDE (U+033E)
    '\u033F', // DOUBLE OVERLINE (U+033F)
    '\u0340', // GRAVE TONE MARK (U+0340)
    '\u0341', // ACUTE TONE MARK (U+0341)
    '\u0342', // GREEK PERISPOMENI (U+0342)
    '\u0343', // GREEK KORONIS (U+0343)
    '\u0344', // GREEK DIALYTIKA TONOS (U+0344)
    '\u0345', // GREEK YPOGEGRAMMENI (U+0345)
    '\u0346', // BRIDGE ABOVE (U+0346)
    '\u0347', // EQUALS SIGN BELOW (U+0347)
    '\u0348', // DOUBLE VERTICAL LINE BELOW (U+0348)
    '\u0349', // LEFT ANGLE BELOW (U+0349)
    '\u034A', // NOT TILDE ABOVE (U+034A)
    '\u034B', // HOMOTHETIC ABOVE (U+034B)
    '\u034C', // ALMOST EQUAL TO ABOVE (U+034C)
    '\u034D', // LEFT RIGHT ARROW BELOW (U+034D)
    '\u034E', // UPWARDS ARROW BELOW (U+034E)
    '\u034F', // GRAPHEME JOINER (U+034F)
    '\u0350', // RIGHT ARROWHEAD ABOVE (U+0350)
    '\u0351', // LEFT HALF RING ABOVE (U+0351)
    '\u0352', // FERMATA (U+0352)
    '\u0353', // X BELOW (U+0353)
    '\u0354', // LEFT ARROWHEAD BELOW (U+0354)
    '\u0355', // RIGHT ARROWHEAD BELOW (U+0355)
    '\u0356', // RIGHT ARROWHEAD AND UP ARROWHEAD BELOW (U+0356)
    '\u0357', // RIGHT HALF RING ABOVE (U+0357)
    '\u0358', // DOT ABOVE RIGHT (U+0358)
    '\u0359', // ASTERISK BELOW (U+0359)
    '\u035A', // DOUBLE RING BELOW (U+035A)
    '\u035B', // ZIGZAG ABOVE (U+035B)
    '\u035C', // DOUBLE BREVE BELOW (U+035C)
    '\u035D', // DOUBLE BREVE (U+035D)
    '\u035E', // DOUBLE MACRON (U+035E)
    '\u035F', // DOUBLE MACRON BELOW (U+035F)
    '\u0360', // DOUBLE TILDE (U+0360)
    '\u0361', // DOUBLE INVERTED BREVE (U+0361)
    '\u0362', // DOUBLE RIGHTWARDS ARROW BELOW (U+0362)
    '\u0363', // LATIN SMALL LETTER A (U+0363)
    '\u0364', // LATIN SMALL LETTER E (U+0364)
    '\u0365', // LATIN SMALL LETTER I (U+0365)
    '\u0366', // LATIN SMALL LETTER O (U+0366)
    '\u0367', // LATIN SMALL LETTER U (U+0367)
    '\u0368', // LATIN SMALL LETTER C (U+0368)
    '\u0369', // LATIN SMALL LETTER D (U+0369)
    '\u036A', // LATIN SMALL LETTER H (U+036A)
    '\u036B', // LATIN SMALL LETTER M (U+036B)
    '\u036C', // LATIN SMALL LETTER R (U+036C)
    '\u036D', // LATIN SMALL LETTER T (U+036D)
    '\u036E', // LATIN SMALL LETTER V (U+036E)
    '\u036F' // LATIN SMALL LETTER X (U+036F)
  ]) {
    assert.deepEqual(
      removePosition(latin.parse('This a' + diacritic + ' house.'), true)
        .children[0],
      {
        type: 'ParagraphNode',
        children: [
          {
            type: 'SentenceNode',
            children: [
              {
                type: 'WordNode',
                children: [{type: 'TextNode', value: 'This'}]
              },
              {type: 'WhiteSpaceNode', value: ' '},
              {
                type: 'WordNode',
                children: [{type: 'TextNode', value: 'a' + diacritic}]
              },
              {type: 'WhiteSpaceNode', value: ' '},
              {
                type: 'WordNode',
                children: [{type: 'TextNode', value: 'house'}]
              },
              {type: 'PunctuationNode', value: '.'}
            ]
          }
        ]
      },
      'should treat \u25CC' + diacritic + ' as a word'
    )
  }
})

test('Tie characters in words', async function (t) {
  // From wikipedia’s list:
  // <https://en.wikipedia.org/wiki/Tie_(typography)>
  await t.test(
    'Combinding Double Breve: \u25CC\u035D\u25CC',
    async function () {
      await describeFixture('combining-double-breve', 'Such as the o\u035Do.')
    }
  )

  await t.test(
    'Combinding Double Inverted Breve: \u25CC\u0361\u25CC',
    async function () {
      await describeFixture(
        'combining-double-inverted-breve',
        'Such as the /k\u0361p/.'
      )
    }
  )

  await t.test(
    'Combinding Double Breve Below: \u25CC\u035C\u25CC',
    async function () {
      await describeFixture(
        'combining-double-breve-below',
        'Such as the /k\u035Cp/.'
      )
    }
  )

  await t.test('Undertie: \u203F', async function () {
    await describeFixture('combining-tie-under', 'The undertie /vuz\u203Fave/')
  })

  await t.test('Character Tie: \u2040', async function () {
    await describeFixture(
      'combining-tie-character',
      'The character tie: s\u2040t.'
    )
  })

  await t.test('Inverted Undertie: \u2040', async function () {
    await describeFixture(
      'combining-tie-under-inverted',
      'The inverted undertie: o\u2054o.'
    )
  })
})

test('Intelectual property marks', async function (t) {
  await t.test('Copyright symbol: \u00A9', async function () {
    await describeFixture('intelectual-copyright-symbol', '\u00A9 John Smith.')
  })

  await t.test('Sound Recording Copyright symbol: \u00A9', async function () {
    await describeFixture(
      'intelectual-sound-recording-copyright-symbol',
      'Designated by \u2117, the sound recording copyright symbol'
    )
  })

  await t.test('Registered Trademark symbol: \u00AE', async function () {
    await describeFixture(
      'intelectual-registered-trademark-symbol',
      'Wikipedia\u00AE is a registered trademark.'
    )
  })

  await t.test('Service Mark: \u00AE', async function () {
    await describeFixture(
      'intelectual-service-mark',
      'ABC Law\u2120 legal services.'
    )
  })

  await t.test('Trademark: \u00AE', async function () {
    await describeFixture(
      'intelectual-trademark',
      'Mytrademark\u2122 is a trademark.'
    )
  })
})

test('Single and double Grapheme Clusters', async function (t) {
  // Modified from: <https://mathiasbynens.be/notes/javascript-unicode>
  await t.test('should classify `\u0BA8\u0BBF` as a word', async function () {
    await describeFixture(
      'grapheme-clusters',
      'Grapheme clusters such as \u0BA8\u0BBF and such.'
    )
  })

  await t.test(
    'should classify `\u1101\u1161\u11A8` as a word',
    async function () {
      await describeFixture(
        'grapheme-clusters-double',
        'Hangul made of conjoining Jamo such as \u1101\u1161\u11A8 and such.'
      )
    }
  )
})

test('Initial word punctuation', async function (t) {
  await t.test('should merge an ampersand preceding a word', async function () {
    await describeFixture('word-initial-ampersand', 'This, that, &c.')
  })
})

test('Final word punctuation', async function (t) {
  await t.test(
    'should merge a non-terminal full stop following a word',
    async function () {
      await describeFixture(
        'word-final-full-stop',
        'Burnside St. in April of 1959.'
      )
    }
  )

  await t.test('should merge a dash following a word', async function () {
    await describeFixture(
      'word-final-dash',
      'Nineteenth- and twentieth-century writers.'
    )
  })
})

test('Inner-word punctuation', async function (t) {
  await t.test('should merge a slash in a word', async function () {
    await describeFixture(
      'word-inner-slash',
      'N/A or n/a is a common abbreviation.'
    )
  })

  await t.test('should merge a slash trailing to a word', async function () {
    await describeFixture(
      'word-inner-slash-no-next',
      'W/ or w/o are common abbreviations.'
    )
  })

  await t.test('should merge small words around slashes', async function () {
    await describeFixture(
      'word-inner-slash-short',
      'km/h is a dutch abbreviation, just like t/m.'
    )
  })

  await t.test(
    'should not merge larger words around slashes',
    async function () {
      await describeFixture(
        'word-inner-slash-long',
        'This and/or that are not abbreviations.'
      )
    }
  )

  await t.test('should merge an ampersand in a word', async function () {
    await describeFixture('word-inner-ampersand', 'AT&Ts R&D and such.')
  })

  await t.test('should merge an underscore in a word', async function () {
    await describeFixture(
      'word-inner-underscore',
      'Some file_name.json. Another sentence.'
    )
  })

  await t.test('should merge an at-sign in a word', async function () {
    await describeFixture(
      'word-inner-at',
      'Some name@example.com. Another sentence.'
    )
  })

  await t.test('should merge a full-stop in a word', async function () {
    await describeFixture(
      'word-inner-full-stop',
      'You will need to arrive by 14.30.'
    )
  })

  await t.test('should merge a colon in a word', async function () {
    await describeFixture(
      'word-inner-colon',
      'You will need to arrive by 14:30.'
    )
  })

  await t.test('should merge URL-symbols, like `?` and `=`', async function () {
    await describeFixture(
      'word-inner-url',
      'Like http://example.com/?foo=1&bar=2. Another sentence.'
    )
  })
})

test('Terminal markers', async function (t) {
  await t.test('should break sentences at a full-stop', async function () {
    await describeFixture(
      'terminal-marker-full-stop',
      'A sentence. Another sentence.'
    )
  })

  await t.test('should break sentences at a question mark', async function () {
    await describeFixture(
      'terminal-marker-question-mark',
      'Is it good in form? style? meaning? Yes.'
    )
  })

  await t.test(
    'should break sentences at an exclamation mark',
    async function () {
      await describeFixture(
        'terminal-marker-exclamation-mark',
        '“No!” he yelled. “Buy it now!” ' +
          'They have some really(!) low-priced ' +
          'rugs on sale this week.'
      )
    }
  )

  await t.test('should break sentences at an interrobang', async function () {
    await describeFixture(
      'terminal-marker-interrobang',
      'Say what\u203D She\u2019s pregnant?! Realy!? Wow.'
    )
  })

  await t.test('should break sentences at an ellipsis', async function () {
    await describeFixture(
      'terminal-marker-ellipsis',
      'This is rather straightforward... ' +
        'Most of the time\u2026 She said that ' +
        'you should end a sentence with an ' +
        'ellipsis.'
    )
  })

  await t.test(
    'should NOT break terminal markers followed by a comma',
    async function () {
      await describeFixture(
        'terminal-marker-comma',
        '"Oh no!", she screamed, "\u2026don\'t do it!" Another sentence.'
      )
    }
  )

  await t.test(
    'should NOT break terminal markers followed by a semicolon',
    async function () {
      await describeFixture(
        'terminal-marker-semicolon',
        '"Oh no!"; she screamed; "\u2026don\'t do it!" Another sentence.'
      )
    }
  )

  await t.test(
    'should break sentences at two or more new lines',
    async function () {
      await describeFixture(
        'terminal-marker-new-line',
        'A sentence.\n' +
          '\n' +
          'This is an implicit sentence\n' +
          '\n' +
          'Another sentence.\n'
      )

      await describeFixture(
        'terminal-marker-new-line-multiple',
        'Aha\n\noho\n\nuhu.\n'
      )
    }
  )

  await t.test(
    'should break sentences at two or more new lines, permissive of whitespace',
    async function () {
      const tree = latin.parse(
        'A sentence.\n' +
          '\n' +
          'This is an implicit sentence \n' +
          '\n' +
          'Another sentence.\n'
      )
      assert.equal(
        tree.children.length,
        6,
        'three paragraphs and three whitespace nodes'
      )
    }
  )
})

test('Abbreviations: Initialisms', async function (t) {
  await t.test(
    'should merge full-stops in preceding initialisms',
    async function () {
      await describeFixture('initialism', 'Something C.I.A. something.')
    }
  )

  await t.test(
    'should NOT merge full-stops in preceding normal words',
    async function () {
      await describeFixture('initialism-like', 'Self-contained.')
    }
  )

  await t.test('should merge pluralized single letters', async function () {
    await describeFixture(
      'initialism-letter-plural',
      "What about A's and B\u2019s?"
    )
  })

  await t.test('should merge pluralized initialisms', async function () {
    await describeFixture(
      'initialism-plural',
      "What about C.D.'s, C.D.s, or CDs? " +
        'SOS\u2019s or SOSes? ' +
        "G.I.\u2019s or G.I's?"
    )
  })

  await t.test(
    'should NOT merge multi-character “initialisms”',
    async function () {
      await describeFixture(
        'initialism-like-multi-character',
        'Lets meet this Friday at 16.00.'
      )
    }
  )

  await t.test('should NOT merge digits-only “initialisms”', async function () {
    await describeFixture(
      'initialism-like-digits',
      'Version 0.1.2. Another sentence.'
    )
  })

  await t.test('should merge initialisms with other words', async function () {
    await describeFixture('initialism-in-words', 'In the pre-C.I.A. era.')
  })
})

/**
 * Utility to test if a given document is both a valid node, and matches a
 * fixture.
 *
 * @param {string} name
 * @param {string} doc
 * @param {'parse' | 'tokenizeParagraph' | 'tokenizeRoot' | 'tokenizeSentence' | undefined} [method='parse']
 * @returns {Promise<undefined>}
 */
async function describeFixture(name, doc, method = 'parse') {
  const nlcstA = latin[method](doc)
  /** @type {Content | Root} */
  const fixture = JSON.parse(
    String(await fs.readFile(path.join('test', 'fixture', name + '.json')))
  )

  nlcstTest(nlcstA)

  assert.deepEqual(nlcstA, fixture, 'should match')
}
