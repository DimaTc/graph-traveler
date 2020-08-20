/*
    All control related reducers 
*/

export default {
  pause: (state) => {
    state.paused = true;
  },
  reset: (state) => {
    console.log("reset");
    if (state.selectedTile !== undefined) {
      state.graphData.data[state.selectedTile].type = state.graphData.data[state.selectedTile].type.replace("-s", "");
      state.selectedTile = undefined;
    }

    if (!state.graphData.clean) {
      state.graphData.vertices.forEach((v) => {
        //Loop over visited & path
        let { type } = state.graphData.data[v];
        if (!state.generationData.weighted) state.graphData.data[v].value = 0;
        if (type !== "start" && type !== "goal" && type !== "wall")
          state.graphData.data[v] = { ...state.graphData.data[v], type: "" };
      });
    }
    clearInterval(state.intervalId.solve);
    clearInterval(state.intervalId.generate);
    state.intervalId = {
      solve: undefined,
      generate: undefined,
    };
    state.graphData = {
      ...state.graphData,
      clean: true,
      running: false,
      drawPath: false,
      queue: [state.graphData.start],
      visited: [],
      parentDict: {},
    };
    state.generationData = {
      ...state.generationData,
      running: false,
      queue: [],
      firstRun: true,
      extraParams: {},
    };
    state.paused = false;
  },

  toggleSkip: (state) => {
    state.skip = !state.skip;
  },

  resume: (state) => {
    state.paused = false;
  },

  updateSpeed: (state, action) => {
    state.solveSpeed = action.payload;
  },

  solve: (state) => {
    // state.graphData.clean = false;
    state.generationData.running = false;
    // state.graphData.running = true;
    state.graphData = {
      ...state.graphData,
      clean: false,
      running: true,
      extraParams: {},
    };
  },

  generate: (state, action) => {
    state.generationData.weighted = action.payload;
    state.weightCheck = action.payload;
    state.graphData.clean = false;
    state.generationData = {
      ...state.generationData,
      extraParams: {},
      running: true,
      firstRun: true,
      queue: [state.graphData.start],
    };
  },

  setIntervalId: (state, action) => {
    let { type, value } = action.payload;
    console.log("Set interval - ", type, value);
    state.intervalId[type] = value;
  },
};
