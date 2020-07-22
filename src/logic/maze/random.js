export default function (graphData, generationData) {
  let { start, goal, vertices } = graphData;
  let deltaWalls = [],
    deltaHoles = [];
  vertices.forEach((v) => {
    if (Math.random() > 0.7 && v !== start && v !== goal) deltaWalls.push(v);
  });
  return { running: false, deltaHoles, deltaWalls, generationData };
}
