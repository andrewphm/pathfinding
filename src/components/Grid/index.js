import React, { useReducer, useState } from "react";

// Reducer
import { reducer } from "./reducer";

// Utility
import {
  clearWalls,
  handleListClick,
  handleMouseDown,
  handleMouseEnter,
  getGridSize,
} from "../../utility";

// Algorithms
import { dfs, bfs } from "../../algorithms";

let row = 20;
let col = 40;

const Grid = () => {
  // Set properties of CSS variable grid row/col
  let root = document.getElementById("root");
  root.style.setProperty("--grid-rows", row);
  root.style.setProperty("--grid-columns", col);

  // Set up default state of nodes
  const initialGridArr = (row, col) => {
    const defaultState = { nodes: [], isMouseDown: false, isRunning: false };
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
    defaultState.nodes[300].isStart = true;
    return defaultState;
  };

  // Create useReducer hook to manage node/grid state. Set up state for algorithm chosen
  const [state, dispatch] = useReducer(reducer, initialGridArr(row, col));
  const [algo, setAlgo] = useState("");

  const handleVirtualize = (algo) => {
    if (state.isRunning) return;
    switch (algo) {
      case "Depth-first search":
        dispatch({ type: "IS_RUNNING", payload: true });
        dfs(state, dispatch, getNodeObject, getGridSize);
        break;
      case "Breadth-first Search":
        dispatch({ type: "IS_RUNNING", payload: true });
        bfs(state, dispatch, getNodeObject, getGridSize);
        break;
      default:
        break;
    }
  };

  const getNodeObject = (row, col) => {
    let nodeObj = state.nodes.filter(
      (node) => node.row === row && node.col === col
    );
    return nodeObj[0];
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
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Dijkstra's Algorithm
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              A* Search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Breadth-first Search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Depth-first search
            </li>
            <li onClick={(event) => handleListClick(event, setAlgo)}>
              Swarm Algoirthm
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleVirtualize(algo)}
          className="btn visualize-btn"
        >
          Visualize {algo}!
        </button>
        <button
          className="clear-btn btn"
          onClick={() => {
            clearWalls(row, col, state);
          }}
        >
          Clear Walls
        </button>
      </div>

      {algo && <div>hi</div>}

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
          handleMouseDown(event.target, dispatch);
        }}
        onMouseOver={(event) => {
          handleMouseEnter(event.target, state);
          // console.log(event.target);
        }}
        onMouseUp={() => dispatch({ type: "MOUSEUP" })}
        onMouseLeave={() => {
          if (state.isMouseDown) {
            dispatch({ type: "MOUSEUP" });
          }
        }}
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
      </div>
    </section>
  );
};

export default Grid;
