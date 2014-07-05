# parse-latin [![Build Status](https://travis-ci.org/wooorm/parse-latin.svg?branch=master)](https://travis-ci.org/wooorm/parse-latin) [![Coverage Status](https://img.shields.io/coveralls/wooorm/parse-latin.svg)](https://coveralls.io/r/wooorm/parse-latin?branch=master)

[![browser support](https://ci.testling.com/wooorm/parse-latin.png) ](https://ci.testling.com/wooorm/parse-latin)

See [Browser Support](#browser-support) for more information (a.k.a. don’t worry about those grey icons above).

---

**parse-latin** is an Latin-script language parser in JavaScript. NodeJS, and the browser. Lots of tests (330+), including 630+ assertions. 100% coverage.

Note: This project is **not** an object model for natural languages, or an extensible system for analysing and manipulating natural language, its an algorithm that transforms plain-text natural language into an AST. If you need the above-mentioned functionalities, use the following projects.

* For a pluggable system for analysing and manipulating natural language, see [retext](https://github.com/wooorm/retext "Retext").
* For an object model, see [TextOM](https://github.com/wooorm/textom "TextOM").

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

````js
var Parser = require('parse-latin'),
    parser = new Parser(),
    root;

/* Simple sentence: */
parser.tokenizeRoot('A simple sentence.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */

/* Unicode filled sentence: */
parser.tokenizeRoot('The \xC5 symbol invented by A. J. A\u030Angstro\u0308m (1814, Lo\u0308gdo\u0308, \u2013 1874) denotes the length 10\u207B\xB9\u2070 m.');
/*
 * ˅ Object
 *    ˃ children: Array[1]
 *      type: "RootNode"
 *    ˃ __proto__: Object
 */
````

## API

### parseLatin.tokenizeRoot(source?)

```js
var Parser = require('parse-latin');

new Parser().tokenizeRoot('A simple sentence.');
/*
 * Object
 * ├─ type: "RootNode"
 * └─ children: Array[1]
 *    └─ 0: Object
 *          ├─ type: "ParagraphNode"
 *          └─ children: Array[1]
 *             └─ 0: Object
 *                   ├─ type: "SentenceNode"
 *                   └─ children: Array[6]
 *                      | ...
 */
```

Tokenize a given document into paragraphs, sentences, words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The latin document to parse.

### parseLatin.tokenizeParagraph(source?)

```js
var Parser = require('parse-latin');

new Parser().tokenizeParagraph('A simple sentence.');
/*
 * Object
 * ├─ type: "ParagraphNode"
 * └─ children: Array[1]
 *    └─ 0: Object
 *          ├─ type: "SentenceNode"
 *          └─ children: Array[6]
 *             | ...
 */
```

Tokenize a given paragraph into sentences, words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The latin paragraph to parse.

### parseLatin.tokenizeSentence(source?)

```js
var Parser = require('parse-latin');

new Parser().tokenizeSentence('A simple sentence.');
/*
 * Object
 * ├─ type: "SentenceNode"
 * └─ children: Array[6]
 *    ├─ 0: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "A"
 *    ├─ 1: Object
 *    |     ├─ type: "WhiteSpaceNode"
 *    |     └─ value: " "
 *    ├─ 2: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "simple"
 *    ├─ 3: Object
 *    |     ├─ type: "WhiteSpaceNode"
 *    |     └─ value: " "
 *    ├─ 4: Object
 *    |     ├─ type: "WordNode"
 *    |     └─ value: "sentence"
 *    └─ 5: Object
 *          ├─ type: "PunctuationNode"
 *          └─ value: "."
 */
```

Tokenize a given sentence into words, white space, and punctionation.

- `source` (`null`, `undefined`, or `String`): The latin sentence to parse.

## Browser Support
Pretty much every browser (available through browserstack) runs all parse-latin unit tests.

## Benchmark

Run the benchmark yourself:

```sh
$ npm run benchmark
```

On a MacBook Air, it parser about 3 large books, 70 big articles, or 7,803 paragraphs per second.

```
              parser.tokenizeSentence(source);
  50,117 op/s » A sentence (20 words)

              parser.tokenizeParagraph(source);
  36,559 op/s » A sentence (20 words)
   8,067 op/s » A paragraph (5 sentences, 100 words)

              parser.tokenizeRoot(source);
   7,803 op/s » A paragraph (5 sentences, 100 words)
     764 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
      70 op/s » An article (100 paragraphs, 500 sentences, 10,000 words)
       3 op/s » A (large) book (1,000 paragraphs, 5,000 sentences, 100,000 words)
```

## Related

  * [retext](https://github.com/wooorm/retext "Retext")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT
