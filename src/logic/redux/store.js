import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./graphSlice";
export default configureStore({
  reducer: {
    graph: graphReducer,
  },
});
