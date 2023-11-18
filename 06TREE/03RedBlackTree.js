import BinarySearchTree from "./01BinarySearchTree";
import { Compare, defaultCompare } from "../utils/compare";

/**
 * 红黑树(自平衡二叉搜索树)
 */
class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn); // 继承BST
    this.compareFn = compareFn;
    this.root = null;
  }
}