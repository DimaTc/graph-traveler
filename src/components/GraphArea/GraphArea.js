import React, { Component } from "react";
import "./GraphArea.css";
import Tile from "./Tile";
import { generateGraph } from "../../logic/GraphLogic";
class GraphArea extends Component {
  constructor(props) {
    super(props);
    this.cache = { tiles: [], count: 0 };
    this.state = { size: 1200, ids: [8, 76, 347], tiles: [] };
  }

  componentDidMount() {
    this.updateSizes();
    window.addEventListener("resize", this.updateSizes);
  }

  updateSizes = () => {
    this.cache = { ...this.cache, tiles: [] };
    let graphArea = document.getElementById("graph-area");
    let graphW = graphArea.clientWidth;
    let graphH = graphArea.clientHeight;
    let l = Math.sqrt((graphW * graphH) / this.state.size);
    let nx = Math.floor(graphW / l);
    let ny = Math.floor(graphH / l);
    let tileW = graphW / nx - 2;
    let tileH = graphH / ny - 2;
    this.setState({ graphW, graphH, nx, ny, tileW, tileH });
    console.log(nx, ny);
    this.props.onLoad(nx, ny);
  };

  getTileType = (vertex) => {
    if (this.props.start === vertex) return "start";
    else if (this.props.end === vertex) return "end";
    else if (this.props.wall.includes(vertex)) return "wall";
    else if (this.props.path.includes(vertex)) return "path";
    else if (this.props.current.includes(vertex)) return "current";
    else if (this.props.visited.includes(vertex)) return "visited";
    return "";
  };

  getTiles = () => {
    if (!this.props.updateFlag && this.cache.tiles.length !== 0) return this.cache.tiles;
    let tiles = [];

    if (this.props.graph === undefined)
      return (
        <tr>
          <td>
            <h1>nope</h1>
          </td>
        </tr>
      );
    let rows = this.props.graph.vertices.reduce((res, id) => {
      let resI = Math.floor(id / this.state.nx);
      if (res[resI] === undefined) res[resI] = [];
      let t = this.getTileType(id);
      res[resI].push(
        <Tile
          id={id}
          key={id}
          width={this.state.tileW}
          height={this.state.tileH}
          neighbors={this.props.graph.edges[id]}
          type={t}
        />
      );
      return res;
    }, []);
    tiles = rows.map((row, i) => <tr key={"row-" + i}>{row}</tr>);
    this.cache = { ...this.cache, tiles, count: this.props.graph.vertices.length };
    this.props.onUpdateDone();
    return tiles;
  };

  render() {
    return (
      <div className="graph-area" id="graph-area">
        <table>
          <tbody>{this.getTiles()}</tbody>
        </table>
      </div>
    );
  }
}

export default GraphArea;
