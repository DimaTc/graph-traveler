import { getSolverNames, getMazeGenerators } from "../AlgorithmManager";

export default {
  selectedTile: undefined,
  weightCheck: false,
  skip: false,
  graphData: {
    clean: true,
    vertices: [],
    edges: [],
    data: {},
    parentDict: {},
    visited: [],
    queue: [],
    drawPath: false,
    goal: -1,
    start: -1,
    running: false,
    walls: [],
    extraParams: {},
  },
  generationData: {
    weighted: false,
    running: false,
    queue: [],
    firstRun: true,
    extraParams: {},
  },
  solveSpeed: 60,
  paused: false,
  intervalId: {
    solve: undefined,
    generate: undefined,
  },
  algorithms: {
    solve: getSolverNames()[0],
    generate: getMazeGenerators()[0],
    solveArr: getSolverNames(),
  },
};
