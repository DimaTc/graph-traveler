import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMazeGenerators } from "../../logic/AlgorithmManager";
import { Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from "@material-ui/core";
import { setAlgorithm, generateMaze, clear, generate, setIntervalId, reset, setWeightCheck } from "../../logic/redux/graphSlice";
import BuildIcon from "@material-ui/icons/Build";
import "./GeneratorControl.css";

const getOptionsFromArray = (arr) => {
  return arr.map((v) => (
    <MenuItem key={v} value={v}>
      {v}
    </MenuItem>
  ));
};

const generateHelper = (dispatch, runGenerator, oldTimeout) => {
  clearInterval(oldTimeout);
  if (!runGenerator) return;
  let intervalId = setInterval(() => {
    dispatch(generateMaze());
  }, 10);
  return intervalId;
};

export default (props) => {
  const currentGenerator = useSelector((state) => state.graph.algorithms.generate);
  const isWeighted = useSelector((state) => state.graph.weightCheck);
  const runSolver = useSelector((state) => state.graph.graphData.running);
  const runGenerator = useSelector((state) => state.graph.generationData.running);
  const oldTimeout = useSelector(
    (state) => state.graph.intervalId.generate,
    () => true
  );
  const dispatch = useDispatch();
  let intervalId = generateHelper(dispatch, runGenerator, oldTimeout);
  dispatch(setIntervalId({ type: "generate", value: intervalId }));
  return (
    <div className="sub-section maze-generation">
      <FormControl variant="outlined">
        <InputLabel>Generators</InputLabel>
        <Select
          name="generators"
          disabled={runSolver || runGenerator}
          id="generators"
          value={currentGenerator}
          label="Generators"
          onChange={(e) => {
            dispatch(setAlgorithm({ value: e.target.value, type: "generate" }));
          }}
        >
          {getOptionsFromArray(getMazeGenerators())}
        </Select>
      </FormControl>
      <Button
        disabled={runSolver || runGenerator}
        variant="contained"
        color="primary"
        startIcon={<BuildIcon />}
        onClick={(e) => {
          dispatch(reset());
          dispatch(clear());
          dispatch(generate(isWeighted));
        }}
      >
        Generate
      </Button>
      <FormControlLabel
        id="weight-checkbox"
        control={
          <Checkbox
            id="weight-checkbox"
            value="weight"
            checked={isWeighted}
            disabled={runGenerator}
            onChange={(e, state) => dispatch(setWeightCheck(state))}
          />
        }
        label="weighted"
      />
    </div>
  );
};
