/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module parse-latin
 * @fileoverview Latin-script (natural language) parser.
 */

'use strict';

/* Dependencies. */
var createParser = require('./parser');
var expressions = require('./expressions');

/* Expose. */
module.exports = ParseLatin;

/* == PARSE LATIN ================================================== */

/**
 * Transform Latin-script natural language into
 * an NLCST-tree.
 *
 * @param {VFile?} file - Virtual file.
 * @param {Object?} options - Configuration.
 * @constructor {ParseLatin}
 */
function ParseLatin(file, options) {
  var position;

  if (!(this instanceof ParseLatin)) {
    return new ParseLatin(file, options);
  }

  if (file && file.message) {
    this.file = file;
  } else {
    options = file;
  }

  position = options && options.position;

  if (position !== null && position !== undefined) {
    this.position = Boolean(position);
  }
}

/* Quick access to the prototype. */
var proto = ParseLatin.prototype;

/* Default position. */
proto.position = true;

/* Create text nodes. */
proto.tokenizeSymbol = createTextFactory('Symbol');
proto.tokenizeWhiteSpace = createTextFactory('WhiteSpace');
proto.tokenizePunctuation = createTextFactory('Punctuation');
proto.tokenizeSource = createTextFactory('Source');
proto.tokenizeText = createTextFactory('Text');

/* Expose `run`. */
proto.run = run;

/*
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

proto.use = useFactory(function (context, key, plugins) {
  context[key] = context[key].concat(plugins);
});

/*
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context, before any other.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

proto.useFirst = useFactory(function (context, key, plugins) {
  context[key] = plugins.concat(context[key]);
});

/**
 * Easy access to the document parser. This additionally
 * supports retext-style invocation: where an instance is
 * created for each file, and the file is given on
 * instanciation.
 *
 * @see ParseLatin#tokenizeRoot
 * @param {string?} value - Value to parse.
 * @return {NLCSTWordNode} - Word node.
 */
proto.parse = function (value) {
  return this.tokenizeRoot(this.file ? this.file.toString() : value);
};

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @see tokenize
 * @param {string?} value - Value to tokenize.
 * @return {Array.<NLCSTNode>} - Nodes.
 */
proto.tokenize = function (value) {
  return tokenize(this, value);
};

/* == PARENT NODES =================================================
 *
 * All these nodes are `pluggable`: they come with a
 * `use` method which accepts a plugin
 * (`function(NLCSTNode)`). Every time one of these
 * methods are called, the plugin is invoked with the
 * node, allowing for easy modification.
 *
 * In fact, the internal transformation from `tokenize`
 * (a list of words, white space, punctuation, and
 * symbols) to `tokenizeRoot` (an NLCST tree), is also
 * implemented through this mechanism. */

/**
 * Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`.
 *
 * @see pluggable
 * @param {string?} value - Value to classify as a word.
 * @param {Function} eat - Eater.
 * @return {NLCSTWordNode} - Word node.
 */
pluggable(ParseLatin, 'tokenizeWord', function (value, eat) {
  var add = (eat || noopEat)('');
  var parent = {type: 'WordNode', children: []};

  this.tokenizeText(value, eat, parent);

  return add(parent);
});

/**
 * Create a `SentenceNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the sentence is
 * populated by `WordNode`s, `SymbolNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTSentenceNode}
 */
pluggable(ParseLatin, 'tokenizeSentence', createParser({
  type: 'SentenceNode',
  tokenizer: 'tokenize'
}));

/**
 * Create a `ParagraphNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the paragraph is
 * populated by `SentenceNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTParagraphNode}
 */
pluggable(ParseLatin, 'tokenizeParagraph', createParser({
  type: 'ParagraphNode',
  delimiter: expressions.terminalMarker,
  delimiterType: 'PunctuationNode',
  tokenizer: 'tokenizeSentence'
}));

/**
 * Create a `RootNode` with its children set to `Node`s,
 * their values set to the tokenized given `value`.
 *
 * Unless plugins add new nodes, the root is populated by
 * `ParagraphNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTRootNode}
 */
pluggable(ParseLatin, 'tokenizeRoot', createParser({
  type: 'RootNode',
  delimiter: expressions.newLine,
  delimiterType: 'WhiteSpaceNode',
  tokenizer: 'tokenizeParagraph'
}));

/* == PLUGINS ====================================================== */

proto.use('tokenizeSentence', [
  require('./plugin/merge-initial-word-symbol'),
  require('./plugin/merge-final-word-symbol'),
  require('./plugin/merge-inner-word-symbol'),
  require('./plugin/merge-inner-word-slash'),
  require('./plugin/merge-initialisms'),
  require('./plugin/merge-words'),
  require('./plugin/patch-position')
]);

