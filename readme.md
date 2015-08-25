# parse-latin [![Build Status](https://img.shields.io/travis/wooorm/parse-latin.svg)](https://travis-ci.org/wooorm/parse-latin) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/parse-latin.svg)](https://codecov.io/github/wooorm/parse-latin)

A Latin script language parser producing [NLCST](https://github.com/wooorm/nlcst)
nodes.

*   For semantics of nodes, see [NLCST](https://github.com/wooorm/nlcst);

*   For a pluggable system to analyze and manipulate language, see
    [retext](https://github.com/wooorm/retext).

Whether Old-English (“þā gewearþ þǣm hlāforde and þǣm hȳrigmannum wiþ ānum
penninge”), Icelandic (“Hvað er að frétta”), French (“Où sont les toilettes?”),
**parse-latin** does a good job at tokenizing it.

Note also that **parse-latin** does a decent job at tokenizing Latin-like
scripts, Cyrillic (“Добро пожаловать!”), Georgian (“როგორა ხარ?”), Armenian
(“Շատ հաճելի է”), and such.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install parse-latin
```

**parse-latin** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](parse-latin.js) and [compressed](parse-latin.min.js).

## Usage

```javascript
var ParseLatin = require('parse-latin'),
    latin = new ParseLatin();

latin.parse('A simple sentence.');
/**
 * Logs something like:
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */

latin.parse(
    'The \xC5 symbol invented by A. J. A\u030Angstro\u0308m ' +
    '(1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the ' +
    'length 10\u207B\xB9\u2070 m.'
);
/**
 * Logs something like:
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */
```

## API

*   [ParseLatin(options?)](#parselatinoptions)
*   [ParseLatin#tokenize(value)](#parselatintokenizevalue)
*   [ParseLatin#parse(value)](#parselatinparsevalue)

### ParseLatin(options?)

Exposes the functionality needed to tokenize natural Latin-script languages
into a syntax tree.

Parameters:

*   `options` (`Object`, optional)

    *   `position` (`boolean`, default: `true`) - Whether to add positional
        information to nodes.

#### ParseLatin#tokenize(value)

Tokenize natural Latin-script language into letter and numbers (words), white
space, and everything else (punctuation).

#### ParseLatin#parse(value)

Tokenize natural Latin-script languages into an [NLCST](https://github.com/wooorm/nlcst)
[syntax tree](#syntax-tree-format).

```javascript
var ParseLatin = require('parse-latin'),
    latin = new ParseLatin();

latin.parse('A simple sentence.');
/**
 * Object
 * ├─ type: "RootNode"
 * └─ children: Array[1]
 *     └─ 0: Object
 *           ├─ type: "ParagraphNode"
 *           └─ children: Array[1]
 *              └─ 0: Object
 *                    ├─ type: "SentenceNode"
 *                    └─ children: Array[6]
 *                       ├─ 0: Object
 *                       |     ├─ type: "WordNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: "A"
 *                       ├─ 1: Object
 *                       |     ├─ type: "WhiteSpaceNode"
 *                       |     └─ value: " "
 *                       ├─ 2: Object
 *                       |     ├─ type: "WordNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: "simple"
 *                       ├─ 3: Object
 *                       |     ├─ type: "WhiteSpaceNode"
 *                       |     └─ value: " "
 *                       ├─ 4: Object
 *                       |     ├─ type: "WordNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: "sentence"
 *                       └─ 5: Object
 *                             ├─ type: "PunctuationNode"
 *                             └─ value: "."
 */
```

## Syntax Tree Format

> Note: The easiest way to see **how parse-latin tokenizes and parses**, is by
> using the [online parser demo](https://wooorm.github.io/parse-latin), which
> shows the syntax tree corresponding to the typed text.

Basically, **parse-latin** splits text into white space, word, and punctuation
tokens. **parse-latin** starts out with a pretty easy definition, one that most
other tokenizers use:

*   A “word” is one or more letter or number characters;
*   A “white space” is one or more white space characters;
*   A “punctuation” is one or more of anything else;

Then, it manipulates and merges those tokens into an [NLCST](https://github.com/wooorm/nlcst)
syntax tree, adding sentences and paragraphs where needed.

*   Some punctuation marks are part of the word they occur in, e.g.,
    `non-profit`, `she’s`, `G.I.`, `11:00`, `N/A`, `&c`, `nineteenth- and...`;

*   Some full-stops do not mark a sentence end, e.g., `1.`, `e.g.`, `id.`;

*   Although full-stops, question marks, and exclamation marks (sometimes) end
    a sentence, that end might not occur directly after the mark, e.g., `.)`,
    `."`;

*   And many more exceptions.

## Related

*   [nlcst](https://github.com/wooorm/nlcst)
*   [retext](https://github.com/wooorm/retext)
*   [parse-dutch](https://github.com/wooorm/parse-dutch)
*   [parse-english](https://github.com/wooorm/parse-english)

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
