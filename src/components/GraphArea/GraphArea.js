import React, {Component, useEffect, useState} from "react";
import "./GraphArea.css";
import Tile, { TILE } from "./Tile";
import {connect, useDispatch, useSelector} from "react-redux";
import {generateMaze, placeNode, reset, updateGraph} from "../../logic/redux/graphSlice";
import { generateGraph } from "../../logic/GraphLogic";


const HEIGHT_REDUCTION = 200;
function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}


const GraphArea = (props) => {
  const dispatch = useDispatch();
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight - HEIGHT_REDUCTION });
  const [state, setState] = useState({rows: 0, columns: 0});
  let weightCheck = useSelector((state) => state.graph.weightCheck);
  let weighted = useSelector(
      (state) => state.graph.generationData.weighted,
      () => true
  );

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      dispatch(reset());
      setDimensions({
        height: window.innerHeight - HEIGHT_REDUCTION,
        width: window.innerWidth
      })
    }, 1000)
    updateSizes();
    window.addEventListener('resize', debouncedHandleResize)
    // clean up listener
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [dimensions, weighted, weightCheck]);


  const updateSizes = () => {
    // let graphArea = document.getElementById("graph-area2");
    let graphW = dimensions.width;
    let graphH = dimensions.height;
    let l = TILE + 2; //+2 for border
    let columns = Math.floor(graphW / l);
    let rows = Math.floor(graphH / l);
    let tileW = graphW / columns - 2;
    let tileH = graphH / rows - 2;
    setState({ graphW, graphH, columns, rows, tileW, tileH });
    props.onLoad(columns, rows);
    props.placeNode({ type: "start", id: columns * Math.floor(rows / 2) + Math.floor(columns / 4) });
    props.placeNode({ type: "goal", id: columns * Math.floor(rows / 2) + Math.floor((3 * columns) / 4) });
  };

  const getTiles = () => {
    let tiles = [];
    props.vertices.forEach((v) => {});
    for (let r = 0; r < Math.floor(props.vertices.length / state.columns); r++) {
      let cells = [];
      for (let c = 0; c < Math.floor(props.vertices.length / state.rows); c++) {
        let id = state.columns * r + c;
        cells.push(<Tile id={id} key={id} />);
      }
      tiles.push(<tr key={"row-" + r}>{cells}</tr>);
    }
    return tiles;
  };

    return (
      <div className="graph-area" id="graph-area2" onContextMenu={(e) => e.preventDefault()}>
        <table>
          <tbody>{getTiles()}</tbody>
        </table>
      </div>
    );

}

const mapStateToProps = (state) => {
  let vertices = state.graph.graphData.vertices;
  return { vertices };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeNode: (vertex) => dispatch(placeNode(vertex)),
    updateGraph: (nx, ny) => {
      updateGraph(generateGraph(nx, ny));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphArea);
