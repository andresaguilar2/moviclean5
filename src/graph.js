export class GraphSimple {
  constructor() {
    this.adjList = new Map();
  }

  addEdge(u, v, w) {
    if (!this.adjList.has(u)) this.adjList.set(u, []);
    if (!this.adjList.has(v)) this.adjList.set(v, []);
    this.adjList.get(u).push({ node: v, weight: w });
    this.adjList.get(v).push({ node: u, weight: w });
  }

  dijkstraSimple(source) {
    const dist = {};
    const prev = {};
    const visited = new Set();
    const nodes = [...this.adjList.keys()];

    nodes.forEach(n => {
      dist[n] = Infinity;
      prev[n] = null;
    });
    dist[source] = 0;

    while (visited.size < nodes.length) {
      const u = nodes.filter(n => !visited.has(n)).reduce((min, curr) =>
        dist[curr] < dist[min] ? curr : min, nodes[0]);

      visited.add(u);
      for (const neighbor of this.adjList.get(u)) {
        const alt = dist[u] + neighbor.weight;
        if (alt < dist[neighbor.node]) {
          dist[neighbor.node] = alt;
          prev[neighbor.node] = u;
        }
      }
    }

    return { dist, prev };
  }

  getShortestPath(prev, target) {
    const path = [];
    while (target !== null) {
      path.unshift(target);
      target = prev[target];
    }
    return path;
  }
}