import Graph from "./01Graph";
/**
 * 使用颜色来表示图中顶点的状态
 */
const Colors = {
  WHITE: 0, // 表示顶点还没有被访问
  GRAY: 1, // 表示顶点被访问过,但未被完全探索(指查看过该顶点的每一条边)
  BLACK: 2, // 表示顶点被访问过且被完全探索过
}

/**
 * 初始化每个顶点的颜色
 * @param {any[]} vertices 顶点数组 
 * @returns {any[]} 颜色数组
 */
function initializeColor(vertices) {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
}

/**
 * 深度优先搜索 DFS depthFirstSearch
 * 描述: 从一个指定的顶点开始遍历图,沿着路径直到这条路径的最后一个顶点被访问了,再返回并探索下一条路径
 * 步骤如下(DFS并不需要一个起始顶点,在DFS中,若图中顶点未访问,则访问该顶点):
 * 1.当访问到某一顶点v时,标注v为被发现的(灰色)
 * 2.对于v的所有未访问(白色)邻点w,访问顶点w
 * 3.标注v为已被完全探索的(黑色)
 * @param {*} graph 图实例
 * @param {*} callback 回调
 */
export default function depthFirstSearch(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  // 初始化
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) { // 访问到某顶点
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}

function depthFirstSearchVisit(vertex, color, adjList, callback) {
  color[vertex] = Colors.GRAY; // 1)

  if (callback) {
    callback(vertex);
  }

  const neighbors = adjList.get(vertex);

  for (let i = 0; i < neighbors.length; i++) { // 2)
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
  color[vertex] = Colors.BLACK; // 3)
}

// ------------ test -----------------
// const graph = new Graph();

// // graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('A');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('G');
// graph.addVertex('H');
// graph.addVertex('I');

// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');
// graph.addEdge('C', 'G');
// graph.addEdge('C', 'D');
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');

// const printFn = (vertex) => console.log('Visited vertex:' + vertex);

// depthFirstSearch(graph, printFn);

/**
 * DFS改进版
 * 修改上述方法,返回如下信息:
 *    1)某顶点的发现时间d
 *    2)某顶点的完全探索时间f
 *    3)某顶点的前溯点p
 */
const DFS = (graph) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  // 初始化
  const color = initializeColor(vertices);

  const d = {};
  const f = {};
  const p = {};

  const time = { // 计数器
    count: 0,
  };

  for (let i = 0; i < vertices.length; i++) { // 初始化
    d[vertices[i]] = 0;
    f[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) { // 访问到某顶点
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  }
}

const DFSVisit = (vertex, color, d, f, p, time, adjList) => {
  color[vertex] = Colors.GRAY;
  d[vertex] = ++time.count;

  const neighbors = adjList.get(vertex);

  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = vertex; // 前溯点
      DFSVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[vertex] = Colors.BLACK;
  f[vertex] = ++time.count;
}


// 应用: 拓扑排序 / 有向无环图DAG
const graph = new Graph(true); // 有向图

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');

const result = DFS(graph);

console.log(result);
