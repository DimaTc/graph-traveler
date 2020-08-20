import { restoreEdge, removeEdge, MAX_COST } from "../../GraphLogic";

/*
    All graph manipulation related reducers
*/

export default {
  clear: (state) => {
    state.weightCheck = false;
    state.generationData.weighted = false;
    state.graphData.walls = [];
    state.graphData.vertices.forEach((v) => {
      state.graphData.edges[v] = state.graphData.data[v].neighbors;
      state.graphData.data[v].value = -1;
      if (state.graphData.data[v].type !== "start" && state.graphData.data[v].type !== "goal") state.graphData.data[v].type = "";
    });
  },

  selectTile: (state, action) => {
    if (state.graphData.running || state.generationData.running) return;
    let id = action.payload;
    if (state.selectedTile !== undefined) {
      state.graphData.data[state.selectedTile].type = state.graphData.data[state.selectedTile].type.replace("-s", "");
      state.selectedTile = undefined;
    }
    if (id === state.graphData.start) state.graphData.data[action.payload].type = "start-s";
    else state.graphData.data[action.payload].type = "goal-s";
    state.selectedTile = id;
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
    } else if (!type.startsWith("start") && !type.startsWith("goal") && state.selectedTile === undefined) {
      state.graphData.walls.push(id);
      state.graphData = { ...state.graphData, clean: false, edges: { ...removeEdge(state.graphData.edges, id) } };
      state.graphData.data[id].type = "wall";
    }

    //Change start/end node
    if (state.selectedTile !== undefined) {
      let type, oldId;
      console.log(state.selectedTile);
      if (state.selectedTile === state.graphData.start) {
        oldId = state.graphData.start;
        console.log(oldId, id);
        state.graphData.start = id;
        type = "start";
      } else {
        oldId = state.graphData.goal;
        state.graphData.goal = id;
        type = "goal";
      }
      state.graphData.data[oldId] = { ...state.graphData.data[oldId], type: "", value: Math.floor(MAX_COST * Math.random()) };
      state.graphData.data[id] = { ...state.graphData.data[id], type, value: 0 };
      state.selectedTile = undefined;
    }
  },

  placeNode: (state, action) => {
    let { type, id } = action.payload;
    let oldVal = state.graphData.data[id];
    state.graphData[type] = id;
    state.graphData.data[id] = { ...oldVal, type };
  },

  updateGraph: (state, action) => {
    let { vertices, edges } = action.payload;
    state.graphData.vertices = vertices;

    //init vertices
    state.graphData.edges = edges;
    vertices.forEach((v) => {
      if (state.graphData.data[v] === undefined) state.graphData.data[v] = { type: "", neighbors: edges[v], value: -1 };
    });

    vertices.forEach((v) => {
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
        if (cornerNeighbors[n] === 2 && n !== v) res = [...res, n * 1];
        return res;
      }, []);
      let newData = { ...state.graphData.data[v], cornerNeighbors };
      state.graphData.data[v] = newData;
    });
  },
};
