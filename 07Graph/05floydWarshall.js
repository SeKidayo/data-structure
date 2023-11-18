/**
 * Floyd-Warshall算法是一种计算图中所有最短路径的动态规划算法
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

const floydWarshall = (graph) => {
  const dist = [];
  const { length } = graph;

  for (let i = 0; i < length; i++) {
    dist[i] = [];
    for (let j = 0; j < length; j++) {
      if (i === j) { // 自己到自己的距离为0
        dist[i][j] = 0;
      } else if (graph[i][j] === 0) {
        dist[i][j] = INF;
      } else {
        dist[i][j] = graph[i][j]; // i 到 j 可能的最短距离就是 顶点间的权值
      }
    }
  }

  // 含义: 如果 i -> k -> j 的距离小于 i -> j 的距离,则视为找到i->j的较短路径并更新
  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}


// -------------test----------------
console.log(floydWarshall(graph));