import { defaultToString } from "../utils/defaultToString";


class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

/**
 * 字典类
 */
export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; // 字符串表示方法
    this.table = {}; // 字典
  }

  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)];

    return valuePair == null ? undefined : valuePair.value;

  }
}