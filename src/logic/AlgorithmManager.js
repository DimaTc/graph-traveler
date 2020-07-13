let generators = [
  //TODO: Generate it from sub classes
  {
    name: "BFS",
    action: () => {
      console.log("BFS");
    },
  },
  {
    name: "DFS",
    action: () => {
      console.log("DFS");
    },
  },
  {
    name: "Dijkstra",
    action: () => {
      console.log("BFS");
    },
  },
];

function getMazeGenerators() {
  return generators;
}

function getMazeSolvers() {
  return generators;
}
export { getMazeGenerators, getMazeSolvers };
