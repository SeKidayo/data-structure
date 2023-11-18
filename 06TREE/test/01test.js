import BinarySearchTree from '../01BinarySearchTree';

const tree = new BinarySearchTree();

tree.insert(5);
tree.insert(111);
tree.insert(7);
tree.insert(71);
tree.insert(17);
tree.insert(57);
tree.insert(722);
tree.insert(72);
tree.insert(79);
tree.insert(-1);

const cb = (value) => {
  console.log(value);
}

tree.inOrderTraverse(cb); // 中序遍历实现 排序

console.log(tree.max());
console.log(tree.min());
console.log(tree.search(722)); // true
console.log(tree.remove(-1));
console.log(tree);