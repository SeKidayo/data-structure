/**
 * 判断一个数是否为质数(直观判断)
 * @param {number} number
 * @returns {boolean}
 */
function isPrimeNumber(number) {

  if (number <= 1) {
    throw Error('大于1的数字才能判断是否为质数!');
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * 判断一个数是否为质数(高效)
 * 思路:
 * 一个数n若可以进行因式分解,则分解时得到的两个数 一个一定 小于等于根号n; 另一个一定 大于等于根号n
 * 所以,实际上只需要遍历2到根号n之间的数即可
 */
function isPrimeNumberBetter(number) {
  const temp = Math.floor(Math.sqrt(number));

  for (let i = 2; i <= temp; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export {
  isPrimeNumber,
  isPrimeNumberBetter,
}