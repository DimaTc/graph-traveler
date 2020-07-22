import { createSlice } from "@reduxjs/toolkit";
import { getSolverNames, getMazeGenerators } from "../AlgorithmManager";
import graphReducer from "./reducers/reducers";
export const graphSlice = createSlice({
  name: "graph",
  initialState: {
    graphData: {
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
    },
    generationData: {
      running: false,
      intervalId: undefined,
      queue: [],
      firstRun: true,
      extraParams: {},
    },
    solveSpeed: 200,
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
  updateSpeed,
  setIntervalId,
  setAlgorithm,
} = graphSlice.actions;

export default graphSlice.reducer;
