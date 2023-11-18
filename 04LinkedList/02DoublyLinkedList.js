import LinkedList from "./01LinkedList";
import { DoublyLinkedListNode } from "../model/node";
/**
 * 单向链表:
 * 1)只能从头遍历到尾 或者 从尾遍历到头 (一般从头到尾)
 * 2)实现的原理是上一个链表元素中有一个指向下一个元素的引用
 *
 * 缺点:
 * 1) 访问节点前的其他节点很困难
 */

/**
 * 双向链表:
 * 1) 既可以 从头遍历到尾, 又可以从尾遍历到头
 * 2) 即链表元素相连的过程是双向的
 * 双向链表的特点:
 * > 可以使用一个head和一个tail分别指向头部和尾部的元素
 * > 每个节点都由三部分组成: 保存的数据、前一个元素的指针(prev)、后一个节点的指针(next)
 * > 双向链表的第一个元素的prev是null
 * > 双向链表的最后一个元素的next是null
 * 
 * 双向链表需要重写的方法:
 * append、insert、remove、removeAt方法必须重写
 * 
 * 双向链表需要新增的方法:
 * 1) forwardString(): 返回反向(向前)遍历的节点字符串形式
 * 2) backwordString(): 返回正向遍历(向后)的节点字符串形式(与toString一致)
 * 
 * 可以优化的方法:
 * 1)appendd、insert、get、update、removeAt等含有 根据索引查找节点 逻辑的方法在双向链表结构中可以不从头到尾查找,可视情况从尾到头查找
 */

/**
 * 思考:
 * 双向链表的循环引用问题...
 * 在JSON序列化时会报错
 */
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = null; // 双向链表尾部指向
  }

  // 向链表尾部添加元素
  // 情况1: 链表为空
  // 情况2: 链表不空
  append(data) {
    const newNode = new DoublyLinkedListNode(data);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail; // 追加的元素prev指向当前链表尾部元素
      this.tail.next = newNode; // 当前链表尾部元素next指向新增元素
      this.tail = newNode; // 修改tail指向为链表新尾部元素
    }

    // 链表长度加一
    this.len++;
  }

  // 在链表指定索引处插入元素
  insert(index, data) {
    // 越界判断
    if (index < 0 || index > this.len) {
      return false;
    }

    const newNode = new DoublyLinkedListNode(data);
    // 情形有四:
    // 1) len=0; insert_index=0(>0时也不合法,仅此一种情况): this.head 与 this.tail 指向相同
    // 2) len≠0; insert_index=0; this.head变更, 关联节点变更
    // 3) len≠0; insert_index=len; this.tail变更, 关联节点变更
    // 4) len≠0; 0<insert_index<len; 关联节点变更

    if (this.isEmpty()) {
      // 1)
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (index === 0) {
        // 2)
        this.head.prev = newNode; // 原第一个节点的prev指向新节点
        newNode.next = this.head; // 新节点的next指向 原 第一个节点
        this.head = newNode; // 更新头部指针指向新节点
      } else if (index === this.len) {
        // 3)
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      } else {
        // 4)
        let _index = 0;
        let current = this.head;
        while (_index < index) {
          current = current.next;
          _index++;
        }

        newNode.next = current; // 插入节点next指向原index处节点
        newNode.prev = current.prev; // 插入节点prev指向原index-1处节点
        // 下两行顺序不可更改
        current.prev.next = newNode; // 原index-1处节点next指向新节点
        current.prev = newNode; // 原index处节点更新为 插入节点
      }
    }

    // 链表长度加一
    this.len++;
    return true;
  }

  removeAt(index) {
    // 越界判断
    if (index < 0 || index >= this.len) {
      return null;
    }
    let current = this.head;
    // 情形有四:
    // 1) len=1;remove_index=0(>0时也不合法,仅此一种情况); this.head 与 this.tail 变更, 指向null
    // 2) len>1;remove_index=0; this.head变更, 关联节点变更
    // 3) len>1;remove_index=len-1; this.tail变更, 关联节点变更
    // 4) len>1;0<remove_index<len-1; 关联节点变更
    if(this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      if (index === 0) {
        // 2)
        this.head.next.prev = null; // 第二个节点的prev指向null
        this.head = this.head.next; // this.head指向第二个节点
      } else if (index === this.len -1) {
        // 3)
        current = this.tail; // 指明被删除的节点为末尾节点
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
      } else {
        // 4)
        let _index = 0;
        while (_index < index) {
          current = current.next;
          _index++;
        }
        current.prev.next = current.next; // current的上一个节点的next指向current的下一个节点
        current.next.prev = current.prev; // current的下一个节点的prev指向current的上一个节点
      }
    }

    // 链表长度减一
    this.len--;
    return current.data; // 返回被删除的元素值
  }

  remove(data) {
    // 方式1: 调用其他API
    const _index = this.indexOf(data);
    this.removeAt(_index);
    return _index;
  }

  forwardString() {
    let current = this.tail;
    const dataArr = [];

    while (current) {
      dataArr.push(current.data);
      current = current.prev;
    }

    return dataArr.toString();
  }

  backwordString() {
    return this.toString();
  }
}

export default DoublyLinkedList;

// ---------------- test ---------------

const dll = new DoublyLinkedList();

dll.append("seki");
dll.append("desu");
// console.log(dll);
// console.log(dll.forwardString());
// console.log(dll.toString());
dll.insert(2, "ssj");
dll.remove('seki');
console.log(dll);
