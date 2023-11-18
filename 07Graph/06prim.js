/**
 * 最小生成树算法(MST): 找出某种边的子集,使得其构成的树包含图中所有顶点,且边的权值之和最小
 * 
 * Prim算法: 求解 加权无向连通图 的MST问题 的 贪心算法
 */
const INF = Number.MAX_SAFE_INTEGER;

const minKey = (key, visited) => {
  let minIndex = -1;
  let min = INF;
  for(let v = 0; v < key.length; v++) {
    if (visited[v] === false && key[v] <= min) {
      min = key[v];
      minIndex = v;
    }
  }
  return minIndex;
}

const prim = (graph) => {
  const parent = [];
  const key = [];
  const visited = [];
  const { length } = graph;

  // 初始化
  for (let i = 0; i < length; i++) {
    key[i] = INF;
    visited[i] = false
  }

  key[0] = 0;
  parent[0] = -1; // MST树父节点索引

  for (let i = 0; i < length - 1; i++) {
    const u = minKey(key, visited);
    visited[u] = true;

    for (let v = 0; v < length; v++) {
      if (graph[u][v] !== 0 && !visited[v] && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
    }
  }

  return parent;
}


// ---------------test-----------
// 邻接矩阵(无向)
const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0],
];

console.log(prim(graph));