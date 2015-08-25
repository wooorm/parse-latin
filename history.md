<!--mdast setext-->

<!--lint disable no-multiple-toplevel-headings-->

<!--lint disable maximum-line-length-->

2.0.0 / 2015-08-25
==================

*   Add `position: true` by default ([a0c2c04](https://github.com/wooorm/parse-latin/commit/a0c2c04))
*   Add VFile support ([ac01530](https://github.com/wooorm/parse-latin/commit/ac01530))

1.0.0 / 2015-08-23
==================

*   Refactor to externalise `plugin` wrapping ([a97226c](https://github.com/wooorm/parse-latin/commit/a97226c))
*   Update dependencies, dev-dependencies ([b875fe5](https://github.com/wooorm/parse-latin/commit/b875fe5))

0.5.2 / 2015-08-16
==================

*   Fix bug when breaking implicit sentences ([439cb71](https://github.com/wooorm/parse-latin/commit/439cb71))

0.5.1 / 2015-07-25
==================

*   Refactor to use `files` in package.json instead of `.npmignore` ([eab264f](https://github.com/wooorm/parse-latin/commit/eab264f))

0.5.0 / 2015-07-25
==================

*   Add positional information to nodes ([66461f1](https://github.com/wooorm/parse-latin/commit/66461f1))
*   Fix broken link in `Readme.md` ([a9d55cf](https://github.com/wooorm/parse-latin/commit/a9d55cf))

0.4.3 / 2015-01-22
==================

*   Add `parse-latin.js`, `parse-latin.min.js` ([c6ab27e](https://github.com/wooorm/parse-latin/commit/c6ab27e))
*   Update copyright notice in `LICENSE` to include 2015 ([0609290](https://github.com/wooorm/parse-latin/commit/0609290))

0.4.2 / 2014-12-05
==================

*   Add link to personal website to copyright in `Readme.md` ([3e26c39](https://github.com/wooorm/parse-latin/commit/3e26c39))
*   Fix incorrect executive rights on `test.js` ([bff933f](https://github.com/wooorm/parse-latin/commit/bff933f))

0.4.1 / 2014-12-03
==================

*   Fix multiple implicit sentences ([7c58c0b](https://github.com/wooorm/parse-latin/commit/7c58c0b))

0.4.0 / 2014-11-20
==================

0.4.0-rc.2 / 2014-11-19
=======================

*   Add `useFirst` method to parse-latin ([949f37d](https://github.com/wooorm/parse-latin/commit/949f37d))

0.4.0-rc.1 / 2014-11-15
=======================

*   Add `plugin` and `modifier` factories to exports ([8669c90](https://github.com/wooorm/parse-latin/commit/8669c90))
*   Refactor module ([8fc7b93](https://github.com/wooorm/parse-latin/commit/8fc7b93))
*   Remove `wordSymbolInitial` and `wordSymbolFinal` from expressions ([9971cd0](https://github.com/wooorm/parse-latin/commit/9971cd0))
*   Refactor module ([f7b0bf6](https://github.com/wooorm/parse-latin/commit/f7b0bf6))

0.3.0 / 2014-10-28
==================

0.3.0-rc.1 / 2014-10-21
=======================

*   Add functionality for symbol-node ([56bf018](https://github.com/wooorm/parse-latin/commit/56bf018))

0.2.0 / 2014-10-14
==================

0.2.0-rc.3 / 2014-10-09
=======================

*   Remove apostrophe from initial word-punctuation ([e0a2ea4](https://github.com/wooorm/parse-latin/commit/e0a2ea4))
*   Remove source node creation from parser ([5f8d0cd](https://github.com/wooorm/parse-latin/commit/5f8d0cd))

0.2.0-rc.2 / 2014-09-29
=======================

*   Fix missing comma introduced in [3630b92](https://github.com/wooorm/parse-latin/commit/3630b92) ([f12e7e8](https://github.com/wooorm/parse-latin/commit/f12e7e8))

0.2.0-rc.1 / 2014-09-28
=======================

*   Move `parse-latin` to lib ([e30106b](https://github.com/wooorm/parse-latin/commit/e30106b))
*   Add expressions to seperate file ([102b37c](https://github.com/wooorm/parse-latin/commit/102b37c))
*   Refactor API ([8963d3c](https://github.com/wooorm/parse-latin/commit/8963d3c))
*   Fix premature exit of a modifier on first child ([c57dfad](https://github.com/wooorm/parse-latin/commit/c57dfad))
*   Add functionality for initial word elision with a smart apostrophe ([77b7cfb](https://github.com/wooorm/parse-latin/commit/77b7cfb))
*   Add spec to allow initial word elision with smart apostrophe ([2d04e0d](https://github.com/wooorm/parse-latin/commit/2d04e0d))

0.1.3 / 2014-09-05
==================

*   Fix redirect to next item to iterate over in breakImplicitSentences ([3fec33e](https://github.com/wooorm/parse-latin/commit/3fec33e))
*   Add functionality for implicit sentences ([3b6e6ed](https://github.com/wooorm/parse-latin/commit/3b6e6ed))
*   Add functionality for semicolons following (non) terminal markers ([ce47537](https://github.com/wooorm/parse-latin/commit/ce47537))
*   Add functionality for denying a comma as first token in sentence (closes [GH-15](https://github.com/wooorm/parse-latin/issues/15)) ([c952354](https://github.com/wooorm/parse-latin/commit/c952354))
*   Add functionality for unicode ellipses as sentence terminal marker ([10713d2](https://github.com/wooorm/parse-latin/commit/10713d2))
*   Fix detection of non-terminal markers in sentences without terminal marker ([e7b987f](https://github.com/wooorm/parse-latin/commit/e7b987f))
*   Add functionality to merge non-terminal full stops with adjacent words ([b794084](https://github.com/wooorm/parse-latin/commit/b794084))
*   Add functionality for tokenizing inner-sentence nodes ([d50586b](https://github.com/wooorm/parse-latin/commit/d50586b))
*   Add functionality for better inner word punctuation and sentence parsing ([3377a42](https://github.com/wooorm/parse-latin/commit/3377a42))

0.1.2 / 2014-09-04
==================

*   Add functionality for pre- and suffix punctuation in words ([445df03](https://github.com/wooorm/parse-latin/commit/445df03))

0.1.1 / 2014-07-25
==================

*   Add bower.json ([7804978](https://github.com/wooorm/parse-latin/commit/7804978))

0.1.0 / 2014-07-24
==================
