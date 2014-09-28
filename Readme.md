# parse-latin [![Build Status](https://travis-ci.org/wooorm/parse-latin.svg?branch=master)](https://travis-ci.org/wooorm/parse-latin) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-latin.svg)](https://coveralls.io/r/wooorm/parse-latin?branch=master)

**parse-latin** is an Latin-script language parser in JavaScript. NodeJS, and the browser. Lots of tests (220+), including 300+ assertions. 100% coverage.

Note: This project is **not** an object model for natural languages, or an extensible system for analysing and manipulating natural language, its an algorithm that transforms plain-text natural language into a syntax tree. If you need the above-mentioned functionalities, use the following projects.

* For a pluggable system for analysing and manipulating natural language, see [retext](https://github.com/wooorm/retext "Retext").
* For an object model, see [TextOM](https://github.com/wooorm/textom "TextOM").

Whether Old-English (“þā gewearþ þǣm hlāforde and þǣm hȳrigmannum wiþ ānum penninge”), Icelandic (“Hvað er að frétta”), French (“Où sont les toilettes?”), this parser does a pretty good job at tokenising it.

Note also that it seems to parse other scripts, such as Cyrillic (“Добро пожаловать!”), Georgian (“როგორა ხარ?”), Armenian (“Շատ հաճելի է”), pretty well!

## Installation

NPM:
```sh
$ npm install parse-latin
```

Component.js:
```sh
$ component install wooorm/parse-latin
```

## Usage

```js
var ParseLatin = require('parse-latin'),
    parseLatin = new ParseLatin(),
    root;

/* Simple sentence: */
parseLatin.parse('A simple sentence.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */

/* Unicode filled sentence: */
parseLatin.parse('The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */
```

The output of the [parser’s](#api) is the syntax tree formatted in [JSON](http://www.json.org) (read more about the syntax tree in the following section, [Syntax Tree](#syntaxtreeformat)).

It's also possible to just tokenize the given document, rather than transforming it into a tree, using [parse-latin#tokenize()](#parselatintokenizevaluestring))

## API

- [ParseLatin()](#parselatin)
- [ParseLatin#tokenize()](#parselatintokenizevaluestring)
- [ParseLatin#parse()](#parselatinparsevaluestring)

### ParseLatin()

`ParseLatin` contains the functions needed to tokenize natural Latin-script languages into a syntax tree.

#### ParseLatin#tokenize(value:string?)

Tokenize natural Latin-script language into letter and numbers (words), white space, and everything else (punctuation).

#### ParseLatin#parse(value:string?)

Tokenize natural Latin-script languages into a syntax tree.
```js
var ParseLatin = require('parse-latin');

new ParseLatin().parse('A simple sentence.'); /*
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
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: " "
 *                       ├─ 2: Object
 *                       |     ├─ type: "WordNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: "simple"
 *                       ├─ 3: Object
 *                       |     ├─ type: "WhiteSpaceNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: " "
 *                       ├─ 4: Object
 *                       |     ├─ type: "WordNode"
 *                       |     └─ children: Array[1]
 *                       |        └─ 0: Object
 *                       |              ├─ type: "TextNode"
 *                       |              └─ value: "sentence"
 *                       └─ 5: Object
 *                             ├─ type: "PunctuationNode"
 *                             └─ children: Array[1]
 *                                └─ 0: Object
 *                                      ├─ type: "TextNode"
 *                                      └─ value: "."
 */
```

## Syntax Tree Format

**Note!** The easiest way to see **how parse-latin tokenizes and parses**, is by using the [online parser demo](https://wooorm.github.io/parse-latin), which shows the syntax tree corresponding to the typed text.

---

Basically, parse-latin splits text into white space, word, and punctuation tokens. parse-latin starts out with a pretty easy definition, one that most other tokenizers use:

- A “word” is one or more letter or number characters;
- A “white space” is one or more white space characters;
- A “punctuation” is one or more of anything else;

Then, it manipulates and merges those tokens into a syntax tree, adding sentences and paragraphs where needed.

- Some punctuation marks are part of the word they occur in, e.g., `non-profit`, `she\'s`, `G.I.`, `11:00`, `N/A`, `&c`, `nineteenth- and...`;
- Some full-stops do not mark a sentence end, e.g., `1.`, `e.g.`, `id.`;
- Although full-stops, question marks, and exclamation marks (sometimes) end a sentence, that end might not occur directly after the mark, e.g., `.)`, `."`;

## Benchmark

Run the benchmark yourself:

```sh
$ npm run benchmark
```

On a MacBook Air, it parser about 3 large books, 70 big articles, or 7,803 paragraphs per second.

To put things into perspective, Shakespeare’s works contain 884,647 words. I have not tested it, but in theory **parse-latin** should parse these works in (slightly under) three seconds.

```
              parser.parse(source);
   6,124 op/s » A paragraph (5 sentences, 100 words)
     718 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
      60 op/s » An article (100 paragraphs, 500 sentences, 10,000 words)
       3 op/s » A (large) book (1,000 paragraphs, 5,000 sentences, 100,000 words)
```

## Related

  * [retext](https://github.com/wooorm/retext "Retext")
  * [textom](https://github.com/wooorm/textom "TextOM")
  * [parse-dutch](https://github.com/wooorm/parse-dutch "Parse Dutch")
  * [parse-english](https://github.com/wooorm/parse-english "Parse English")

## License

  MIT
