import toString from 'nlcst-to-string'
import modifyChildren from 'unist-util-modify-children'
import {numerical} from '../expressions.js'

// Merge initialisms.
export var mergeInitialisms = modifyChildren(function (child, index, parent) {
  var siblings
  var previous
  var children
  var length
  var position
  var otherChild
  var isAllDigits
  var value

  if (index !== 0 && toString(child) === '.') {
    siblings = parent.children

    previous = siblings[index - 1]
    children = previous.children

    length = children ? children.length : 0

    if (previous.type === 'WordNode' && length !== 1 && length % 2 !== 0) {
      position = length

      isAllDigits = true

      while (children[--position]) {
        otherChild = children[position]

        value = toString(otherChild)

        if (position % 2 === 0) {
          // Initialisms consist of one character values.
          if (value.length > 1) {
            return
          }

          if (!numerical.test(value)) {
            isAllDigits = false
          }
        } else if (value !== '.') {
          if (position < length - 2) {
            break
          } else {
            return
          }
        }
      }

      if (!isAllDigits) {
        // Remove `child` from parent.
        siblings.splice(index, 1)

        // Add child to the previous children.
        children.push(child)

        // Update position.
        if (previous.position && child.position) {
          previous.position.end = child.position.end
        }

        // Next, iterate over the node *now* at the current position.
        return index
      }
    }
  }
})
