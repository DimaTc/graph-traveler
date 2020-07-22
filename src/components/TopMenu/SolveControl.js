import React from "react";
import { FormControl, InputLabel, Select, Button, MenuItem } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { solve, reset, step, setAlgorithm, setTimeoutId } from "../../logic/redux/graphSlice";
import { getSolverNames } from "../../logic/AlgorithmManager";

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
  let timeoutId = setInterval(() => {
    dispatch(step());
  }, delay);
  return timeoutId;
};

const SolveControl = (props) => {
  const selectedSolver = useSelector((state) => state.graph.algorithms.solve);
  const runSpeed = useSelector((state) => state.graph.solveSpeed);
  const runSolver = useSelector((state) => state.graph.graphData.running);
  const oldTimeout = useSelector(
    (state) => state.graph.timeoutId,
    () => true
  );
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
            dispatch(setAlgorithm({ value: e.target.value, type: "solve" }));
          }}
        >
          {getOptionsFromArray(getSolverNames())}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          dispatch(reset());
          dispatch(solve());
        }}
      >
        Solve
      </Button>
    </div>
  );
};

export default SolveControl;
