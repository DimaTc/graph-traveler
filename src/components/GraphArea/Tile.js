import React from "react";
import "./Tile.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleWall, selectTile } from "../../logic/redux/graphSlice";
const TILE = 25;
const getCurrentCSS = (type) => {
  let cls = "tile ";
  switch (type) {
    case "start":
      return cls + "tile-start";
    case "goal":
      return cls + "tile-goal";
    case "start-s":
      return cls + "tile-start selected";
    case "goal-s":
      return cls + "tile-goal selected";
    case "visited":
      return cls + "tile-visited";
    case "current":
      return cls + "tile-current";
    case "path":
      return cls + "tile-path";
    case "wall":
      return cls + "tile-wall";
    default:
      return cls;
  }
};


const Tile = (props) => {
  const dispatch = useDispatch();
  let cellState = useSelector(
    (state) => state.graph.graphData.data[props.id],
    (oldData, newData) => oldData.type === newData.type && oldData.value === newData.value
  );
  let weighted = useSelector(
    (state) => state.graph.generationData.weighted,
    () => true
  );
  let styles = { width: TILE, height: TILE };
  return (
    <td
      id={props.id}
      key={props.id}
      className={getCurrentCSS(cellState.type)}
      style={styles}
      onMouseEnter={(e) => {
        if (e.buttons === 1) dispatch(toggleWall(props.id));
      }}
      onPointerDown={(e) => {
        if (cellState.type === "start" || cellState.type === "goal") dispatch(selectTile(props.id));
        else dispatch(toggleWall(props.id));
      }}
    >
      {weighted && (cellState.type === "" || cellState.type === "visited") && cellState.value !== -1
        ? cellState.value
        : undefined}
    </td>
  );
};

export default Tile;
export { TILE };
