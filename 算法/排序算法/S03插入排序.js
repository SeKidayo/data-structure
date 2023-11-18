/**
 * 插入排序
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function insertionSort(arr) {
  let len = arr.length;
  let preIndex, current;
  
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i]; // 待插入的值

    while(preIndex >= 0 && arr[preIndex] > current ) { // 找到arr[i]的应在位置(即前面的值都小于等于arr[i]的位置)
      arr[preIndex + 1] = arr[preIndex]; // 值后移, 索引i的值已被"抽出"，应在位置 <---> i 之间的值都应后移
      preIndex--;
    }
    // 插入行为
    arr[preIndex + 1] = current;
  }

  return arr;
}

/**
 * 折半插入排序
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function binaryInsertionSort(arr) {
  let len = arr.length;
  let current, left, right;

  for(let i = 0; i < len; i++) {
    current = arr[i];
    left = 0;
    right = i - 1;
    while(left <= right) {
      let middle = Math.floor((left + right)/2); // 向下取整
      if (current < arr[middle]) {
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    for (let j = i - 1; j >= left; j--) { // 此时 left === right
      arr[j + 1] = arr[j]; // 值后移, 索引i的值已被"抽出"，应在位置(left) <---> i 之间的值都应后移
    }

    arr[left] = current;
  }
}


// test
const originArr = [1, 4, 33, 2, 1, 66, -1, 88];
console.log(insertionSort(originArr));