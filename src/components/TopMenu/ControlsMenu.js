import React from "react";
import "./ControlsMenu.css";
import "../../shared/global.css"
import { Slider, Button, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed, pause, reset, clear, resume, toggleSkip } from "../../logic/redux/graphSlice";
import DeleteIcon from "@material-ui/icons/Delete";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import {GlobalStyles} from "../../shared/globalStyles";
export default (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.graph.paused);
  const skip = useSelector((state) => state.graph.skip);
  const solveSpeed = useSelector((state) => state.graph.solveSpeed);

  let icon = paused ? <PlayArrowIcon /> : <PauseIcon />;

  return (
    <div className="sub-section controls-menu curved-border">
      <Button
        style={GlobalStyles.roundedBorder}
        className="circle-button"
        variant="contained"
        color="primary"
        onClick={(e) => {
          if (paused) dispatch(resume());
          else dispatch(pause());
        }}
      >
          {paused ? <PlayArrowIcon /> : <PauseIcon />}
      </Button>
      <Button
        style={GlobalStyles.roundedBorder}
        className="circle-button"
        variant="contained"
        color="secondary"
        onClick={(e) => {
          dispatch(reset());
          dispatch(clear());
        }}
      >
          <DeleteIcon />
      </Button>
      <div style={{textAlign: "center"}}>
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
      <div style={{textAlign: "center"}}>
        <Typography gutterBottom>Animation</Typography>
          <FormControlLabel
              className="skip-control"
              style={{margin: "0 auto"}}
              control={<Checkbox value="skip" checked={skip} onChange={() => dispatch(toggleSkip())} />}
          />
      </div>

    </div>
  );
};
