import { createSlice } from "@reduxjs/toolkit";
import { getSolverNames, getMazeGenerators } from "../AlgorithmManager";
import graphReducer from "./reducers/reducers";
export const graphSlice = createSlice({
  name: "graph",
  initialState: {
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
      //tmp
      current: undefined,
    },
    generationData: {
      weighted: false,
      running: false,
      queue: [],
      firstRun: true,
      extraParams: {},
    },
    solveSpeed: 60,
    start: 128,
    end: -1,

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
  },
  reducers: graphReducer,
});

export const {
  step,
  solve,
  generate,
  reset,
  pause,
  resume,
  clear,
  wallATile,
  generateMaze,
  placeStart,
  updateGraph,
  removeAWall,
  toggleSkip,
  setWeightCheck,
  updateSpeed,
  setIntervalId,
  setAlgorithm,
  toggleWall,
  selectTile,
} = graphSlice.actions;

export default graphSlice.reducer;
