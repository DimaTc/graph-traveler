import BFS from "./solvers/BFS";
import DFS from "./solvers/DFS";
let generators = [
  //TODO: Generate it from sub classes
  {
    name: "BFS",
    action: () => {
    },
  },
  {
    name: "DFS",
    action: () => {
    },
  },
  {
    name: "Dijkstra",
    action: () => {
    },
  },
];

const solvers = {
  BFS,
  DFS,
};

function getMazeGenerators() {
  return generators;
}

function getSolverNames() {
  let names = [];
  for (let n in solvers) names.push(n);
  return names;
}

export { getMazeGenerators, getSolverNames, solvers };
