/**
 * 选择排序
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function selectionSort(arr) {
  let len = arr.length;
  let minValueIndex, temp;

  for (let i = 0; i < len - 1; i++) {
    minValueIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minValueIndex]) { // 寻找最小值的索引
        minValueIndex = j;
      }
    }
    temp = arr[i];
    arr[i] = arr[minValueIndex];
    arr[minValueIndex] = temp;
  }

  return arr;
}

// test
const originArr = [1, 4, 33, 2, 1, 66, -1, 88];
const originArr2 = [1, 4, 33, 2, 1];

console.log(selectionSort(originArr));