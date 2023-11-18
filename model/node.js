import { Color } from "../utils/color";

/**
 * 单向链表节点类
 */
export class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * 双向链表节点类
 */
export class DoublyLinkedListNode extends LinkedListNode {
  constructor(data, next = null, prev = null) {
    super(data, next);
    this.prev = prev;
  }
}

/**
 * 树节点类
 */
export class TreeNode {
  constructor(data) {
    this.data = data; // 节点值
    this.left = null; // 左侧子节点引用
    this.right = null; // 右侧子节点引用
  }
}

/**
 * 红黑树节点
 */
export class RedBlackTreeNode extends TreeNode {
  constructor(data) {
    super(data);
    this.color = Color.RED;
  }
}