/**
 * 哈希函数的实现
 * 主要逻辑:
 * 1) 设计映射关系,即将字符串转换为一个数字hashCode
 * 2) 转换后的hashCode通常较大, 需要压缩到哈希表长度之内
 */

/**
 * 哈希函数
 * @param {string} string 字符串
 * @param {number} size 哈希表长度
 * @returns {number} hashCode
 */
function hashFunc(string, size) {
  let hashCode = 0;

  for (let i = 0; i < string.length; i++) {
    // 获取某一位的unicode编码
    // 37 -- 各语言中使用较多的质数
    // 秦九韶算法
    hashCode = 37 * hashCode + string.charCodeAt(i);

    // 取余
    const index = hashCode % size;

    return index;
  }
}

export default hashFunc;
