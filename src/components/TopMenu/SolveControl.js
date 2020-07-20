import React from "react";
import { FormControl, InputLabel, Select, Button, Slider, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { updateSpeed, solve, step, setSolveAlgorithm, setTimeoutId } from "../../logic/redux/graphSlice";
const getOptionsFromArray = (arr) => {
  return arr.map((v) => (
    <MenuItem key={v} value={v}>
      {v}
    </MenuItem>
  ));
};

const solveHelper = (dispatch, delay, runSolver, oldTimeout) => {
  console.log("status - ", runSolver);
  clearInterval(oldTimeout);
  if (!runSolver) return;
  let timeoutId = setInterval(() => {
    dispatch(step());
  }, delay);
  return timeoutId;
};

const SolveControl = (props) => {
  const solveAlgorithms = useSelector((state) => state.graph.algorithms.solveArr);
  const selectedSolver = useSelector((state) => state.graph.algorithms.solve);
  const runSpeed = useSelector((state) => state.graph.solveSpeed);
  const runSolver = useSelector((state) => state.graph.graphData.running);
  const oldTimeout = useSelector(
    (state) => state.graph.timeoutId,
    () => true
  );
  console.log("re-render");
  const dispatch = useDispatch();
  let timeoutId = solveHelper(dispatch, runSpeed, runSolver, oldTimeout);
  dispatch(setTimeoutId(timeoutId));

  return (
    <div className="sub-section maze-solvers">
      <FormControl variant="outlined">
        <InputLabel>Solvers</InputLabel>
        <Select
          name="solvers"
          id="solvers"
          value={selectedSolver}
          label="Solvers"
          onChange={(e) => {
            dispatch(setSolveAlgorithm(e.target.value));
          }}
        >
          {getOptionsFromArray(solveAlgorithms)}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          dispatch(solve());
        }}
      >
        Solve
      </Button>
      <Slider
        onChangeCommitted={(e, v) => dispatch(updateSpeed(1010 - v))} //TODO: remove hard coded values
        defaultValue={500}
        step={100}
        min={10}
        max={1000}
        aria-labelledby="discrete-slider"
        marks
      />
    </div>
  );
};

export default SolveControl;
