import React, { Component } from "react";
import { getMazeGenerators, getSolverNames } from "../../logic/AlgorithmManager";
import { Button, Slider, Select, MenuItem, FormControl, InputLabel, Box } from "@material-ui/core";
import "./TopMenu.css";
import SolveControl from "./SolveControl";
import GeneratorControl from "./GeneratorControl";

export default (props) => {
  return (
    <div className="top-menu">
      <GeneratorControl />

      <SolveControl />

      <div className="sub-section">
        <div className="legend">
          <p>•Items description</p>
        </div>
      </div>
    </div>
  );
};
