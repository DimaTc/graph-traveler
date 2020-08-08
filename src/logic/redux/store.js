import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import graphReducer from "./graphSlice";
export default configureStore({
  reducer: {
    graph: graphReducer,
    middleware:getDefaultMiddleware({immutableCheck:false,serializableCheck:false})
  },
});
