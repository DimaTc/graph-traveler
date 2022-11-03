import React from "react";
import "./Legend.css";
import "../../shared/global.css"
import { TILE } from "../GraphArea/Tile";

export default function () {
  return (
    <div className="legend-wrapper">
      <ul className="sub-section legend curved-border">
        <li>
          <strong>Start</strong>
          <div style={{ width: TILE, height: TILE }} className="tile-start"></div>
        </li>
        <li>
          <strong>Goal</strong>
          <div style={{ width: TILE, height: TILE }} className="tile-goal"></div>
        </li>
        <li>
          <strong>Wall</strong>
          <div style={{ width: TILE, height: TILE }} className="tile-wall"></div>
        </li>
      </ul>
    </div>
  );
}
