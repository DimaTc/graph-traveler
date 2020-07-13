import React, { Component } from "react";
import "./GraphArea.css";
import Tile from "./Tile";
class GraphArea extends Component {
  constructor(props) {
    super(props);
    this.state = { size: 900, ids: [8, 76, 347] };
  }

  componentDidMount() {
    this.updateSizes();
    window.addEventListener("resize", this.updateSizes);
  }

  updateSizes = () => {
    let graphArea = document.getElementById("graph-area");
    //TODO: make less generic names
    let w = graphArea.clientWidth;
    let h = graphArea.clientHeight;
    let l = Math.sqrt((w * h) / this.state.size);
    this.setState({ w: w, h: h, l: l });
  };

  //TODO: make it compatible for data structure
  getTile = () => {
    if (this.state.l == undefined)
      return (
        <tr>
          <td>
            <h1>nope</h1>
          </td>
        </tr>
      );
    let nx = Math.floor(this.state.w / this.state.l);
    let ny = Math.floor(this.state.h / this.state.l);
    let tileStyle = { width: this.state.w / nx - 2, height: this.state.h / ny - 2 };
    let tiles = [];
    for (let r = 0; r < ny; r++) {
      let cells = [];
      for (let c = 0; c < nx; c++) {
        let id = nx * r + c;
        let clsName = "tile";
        if (this.props.ids != undefined && this.props.ids.includes(id)) clsName += " tile-test";
        cells.push(<Tile width={this.state.w / nx - 2} height={this.state.h / ny - 2} />); //TODO: implement Vector of vertices and edges
      }
      tiles.push(<tr key={"row-" + r}>{cells}</tr>);
    }
    return tiles;
  };

  render() {
    return (
      <div className="graph-area" id="graph-area">
        <table>
          <tbody>{this.getTile()}</tbody>
        </table>
      </div>
    );
  }
}

export default GraphArea;
