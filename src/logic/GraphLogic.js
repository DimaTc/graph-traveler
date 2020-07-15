function generateGraph(nx, ny) {
  console.log(nx, ny, nx * ny);
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

function removeEdge(v, e) {}

export { generateGraph };
