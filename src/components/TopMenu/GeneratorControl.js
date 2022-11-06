import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMazeGenerators } from "../../logic/AlgorithmManager";
import { Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from "@material-ui/core";
import {
    setAlgorithm,
    generateMaze,
    clear,
    generate,
    setIntervalId,
    reset,
    setWeightCheck, displayWeights,
} from "../../logic/redux/graphSlice";
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import "./GeneratorControl.css";
import "./../../shared/global.css"
import {GlobalStyles} from "../../shared/globalStyles";

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
    <div className="sub-section maze-generation curved-border">
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
        style={GlobalStyles.border}
        disabled={runSolver || runGenerator}
        variant="contained"
        color="primary"
        startIcon={<OfflineBoltIcon />}
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
            onChange={(e, state) => {
                dispatch(setWeightCheck(state));
                // dispatch(displayWeights(state));
            }}
          />
        }
        label="Add Weights"
      />
    </div>
  );
};
