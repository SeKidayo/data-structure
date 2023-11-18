/**
 * 归并排序(递归)
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function mergeSort(arr) {
  let len = arr.length;

  if (len < 2) {
    return arr;
  }

  let middle = Math.floor(len / 2),
    left = arr.slice(0, middle),
    right = arr.slice(middle);

  // 最终结构: merge(merge(merge(...), merge(...)), ......) ---> 最内层 merge方法参数为 length === 1 的数组
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 合并函数
 * @param {Number[]} left
 * @param {Number[]} right
 * @returns {Number[]}
 */
function merge(left, right) {
  const result = [];

  // 传入merge方法的 left 和 right数组 都是各自有序的!!!!!!!!!!!!!!!!!!
  // 如: [1, 4] 和 [2, 5]
  // 故 仅需不断从数组一端(index === 0处)比较即可, 直到某一数组全部确认大小完毕
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  // left与right数组长度不一定相等(arr.length为奇数时),故此处不一定只剩余1个元素(但最多只会剩余两个?); 所以用while

  while (left.length) {
    result.push(left.shift()); // 取出left数组剩余元素
  }

  while (right.length) {
    result.push(right.shift()); // 取出right数组剩余元素
  }

  return result;
}

// test
const originArr = [1, 4, 33, 2, 1, 66, -1, 88, 0, 2];
console.log(mergeSort(originArr));
