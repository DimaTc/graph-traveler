import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import graphReducer from "./reducers/graphReducer";
import controlReducer from "./reducers/controlReducers";
import algoReducer from "./reducers/algorithmReducers";

export const graphSlice = createSlice({
  name: "graph",
  initialState: initialState,
  reducers: { ...graphReducer, ...controlReducer, ...algoReducer },
});

export const {
  step,
  solve,
  generate,
  reset,
  pause,
  resume,
  clear,
  generateMaze,
  updateGraph,
  toggleSkip,
  setWeightCheck,
  updateSpeed,
  setIntervalId,
  setAlgorithm,
  toggleWall,
  selectTile,
  placeNode,
} = graphSlice.actions;

export default graphSlice.reducer;
