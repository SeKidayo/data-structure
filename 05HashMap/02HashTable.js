import hashFunc from "./01HashFunc";
import { isPrimeNumberBetter } from "./isPrimeNumber";
/**
 * 哈希表的实现(链地址法,但是用二维数组实现)
 * 实现方法:
 * 1)插入与修改(同一方法实现,存在对应key即为修改,否则为插入)
 * 2)查找
 * 3)删除
 * 4)哈希表是否为空
 * 5)获取哈希表中的个数
 * 
 * 6)哈希表的扩容(私有方法)
 * 7)获取质数方法(私有方法)
 */

class HashTable {
  constructor() {
    this.store = []; // 哈希表
    this.count = 0; // 记录哈希表中已填充有数据的项的个数(含链表中数据个数)
    this.limit = 7; // 当前哈希表长度
  }

  // 哈希函数
  hashFunc(string, size) {
    return hashFunc(string, size);
  }

  // 插入与修改
  put(key, value) {
    // 根据key获取对应的hashCode
    const hashCode = this.hashFunc(key, this.limit);

    // 根据hashCode获取对应索引处的值
    let bucket = this.store[hashCode];

    if (!bucket) {
      // this.store[hashCode] = []; // wrong!! 下面的操作都是针对于 bucket , 此处修改了 this.store[hashCode]指向,导致 bucket 与 this.store[hashCode] "失联"
      bucket = [];
      this.store[hashCode] = bucket;
    }

    // 判断是否修改数据
    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        // 修改
        tuple[1] = value;
        return true;
      }
    }

    // 不是修改,则为插入(末尾插入)
    bucket.push([key, value]);
    this.count++;

    // 判断是否需要扩容
    if (this.count > this.limit * 0.75) {
      const nextPrime = this._getPrime(this.limit * 2);
      this._resize(nextPrime);
    }

    return false;
  }

  // 查找
  get(key) {
    const hashCode = this.hashFunc(key, this.limit);
    const bucket = this.store[hashCode];
    if (!bucket) {
      return null;
    }

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }

    return null;
  }

  // 删除
  remove(key) {
    const hashCode = this.hashFunc(key, this.limit);
    const bucket = this.store[hashCode];
    if (!bucket) {
      return null;
    }

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i];
      if (tuple[0] === key) {
        this.count--;

        // 判断是否需要缩小容量
        if (this.limit > 7 && this.count < this.limit * 0.25) {
          const nextPrime = this._getPrime(Math.floor(this.limit / 2));
          this._resize(nextPrime);
        }

        return bucket.splice(i, 1);
      }
    }

    return null;
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  // 哈希表扩容
  // 内部方法, 在有新数据插入时 or 删除时 判断是否调用
  _resize(newLimit) {
    // 存储旧数据
    let oldStore = this.store;

    // 重置所有属性
    this.store = [];
    this.count = 0;
    this.limit = newLimit;

    // 遍历旧数据,重新生成hashCode插入到哈希表中
    for (let i = 0; i < oldStore.length; i++) {
      const bucket = oldStore[i];

      if (!bucket) {
        continue;
      }

      for (let j = 0; j < bucket.length; j++) {
        const tuple = bucket[j];
        this.put(tuple[0], tuple[1]);
      }
    }
  }

  // 根据传入的数开始查找下一个质数
  _getPrime(number) {
    while(!isPrimeNumberBetter(number)) {
      number++;
    }
    return number;
  }
}


// ------------------ test -----------------

const hT = new HashTable();

hT.put('seki', '石深俊');
hT.put('ssj', 134);
hT.put('ssj', '456');
hT.put('a1', '123');
hT.put('ssj2', '456');
hT.put('qa', '123');
hT.put('qssj', '456');
hT.put('2a', '123');
hT.put('dsasj', '456');
hT.put('aha', '123');
hT.put('jssj', '456');
hT.put('ka', '123');
hT.remove('ka');
hT.remove('jssj');
hT.remove('aha');
hT.remove('dsasj');
hT.remove('ssj');
hT.remove('kssj2a');
hT.remove('seki');
hT.remove('a1');

console.log(hT);