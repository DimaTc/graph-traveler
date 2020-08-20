export default function DFS(graphState) {
  let { edges, queue, visited, parentDict, running, goal } = graphState;
  if (queue.length === 0) return { ...graphState, running: false }; // if no path
  let currentVertex = queue.shift(); //get the next one (lifo)

  let neighbors = edges[currentVertex];
  neighbors = neighbors.filter((v) => !visited.includes(v));
  let updatedQueue = neighbors.filter((v) => queue.includes(v));
  if (updatedQueue.length > 0) queue = queue.filter((v) => !updatedQueue.includes(v)); //make room for the updated nodes
  neighbors.forEach((v) => (parentDict[v] = currentVertex));

  queue = [...neighbors, ...queue];
  visited.push(currentVertex);
  if (neighbors.includes(goal)) {
    let goalNode = neighbors[neighbors.indexOf(goal)];
    parentDict[goalNode] = currentVertex;
    running = false;
  }
  return { edges, queue, visited, parentDict, running, goal };
}
