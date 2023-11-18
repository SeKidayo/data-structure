import Queue from "../03Queue/01Queue";
import Stack from "../02STACK/01Stack";
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
 * 广度优先搜索 BFS breadthFirstSearch
 * 描述: 从指定的第一个顶点开始遍历图,先访问其所有的相邻顶点,再向"深处"继续访问
 * 步骤如下(从顶点v开始的BFS):
 * 1.创建一个队列Q
 * 2.将起始顶点v入队列Q中
 * 3.如果Q非空,则进行如下步骤:
 *  3.1 推出队首元素u
 *  3.2 标注u为被发现的(灰色)
 *  3.3 将u所有未被访问过的邻点(白色)入队列、并标记为被发现的(灰色)
 *  3.4 标注u为已被探索的(黑色)
 * @param {*} graph 图实例
 * @param {*} startVertex 起始顶点
 * @param {*} callback 回调
 */
export default function breadthFirstSearch(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  // 初始化
  const color = initializeColor(vertices);

  // 待访问顶点列表
  const queue = new Queue();

  queue.enqueue(startVertex);
  color[startVertex] = Colors.GRAY;


  while(!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u); // 相邻顶点

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        queue.enqueue(w);
        color[w] = Colors.GRAY;
      }
    }

    color[u] = Colors.BLACK;

    if (callback) {
      callback(u);
    }
  }
}

// ------------ test -----------------
// const graph = new Graph();

// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
// graph.addVertex('E');
// graph.addVertex('F');
// graph.addVertex('G');

// graph.addEdge('A', 'B');
// graph.addEdge('A', 'C');
// graph.addEdge('B', 'C');
// graph.addEdge('C', 'E');
// graph.addEdge('E', 'B');
// graph.addEdge('E', 'F');
// graph.addEdge('F', 'G');
// graph.addEdge('B', 'D');

// const printFn = (vertex) => console.log('Visited vertex:' + vertex);

// breadthFirstSearch(graph, 'C', printFn);



/**
 * 使用BFS寻找最短路径(无权图)
 * 修改上述方法,返回以下信息:
 *    1)任意顶点距离起始顶点的距离 distances
 *    2)前溯点 predecessors
 */
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();

  // 初始化
  const color = initializeColor(vertices);

  // 待访问顶点列表
  const queue = new Queue();

  const distances = {};
  const predecessors = {};

  queue.enqueue(startVertex);
  color[startVertex] = Colors.GRAY;

  for (let i = 0; i < vertices.length; i++) { // 初始化
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  while(!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u); // 相邻顶点

    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        queue.enqueue(w);
        color[w] = Colors.GRAY;

        distances[w] = distances[u] + 1;
        predecessors[w] = u;

      }
    }

    color[u] = Colors.BLACK;
  }

  return {
    distances,
    predecessors,
  }
}

// ------------ test -----------------
const graph = new Graph();

graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');
graph.addVertex('G');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('C', 'E');
graph.addEdge('E', 'B');
graph.addEdge('E', 'F');
graph.addEdge('F', 'G');
graph.addEdge('B', 'D');

const startVertex = 'A';

const shortestPath = BFS(graph, startVertex);

// 打印路径
for (let i = 0; i < graph.vertices.length; i++) {
  const targetVertex = graph.vertices[i];
  const path = new Stack();

  for (let v = targetVertex; v !== startVertex; v = shortestPath.predecessors[v]) {
    path.push(v);
  }

  path.push(startVertex);

  let s = path.pop();

  while(!path.isEmpty()) {
    s += '-' + path.pop();
  }
  console.log(s);
}
