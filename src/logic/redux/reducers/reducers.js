/*
    graphData: {
      vertices: [],
      edges: [],
      data: {},
      parentDict: {},
      visited: [],
      queue: [],
      goal: -1,
      running: false,
    },
    solveSpeed: 200,
    wall: [],
    start: 128,
    end: -1,
    algorithms: {
      solve: getSolverNames()[0],
      generate: undefined,
      solveArr: getSolverNames(),
    },
  },
*/

import { solvers, generators } from "../../AlgorithmManager";
import { removeEdge, restoreEdge } from "../../GraphLogic";
// import { combineReducers } from "redux";

export default {
  step: (state) => {
    if (state.paused) return;
    if (state.graphData.queue.length === 0) state.graphData.running = false;
    //draw path at the end
    if (state.graphData.drawPath) {
      if (state.graphData.queue.length > 0) {
        let pathTile = state.graphData.queue.pop();
        if (state.graphData.data[pathTile].type === "visited") state.graphData.data[pathTile].type = "path";
      }
      return;
    }
    let f = solvers[state.algorithms.solve];
    let res = f(state.graphData);

    if (!res.running) res = { ...res, running: true, drawPath: true };
    state.graphData = { ...state.graphData, ...res };
    // when search is finished//////////
    if (res.drawPath) {
      state.graphData.queue = []; //empty it and it will be repurposed for the path
      if (state.graphData.goal !== -1 && state.graphData.parentDict[state.graphData.goal] !== undefined) {
        let current = state.graphData.goal;
        while (state.graphData.parentDict[current] !== undefined) {
          state.graphData.queue = [...state.graphData.queue, current];
          current = state.graphData.parentDict[current];
        }
      }
    }
    /////////////////////
    //change each cell type to visited if visited (duplication will not affect performance)
    state.graphData.visited.forEach((v) => {
      if (state.graphData.data[v].type === "") state.graphData.data[v].type = "visited";
    });
  },

  placeStart: (state, action) => {
    let id = action.payload;
    let oldVal = state.graphData.data[id];
    state.graphData.start = id;
    state.graphData.data[id] = { ...oldVal, type: "start" };
  },

  placeEnd: (state, action) => {
    let id = action.payload;
    let oldVal = state.graphData.data[id];
    state.graphData.goal = id;
    state.graphData.data[id] = { ...oldVal, type: "end" };
  },
  placeNode: (state, action) => {
    let { type, id } = action.payload.id;
    let oldVal = state.graphData.data[id];
    state[type] = id;
    state.graphData.data[id] = { ...oldVal, type };
  },

  solve: (state) => {
    state.graphData.clean = false;
    state.generationData.running = false;
    state.graphData.running = true;
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
    state.intervalId[type] = value;
  },
  pause: (state) => {
    state.paused = true;
  },
  reset: (state) => {
    if (state.selectedTile !== undefined) {
      state.graphData.data[state.selectedTile].type = state.graphData.data[state.selectedTile].type.replace("-s", "");
      state.selectedTile = undefined;
    }

    if (!state.graphData.clean) {
      state.graphData.vertices.forEach((v) => {
        //Loop over visited & path
        let { type } = state.graphData.data[v];
        if (!state.generationData.weighted) state.graphData.data[v].value = 0;
        if (type !== "start" && type !== "end" && type !== "wall")
          state.graphData.data[v] = { ...state.graphData.data[v], type: "" };
      });
    }

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
      intervalId: undefined,
      queue: [],
      firstRun: true,
      extraParams: {},
    };
    state.paused = false;
  },
  setWeightCheck: (state, action) => {
    state.weightCheck = action.payload;
  },

  resume: (state) => {
    state.paused = false;
  },
  clear: (state) => {
    state.weightCheck = false;
    state.generationData.weighted = false;
    state.graphData.walls = [];
    state.graphData.vertices.forEach((v) => {
      state.graphData.edges[v] = state.graphData.data[v].neighbors;
      state.graphData.data[v].value = -1;
      if (state.graphData.data[v].type !== "start" && state.graphData.data[v].type !== "end") state.graphData.data[v].type = "";
    });
  },
  updateSpeed: (state, action) => {
    state.solveSpeed = action.payload;
  },
  selectTile: (state, action) => {
    if (state.graphData.running || state.generationData.running) return;
    let id = action.payload;
    if (state.selectedTile !== undefined) {
      state.graphData.data[state.selectedTile].type = state.graphData.data[state.selectedTile].type.replace("-s", "");
      state.selectedTile = undefined;
    }
    if (id === state.graphData.start) state.graphData.data[action.payload].type = "start-s";
    else state.graphData.data[action.payload].type = "end-s";
    state.selectedTile = id;
  },
  wallATile: (state, action) => {
    let { type } = state.graphData.data[action.payload];
    if (type !== "" || state.selectedTile !== undefined) return;

    state.graphData.walls.push(action.payload);
    state.graphData.data[action.payload].type = "wall";
    state.graphData.edges = { ...removeEdge(state.graphData.edges, action.payload) };
    state.graphData.clean = false;
  },

  removeAWall: (state, action) => {
    let { type, neighbors } = state.graphData.data[action.payload];
    if (type !== "wall" || state.selectedTile !== undefined) return;
    state.graphData.walls = state.graphData.walls.filter((v) => v !== action.payload);
    state.graphData.data[action.payload].type = "";
    state.graphData.edges = { ...restoreEdge(state.graphData.edges, neighbors, state.graphData.walls, action.payload) };
    if (state.graphData.walls.length === 0) state.graphData.clean = true;
  },
  toggleWall: (state, action) => {
    let { type, neighbors } = state.graphData.data[action.payload];
    let id = action.payload;
    if (type === "wall") {
      state.graphData.data[id].type = "";
      state.graphData = {
        ...state.graphData,
        walls: state.graphData.walls.filter((v) => v !== id),
        edges: { ...restoreEdge(state.graphData.edges, neighbors, state.graphData.walls, id) },
      };
      if (state.graphData.walls.length === 0) state.graphData.clean = true;
      //
      //
    } else if (type !== "start" && type !== "end" && state.selectedTile === undefined) {
      state.graphData.walls.push(id);
      state.graphData = { ...state.graphData, clean: false, edges: { ...removeEdge(state.graphData.edges, id) } };
      state.graphData.data[id].type = "wall";
    }

    if (state.selectedTile !== undefined) {
      if (state.selectedTile === state.graphData.start) {
        state.graphData.data[state.graphData.start].type = "";
        state.graphData.data[id].type = "start";
        state.graphData.start = id;
      } else {
        state.graphData.data[state.graphData.goal].type = "";
        state.graphData.data[id].type = "end";
        state.graphData.goal = id;
      }
      state.selectedTile = undefined;
    }
  },

  setAlgorithm: (state, action) => {
    let { value, type } = action.payload;
    let algorithmDict;
    switch (type) {
      case "solve":
        algorithmDict = solvers;
        break;
      default:
        algorithmDict = generators;
    }
    if (algorithmDict[value] !== undefined) state.algorithms[type] = value;
  },

  generateMaze: (state, action) => {
    if (state.paused) return;

    let f = generators[state.algorithms.generate];
    let { deltaWalls, deltaHoles, running, generationData, extraParams } = f(state.graphData, state.generationData);
    state.graphData.walls = [...state.graphData.walls.filter((v) => !deltaHoles.includes(v)), ...deltaWalls];
    deltaWalls.forEach((w) => {
      if (w === state.graphData.start || w === state.graphData.goal) return;
      state.graphData.data[w].type = "wall";
      state.graphData.edges = { ...removeEdge(state.graphData.edges, w) };
    });

    deltaHoles.forEach((n) => {
      if (n === state.graphData.start || n === state.graphData.goal) return;

      state.graphData.data[n].type = "";
      state.graphData.edges = {
        ...restoreEdge(state.graphData.edges, state.graphData.data[n].neighbors, state.graphData.walls, n),
      };
    });
    state.generationData = { ...generationData, running, extraParams };
  },

  updateGraph: (state, action) => {
    //TODO: Optimize the code
    let { vertices, edges } = action.payload;
    state.graphData.vertices = vertices;
    let randomStart = Math.floor(Math.random() * vertices.length); //TODO: clean this

    state.graphData.start = randomStart;
    state.graphData.data[randomStart] = { type: "start", neighbors: edges[randomStart], value: -1 };
    state.graphData.queue = [randomStart];
    randomStart = Math.floor(Math.random() * vertices.length); //temp
    state.graphData.goal = randomStart;
    state.graphData.data[randomStart] = { type: "end", neighbors: edges[randomStart], value: -1 };
    state.graphData.goal = randomStart;
    state.graphData.edges = edges;
    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined) state.graphData.data[v] = { type: "", neighbors: edges[v], value: -1 };
    });
    //new
    vertices.forEach((v) => {
      //get neighbors of neighbors
      let cornerNeighbors = state.graphData.data[v].neighbors
        .reduce((res, n) => [...res, ...state.graphData.data[n].neighbors], [])
        .sort();

      //count duplicates
      cornerNeighbors = cornerNeighbors.reduce((res, n) => {
        res[n] = (res[n] || 0) + 1;
        return res;
      }, {});

      //map to array all 2 duplicates
      cornerNeighbors = Object.keys(cornerNeighbors).reduce((res, n) => {
        if (cornerNeighbors[n] === 2 && n != v) res = [...res, n * 1];
        return res;
      }, []);
      let newData = { ...state.graphData.data[v], cornerNeighbors };
      state.graphData.data[v] = newData;
    });
  },
};
