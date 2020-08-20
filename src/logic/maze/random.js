const DENSENESS = 0.72; //will change the denseness of the maze

export default function (graphData, generationData) {
  let { start, goal, vertices } = graphData;
  let deltaWalls = [],
    deltaHoles = [];
  vertices.forEach((v) => {
    if (Math.random() > DENSENESS && v !== start && v !== goal) deltaWalls.push(v);
  });
  return { running: false, deltaHoles, deltaWalls, generationData };
}
