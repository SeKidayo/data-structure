// 1.基于数组的栈(本文所采用)
// 2.基于JS对象的栈

//   --1. 下划线命名(只是程序员之间的约定)
//   --2. Symbol(ES6新增)

const _items = Symbol('stackItems');

class Stack {
  constructor() {
    this[_items] = [];
  }

  // 栈的相关操作

  // 1)入栈
  push(element) {
    this[_items].push(element);
  }

  // 2)出栈,并返回被移除的元素
  pop() {
    return this[_items].pop();
  }

  // 3)返回栈顶元素
  peek() {
    return this[_items][this[_items].length - 1];
  }

  // 4)检查栈是否为空
  isEmpty() {
    return this[_items].length === 0;
  }

  // 5)返回栈的元素个数
  size() {
    return this[_items].length;
  }

  // 6)清空栈
  clear() {
    this[_items] = [];
  }

  // 7)返回栈的字符表示
  toString() {
    return this[_items].toString();
  }
}

export default Stack;


// ---------------- test ---------------

// const stack = new Stack();

// stack.push(7);
// stack.push(11);
// stack.push(3131);
// stack.pop();
// console.log(stack.peek());
// console.log(stack.size());
// console.log(stack.toString());
// console.log(stack.isEmpty());

// stack.clear();

// console.log(stack);
