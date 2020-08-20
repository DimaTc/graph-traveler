
export default function (graphState) {
  let { edges, queue, visited, parentDict, running, goal, extraParams, data } = graphState;
  if (queue.length === 0) return graphState; // if no path
  let currentNode = queue.shift();

  if (currentNode === goal) return { ...graphState, running: false };
  visited.push(currentNode);
  let nodeNeighbors = edges[currentNode];
  //update the distance
  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    let baseValue = extraParams[currentNode] | data[currentNode].value; //current node value
    let addedValue = data[node].value; //target node value
    if (extraParams[node] === undefined || extraParams[node] > baseValue + addedValue) {
      //if the value is the smallest make the current node his parent
      parentDict[node] = currentNode;
      extraParams[node] = baseValue + addedValue;
    }
  });

  //add to queue if not in the queue
  nodeNeighbors.forEach((node) => {
    if (visited.includes(node)) return;
    if (!queue.includes(node)) queue.push(node);
  });
  queue.sort((a, b) => extraParams[a] - extraParams[b]);
  return { edges, queue, visited, parentDict, running, goal };
}
