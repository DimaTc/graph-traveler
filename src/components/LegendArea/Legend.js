import React from "react";
import "./Legend.css";
import { TILE } from "../GraphArea/Tile";

export default function () {
  return (
    <div className="legend-wrapper">
      <ul className="sub-section legend">
        <li>
          <p>Start</p>
          <div style={{ width: TILE, height: TILE }} className="tile-start"></div>
        </li>
        <li>
          <p>Goal</p>
          <div style={{ width: TILE, height: TILE }} className="tile-goal"></div>
        </li>
        <li>
          <p>Wall</p>
          <div style={{ width: TILE, height: TILE }} className="tile-wall"></div>
        </li>
      </ul>
    </div>
  );
}
