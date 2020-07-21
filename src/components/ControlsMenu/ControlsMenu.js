import React, { Component } from "react";
import "./ControlsMenu.css";
import { Slider, Box, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed, pause, reset, clear, resume } from "../../logic/redux/graphSlice";
export default (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.graph.paused);
  return (
    <div className="controls-menu">
      <Button
        variant="contained"
        onClick={(e) => {
          if (paused) dispatch(resume());
          else dispatch(pause());
        }}
      >
        {paused ? "Resume" : "Pause"}
      </Button>
      <Button
        variant="contained"
        onClick={(e) => {
          dispatch(reset());
        }}
      >
        Reset
      </Button>
      <Button variant="contained">Clear</Button>
      <div>
        <Slider
          onChangeCommitted={(e, v) => dispatch(updateSpeed(1010 - v))} //TODO: remove hard coded values
          defaultValue={750}
          step={50}
          min={500}
          max={1000}
          aria-labelledby="discrete-slider"
          marks
        />
      </div>
    </div>
  );
};
