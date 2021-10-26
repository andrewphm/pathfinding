import React, { useReducer, useState } from "react";

/* clear walls */
export const clearWalls = (row, col) => {
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      let node = document.getElementById(`node-${x}-${y}`);
      node.classList.remove("wall");
      node.classList.remove("visited");
    }
  }
};
// Reducer
// import { reducer } from "../../utility/reducer";

let row = 20;
let col = 35;

const reducer = (state, action) => {
  if (action.type === "MOUSEDOWN") {
    console.log("reducer firing");
    state.isMouseDown = true;
    return state;
  }
  if (action.type === "MOUSEUP") {
    console.log("reducer firing");
    state.isMouseDown = false;
    return state;
  }
};

const Grid = () => {
  // Set up state management for nodes
  const initialGridArr = (row, col) => {
    const defaultState = { nodes: [], isMouseDown: false };
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        const node = {
          row: x,
          col: y,
          isStart: false,
          isTarget: false,
        };
        defaultState.nodes.push(node);
      }
    }

    defaultState.nodes[defaultState.nodes.length - 1].isTarget = true;
    defaultState.nodes[0].isStart = true;
    return defaultState;
  };

  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));
  const [algo, setAlgo] = useState("");

  /* Mouse event handlers */
  const handleMouseDown = (target) => {
    if (
      !target.classList.contains("target") &&
      !target.classList.contains("start")
    ) {
      dispatch({ type: "MOUSEDOWN" });
      target.classList.add("wall");
    }
  };
  const handleMouseEnter = (target) => {
    if (state.isMouseDown) {
      if (
        !target.classList.contains("target") &&
        !target.classList.contains("start") &&
        target !== document.getElementById("grid")
      ) {
        target.classList.add("wall");
      }
    }
  };

  const handleListClick = (event) => {
    const algoList = document.querySelector(".algo-list");
    algoList.classList.toggle("show-menu");
    setAlgo(event.target.innerText);
  };

  const getNodeObject = (row, col) => {
    let nodeObj = state.nodes.filter(
      (node) => node.row === row && node.col === col
    );
    return nodeObj[0];
  };

  const dfs = async () => {
    const timeout = (time) =>
      new Promise((resolve) => setTimeout(resolve, time));

    const nodes = state.nodes;
    let startNode = nodes.filter((node, index) => node.isStart === true);
    startNode = startNode[0];
    let stack = [startNode];

    while (stack.length > 0) {
      let currentNode = stack.pop();
      let currentX = currentNode.row;
      let currentY = currentNode.col;
      //get
      let currentNodeDom = document.getElementById(
        `node-${currentX}-${currentY}`
      );
      console.log(currentNodeDom);

      // Check to see if current node is target
      // Marks current node as visited
      if (currentNodeDom.classList.contains("target")) return;
      if (!currentNodeDom.classList.contains("start"))
        currentNodeDom.classList.add("visited");

      // Directional Vectors left down right up
      const rowVectors = [0, 1, 0, -1];
      const colVectors = [-1, 0, 1, 0];

      // Validate neighbour nodes
      for (let i = 0; i < 4; i++) {
        await timeout(10);
        let xCord = currentX + rowVectors[i];
        let yCord = currentY + colVectors[i];
        console.log(xCord, yCord, stack);
        // Validate node is inbound
        if (xCord >= 0 && xCord < row && yCord >= 0 && yCord < col) {
          let nextNode = document.getElementById(`node-${xCord}-${yCord}`);
          let classes = nextNode.classList;
          // Validate node is not a wall and hasn't been visited
          let isVisited = classes.contains("visited");
          let isWall = classes.contains("wall");
          if (!isVisited && !isWall) {
            let nodeObj = getNodeObject(xCord, yCord);
            stack.push(nodeObj);
            console.log("valid neighbour node pushed");
          }
        } else {
          console.log("invalid cords");
        }
      }
    }
  };

  return (
    <section className="grid-container">
      <div className="grid-buttons">
        <div className="algo-menu">
          <button
            className="btn"
            onClick={() => {
              const algoList = document.querySelector(".algo-list");
              algoList.classList.toggle("show-menu");
            }}
          >
            Choose Algorithm...{" "}
            <i className="ri-arrow-down-s-fill ri-lg algo-icon"></i>
          </button>
          <ul className="algo-list">
            <li onClick={(event) => handleListClick(event)}>
              Dijkstra's Algorithm
            </li>
            <li onClick={(event) => handleListClick(event)}>A* Search</li>
            <li onClick={(event) => handleListClick(event)}>
              Breadth-first Search
            </li>
            <li onClick={(event) => handleListClick(event)}>
              Depth-first search
            </li>
            <li onClick={(event) => handleListClick(event)}>Swarm Algoirthm</li>
          </ul>
        </div>
        <button onClick={() => dfs()} className="btn visualize-btn">
          Visualize {algo}!
        </button>
        <button
          className="clear-btn btn"
          onClick={() => {
            clearWalls(row, col);
          }}
        >
          Clear Walls
        </button>
      </div>
      <div>
        <ul className="legend">
          <li>
            <i className={`ri-arrow-right-s-line ri-lg start`}></i>
            <p> Start Node</p>
          </li>
          <li>
            <i className={`ri-focus-2-line ri-lg target`}></i>
            <p> Target Node</p>
          </li>
          <li>
            <div className="unvisited-node"></div>
            <p> Unvisited Nodes</p>
          </li>
          <li>
            <div className="visited-node"></div>
            <p> Visited Nodes</p>
          </li>
          <li>
            <div className="shortest-path"></div>
            <p> Shortest Path</p>
          </li>
          <li>
            <div className="wall-node"></div>
            <p> Wall nodes</p>
          </li>
        </ul>
      </div>

      <div
        id="grid"
        onMouseDown={(event) => {
          handleMouseDown(event.target);
        }}
        onMouseOver={(event) => {
          handleMouseEnter(event.target);
          // console.log(event.target);
        }}
        onMouseUp={() => dispatch({ type: "MOUSEUP" })}
      >
        {state.nodes.map((e, index) => {
          const { row, col, isTarget, isStart } = e;
          let className = "";
          if (isTarget) {
            className = "target";
            return (
              <div
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              >
                <i className={`ri-focus-2-line ri-lg ${className}`}></i>
              </div>
            );
          } else if (isStart) {
            className = "start";
            return (
              <div
                id={`node-${row}-${col}`}
                key={index}
                className={`grid-item ${className}`}
              >
                <i className={`ri-arrow-right-s-line ri-lg ${className}`}></i>
              </div>
            );
          }
          return (
            <div
              id={`node-${row}-${col}`}
              key={index}
              className={`grid-item ${className}`}
            ></div>
          );
        })}
        {console.log("rendered")}
      </div>
    </section>
  );
};

export default Grid;
