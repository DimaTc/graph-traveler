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
    ///////////////////////
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
    state.GraphData.goal = id;
    state.graphData.data[id] = { ...oldVal, type: "end" };
  },
  placeNode: (state, action) => {
    let { type, id } = action.payload.id;
    let oldVal = state.graphData.data[id];
    state[type] = id;
    state.graphData.data[id] = { ...oldVal, type };
  },

  solve: (state) => {
    state.graphData.running = true;
  },
  generate: (state) => {
    state.generationData = { extraParams: {}, running: true, firstRun: true, queue: [state.graphData.start] };
  },
  setIntervalId: (state, action) => {
    let { type, value } = action.payload;
    state.intervalId[type] = value;
  },
  pause: (state) => {
    state.paused = true;
  },
  reset: (state) => {
    state.graphData.vertices.forEach((v) => {
      let { type } = state.graphData.data[v];
      if (type !== "start" && type !== "end" && type !== "wall")
        state.graphData.data[v] = { ...state.graphData.data[v], type: "", value: 0 };
    });
    state.graphData = {
      ...state.graphData,
      running: false,
      drawPath: false,
      queue: [state.graphData.start],
      visited: [],
      parentDict: [],
    };
    state.paused = false;
  },
  resume: (state) => {
    state.paused = false;
  },
  clear: (state) => {
    state.graphData.walls = [];
    state.graphData.vertices.forEach((v) => {
      state.graphData.edges[v] = state.graphData.data[v].neighbors;
      if (state.graphData.data[v].type !== "start" && state.graphData.data[v].type !== "end") state.graphData.data[v].type = "";
    });
  },
  updateSpeed: (state, action) => {
    state.solveSpeed = action.payload;
  },
  wallATile: (state, action) => {
    let { type } = state.graphData.data[action.payload];
    if (type !== "" || state.graphData.walls.includes(action.payload)) return;
    state.graphData.walls.push(action.payload);
    state.graphData.data[action.payload].type = "wall";
    state.graphData.edges = { ...removeEdge(state.graphData.edges, action.payload) };
  },

  removeAWall: (state, action) => {
    let { type, neighbors } = state.graphData.data[action.payload];
    if (type !== "wall") return;
    state.graphData.walls = state.graphData.walls.filter((v) => v !== action.payload);
    state.graphData.data[action.payload].type = "";
    state.graphData.edges = { ...restoreEdge(state.graphData.edges, neighbors, state.graphData.walls, action.payload) };
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

  generateMaze: (state) => {
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
    let { vertices, edges } = action.payload;
    state.graphData.vertices = vertices;
    let randomStart = Math.floor(Math.random() * vertices.length); //temp

    state.graphData.start = randomStart;
    state.graphData.data[randomStart] = { type: "start", neighbors: edges[randomStart], value: 0 };
    state.graphData.queue = [randomStart];
    randomStart = Math.floor(Math.random() * vertices.length); //temp
    state.graphData.goal = randomStart;
    state.graphData.data[randomStart] = { type: "end", neighbors: edges[randomStart], value: 0 };
    state.graphData.goal = randomStart;
    state.graphData.edges = edges;
    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined) state.graphData.data[v] = { type: "", neighbors: edges[v], value: 0 };
    });
  },
};
