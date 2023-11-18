/**
 * 快速排序
 * @param {any[]} arr - 原始数组
 * @param {Number | undefined} left - 索引
 * @param {Number | undefined} right - 索引
 * @returns {any[]} 排序后数组
 */
function quickSort(arr, left, right) {
  let len = arr.length,
    partitionIndex,
    // 使用体验优化: 外界调用quickSort方法时就不需要声明 left 和 right 了
    L = typeof left !== "number" ? 0 : left,
    R = typeof right !== "number" ? len - 1 : right;

  if (L < R) {
    partitionIndex = partition(arr, L, R);
    // 递归分区,调整各自区域内的 元素排序, 直到单元素数组 停止
    quickSort(arr, L, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, R);
  }

  return arr;
}

/**
 * 分区判断
 * @param {any[]} arr
 * @param {Number} left - 索引
 * @param {Number} right - 索引
 * @returns {Number}
 * 
 */
function partition(arr, left, right) {
  let pivot = left, // 基准点
    index = pivot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) { // 比基准点小的排在数组前列,并用index计数
      swap(arr, i, index);
      index++;
    }
  }
  // 此时, pivot - index(不含)的所有元素均小于pivot ; 即 index - 1 是最后一个 符合要求的元素索引
  swap(arr, pivot, index - 1); // 设置标准点索引， 左边的都比它小，右边的都比它大
  return index - 1; // 返回该索引
}

/**
 * 交换
 */
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


const originArr = [1, 4, 33, 2, 1, 66, -1, 88, 0, 2];
console.log(quickSort(originArr));