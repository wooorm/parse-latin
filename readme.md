# parse-latin [![Build Status][travis-badge]][travis] [![Coverage Status][coverage-badge]][coverage]

A Latin script language parser for [retext][] producing [NLCST][] nodes.

Whether Old-English (“þā gewearþ þǣm hlāforde and þǣm hȳrigmannum wiþ ānum
penninge”), Icelandic (“Hvað er að frétta”), French (“Où sont les toilettes?”),
**parse-latin** does a good job at tokenizing it.

Note also that **parse-latin** does a decent job at tokenizing Latin-like
scripts, Cyrillic (“Добро пожаловать!”), Georgian (“როგორა ხარ?”), Armenian
(“Շատ հաճելի է”), and such.

## Installation

[npm][npm-install]:

```bash
npm install parse-latin
```

**parse-latin** is also available for [duo][], and as an AMD, CommonJS,
and globals module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var inspect = require('unist-util-inspect');
var ParseLatin = require('parse-latin');
var latin = new ParseLatin();
```

Invoking `parse`:

```javascript
var ast = latin.parse('A simple sentence.');
```

Yields:

```txt
RootNode[1] (1:1-1:19, 0-18)
└─ ParagraphNode[1] (1:1-1:19, 0-18)
   └─ SentenceNode[6] (1:1-1:19, 0-18)
      ├─ WordNode[1] (1:1-1:2, 0-1)
      │  └─ TextNode: "A" (1:1-1:2, 0-1)
      ├─ WhiteSpaceNode: " " (1:2-1:3, 1-2)
      ├─ WordNode[1] (1:3-1:9, 2-8)
      │  └─ TextNode: "simple" (1:3-1:9, 2-8)
      ├─ WhiteSpaceNode: " " (1:9-1:10, 8-9)
      ├─ WordNode[1] (1:10-1:18, 9-17)
      │  └─ TextNode: "sentence" (1:10-1:18, 9-17)
      └─ PunctuationNode: "." (1:18-1:19, 17-18)
```

## API

### `ParseLatin([options])`

Exposes the functionality needed to tokenize natural Latin-script languages
into a syntax tree.

**Parameters**:

*   `options` (`Object`, optional)

    *   `position` (`boolean`, default: `true`) - Whether to add positional
        information to nodes.

#### `ParseLatin#tokenize(value)`

Tokenize natural Latin-script language into letter and numbers (words), white
space, and everything else (punctuation).

**Parameters**:

*   `value` (`string`) — Value to parse.

**Returns**: [`Array.<NLCSTNode>`][nlcst] — Nodes.

#### `ParseLatin#parse(value)`

Tokenize natural Latin-script languages into an [NLCST](https://github.com/wooorm/nlcst)
[syntax tree](#syntax-tree-format).

**Parameters**:

*   `value` (`string`) — Value to parse.

**Returns**: [`NLCSTNode`][nlcst] — Root node.

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

*   [nlcst][]
*   [retext][]
*   [parse-dutch][]
*   [parse-english][]

## License

[MIT][license] © [Titus Wormer][home]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/parse-latin.svg

[travis]: https://travis-ci.org/wooorm/parse-latin

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/parse-latin.svg

[coverage]: https://codecov.io/github/wooorm/parse-latin

[npm-install]: https://docs.npmjs.com/cli/install

[duo]: http://duojs.org/#getting-started

[releases]: https://github.com/wooorm/parse-latin/releases

[license]: LICENSE

[home]: http://wooorm.com

[nlcst]: https://github.com/wooorm/nlcst

[retext]: https://github.com/wooorm/retext

[parse-dutch]: https://github.com/wooorm/parse-dutch

[parse-english]: https://github.com/wooorm/parse-english
