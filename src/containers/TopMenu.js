import React from "react";
import "./TopMenu.css";
import SolveControl from "../components/TopMenu/SolveControl";
import GeneratorControl from "../components/TopMenu/GeneratorControl";
import ControlsMenu from "../components/TopMenu/ControlsMenu";

export default (props) => {
  return (
    <div className="top-menu">
      <GeneratorControl />
      <SolveControl />
      <ControlsMenu/>
    </div>
  );
};
