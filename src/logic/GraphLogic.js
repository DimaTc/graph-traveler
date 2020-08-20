export const MAX_COST = 100;
function generateGraph(nx, ny) {
  //generate the graph data structure
  let vertices = [];
  let edges = {};
  for (let r = 0; r < ny; r++)
    for (let c = 0; c < nx; c++) {
      let id = nx * r + c;
      vertices.push(id); //Add ID first
      if (edges[id] === undefined) edges[id] = [];
      if (id - 1 >= 0 && (id - 1) % nx <= id % nx) {
        edges[id].push(id - 1);
        edges[id - 1].push(id);
      }
      if (id - nx >= 0) {
        edges[id].push(id - nx);
        edges[id - nx].push(id);
      }
    }

  return { vertices, edges };
}

const removeEdge = (e, node) => {
  //remove an edge and update the relevant edges
  let edges = { ...e };
  let neighbors = edges[node];
  neighbors.forEach((n) => {
    edges[n] = edges[n].filter((v) => v !== node);
  });
  edges[node] = [];
  return edges;
};

const restoreEdge = (e, neighbors, walls, node) => {
  //restore an edge and update the relevant edges
  let edges = { ...e };
  neighbors.forEach((n) => {
    if (!walls.includes(n)) edges[n] = [...edges[n], node];
  });
  edges[node] = [...neighbors.filter((n) => !walls.includes(n))];
  return edges;
};

export { generateGraph, removeEdge, restoreEdge };
