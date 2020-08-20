import BFS from "./solvers/BFS";
import DFS from "./solvers/DFS";
import Random from "./maze/Random";
import DFSGenerate from "./maze/DFS";
import Prim from "./maze/Prim";
import Dijkstra from "./solvers/Dijkstra";
// import Recursive from "./maze/Recursive";

const generators = {
  "Prim's": Prim,
  Random,
  DFS: DFSGenerate,
  //TODO: Recursive
};

const solvers = {
  BFS,
  DFS,
  Dijkstra,
  //TODO: A*
};

function getMazeGenerators() {
  let names = [];
  for (let n in generators) names.push(n);
  return names;
}

function getSolverNames() {
  let names = [];
  for (let n in solvers) names.push(n);
  return names;
}

export { getMazeGenerators, getSolverNames, solvers, generators };
