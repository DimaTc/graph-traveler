import React, { Component } from "react";
import "./GraphArea.css";
import Tile, { TILE } from "./Tile";
import { connect } from "react-redux";
import { placeStart, updateGraph } from "../../logic/redux/graphSlice";
import { generateGraph } from "../../logic/GraphLogic";

const mapStateToProps = (state) => {
  let vertices = state.graph.graphData.vertices;
  return { vertices };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeStart: (vertex) => dispatch(placeStart(vertex)),
    updateGraph: (nx, ny) => {
      updateGraph(generateGraph(nx, ny));
    },
  };
};

class GraphArea extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: 0, columns: 0 };
  }
  componentDidMount() {
    this.updateSizes();
  }

  updateSizes = () => {
    let graphArea = document.getElementById("graph-area2");
    let graphW = graphArea.clientWidth;
    let graphH = graphArea.clientHeight;
    // let l = Math.sqrt((graphW * graphH) / 1200);
    let l = TILE + 2; //+2 for border
    let columns = Math.floor(graphW / l);
    let rows = Math.floor(graphH / l);
    let tileW = graphW / columns - 2;
    let tileH = graphH / rows - 2;
    this.setState({ graphW, graphH, columns, rows, tileW, tileH });
    this.props.onLoad(columns, rows);
    this.props.updateGraph(columns, rows);
  };

  getTiles = () => {
    let tiles = [];
    this.props.vertices.forEach((v) => {});
    for (let r = 0; r < Math.floor(this.props.vertices.length / this.state.columns); r++) {
      let cells = [];
      for (let c = 0; c < Math.floor(this.props.vertices.length / this.state.rows); c++) {
        let id = this.state.columns * r + c;
        cells.push(<Tile id={id} key={id} />);
      }
      tiles.push(<tr key={"row-" + r}>{cells}</tr>);
    }
    return tiles;
  };

  render() {
    return (
      <div className="graph-area" id="graph-area2" onContextMenu={(e) => e.preventDefault()}>
        <table>
          <tbody>{this.getTiles()}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphArea);
