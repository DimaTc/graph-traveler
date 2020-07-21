import React, { Component } from "react";
import "./Tile.css";
import { useSelector, useDispatch } from "react-redux";
import { wallATile, removeAWall } from "../../logic/redux/graphSlice";
const TILE = 25;
const getCurrentCSS = (type) => {
  let cls = "tile ";
  switch (type) {
    case "start":
      return cls + "tile-start";
    case "end":
      return cls + "tile-end";
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
const toggleWall = (dispatch, type, id) => {
  switch (type) {
    case "":
      dispatch(wallATile(id));
      break;
    case "wall":
      dispatch(removeAWall(id));
      break;
  }
};

const Tile = (props) => {
  const dispatch = useDispatch();
  let cellState = useSelector((state) => state.graph.graphData.data[props.id]);
  let styles = { width: TILE, height: TILE };
  return (
    <td
      id={props.id}
      key={props.id}
      className={getCurrentCSS(cellState.type)}
      style={styles}
      onMouseEnter={(e) => {
        if (e.buttons === 1) toggleWall(dispatch, cellState.type, props.id);
      }}
      onPointerDown={(e) => {
        toggleWall(dispatch, cellState.type, props.id);
      }}
    ></td>
  );
};

export default Tile;
export { TILE };
