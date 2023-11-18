/**
 * 基于数组的队列
 * 封装如下方法:
 * 1.enqueue(element): 向队尾添加元素
 * 2.dequeue(): 移除队首元素,并返回被移除的元素
 * 3.front(): 返回队首元素
 * 4.isEmpty(): 检查队列是否为空
 * 5.size(): 返回队列长度
 * 6.toString(): 返回队列的字符串表达
 */
class Queue {
  constructor() {
    this._queueItems = [];
  }

  enqueue(element) {
    this._queueItems.push(element);
  }

  dequeue() {
    return this._queueItems.shift();
  }

  front() {
    return this._queueItems[0];
  }

  isEmpty() {
    return this._queueItems.length === 0;
  }

  size() {
    return this._queueItems.length;
  }

  toString() {
    return this._queueItems.toString();
  }

}

export default Queue;

// ---------------- test ---------------

// const q = new Queue();

// q.enqueue('12');
// q.enqueue(123);
// q.enqueue(false);
// console.log(q.dequeue());
// console.log(q.isEmpty());
// console.log(q.size());
// console.log(q.toString());
// console.log(q.front());
// console.log(q);