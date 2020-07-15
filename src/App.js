import React, { Component } from "react";
import TopMenu from "./components/TopMenu/TopMenu";
import "./App.css";
import GraphArea from "./components/GraphArea/GraphArea";
import ControlsMenu from "./components/ControlsMenu/ControlsMenu";
import { generateGraph } from "./logic/GraphLogic";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      solve: false,
      test: [0],
      last: 0,
      speed: 300,
      visited: [],
      current: [],
      path: [],
      wall: [],
      start: undefined,
      end: undefined,
      toUpdate: true,
    };
  }

  updateSpeedCallback = (newSpeed) => {
    //TODO: clean it up
    if (newSpeed === 0) newSpeed = 1;
    if (newSpeed === this.state.speed) return;
    if (this.state.intId !== undefined) this.setState({ intId: setInterval(this.step, 10000 / newSpeed), speed: newSpeed });
    else this.setState({ speed: newSpeed });
    console.log("new speed:", 10000 / newSpeed);
    clearInterval(this.state.intId);
  };

  updateComplete = () => {
    this.setState({ toUpdate: false });
  };

  updateGraph = (nx, ny) => {
    if (this.state.graph !== undefined && this.state.graph.vertices.length === nx * ny) return;
    let graph = generateGraph(nx, ny);
    //tmp
    let randomStart = Math.floor(Math.random() * graph.vertices.length);
    //

    this.setState({ graph, start: randomStart, toUpdate: true });
  };

  step = () => {
    if (!this.state.solve) return;
    let current;
    if (this.state.current.length === 0) current = this.state.start;
    else current = this.state.current.pop(); //will setState later
    let next = this.state.graph.edges[current];
    next = next.filter((i) => !this.state.visited.includes(i) && !this.state.current.includes(i));

    this.setState({ visited: [...this.state.visited, current], current: [...this.state.current, ...next], toUpdate: true });
  };

  solveGraph = () => {
    this.setState({ intId: setInterval(this.step, 10000 / this.state.speed), solve: true });
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
        <TopMenu speedCallback={this.updateSpeedCallback} solveCallback={this.solveGraph} />
        <GraphArea
          onLoad={this.updateGraph}
          graph={this.state.graph}
          visited={this.state.visited}
          current={this.state.current}
          path={this.state.path}
          wall={this.state.wall}
          start={this.state.start}
          end={this.state.end}
          updateFlag={this.state.toUpdate}
          onUpdateDone={this.updateComplete}
        />
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
