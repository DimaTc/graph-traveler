import React from "react";
import "./TopMenu.css";
import SolveControl from "./SolveControl";
import GeneratorControl from "./GeneratorControl";
import { TILE } from "../GraphArea/Tile";
import Legend from "../LegendArea/Legend";
import ControlsMenu from "../ControlsMenu/ControlsMenu";
export default (props) => {
  return (
    <div className="top-menu">
      <GeneratorControl />

      <SolveControl />
      <ControlsMenu/>
      </div>
  );
};
