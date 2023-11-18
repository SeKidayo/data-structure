/** 关系语义化 */
export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
};

/**
 * 默认比较函数
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
export function defaultCompare(a, b) {
  if (a === b) {
    return 0;
  }

  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

