import { LinkedListNode } from "../model/node";
/**
 * (单向)链表
 * 封装如下方法:
 * 1.append(data): 向链表尾部添加元素
 * 2.insert(index, data): 向链表的特定位置插入元素
 * 3.get(index): 获取对应索引的元素
 * 4.indexOf(data): 返回元素在链表中的索引,如果不在,返回 -1
 * 5.update(index, data): 修改某个位置的元素值为新data
 * 6.remove(data): 从链表中移除一个值为data的元素
 * 7.removeAt(index): 从链表中的特定索引移除一个元素
 * 8.isEmpty(): 链表是否为空(即不包含任何元素)
 * 9.size(): 返回链表包含的元素个数
 * 10.toString(): 返回链表的字符串表达
 */
class LinkedList {
  constructor() {
    this.head = null; // 链表头部指向
    this.len = 0; // 链表长度
  }

  append(data) {
    // 创建新元素
    const newNode = new LinkedListNode(data);

    // 判断链表是否为空
    if (this.isEmpty()) { // 空
      this.head = newNode;
    } else { // 不为空
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      // 找到最后一项
      currentNode.next = newNode;
    }

    // 链表长度加一
    this.len++;
  }

  insert(index, data) {
    // 对index进行越界判断(index === this.len 不视为越界,其含义是在链表尾部追加一个元素)
    if (index < 0 || index > this.len) {
      return false;
    }

    const newNode = new LinkedListNode(data);

    // 添加到链表头部
    if (index === 0) {
      const preNode = this.head;
      this.head = newNode;
      newNode.next = preNode;
    } else {
      // 添加到其他位置
      let _index = 0;
      let previous = null;
      let current = this.head;
      while(_index < index) {
        previous = current;
        current = current.next;
        _index++;
      }

      previous.next = newNode;
      newNode.next = current;
    }

    // 链表长度加一
    this.len++;
    return true;
  }

  get(index) {
    // 对index进行越界判断(获取索引时, 最大值为len - 1)
    if (index < 0 || index >= this.len) {
      return null;
    }

    // 获取对应数据
    let _index = 0;
    let current = this.head;
    while(_index < index) {
      current = current.next;
      _index++;
    }
    return current.data;
  }

  indexOf(data) {
    let current = this.head;
    let index = 0;

    while(current) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++; 
    }

    return -1;
  }

  update(index, data) {
     // 越界判断
    if (index < 0 || index >= this.len) {
      return false;
    }

    // 找到index位置的节点
    let _index = 0;
    let current = this.head;
    while( _index < index) {
      current = current.next;
      _index++;
    }
    current.data = data;
    return true;
  }

  removeAt(index) {
    // 越界判断
    if (index < 0 || index >= this.len) {
      return null;
    }

    let current = this.head;

    // 删除链表头部元素
    if (index === 0) {
      this.head = this.head.next;
    } else {
      let _index = 0;
      let previous = null;
      while(_index < index) {
        previous = current;
        current = current.next;
        _index++;
      }
      previous.next = current.next;
    }

    // 链表长度减一
    this.len--;
    return current.data; // 返回被删除的元素值
  }

  remove(data) {
    // 方式1: 调用其他API
    // const _index = this.indexOf(data);
    // this.removeAt(_index);
    // return _index;

    // 方式2: 待确认
    let previous = null;
    let current = this.head;
    let _index = 0;
    let flag = false;
    while(current) {
      if (current.data === data) {
        flag = true;
        break;
      }
      previous = current;
      current = current.next;
      _index++;
    }
    if (flag) {
      if (_index === 0) {
        this.head = this.head.next;
      } else {
        previous.next = current.next;
      }
      // 链表长度减一
      this.len--;
      return _index;
    }
    return -1;
  }

  isEmpty() {
    return this.len === 0;
  }

  size() {
    return this.len;
  }

  toString() {
    const dataArr = [];

    let currentNode = this.head;

    while(currentNode) {
      dataArr.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return dataArr.toString();

  }
}

export default LinkedList;

// ---------------- test ---------------

// const ll = new LinkedList();
// ll.append("seki");
// ll.append("ssj");
// ll.insert(1, 'desu');
// ll.update(1, 'new_desu');
// const removedData = ll.remove('new_desu');
// console.log(removedData);
// console.log(ll);