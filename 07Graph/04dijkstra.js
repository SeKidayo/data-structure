/**
 * Dijkstra算法是一种计算从单个源到所有其他源的最短路径的贪心算法
 */

// 邻接矩阵
const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0],
];

const INF = Number.MAX_SAFE_INTEGER;

/**
 * dijkstra算法
 * @param {number[][]} graph 邻接矩阵
 * @param {number} src 目标点 
 * @returns {number[]} 目标点到图中每个点的距离
 */
const dijkstra = (graph, src) => {
  const dist = [];
  const visited = [];
  const { length } = graph;

  // 初始化 目标点到图中每个点的距离 为"无限大"
  // 标记为 未访问过
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false;
  }
  // 自身到自身的距离为0
  dist[src] = 0;

  for (let j = 0; j < length - 1; j++) {
    const u = minDistance(dist, visited);
    visited[u] = true;

    for (let v = 0; v < length; v++) {
      if (
        !visited[v] && // 未访问的其他顶点
        graph[u][v] !== 0 && // u顶点到v顶点的距离不为0
        dist[u] !== INF && // 目标顶点到u顶点存在路径
        dist[u] + graph[u][v] < dist[v] // 目标顶点到u顶点的距离 + u顶点到v顶点的距离 小于 目标顶点到v顶点的距离
      ) {
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }

  return dist;
}

// 从尚未访问过的顶点中选出距离最短的顶点
const minDistance = (dist, visited) => {
  let min = INF;
  let minIndex = -1;
  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v];
      minIndex = v;
    }
  }
  return minIndex;
}

// test -----------------
const result = dijkstra(graph, 2);

console.log(result);