export default function BFS(graphState) {
  let { edges, queue, visited, parentDict, running, goal } = graphState;
  if (queue.length === 0) return graphState; // if no path
  let tmpQueue = [...queue]; // every step will include all the level nodes
  queue = [];
  while (tmpQueue.length > 0) {
    let currentVertex = tmpQueue.pop(); //get the next one (fifo)
    let neighbors = edges[currentVertex];
    neighbors = neighbors.filter((v) => !visited.includes(v) && !queue.includes(v));
    console.log([...neighbors]);
    neighbors.forEach((v) => (parentDict[v] = currentVertex));
    queue = [...neighbors, ...queue];
    visited.push(currentVertex);
    if (neighbors.includes(goal)) {
      let goalNode = neighbors[neighbors.indexOf(goal)];
      parentDict[goalNode] = currentVertex;
      running = false;
    }
  }
  return { edges, queue, visited, parentDict, running, goal };
}
