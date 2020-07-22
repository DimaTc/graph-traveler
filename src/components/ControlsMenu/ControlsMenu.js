import React from "react";
import "./ControlsMenu.css";
import { Slider, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed, pause, reset, clear, resume } from "../../logic/redux/graphSlice";
export default (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.graph.paused);
  const solveSpeed = useSelector((state) => state.graph.solveSpeed);
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
      <Button variant="contained" onClick={(e) => dispatch(clear())}>
        Clear
      </Button>
      <div>
        <Typography gutterBottom>Speed</Typography>
        <Slider
          onChangeCommitted={(e, v) => dispatch(updateSpeed(1010 - v))} //TODO: remove hard coded values
          defaultValue={750}
          step={50}
          min={500}
          max={1000}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => 1010 - v }
          marks
        />
      </div>
    </div>
  );
};