proto.use('tokenizeParagraph', [
  require('./plugin/merge-non-word-sentences'),
  require('./plugin/merge-affix-symbol'),
  require('./plugin/merge-initial-lower-case-letter-sentences'),
  require('./plugin/merge-prefix-exceptions'),
  require('./plugin/merge-affix-exceptions'),
  require('./plugin/merge-remaining-full-stops'),
  require('./plugin/make-initial-white-space-siblings'),
  require('./plugin/make-final-white-space-siblings'),
  require('./plugin/break-implicit-sentences'),
  require('./plugin/remove-empty-nodes'),
  require('./plugin/patch-position')
]);

proto.use('tokenizeRoot', [
  require('./plugin/make-initial-white-space-siblings'),
  require('./plugin/make-final-white-space-siblings'),
  require('./plugin/remove-empty-nodes'),
  require('./plugin/patch-position')
]);

/* == TEXT NODES =================================================== */

/**
 * Factory to create a `Text`.
 *
 * @param {string} type - Name of text node.
 * @return {Function} - Text creator.
 */
function createTextFactory(type) {
  type += 'Node';

  return createText;

  /**
   * Construct a `Text` from a bound `type`
   *
   * @param {value} value - Value of the node.
   * @param {Function?} [eat] - Optional eat mechanism
   *   to use.
   * @param {NLCSTParentNode?} [parent] - Optional
   *   parent to insert into.
   * @return {NLCSTText} - Text node.
   */
  function createText(value, eat, parent) {
    if (value === null || value === undefined) {
      value = '';
    }

    return (eat || noopEat)(value)({
      type: type,
      value: String(value)
    }, parent);
  }
}

/**
 * Run transform plug-ins for `key` on `nodes`.
 *
 * @param {string} key - Unique name.
 * @param {Array.<Node>} nodes - List of nodes.
 * @return {Array.<Node>} - `nodes`.
 */
function run(key, nodes) {
  var wareKey = key + 'Plugins';
  var plugins = this[wareKey];
  var index = -1;

  if (plugins) {
    while (plugins[++index]) {
      plugins[index](nodes);
    }
  }

  return nodes;
}

/**
 * @param {Function} Constructor - Context.
 * @param {string} key - Unique name.
 * @param {function(*): undefined} callback - Wrapped.
 */
function pluggable(Constructor, key, callback) {
  /**
   * Set a pluggable version of `callback`
   * on `Constructor`.
   */
  Constructor.prototype[key] = function () {
    return this.run(key, callback.apply(this, arguments));
  };
}

/**
 * Factory to inject `plugins`. Takes `callback` for
 * the actual inserting.
 *
 * @param {function(Object, string, Array.<Function>)} callback - Wrapped.
 * @return {Function} - Use.
 */
function useFactory(callback) {
  return use;

  /**
   * Validate if `plugins` can be inserted. Invokes
   * the bound `callback` to do the actual inserting.
   *
   * @param {string} key - Method to inject on
   * @param {Array.<Function>|Function} plugins - One
   *   or more plugins.
   */
  function use(key, plugins) {
    var self = this;
    var wareKey;

    /* Throw if the method is not pluggable. */
    if (!(key in self)) {
      throw new Error(
        'Illegal Invocation: Unsupported `key` for ' +
        '`use(key, plugins)`. Make sure `key` is a ' +
        'supported function'
      );
    }

    /* Fail silently when no plugins are given. */
    if (!plugins) {
      return;
    }

    wareKey = key + 'Plugins';

    /* Make sure `plugins` is a list. */
    if (typeof plugins === 'function') {
      plugins = [plugins];
    } else {
      plugins = plugins.concat();
    }

    /* Make sure `wareKey` exists. */
    if (!self[wareKey]) {
      self[wareKey] = [];
    }

    /* Invoke callback with the ware key and plugins. */
    callback(self, wareKey, plugins);
  }
}

/* == CLASSIFY ===================================================== */

/* Match a word character. */
var EXPRESSION_WORD = expressions.word;

/* Match a surrogate character. */
var EXPRESSION_SURROGATES = expressions.surrogates;

/* Match a punctuation character. */
var EXPRESSION_PUNCTUATION = expressions.punctuation;

/* Match a white space character. */
var EXPRESSION_WHITE_SPACE = expressions.whiteSpace;

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @param {ParseLatin} parser - Context.
 * @param {string?} value - Value to tokenize.
 * @return {Array.<NLCSTNode>} - Nodes.
 */
