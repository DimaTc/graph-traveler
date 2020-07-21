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
  setTimeoutId: (state, action) => {
    state.timeoutId = action.payload;
  },
  pause: (state) => {
    state.paused = true;
  },
  reset: (state) => {
    state.graphData.vertices.forEach((v) => {
      let { type } = state.graphData.data[v];
      if (type !== "start" && type !== "end" && type !== "wall")
        state.graphData.data[v] = { ...state.graphData.data[v], type: "" };
    });
    state.graphData.running = false;
    state.graphData.drawPath = false;
    state.graphData.queue = [state.graphData.start];
    state.graphData.visited = [];
    state.graphData.parentDict = {};
    state.paused = false;
  },
  resume: (state) => {
    state.paused = false;
  },
  clear: (state) => {
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
    if (type != "") return;
    state.wall.push(action.payload);
    state.graphData.data[action.payload].type = "wall";
    state.graphData.edges = { ...removeEdge(state.graphData.edges, action.payload) };
  },

  removeAWall: (state, action) => {
    let { type, neighbors } = state.graphData.data[action.payload];
    if (type !== "wall") return;
    state.wall = state.wall.filter((v) => v !== action.payload);
    state.graphData.data[action.payload].type = "";
    state.graphData.edges = { ...restoreEdge(state.graphData.edges, neighbors, state.wall, action.payload) };
  },

  setAlgorithm: (state, action) => {
    let { value, type } = action.payload;
    let algorithmDict;
    switch (type) {
      case "solve":
        algorithmDict = solvers;
        break;
      case "generate":
        algorithmDict = generators;
        break;
    }
    if (algorithmDict[value] !== undefined) state.algorithms[type] = value;
  },

  generateMaze: (state) => {
    //TODO: make the generation step by step like the solving algorithms

    let f = generators[state.algorithms.generate];
    let walls = f(state.graphData);
    walls.forEach((w) => {
      state.graphData.data[w].type = "wall";
      state.graphData.edges = { ...removeEdge(state.graphData.edges, w) };
    });
    state.walls = [...walls];
  },

  updateGraph: (state, action) => {
    let { vertices, edges } = action.payload;
    state.graphData.vertices = vertices;
    let randomStart = Math.floor(Math.random() * vertices.length); //temp

    state.graphData.start = randomStart;
    state.graphData.data[randomStart] = { type: "start", neighbors: edges[randomStart] };
    state.graphData.queue = [randomStart];
    randomStart = Math.floor(Math.random() * vertices.length); //temp
    state.graphData.goal = randomStart;
    state.graphData.data[randomStart] = { type: "end", neighbors: edges[randomStart] };
    state.graphData.goal = randomStart;
    state.graphData.edges = edges;
    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined) state.graphData.data[v] = { type: "", neighbors: edges[v] };
    });
  },
};
