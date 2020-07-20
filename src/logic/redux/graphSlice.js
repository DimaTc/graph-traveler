import { createSlice } from "@reduxjs/toolkit";
import { getSolverNames } from "../AlgorithmManager";
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
      running: false,
    },
    solveSpeed: 200,
    wall: [],
    start: 128,
    end: -1,
    timeoutId: undefined,
    algorithms: {
      solve: getSolverNames()[0],
      generate: undefined,
      solveArr: getSolverNames(),
    },
  },
  reducers: graphReducer,
});

export const {
  step,
  solve,
  reset,
  stop,
  wallATile,
  generateMaze,
  drawPath,
  placeStart,
  updateGraph,
  removeAWall,
  updateSpeed,
  setTimeoutId,
  setSolveAlgorithm,
} = graphSlice.actions;

export default graphSlice.reducer;
