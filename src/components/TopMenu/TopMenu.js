import React from "react";
import "./TopMenu.css";
import SolveControl from "./SolveControl";
import GeneratorControl from "./GeneratorControl";
import { TILE } from "../GraphArea/Tile";
export default (props) => {
  return (
    <div className="top-menu">
      <GeneratorControl />

      <SolveControl />

        <ul className="sub-section legend">
          <li>
            <p>Start</p>
            <div style={{ width: TILE, height: TILE }} className="tile-start"></div>
          </li>
          <li>
            <p>Goal</p>
            <div style={{ width: TILE, height: TILE }} className="tile-end"></div>
          </li>
          <li>
            <p>Wall</p>
            <div style={{ width: TILE, height: TILE }} className="tile-wall"></div>
          </li>
          <li>
            <p>Path</p>
            <div style={{ width: TILE, height: TILE }} className="tile-path"></div>
          </li>
        </ul>
      </div>
  );
};
