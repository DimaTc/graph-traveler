export default function (graphData, generationData) {
  let { start, goal, vertices, walls } = graphData;
  let { firstRun, queue, running, extraParams } = generationData;
  let deltaWalls = [];
  let deltaHoles = [];
  if (firstRun) {
    //Fill all the maze with walls
    vertices.forEach((v) => {
      if (v !== start && v !== goal) {
        deltaWalls.push(v);
        graphData.data[v].value = Math.floor(Math.random() * 100); //better than just selecting random queue
      }
    });
    generationData.firstRun = false;
    generationData.queue = [start]; //start from the start
  } else {
    if (queue.length === 0) {
      if (extraParams.leftOuts === undefined) {
        let leftOuts = walls.filter((n) => graphData.data[n].neighbors.reduce((res, n2) => res && walls.includes(n2), true));
        leftOuts.sort((a, b) => graphData.data[a].value - graphData.data[b].value);
        extraParams = { leftOuts };
      }
      // add the unreachable walls with an extra hole
      let { leftOuts } = extraParams;
      if (leftOuts !== undefined && leftOuts.length !== 0) {
        let l = leftOuts.pop();
        queue.push(l);
        let tmp = graphData.data[l].neighbors.filter((n) => walls.includes(n) && !queue.includes(n)); //possible extra holes
        if (tmp.length > 0) queue.push(tmp[Math.floor(Math.random() * tmp.length)]);
        extraParams = { leftOuts };
      } else return { running: false, deltaWalls: [], deltaHoles: [], generationData };
    }
    let currentNode = queue.pop();
    let nodeNeighbors = graphData.data[currentNode].neighbors;
    //filter out
    nodeNeighbors = nodeNeighbors.filter((neighbor) => !queue.includes(neighbor) && walls.includes(neighbor));
    nodeNeighbors = nodeNeighbors.filter((neighbor) =>
      graphData.data[neighbor].neighbors.reduce((res, secondNeighbor) => {
        if (secondNeighbor === goal) return true;
        if (secondNeighbor === currentNode) return res; //skip the father node
        if (queue.includes(secondNeighbor) || !walls.includes(secondNeighbor)) return false; //if it has a neighbor who is in queue or a wall - don't add it
        let cornerNeighbors = graphData.data[secondNeighbor].cornerNeighbors;
        let filteredCorners = cornerNeighbors.filter((n) => !walls.includes(n));
        if (filteredCorners.length > 1) return false;
        return res;
      }, true)
    );
    //
    //add to queue
    generationData.queue = [...queue.filter((n) => n !== currentNode), ...nodeNeighbors];
    generationData.queue.sort((a, b) => graphData.data[a].value - graphData.data[b].value);

    //make a hole
    deltaHoles = [...deltaHoles, currentNode];
  }
  return { running, deltaHoles, deltaWalls, generationData, extraParams };
}
