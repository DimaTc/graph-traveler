import React, { Component } from "react";
import "./Tile.css"
class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCurrentCSS = () => {
    let cls = "tile";
    switch (this.props.type) {
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
      default:
        return cls;
    }
  };

  render() {
    let styles = { width: this.props.width, height: this.props.height };
    return <td className={this.getCurrentCSS()} style={styles}></td>;
  }
}

export default Tile;
