import { Dictionary } from "../model/Dictionary"

/**
 * 邻接表表示法
 * 邻接表: 以 每个顶点--其相邻顶点列表 的关系存储的结构
 */
class Graph {
  /**
   * @param {boolean} [isDirected = false] 图是否有向
   */
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = []; // 存储图中所有的顶点名
    this.adjList = new Dictionary(); // 存储邻接表, 以顶点名为键,邻接顶点列表为值
  }

  /**
   * 向途中添加一个新的顶点
   * @param {*} v 顶点名
   */
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  /**
   * 建立两个顶点的连接
   * @param {*} v 顶点A
   * @param {*} w 顶点B
   */
  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }

    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }

    this.adjList.get(v).push(w);

    if (!this.isDirected) { // "双向"即为无向
      this.adjList.get(w).push(v);
    }

  }

  /**
   * 返回顶点列表
   */
  getVertices() {
    return this.vertices;
  }

  /**
   * 返回邻接表
   */
  getAdjList() {
    return this.adjList;
  }

  /**
   * 图的字符串表示
   */
  toString() {
    let s= '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} ->`;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]}`;
      }
      s += '\n';
    }
    return s;
  }
}

export default Graph;




// -----------------
// 创建一个新的图实例
// const graph = new Graph();

// // 添加顶点
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');

// // 添加边
// graph.addEdge('A', 'B');
// graph.addEdge('B', 'C');
// graph.addEdge('C', 'D');
// graph.addEdge('D', 'A');

// // 获取顶点列表
// const vertices = graph.getVertices();
// console.log('顶点列表:', vertices);

// // 获取邻接表
// const adjList = graph.getAdjList();
// console.log('邻接表:', adjList);

// console.log(graph.toString());