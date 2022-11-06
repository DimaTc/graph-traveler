
export default function(graphState) {
    let { edges, queue, visited, parentDict, running, goal, aStarMetaData } = graphState;
    if (queue.length === 0) return graphState; // if no path
    let currentNode = queue.shift();
    if (currentNode === goal) return { ...graphState, running: false };
    visited.push(currentNode);
    let nodeNeighbors = edges[currentNode];
    nodeNeighbors.forEach((node) => {
        if (visited.includes(node)) return;
        parentDict[node] = currentNode;
        if (!queue.includes(node)) queue.push(node);
    });
    queue.sort((a, b) => aStarMetaData[a] - aStarMetaData[b]);
    return { edges, queue, visited, parentDict, running, goal };

}
