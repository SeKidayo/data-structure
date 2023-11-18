import BinarySearchTree from "./01BinarySearchTree";
import { Compare, defaultCompare } from "../utils/compare";
import { BalanceFactor } from '../utils/balanceFactor';


/**
 * 未完待续!!!!!!!!!!!!!!!!!!!
 */


/**
 * AVL树
 * @description 自平衡二叉搜索树的一种
 */
class AVLTree extends BinarySearchTree {

  constructor(compareFn = defaultCompare) {
    super(compareFn); // 继承BST
    this.compareFn = compareFn;
    this.root = null;
  }

  /**
   * 计算一个节点的高度
   * @param {any} node - 节点
   * @returns {number} 节点高度,节点不存在则返回-1
   */
  getNodeHeight(node) {
    if (node == null) {
      return -1; // 节点不存在返回-1; 叶子节点返回 0,父节点依次增加
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  /**
   * 计算一个节点的平衡因子并返回
   * @param {any} node - 节点
   * @returns {number} 平衡因子
   */
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right); // 左子树高度 - 右子树高度

    // 平衡因子只会出现: -2 -1 0 1 2 五种情况, 在插入节点的时候即会同时进行平衡操作, 插入前的树一定是平衡的,待插入的节点只会造成 -2 或 2 的平衡因子出现, 在插入完成前会"修正" 插入行为, 使得新树为平衡树
    switch(heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCE_RIGHT; // 右子树过高, 不平衡
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_RIGHT; // 右子树稍高, 平衡
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCE_LEFT; // 左子树稍高, 平衡
      case 2:
        return BalanceFactor.UNBALANCE_LEFT; // 左子树过高, 不平衡
      default:
        return BalanceFactor.BALANCED; // 左右子树高度相同, 平衡
    }
  }


  /**
   * 左-左(LL)平衡操作
   * 情景：节点的左侧子节点的高度大于右侧子节点的高度(差>=2); 并且左侧子节点是平衡或左侧稍高
   * 图示见于书P188
   * @param {any} node - 节点
   * @returns {any} newNode
   */
  rotationLL(node) {
    const tmp = node.left; // 以node.left为根节点重新构建树
    node.left = tmp.right; // 将tmp(新树)的右子树 作为 原树的左子树
    tmp.right = node; // 将原树(左子树替换过) 作为 tmp 的右子树
    return tmp;
  }

  /**
   * 右-右(RR)
   * 情景：节点的右侧子节点的高度大于左侧子节点的高度(差>=2); 并且右侧子节点是平衡或右侧稍高
   * @param {any} node - 节点
   * @returns {any} newNode
   */
  rotationRR(node) {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp
  }
}

export default AVLTree;