import React, { Component } from "react";
import { getMazeGenerators, getMazeSolvers } from "../../logic/AlgorithmManager";
import { Button, Slider, Select, MenuItem, FormControl, InputLabel, Box } from "@material-ui/core";
import "./TopMenu.css";

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
    // console.log(v);
  };

  selectSolver = (elem) => {
    this.setState({ solver: elem.target.value });
    console.log(elem);
  };

  selectGenerator = (elem) => {
    this.setState({ generator: elem.target.value });
  };

  render() {
    return (
      <div className="top-menu">
        <div className="sub-section maze-generation">
          <FormControl variant="outlined">
            <InputLabel>Generators</InputLabel>
            <Select
              name="generators"
              id="generators"
              value={this.state.generator}
              label="Generators"
              onChange={this.selectGenerator}
            >
              {this.getOptionsFromArray(getMazeSolvers())}
            </Select>
          </FormControl>
          <Button variant="contained" color="secondary">
            Generate
          </Button>
        </div>

        <div className="sub-section maze-solvers">
          <FormControl variant="outlined">
            <InputLabel>Solvers</InputLabel>
            <Select name="solvers" id="solvers" value={this.state.solver} label="Solvers" onChange={this.selectSolver}>
              {this.getOptionsFromArray(getMazeSolvers())}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            Solve
          </Button>
          <Slider onChange={this.changeSpeed} defaultValue={1500} step={200} min={100} max={3000}aria-labelledby="discrete-slider" marks />
        </div>

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
