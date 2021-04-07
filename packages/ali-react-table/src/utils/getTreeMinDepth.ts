import { AbstractTreeNode } from '../interfaces'
import { deepClone } from './deepClone'
import isLeafNode from './isLeafNode'

/** 获取一棵树的最小高度/深度 (0-based) */
export default function getTreeMinDepth(nodes: AbstractTreeNode[]) {
  let minDepth = -1
  const stack = deepClone(nodes)
  while (stack.length) {
    const node = stack.shift()
    if (isLeafNode(node)) return minDepth
    else {
      minDepth += 1
      stack.push(...node.children)
    }
  }
  return minDepth
}
