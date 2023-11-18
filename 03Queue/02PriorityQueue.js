import Queue from "./01Queue";

/**
 * 带优先级的队列元素项 类
 */
class PriorityQueueElement {
  constructor(element, priority) {
    this._element = element;
    this._priority = priority;
  }
}

/**
 * 优先队列
 * 在插入一个元素的时候会考虑该数据的优先级，并和其他数据优先级进行比较，比较完成后，可以得到这个元素在队列中正确的位置
 * 改写方法:
 * 1.enqueue()
 */
class PriorityQueue extends Queue {

  enqueue(element, priority) {
    // 创建带优先级的元素项
    const item = new PriorityQueueElement(element, priority);

    // 判断队列是否为空
    if (this.isEmpty()) {
      super.enqueue(item);
    } else {
      let isInsertFlag = false;
      for (let i = 0; i < this.size(); i++) {
        if (item._priority < this._queueItems[i]._priority) { // priority数值小为优先级高
          this._queueItems.splice(i, 0, item);
          isInsertFlag = true;
          break;
        }
      }

      // 遍历完后,若仍未插入,则插入到队尾
      if (!isInsertFlag) {
        super.enqueue(item);
      }

    }
  }

}

// ---------------- test ---------------

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue('12', 1);
priorityQueue.enqueue(123, 3);
priorityQueue.enqueue(false, 2);
console.log(priorityQueue.dequeue());
console.log(priorityQueue.isEmpty());
console.log(priorityQueue.size());
console.log(priorityQueue.toString());
console.log(priorityQueue.front());
console.log(priorityQueue);