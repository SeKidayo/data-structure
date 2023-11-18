/**
 * 希尔排序
 * @param {any[]} arr - 原始数组
 * @returns {any[]} 排序后数组
 */
function shellSort(arr) {
  let len = arr.length, temp, gap = 1;

  while ( gap < len / 3 ) { // 动态定义间隔序列("几个一组")(当然也可以提前设计好间隔序列)
    gap = gap * 3 + 1;
  }

  for (gap; gap > 0; gap = Math.floor(gap / 3)) { // 不断分组,直到最后一轮每个元素成为一组(即gap = 1) --->  意义: 这样做之后原数组会趋于有序,最后只需要微调即可有序
    for (let i = gap; i < len; i+=gap) {
      for (let j = i - gap; j >= 0 && arr[j] > arr[j + gap]; j-=gap) {
        temp = arr[j];
        arr[j] = arr[j + gap];
        arr[j + gap] = temp;
      }
    }
  }

  return arr;

}

// test
const originArr = [1, 4, 33, 2, 1, 66, -1, 88];
console.log(shellSort(originArr));