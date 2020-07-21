export default function (graphData) {
  let { start, goal, vertices } = graphData;
  let walls = [];
  vertices.forEach((v) => {
    if (Math.random() > 0.7 && v !== start && v !== goal) walls.push(v);
  });
  return walls;
}
