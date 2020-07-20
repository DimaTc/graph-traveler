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

import { getSolverNames, solvers } from "../../AlgorithmManager";
import { solve } from "../graphSlice";
export default {
  step: (state, action) => {
    if (state.graphData.queue.length === 0) state.graphData.running = false;
    //draw path at the end
    if (state.graphData.drawPath) {
      if (state.graphData.queue.length > 0) {
        //if path found
        let pathTile = state.graphData.queue.pop();
        if (state.graphData.data[pathTile].type == "visited") state.graphData.data[pathTile].type = "path";
      }
      return;
    }
    ///////////////////////
    let f = solvers[state.algorithms.solve];
    // let bfs = getSolverNames()[0]; //search
    let res = f(state.graphData);
    if (!res.running) res = { ...res, running: true, drawPath: true };
    state.graphData = { ...state.graphData, ...res };
    // when search is finished//////////
    if (res.drawPath) {
      state.graphData.queue = []; //empty it for the found path queue
      if (state.end !== -1 && state.graphData.parentDict[state.end] !== undefined) {
        let current = state.end;
        while (state.graphData.parentDict[current] !== undefined) {
          state.graphData.queue = [...state.graphData.queue, current];
          current = state.graphData.parentDict[current];
        }
      }
    }
    /////////////////////
    //return { edges, queue, visited, parentDict, running, goal };
    state.graphData.visited.forEach((v) => {
      if (
        state.graphData.data[v].type !== "visited" &&
        state.graphData.data[v].type !== "start" &&
        state.graphData.data[v].type !== "end" &&
        state.graphData.data[v].type !== "wall"
      )
        state.graphData.data[v].type = "visited";
    });

    //dummy
  },

  placeStart: (state, action) => {
    let id = action.payload;
    let oldVal = state.graphData.data[id];
    state.start = id;
    state.graphData.data[id] = { ...oldVal, type: "start" };
  },

  placeEnd: (state, action) => {
    let id = action.payload;
    let oldVal = state.graphData.data[id];
    state.end = id;
    state.graphData.data[id] = { ...oldVal, type: "end" };
  },

  solve: (state) => {
    //reset
    state.graphData.vertices.forEach((v) => {
      let { type } = state.graphData.data[v];
      if (type === "visited" || type === "path") state.graphData.data[v] = { ...state.graphData.data[v], type: "" };
    });
    state.graphData.running = true;
    state.graphData.drawPath = false;
    state.graphData.visited = [];
    state.graphData.queue = [state.start];
    state.graphData.parentDict = {};
  },
  setTimeoutId: (state, action) => {
    state.timeoutId = action.payload;
  },
  reset: (state) => {},
  stop: (state) => {},

  updateSpeed: (state, action) => {
    console.log("speed -", action.payload);
    state.solveSpeed = action.payload;
  },
  wallATile: (state, action) => {
    let { type } = state.graphData.data[action.payload];
    if (type != "") return;
    state.wall = [...state.wall, action.payload];
    type = "wall";
    state.graphData.data[action.payload] = { ...state.graphData.data[action.payload], type };

    //remove from edges
    let neighbors = state.graphData.edges[action.payload];
    neighbors.forEach((n) => {
      state.graphData.edges[n] = state.graphData.edges[n].filter((v) => v !== action.payload);
    });
    state.graphData.edges[action.payload] = [];
  },

  removeAWall: (state, action) => {
    let { type, neighbors } = state.graphData.data[action.payload];
    if (type != "wall") return;

    state.wall = state.wall.filter((v) => v != action.payload);
    type = "";
    state.graphData.data[action.payload] = { ...state.graphData.data[action.payload], type };
    //restore edges
    neighbors.forEach((n) => {
      if (state.graphData.edges[n].type !== "wall") state.graphData.edges[n] = [...state.graphData.edges[n], action.payload];
    });
    state.graphData.edges[action.payload] = [...neighbors.filter((n) => state.graphData.data[n].type !== "wall")];
  },

  setSolveAlgorithm: (state, action) => {
    if (solvers[action.payload] !== undefined) state.algorithms.solve = action.payload;
  },
  generateMaze: (state, action) => {},
  drawPath: (state, action) => {},

  updateGraph: (state, action) => {
    let { vertices, edges } = action.payload;
    state.graphData.vertices = vertices;
    let randomStart = Math.floor(Math.random() * vertices.length); //temp
    state.start = randomStart;
    state.graphData.data[randomStart] = { type: "start", neighbors: edges[randomStart] };
    state.graphData.queue = [randomStart];
    randomStart = Math.floor(Math.random() * vertices.length); //temp
    state.end = randomStart;
    state.graphData.data[randomStart] = { type: "end", neighbors: edges[randomStart] };
    state.graphData.goal = randomStart;
    state.graphData.edges = edges;
    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined) state.graphData.data[v] = { type: "", neighbors: edges[v] };
    });
  },
};
