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
    },
    solveSpeed: 200,
    wall: [],
    start: 128,
    end: -1,
    paused: false,
    timeoutId: undefined,
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
  setTimeoutId,
  setAlgorithm,
} = graphSlice.actions;

export default graphSlice.reducer;
