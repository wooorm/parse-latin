/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('nlcst').Sentence} Sentence
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').Root} Root
 */

import {visitChildren} from 'unist-util-visit-children'

// Patch the position on a parent node based on its first and last child.
export const patchPosition = visitChildren(
  /**
   * @type {import('unist-util-visit-children').Visitor<Paragraph|Sentence|Root>}
   */
  function (child, index, node) {
    const siblings = node.children

    if (
      index < 1 &&
      /* c8 ignore next */
      (!node.position || !node.position.start)
    ) {
      patch(node)
      // @ts-expect-error: we just set it.
      node.position.start = child.position.start
    }

    if (
      index === siblings.length - 1 &&
      (!node.position || !node.position.end)
    ) {
      patch(node)
      // @ts-expect-error: we just set it.
      node.position.end = child.position.end
    }
  }
)

/**
 * @param {Node} node
 */
function patch(node) {
  if (!node.position) {
    // @ts-expect-error: fine.
    node.position = {}
  }
}
