import React from "react";
import { FormControl, InputLabel, Select, Button, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { solve, reset, step, setAlgorithm, setIntervalId } from "../../logic/redux/graphSlice";
import { getSolverNames } from "../../logic/AlgorithmManager";
import SendIcon from "@material-ui/icons/Send";
import RefreshIcon from "@material-ui/icons/Refresh";
import "./SolveControl.css";

const getOptionsFromArray = (arr) => {
  return arr.map((v) => (
    <MenuItem key={v} value={v}>
      {v}
    </MenuItem>
  ));
};

const solveHelper = (dispatch, delay, runSolver, oldTimeout) => {
  clearInterval(oldTimeout);
  if (!runSolver) return;
  let intervalId = setInterval(() => {
    dispatch(step());
  }, delay);
  return intervalId;
};

const SolveControl = (props) => {
  const selectedSolver = useSelector((state) => state.graph.algorithms.solve);
  const runSpeed = useSelector((state) => state.graph.solveSpeed);
  const runSolver = useSelector((state) => state.graph.graphData.running);
  const runGenerator = useSelector((state) => state.graph.generationData.running);
  const oldTimeout = useSelector(
    (state) => state.graph.intervalId.solve,
    () => true
  );
  const dispatch = useDispatch();
  let intervalId = solveHelper(dispatch, runSpeed, runSolver, oldTimeout);
  dispatch(setIntervalId({ type: "solve", value: intervalId }));

  return (
    <div className="sub-section maze-solvers">
      <FormControl variant="outlined">
        <InputLabel>Solvers</InputLabel>
        <Select
          disabled={runSolver || runGenerator}
          name="solvers"
          id="solvers"
          value={selectedSolver}
          label="Solvers"
          onChange={(e) => {
            dispatch(setAlgorithm({ value: e.target.value, type: "solve" }));
          }}
        >
          {getOptionsFromArray(getSolverNames())}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        disabled={runSolver || runGenerator}
        color="primary"
        // startIcon={<PlayArrowIcon/>}
        startIcon={<SendIcon />}
        onClick={(e) => {
          dispatch(reset());
          dispatch(solve());
        }}
      >
        Solve
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<RefreshIcon />}
        onClick={(e) => {
          dispatch(reset());
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default SolveControl;