function tokenize(parser, value) {
  var tokens;
  var offset;
  var line;
  var column;
  var index;
  var length;
  var character;
  var queue;
  var prev;
  var left;
  var right;
  var eater;

  if (value === null || value === undefined) {
    value = '';
  } else if (value instanceof String) {
    value = value.toString();
  }

  if (typeof value !== 'string') {
    /**
     * Return the given nodes if this is either an
     * empty array, or an array with a node as a first
     * child.
     */

    if ('length' in value && (!value[0] || value[0].type)) {
      return value;
    }

    throw new Error(
      'Illegal invocation: \'' + value + '\'' +
      ' is not a valid argument for \'ParseLatin\''
    );
  }

  tokens = [];

  if (!value) {
    return tokens;
  }

  index = offset = 0;
  line = 1;
  column = 1;

  /* Eat mechanism to use. */
  eater = parser.position ? eat : noPositionEat;

  length = value.length;
  prev = queue = '';

  while (index < length) {
    character = value.charAt(index);

    if (EXPRESSION_WHITE_SPACE.test(character)) {
      right = 'WhiteSpace';
    } else if (EXPRESSION_PUNCTUATION.test(character)) {
      right = 'Punctuation';
    } else if (EXPRESSION_WORD.test(character)) {
      right = 'Word';
    } else {
      right = 'Symbol';
    }

    tick();

    prev = character;
    character = '';
    left = right;
    right = null;

    index++;
  }

  tick();

  return tokens;

  /**
   * Check one character.
   */
  function tick() {
    if (
      left === right &&
      (
        left === 'Word' ||
        left === 'WhiteSpace' ||
        character === prev ||
        EXPRESSION_SURROGATES.test(character)
      )
    ) {
      queue += character;
    } else {
      /* Flush the previous queue. */
      if (queue) {
        parser['tokenize' + left](queue, eater);
      }

      queue = character;
    }
  }

  /**
   * Remove `subvalue` from `value`.
   * Expects `subvalue` to be at the start from
   * `value`, and applies no validation.
   *
   * @example
   *   eat('foo')({type: 'TextNode', value: 'foo'});
   *
   * @param {string} subvalue - Removed from `value`,
   *   and passed to `update`.
   * @return {Function} - Wrapper around `add`, which
   *   also adds `position` to node.
   */
  function eat(subvalue) {
    var pos = position();

    update(subvalue);

    return apply;

    /**
     * Add the given arguments, add `position` to
     * the returned node, and return the node.
     *
     * @return {Node} - Patched node.
     */
    function apply() {
      return pos(add.apply(null, arguments));
    }
  }

  /**
   * Remove `subvalue` from `value`. Does not patch
   * positional information.
   *
   * @return {Function} - Apply.
   */
  function noPositionEat() {
    return apply;

    /**
     * Add the given arguments and return the node.
     *
     * @return {Node} - Given node.
     */
    function apply() {
      return add.apply(null, arguments);
    }
  }

  /**
   * Add mechanism.
   *
   * @param {NLCSTNode} node - Node to add.
   * @param {NLCSTParentNode?} [parent] - Optional parent
   *   node to insert into.
   * @return {NLCSTNode} - `node`.
   */
  function add(node, parent) {
    if (parent) {
      parent.children.push(node);
    } else {
      tokens.push(node);
    }

    return node;
  }

  /**
   * Mark position and patch `node.position`.
   *
   * @example
   *   var update = position();
   *   updatePosition('foo');
   *   update({});
   *   // {
   *   //   position: {
   *   //     start: {line: 1, column: 1}
   *   //     end: {line: 1, column: 3}
   *   //   }
   *   // }
   *
   * @returns {function(Node): Node} - Patched node.
   */
  function position() {
    var before = now();

    /**
     * Add the position to a node.
     *
     * @example
     *   update({type: 'text', value: 'foo'});
     *
     * @param {Node} node - Node to attach position
     *   on.
     * @return {Node} - `node`.
     */
    function patch(node) {
      node.position = new Position(before);

      return node;
    }

    return patch;
  }

  /**
   * Update line and column based on `value`.
   *
   * @example
   *   update('foo');
   *
   * @param {string} subvalue - Eaten value..
   */
  function update(subvalue) {
    var subvalueLength = subvalue.length;
    var character = -1;
    var lastIndex = -1;

    offset += subvalueLength;

    while (++character < subvalueLength) {
      if (subvalue.charAt(character) === '\n') {
        lastIndex = character;
        line++;
      }
    }

    if (lastIndex === -1) {
      column += subvalueLength;
    } else {
      column = subvalueLength - lastIndex;
    }
  }

  /**
   * Store position information for a node.
   *
   * @example
   *   start = now();
   *   updatePosition('foo');
   *   location = new Position(start);
   *   // {start: {line: 1, column: 1}, end: {line: 1, column: 3}}
   *
   * @param {Object} start - Starting position.
   */
  function Position(start) {
    this.start = start;
    this.end = now();
  }

  /**
   * Get the current position.
   *
   * @example
   *   position = now(); // {line: 1, column: 1}
   *
   * @return {Object} - Current position.
   */
  function now() {
    return {
      line: line,
      column: column,
      offset: offset
    };
  }
}

/**
 * Add mechanism used when text-tokenisers are called
 * directly outside of the `tokenize` function.
 *
 * @param {NLCSTNode} node - Node to add.
 * @param {NLCSTParentNode?} [parent] - Optional parent
 *   node to insert into.
 * @return {NLCSTNode} - `node`.
 */
function noopAdd(node, parent) {
  if (parent) {
    parent.children.push(node);
  }

  return node;
}

/**
 * Eat and add mechanism without adding positional
 * information, used when text-tokenisers are called
 * directly outside of the `tokenize` function.
 *
 * @return {Function} - Add.
 */
function noopEat() {
  return noopAdd;
}
