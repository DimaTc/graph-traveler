import React from "react";
import "./TopMenu.css";
import SolveControl from "./SolveControl";
import GeneratorControl from "./GeneratorControl";
import ControlsMenu from "./ControlsMenu";
export default (props) => {
  return (
    <div className="top-menu">
      <GeneratorControl />

      <SolveControl />
      <ControlsMenu/>
      </div>
  );
};
