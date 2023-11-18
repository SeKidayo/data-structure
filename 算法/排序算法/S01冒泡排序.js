/**
 * 冒泡排序(改变原数组)
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function bubbleSort(arr) {
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    // 每一轮找出最值
    for (let j = 0; j < len - 1 - i; j++) {
      // 每一趟进行两两比较
      // "大者上浮"
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

/**
 * 冒泡排序改进(改变原数组)
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function bubbleSortBetter(arr) {
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let dontSwap = true; // ------------> (1) 添加控制位
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        dontSwap = false; // -------> (2) 如果发生过交换，则置控制位为false
      }
    }
    if (dontSwap) {
      // ------> (3) 在每一轮走完后,如果未被置为false;则表明此时已经排序好了
      return arr;
    }
  }
  return arr;
}

// test
const originArr = [1, 4, 33, 2, 1];
const originArr2 = [1, 4, 33, 2, 1];

console.log(bubbleSort(originArr));
console.log(bubbleSortBetter(originArr2));

