import { Compare, defaultCompare } from "../utils/compare";
import { TreeNode } from "../model/node";

/**
 * 二叉搜索树 BinarySearchTree
 * @description 树中任一节点的左侧节点值小于该节点值, 右侧节点值大于该节点值
 */
class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 比较方法
    this.root = null; // 根节点root
  }

  /**
   * 向树中插入新的键(节点值)
   * @param {any} data - 待插入节点值
   */
  insert(data) {
    if (this.root === null) {
      // 根节点初始为null
      this.root = new TreeNode(data);
    } else {
      this.insertNode(this.root, data);
    }
  }

  /**
   * 向树中插入节点(根节点以外)
   * @param {any} node - 节点
   * @param {any} data - 待插入节点值
   */
  insertNode(node, data) {
    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      // data值小于当前节点值
      if (node.left == null) {
        node.left = new TreeNode(data); // 当前节点左子树为null,则赋值
      } else {
        // 若当前子节点不为空, 则递归其左子树
        this.insertNode(node.left, data);
      }
    } else {
      // data值 大于等于 当前节点值
      if (node.right == null) {
        node.right = new TreeNode(data);
      } else {
        this.insertNode(node.right, data);
      }
    }
  }

  /**
   * 以中序遍历方式遍历所有节点
   * @param {Function} callback - 回调函数(对每个节点进行的操作)
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  /**
   * 中序遍历辅助方法,便于递归
   * @param {any} node - 节点
   * @param {Function} callback - 回调
   */
  inOrderTraverseNode(node, callback) {
    // 递归的基线条件: 节点是否为空
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback); // 左

      callback(node.data); // 中

      this.inOrderTraverseNode(node.right, callback); // 右
    }
  }

  /**
   * 以先序遍历方式遍历所有节点
   * @param {Function} callback - 回调函数(对每个节点进行的操作)
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  /**
   * 先序遍历辅助方法,便于递归
   * @param {any} node - 节点
   * @param {Function} callback - 回调
   */
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.data); // 中
      this.preOrderTraverseNode(node.left, callback); // 左
      this.preOrderTraverseNode(node.right, callback); // 右
    }
  }

  /**
   * 以后序遍历方式遍历所有节点
   * @param {Function} callback - 回调函数(对每个节点进行的操作)
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  /**
   * 后序遍历辅助方法,便于递归
   * @param {any} node - 节点
   * @param {Function} callback - 回调
   */
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.data);
    }
  }

  /**
   * 返回树中最小的节点
   * @returns 节点
   */
  min() {
    return this.minNode(this.root);
  }

  /**
   * 辅助方法,便于递归
   * @param {any} node - 节点
   * @returns 节点
   */
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      // 保证current为 "最右"节点
      current = current.left;
    }
    return current;
  }

  /**
   * 返回树中最大的节点
   * @returns 节点
   */
  max() {
    return this.maxNode(this.root);
  }

  /**
   * 辅助方法,便于递归
   * @param {any} node - 节点
   * @returns 节点
   */
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      // 保证current为 "最右"节点
      current = current.right;
    }
    return current;
  }

  /**
   * 查找某个节点值,如果存在树中,则返回true
   * @param {any} data - 节点值
   * @returns {Boolean} is Exist
   */
  search(data) {
    return this.searchNode(this.root, data);
  }

  /**
   * search辅助方法
   * @param {any} node
   * @param {any} data
   * @returns {Boolean} is Exist
   */
  searchNode(node, data) {
    if (node == null) {
      // 待比较的节点如果是null or undefined ; 则直接返回false
      return false;
    }

    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      // 传入值小,去查左子树
      return this.searchNode(node.left, data);
    } else if (this.compareFn(data, node.data) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, data);
    } else {
      return true;
    }
  }

  /**
   * !移除一个节点(最复杂)
   * @param {any} data - 待移除节点的节点值
   * @returns {any} - 被移除的节点
   */
  remove(data) {
    return this.removeNode(this.root, data);
  }

  /**
   * 移除一个节点辅助方法
   * @param {any} node
   * @param {any} data - 待移除节点的节点值
   * @returns {any} - 删除后重新布局的树
   */
  removeNode(node, data) {
    if (node == null) {
      // 节点为空,则返回null
      return null;
    }

    // 不存在树中的值,则不做处理
    if (this.compareFn(data, node.data) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (this.compareFn(data, node.data) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // 找到了data对应的节点
      // 情景1: 移除一个叶节点
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }

      // 情景2: 移除仅有 左子树/右子树的节点
      if (node.left == null) { // 无左子树,则被删除节点右子树"位置提升"
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }

      // 情景3: 移除左右均有子树的节点
      // 被删除节点(记为A)及其子树(记为B)的右子树(记为C)最小节点(记为D)具有特征: 其值大于B树的所有节点,小于C树除其自身的其他所有节点
      // 故该节点可以作为删除操作后重新生成的新树根节点
      // 实际操作: 将C节点的值赋予A节点,然后删除C节点
      const aux = this.minNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }
}

export default BinarySearchTree;
