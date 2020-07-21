import BFS from "./solvers/BFS";
import DFS from "./solvers/DFS";
import Random from "./maze/random";

const generators = { Random };

const solvers = {
  BFS,
  DFS,
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
