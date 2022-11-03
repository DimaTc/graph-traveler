[Graph Traveler](https://graph-traveler.web.app/)
===

This app visualizes path finding algorithms and maze generators, [deployed project here. (with firebase)](https://graph-traveler.web.app/)

***Performance issues may be present in larger screens***

## Capabilities
### **Maze generation**
***

Can generate simple mazes both with animation enabled/disabled

Weights can be enabled/disabled before generation
![Generation](https://i.imgur.com/0C1kLD7.png)

### **Path finding**
***
Can find path from one point to any other point. Start/End position can be changed by selecting the current node and clicking on another target.

Dijkstra takes the weights into account (if there is no weights it will act like BFS )


![Generation](https://i.giphy.com/media/dXEj4DZaGirjPIQHg9/source.gif)

### Flexible controls
***
Speed (of the path finding) can be changed in the middle of the run and also wall can be added or removed at the middle of the run.

**Adding/Removing walls in visited area will not the graph - meaning it can be broken**

## Local Installation
### For development
clone and install the dependencies
```bash
git clone git@github.com:DimaTc/graph-traveler.git
npm i
```
then just start the development server by ``` yarn start``` or ```npm start```

***Be advised, it is much slower when the app is in development mode.***
### Production build
Just open the index.html file in build and enjoy!

If any code is updated, you should ```yarn build``` or ```npm build``` first.


## TODOs
- Add A* finding algorithm
- Add recursive maze generator
- Adaptation to mobile devices
- Adding Ctrl Z functionality
  
