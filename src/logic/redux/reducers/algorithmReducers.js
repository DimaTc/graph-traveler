import { restoreEdge, removeEdge, MAX_COST } from "../../GraphLogic";
import { solvers, generators } from "../../AlgorithmManager";
/*
    All algorithms related reducers,
    meaning solvers and maze generators
*/

export default {
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
    if (state.paused) return;
    //loop for not animating the building process
    do {
      if (state.generationData.weighted && state.generationData.firstRun)
        //Generate random weights for nodes
        state.graphData.vertices.forEach((v) => {
          if (v !== state.graphData.start && v !== state.graphData.goal) {
            state.graphData.data[v].value = Math.floor(Math.random() * MAX_COST); //better than just selecting random queue
          } else {
            state.graphData.data[v].value = 0;
          }
        });

      //Make one step in the generation process
      let f = generators[state.algorithms.generate];
      let { deltaWalls, deltaHoles, running, generationData, extraParams } = f(state.graphData, state.generationData);

      //filter out the walls if needed (for Prim ,DFS and etc.)
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
    } while (state.skip && state.generationData.running);
  },

  step: (state) => {
    if (state.paused) return;
    do {
      if (state.graphData.queue.length === 0) state.graphData.running = false;
      //draw path at the end
      if (state.graphData.drawPath) {
        if (state.graphData.queue.length > 0) {
          let pathTile = state.graphData.queue.pop();
          if (state.graphData.data[pathTile].type === "visited") state.graphData.data[pathTile].type = "path";
        } else return;
        if (state.skip) continue;
        return;
      }
      let f = solvers[state.algorithms.solve];
      let res = f(state.graphData);

      if (!res.running) res = { ...res, running: true, drawPath: true };
      state.graphData = { ...state.graphData, ...res };

      // when search is finished
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
      //change each cell type to visited if visited (duplication will not affect performance)
      state.graphData.visited.forEach((v) => {
        if (state.graphData.data[v].type === "") state.graphData.data[v].type = "visited";
      });
    } while (state.skip && (state.graphData.running || state.graphData.drawPath));
  },
};
