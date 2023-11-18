import Queue from "../01Queue";

/**
 * 游戏规则:
 * 设置一个数,所有成员报数依次加一,报到该数的人淘汰;然后继续报数,最后剩余一人为胜利者
 */

// 初始成员
const initNameList = ["seki", "石", "?", "ssj", "ss"];
// 数
const NUM = 12;

const queue = new Queue();

// 先将所有人添加入队列
for (let i = 0; i < initNameList.length; i++) {
  queue.enqueue(initNameList[i]);
}

while (queue.size() > 1) {
  // 开始数数字
  // 没有数到设定的数的成员从队首移动到队尾
  for (let i = 1; i < NUM; i++) {
    queue.enqueue(queue.dequeue());
  }

  // 此时队列队首元素即为被淘汰者
  queue.dequeue();
}

console.log(queue);
