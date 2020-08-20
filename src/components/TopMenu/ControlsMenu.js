import React from "react";
import "./ControlsMenu.css";
import { Slider, Button, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed, pause, reset, clear, resume, toggleSkip } from "../../logic/redux/graphSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
export default (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.graph.paused);
  const skip = useSelector((state) => state.graph.skip);
  const solveSpeed = useSelector((state) => state.graph.solveSpeed);

  let icon = paused ? <PlayArrowIcon /> : <PauseIcon />;

  return (
    <div className="sub-section controls-menu">
      <Button
        variant="contained"
        color="primary"
        startIcon={icon}
        onClick={(e) => {
          if (paused) dispatch(resume());
          else dispatch(pause());
        }}
      >
        {paused ? "Resume" : "Pause"}
      </Button>

      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        color="secondary"
        onClick={(e) => {
          dispatch(reset());
          dispatch(clear());
        }}
      >
        Clear
      </Button>
      <div>
        <Typography gutterBottom>Solve Speed</Typography>
        <Slider
          onChangeCommitted={(e, v) => dispatch(updateSpeed(1010 - v))} 
          defaultValue={1010 - solveSpeed}
          step={50}
          min={500}
          max={1000}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => 1010 - v}
          marks
        />
      </div>
      <FormControlLabel
        className="skip-control"
        control={<Checkbox value="skip" checked={skip} onChange={() => dispatch(toggleSkip())} />}
        label="skip animation"
      />
    </div>
  );
};
