import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMazeGenerators } from "../../logic/AlgorithmManager";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { setAlgorithm, generateMaze, clear, generate, setIntervalId } from "../../logic/redux/graphSlice";
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
        variant="contained"
        color="secondary"
        onClick={(e) => {
          dispatch(clear());
          dispatch(generate());
        }}
      >
        Generate
      </Button>
    </div>
  );
};
