import React, { Component } from "react";
import { getMazeGenerators, getSolverNames } from "../../logic/AlgorithmManager";
import { Button, Slider, Select, MenuItem, FormControl, InputLabel, Box } from "@material-ui/core";
import "./TopMenu.css";
import SolveControl from "./SolveControl";
import GeneratorControl from "./GeneratorControl";

//TODO: implement logic for selecting an algorithm
//TODO: pass callback to props here
//TODO: separate to sub components
class TopMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: programmatically take the first one of the list
      solver: "BFS",
      generator: "BFS",
    };
  }

  getOptionsFromArray = (arr) => {
    return arr.map((v) => (
      <MenuItem key={v.name} value={v.name}>
        {v.name}
      </MenuItem>
    ));
  };

  changeSpeed = (elem, v) => {
    this.props.speedCallback(v);
  };

  selectSolver = (elem) => {
    this.setState({ solver: elem.target.value });
  };

  selectGenerator = (elem) => {
    this.setState({ generator: elem.target.value });
  };

  render() {
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
  }
}

export default TopMenu;
