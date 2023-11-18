/**
 * key转为字符串方法
 * @param {any} item
 * @returns {string} 字符串表示
 */
export function defaultToString (item) {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}