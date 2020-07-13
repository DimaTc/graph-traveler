import React, { Component } from "react";
import TopMenu from "./components/TopMenu/TopMenu";
import "./App.css";
import GraphArea from "./components/GraphArea/GraphArea";
import ControlsMenu from "./components/ControlsMenu/ControlsMenu";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { test: [0], last: 0, speed: 40 };
  }

  updateSpeedCallback = (newSpeed) => { //TODO: clean it up
    return;
    if (newSpeed === 0) newSpeed = 1;
    if (newSpeed === this.state.speed) return;
    clearInterval(this.state.intId);
    this.setState({ intId: setInterval(this.testF, 10000 / newSpeed), speed: newSpeed });
  };

  componentDidMount() {
    // this.updateSpeedCallback(50);
    // setInterval(this.testF, 1000 / this.state.speed);
  }
  testF = () => {
    this.setState({ test: [...this.state.test, this.state.last + 1], last: this.state.last + 1 });
  };
  render() {
    return (
      <div className="App">
        <TopMenu speedCallback={this.updateSpeedCallback} />
        <GraphArea ids={this.state.test} />
      </div>
    );
  }
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <TopMenu />
//       <GraphArea ids={[1, 2, 3, 4, 5, 6]} />
//     </div>
//   );
// }

// export default App;
