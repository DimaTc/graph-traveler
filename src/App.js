import React, { Component } from "react";
import TopMenu from "./components/TopMenu/TopMenu";
import "./App.css";
import GraphArea from "./components/GraphArea/GraphArea";
import { generateGraph } from "./logic/GraphLogic";
import { useDispatch } from "react-redux";
import { updateGraph } from "./logic/redux/graphSlice";

const App = () => {
  const dispatch = useDispatch();
  return (
    <div className="App">
      <TopMenu />
      <GraphArea onLoad={(nx, ny) => dispatch(updateGraph(generateGraph(nx, ny)))} />
    </div>
  );
};

export default App;
