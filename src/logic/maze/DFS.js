export default function (graphData, generationData) {
  let { start, goal, vertices, walls } = graphData;
  let { firstRun, queue, running } = generationData;
  let deltaWalls = [];
  let deltaHoles = [];
  if (firstRun) {
    //first init on the first run
    vertices.forEach((v) => {
      if (v !== start && v !== goal) deltaWalls.push(v);
    });
    generationData.firstRun = false;
    generationData.queue = [start];
  } else {
    let neighbors, filteredNeighbors, currentHead;
    do {
      //loop until you get valid queued cell

      //at the end of the run, stop
      if (queue.length === 0) return { running: false, deltaWalls: [], deltaHoles: [], generationData };

      //get the last cell inserted
      currentHead = queue.shift();
      neighbors = graphData.data[currentHead].neighbors;
      filteredNeighbors = neighbors.filter((n) => walls.includes(n));
    } while (neighbors.length - filteredNeighbors.length > 1 && !neighbors.includes(goal));

    neighbors.sort((a, b) => 0.75 - Math.random()); //randomize the DFS but not too much
    queue = [...neighbors, ...queue.filter((n) => !neighbors.includes(n))];
    deltaHoles = [...deltaHoles, currentHead];
    generationData = { ...generationData, queue };
  }
  return { running, deltaHoles, deltaWalls, generationData };
}
